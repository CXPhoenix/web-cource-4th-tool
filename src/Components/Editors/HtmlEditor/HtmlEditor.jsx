import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DropArea from "../CommonComponents/DropArea";
import EditBtns from "../CommonComponents/EditBtns";
import HtmlCodeSpan from "./HtmlCodeSpan";

export default function HtmlEditor({
  htmlCodeContents,
  onHtmlCodeDragEndEventHandler,
  isActive,
  fixedCodeEventHandler,
  openAddCodeAreaEventHandler,
  downloadFileHandler,
}) {
  return (
    <div
      className={`h-full w-full overflow-hidden ${isActive ? "" : "hidden"}`}
    >
      <DragDropContext onDragEnd={onHtmlCodeDragEndEventHandler}>
        <EditBtns
          openAddCodeAreaEventHandler={openAddCodeAreaEventHandler}
          downloadFileHandler={downloadFileHandler}
        />
        <div id="htmlCodes" className="h-full w-full overflow-x-scroll">
          <DropArea id={`BaseCodeArea`} state={true}>
            {htmlCodeContents
              ? htmlCodeContents.map((item, index) => (
                  <HtmlCodeSpan
                    key={`${item.id}${index}`}
                    id={item.id}
                    index={index}
                    contextHeader={item.contextHeader}
                    contextId={item.contextId}
                    contextClass={item.contextClass}
                    contextStyle={item.contextStyle}
                    contextExtra={item.contextExtra}
                    innerContext={item.innerContext}
                    contextEnd={item.contextEnd}
                    innerChild={item.innerChild}
                    fixedCodeEventHandler={fixedCodeEventHandler}
                  />
                ))
              : null}
          </DropArea>
          <div className="h-[40vh]"></div>
        </div>
      </DragDropContext>
      <div className="h-[25vh]"></div>
    </div>
  );
}
