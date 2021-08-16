import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CssEditArea from "./CssEditArea";
import EditBtns from "../CommonComponents/EditBtns";

function CssEditor({
  editorId,
  isActive,
  cssData,
  openAddCodeAreaEventHandler,
  downloadCssFileEventHandler,
  deleteCssCodeEventHandler,
  changeCssCodeEventHandler,
}) {
  function onDragEnd(result) {
    if (result.destination.droppableId === "Trash") {
      deleteCssCodeEventHandler(result.source);
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    if (!result.destination) {
      return;
    }
    changeCssCodeEventHandler(result.source, result.destination);
  }
  return (
    <div
      className={`w-full h-full overflow-scroll px-1 pt-4 ${
        isActive ? `` : `hidden`
      }`}
      id={editorId}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <EditBtns
          openAddCodeAreaEventHandler={openAddCodeAreaEventHandler}
          downloadFileHandler={downloadCssFileEventHandler}
        />
        <div className="h-[2vh]"></div>
        <CssEditArea cssContents={cssData} editorId={editorId} />
      </DragDropContext>
      <div className={`h-[10vh]`}></div>
    </div>
  );
}

function CssWarning({ state }) {
  return (
    <div className={`text-gray-200 p-3 ${state ? "" : "hidden"}`}>
      <span className={`block text-[3vw]`}>這個工具使用</span>
      <span className="block text-[4vw]">Bootstrap5 CSS Framework</span>
      <span className={`block text-[2vw]`}>
        如果需要參考相關使用，可以造訪以下網址：
      </span>
      <ul className={`list-disc list-inside pl-3`}>
        <li>
          <a
            href="https://getbootstrap.com/"
            target="_blank"
            className={`hover:bg-black hover:font-bold`}
          >
            Bootstrap5 原文網站
          </a>
        </li>
        <li>
          <a
            href="https://bootstrap5.hexschool.com/"
            target="_blank"
            className={`hover:bg-black hover:font-bold`}
          >
            Bootstrap5 中文翻譯網站（感謝 HexSchool 翻譯）
          </a>
        </li>
      </ul>
    </div>
  );
}

export default CssWarning;
