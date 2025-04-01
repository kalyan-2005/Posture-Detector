import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useState, useEffect } from "react";
import backend from "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import { count } from "../../utils/music";

import Instructions from "../../components/Instrctions/Instructions";

import DropDown from "../../components/DropDown/DropDown";
import { poseImages } from "../../utils/pose_images";
import { POINTS, keypointConnections } from "../../utils/data";
import { drawPoint, drawSegment } from "../../utils/helper";
import { Link } from "react-router-dom";
import { FiActivity } from "react-icons/fi";

let skeletonColor = "rgb(255,255,255)";
let poseList = [
  "Tree",
  // "Chair",
  // "Cobra",
  // "Dog",
  // "Shoulderstand",
  "Traingle",
  "Warrior",
];

let interval;

// flag variable is used to help capture the time when AI just detect
// the pose as correct(probability more than threshold)
let flag = false;

function Yoga() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);
  const [currentPose, setCurrentPose] = useState("Tree");
  const [isStartPose, setIsStartPose] = useState(false);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
    if ((currentTime - startingTime) / 1000 > bestPerform) {
      setBestPerform(timeDiff);
    }
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);
  }, [currentPose]);

  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Traingle: 5,
    Tree: 6,
    Warrior: 7,
  };

  function get_center_point(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1);
    let right = tf.gather(landmarks, right_bodypart, 1);
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
    return center;
  }

  function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
    let hips_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    let shoulders_center = get_center_point(
      landmarks,
      POINTS.LEFT_SHOULDER,
      POINTS.RIGHT_SHOULDER
    );
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
    let pose_center_new = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center_new = tf.expandDims(pose_center_new, 1);

    pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2]);
    // return: shape(17,2)
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0);
    let max_dist = tf.max(tf.norm(d, "euclidean", 0));

    // normalize scale
    let pose_size = tf.maximum(
      tf.mul(torso_size, torso_size_multiplier),
      max_dist
    );
    return pose_size;
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center = tf.expandDims(pose_center, 1);
    pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
    landmarks = tf.sub(landmarks, pose_center);

    let pose_size = get_pose_size(landmarks);
    landmarks = tf.div(landmarks, pose_size);
    return landmarks;
  }

  function landmarks_to_embedding(landmarks) {
    // normalize landmarks 2D
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0));
    let embedding = tf.reshape(landmarks, [1, 34]);
    return embedding;
  }

  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const poseClassifier = await tf.loadLayersModel(
      "https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
    );
    const countAudio = new Audio(count);
    countAudio.loop = true;
    interval = setInterval(() => {
      detectPose(detector, poseClassifier, countAudio);
    }, 100);
  };

  const detectPose = async (detector, poseClassifier, countAudio) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0;
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints;
        let input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            if (
              !(keypoint.name === "left_eye" || keypoint.name === "right_eye")
            ) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, "rgb(255,255,255)");
              let connections = keypointConnections[keypoint.name];
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase();
                  drawSegment(
                    ctx,
                    [keypoint.x, keypoint.y],
                    [
                      keypoints[POINTS[conName]].x,
                      keypoints[POINTS[conName]].y,
                    ],
                    skeletonColor
                  );
                });
              } catch (err) {}
            }
          } else {
            notDetected += 1;
          }
          return [keypoint.x, keypoint.y];
        });
        if (notDetected > 4) {
          skeletonColor = "rgb(255,255,255)";
          return;
        }
        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);

        classification.array().then((data) => {
          const classNo = CLASS_NO[currentPose];
          console.log(data[0][classNo]);
          if (data[0][classNo] > 0.97) {
            if (!flag) {
              countAudio.play();
              setStartingTime(new Date(Date()).getTime());
              flag = true;
            }
            setCurrentTime(new Date(Date()).getTime());
            skeletonColor = "rgb(0,255,0)";
          } else {
            flag = false;
            skeletonColor = "rgb(255,255,255)";
            countAudio.pause();
            countAudio.currentTime = 0;
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  function startYoga() {
    setIsStartPose(true);
    runMovenet();
  }

  function stopPose() {
    setIsStartPose(false);
    clearInterval(interval);
  }

  if (isStartPose) {
    return (
      <div className="h-screen p-4">
        <div className="flex justify-between items-center gap-1">
          <div className="flex gap-1 items-center w-full">
            <div className="w-14 h-14 border border-black flex justify-center items-center text-4xl font-bold">
              <p className="text-xs absolute top-1">POSE TIME</p>
              {poseTime}
            </div>
            <div
              className={`h-6 w-[${3 * poseTime}%] bg-black rounded-l-full`}
            ></div>
          </div>
          <button
            onClick={stopPose}
            className="p-1 px-2 h-8 rounded bg-black text-white font-medium"
          >
            Stop Pose
          </button>
        </div>
        {/* <div className="performance-container">
          <div className="pose-performance">
          <h4>Pose Time: {poseTime} s</h4>
          </div>
          <div className="pose-performance">
          <h4>Best: {bestPerform} s</h4>
          </div>
          </div> */}
        <div>
          <Webcam
            width="640px"
            height="480px"
            id="webcam"
            ref={webcamRef}
            style={{
              position: "absolute",
              right: 25,
              top: 100,
              padding: "0px",
            }}
          />
          <canvas
            ref={canvasRef}
            id="my-canvas"
            width="640px"
            height="480px"
            style={{
              position: "absolute",
              right: 25,
              top: 100,
              zIndex: 1,
            }}
          ></canvas>
          <div className="flex justify-between items-center w-[55%] mt-3">
            <img
              src={poseImages[currentPose]}
              className="pose-img h-[480px] w-[500px]"
              alt="pose"
            />
            <div className="flex flex-col justify-between items-center w-full h-[480px]">
              <div className="text-md p-4 rounded-xl shadow-md border border-gray-500">
                <h1>Pose Time</h1>
                <h1>{poseTime}</h1>
              </div>
              <div className="text-md p-4 rounded-xl shadow-md border border-gray-500">
                <h1>Best Time</h1>
                <h1>{bestPerform}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="shadow-sm sticky top-0 bg-white z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-decoration-none text-black"
          >
            <FiActivity className="text-2xl font-bold" />
            <span className="text-xl font-bold">PoseRight</span>
          </Link>
          {/* <nav className="hidden md:flex gap-6">
                <Link
                  to="#features"
                  className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black hover:text-red-500"
                >
                  Features
                </Link>
                <Link
                  to="#how-it-works"
                  className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black"
                >
                  How It Works
                </Link>
                <Link
                  to="#benefits"
                  className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black"
                >
                  Benefits
                </Link>
              </nav> */}
          <div className="flex items-center gap-4">
            <button asChild variant="outline" className="hidden md:flex">
              <Link
                to="/bot"
                className="text-decoration-none text-black p-2 rounded-md border hover:bg-gray-100 text-sm font-medium"
              >
                Ask Query
              </Link>
            </button>
            <button asChild>
              <Link
                to="/start"
                className="text-decoration-none text-white p-2 rounded-md bg-black text-sm font-medium"
              >
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </header>
      <div className="flex">
        <DropDown
          poseList={poseList}
          currentPose={currentPose}
          setCurrentPose={setCurrentPose}
        />
        <div className="w-[90%]">
          <Instructions currentPose={currentPose} startYoga={startYoga} />
        </div>
      </div>
    </>
  );
}

export default Yoga;
