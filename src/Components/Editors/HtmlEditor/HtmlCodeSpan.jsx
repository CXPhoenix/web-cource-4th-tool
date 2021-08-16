import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DropArea from "../CommonComponents/DropArea";

export default function HtmlCodeSpan({
  id,
  index,
  contextHeader,
  contextId,
  contextClass,
  contextStyle,
  contextExtra,
  innerContext,
  contextEnd,
  innerChild,
  fixedCodeEventHandler,
}) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`w-full p-1 pl-3 my-3 border-[2px] border-gray-300 bg-transparent text-gray-100 ${
              snapshot.isDragging ? "opacity-50" : ""
            }`}
          >
            <div
              className={`group hover:bg-blue-600 hover:font-bold flex justify-between items-center`}
              {...provided.dragHandleProps}
            >
              {`<${contextHeader} ${contextId ? `id="${contextId}"` : ""} ${
                contextClass ? `class="${contextClass}"` : ""
              } ${contextStyle ? `style="${contextStyle}"` : ""} ${
                contextExtra || ""
              } ${contextEnd ? "" : "/"}>${contextEnd ? innerContext : ""}`}
              {/* <button
                className={`bg-red-500 text-gray-100 rounded-xl p-2 hidden cursor-pointer hover:bg-red-800 hover:font-bold group-hover:first:block`}
                onClick={fixedCodeEventHandler}
              >
                修改
              </button> */}
            </div>
            <DropArea id={id} state={!snapshot.isDragging}>
              {innerChild.length === 0 ? (
                <span></span>
              ) : (
                innerChild.map((item, index) => (
                  <HtmlCodeSpan
                    key={`${item.id}${index}`}
                    id={`${item.id}`}
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
              )}
            </DropArea>
            <div className="">{contextEnd ? `</${contextEnd}>` : ""}</div>
          </div>
        );
      }}
    </Draggable>
  );
}
