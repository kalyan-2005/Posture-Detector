import React, { useState } from "react";
import { poseInstructions } from "../../utils/data";
import { poseImages } from "../../utils/pose_images";

export default function Instructions({ currentPose, startYoga }) {
  const [instructions, setInstructions] = useState(poseInstructions);

  return (
    <div className="m-10">
      <div className="flex justify-between items-center">
        <h1>Posture - {currentPose}</h1>
        <button
          onClick={startYoga}
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Pose
        </button>
      </div>
      <div className="flex gap-10">
        <div className="w-3/5 h-[500px] overflow-auto">
          {instructions[currentPose].map((instruction) => {
            return <p className="pt-6 text-md">{instruction}</p>;
          })}
        </div>
        <img
          className="w-2/5 h-[500px] shadow-md rounded-md border"
          src={poseImages[currentPose]}
          alt="selected-pose"
        />
      </div>
    </div>
  );
}
