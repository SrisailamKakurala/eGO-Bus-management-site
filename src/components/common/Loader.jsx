import React from "react";
import loaderAnimation from "../../assets/animations/loader.json"; // Add your loader animation
import { Player } from "@lottiefiles/react-lottie-player";

const Loader = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-white">
        <Player
          autoplay
          loop
          src={loaderAnimation}
          className="w-16 h-16"
        />
        <p className="text-xl text-[#FCD32D] font-bold mt-4">Loading...</p>
      </div>
  );
};

export default Loader;
