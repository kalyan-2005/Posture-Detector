import React from "react";

import { poseImages } from "../../utils/pose_images";

import "./DropDown.css";

export default function DropDown({ poseList, currentPose, setCurrentPose }) {
  return (
    <div className="h-[620px] overflow-auto w-[20%] sticky top-16">
      <div>
        {poseList.map((pose) => (
          <div onClick={() => setCurrentPose(pose)}>
            <div class="shadow-md rounded-md">
              <img src={poseImages[pose]} className="" alt={pose} />
              <p className="text-center uppercase font-semibold text-xs py-1 tracking-widest">{pose}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
