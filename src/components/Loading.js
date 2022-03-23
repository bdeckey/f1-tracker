import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";


const Loading = (props) => {
  const {animationData, loading, children} = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className={(loading ? " " : "hidden") + " bg-white absolute top-0 z-20"} style={{width:"100vw", height:"100%"}}>
        <Lottie options={defaultOptions} height={400} width={400} isClickToPauseDisabled style={{cursor: "default"}} />
      </div>
      <div className={(loading ? "hidden" : "") + " relative z-10"}>
        {children}
      </div>
    </>
  );
}

export default Loading;