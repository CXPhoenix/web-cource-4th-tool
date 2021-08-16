import React from "react";

export default function CssSwitcher({ switchEventHandler, rootClassName }) {
  return (
    <div className={`flex-grow justify-self-end self-center ${rootClassName}`}>
      <div className="flex items-end justify-end">
        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
          {/* <!-- toggle --> */}
          <div className="relative">
            {/* <!-- input --> */}
            <input
              type="checkbox"
              id="toggleB"
              className="peer sr-only"
              onChange={switchEventHandler}
            />
            {/* <!-- line --> */}
            <div className="block bg-gray-600 w-14 h-8 rounded-full peer-checked:bg-gray-200"></div>
            {/* <!-- dot --> */}
            <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-full peer-checked:bg-[#48bb78]"></div>
          </div>
          {/* <!-- label --> */}
          <div className="ml-3 text-gray-100 font-medium select-none">
            啟用Bootstrap5
          </div>
        </label>
      </div>
    </div>
  );
}
