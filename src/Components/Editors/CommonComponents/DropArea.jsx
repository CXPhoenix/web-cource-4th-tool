import React from "react";
import { Droppable } from "react-beautiful-dnd";

export default function DropArea({ children, id, state }) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`p-2 ${
            snapshot.isDraggingOver ? `bg-gray-500 bg-opacity-50` : ``
          } ${state ? "" : "hidden"}`}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
