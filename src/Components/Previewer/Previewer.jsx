import React from "react";

export default function Previewer({ webCodes, className, isActive }) {
  return (
    <div
      id={`Preview`}
      className={`h-full pb-[20vh] sm:pb-[10vh] overflow-scroll sm:overflow-hidden ${className} ${isActive ? "" : "hidden"}`}
    >
      <iframe
        className={`w-full h-full overflow-scroll mb-[1vh] sm:mb-[10vh]`}
        sandbox={`allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-modals`}
        srcDoc={webCodes}
        frameBorder="0"
      ></iframe>
      <div className={`h-[5vh] sm:h-[25vh]`}></div>
    </div>
  );
}
