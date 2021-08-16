import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DropArea from "./DropArea";

export default function DragElmnt({
  children,
  id,
  index,
  contextHeader,
  contextEnd,
}) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`w-full p-1 pl-3 my-3 border-[2px] border-blue-900 bg-gray-300 ${
              snapshot.isDragging ? "opacity-50" : ""
            }`}
          >
            <div
              className={`hover:bg-yellow-300`}
              {...provided.dragHandleProps}
            >
              {contextHeader}
            </div>
            {children}
            <div className="">{contextEnd}</div>
          </div>
        );
      }}
    </Draggable>
  );
}
