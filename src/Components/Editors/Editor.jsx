import React, { useState } from "react";
import EditorTags from "./EditorTags";
import HtmlEditor from "./HtmlEditor/HtmlEditor";
import { editorList, editors } from "../Data/EditorTagsInfo";
import JsEditor from "../JsEditor/JsEditor";
import CssWarning from "./CssEditor/CssEditor";
import Previewer from "../Previewer/Previewer";

function changeActiveState(targetList, states, target) {
  states = states.map((item) => false);
  states.splice(targetList.indexOf(target.id), 1, true);
  return states;
}

export default function Editor({
  htmlCodeContents,
  onHtmlCodeDragEndEventHandler,
  fixedCodeEventHandler,
  openAddCodeAreaEventHandler,
  downloadFileHandler,
  webCodes,
}) {
  const states = editorList.map((item) => editors[item]["isActive"]);
  let [activeState, setActiveState] = useState([...states]);

  function clickEvent(e) {
    setActiveState(changeActiveState(editorList, [...activeState], e.target));
  }
  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-tl from-[#226] to-blue-700">
      <div className="flex justify-start items-center border-b-[2px] border-gray-300 mb-3">
        {editorList.map((item, index) => (
          <EditorTags
            key={editors[item]["tagId"] + String(index)}
            tagId={editors[item]["tagId"]}
            clickEventHandler={clickEvent}
            isActive={activeState[index]}
          >
            {editors[item]["tagId"] === "preview"
              ? document.body.clientWidth < 640
                ? editors[item]["tagText"]
                : ""
              : editors[item]["tagText"]}
          </EditorTags>
        ))}
      </div>
      {editorList.map((item, index) =>
        item === "html" ? (
          <HtmlEditor
            key={`${item}${index}`}
            htmlCodeContents={htmlCodeContents}
            onHtmlCodeDragEndEventHandler={onHtmlCodeDragEndEventHandler}
            isActive={activeState[index]}
            fixedCodeEventHandler={fixedCodeEventHandler}
            openAddCodeAreaEventHandler={openAddCodeAreaEventHandler}
            downloadFileHandler={downloadFileHandler}
          />
        ) : item === "css" ? (
          <CssWarning key={`${item}${index}`} state={activeState[index]} />
        ) : item === "js" ? (
          <JsEditor isActive={activeState[index]} key={`${item}${index}`} />
        ) : item === "preview" && document.body.clientWidth < 640 ? (
          <Previewer
            key={`${item}${index}`}
            isActive={activeState[index]}
            webCodes={webCodes}
            className={`h-full overflow-scroll`}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
}
