import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DragElmnt from '../CommonComponents/DragElmnt'

export default function CssEditArea({ cssContents }) {
    return (
        <div className={`block overflow-scroll`}>
            <Droppable droppableId={`CssCodeArea`}>
                {(provided, snapshot) => (
                    <div className="" ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            cssContents.map((item, index) => (
                                <DragElmnt key={`CssCode${index}`} index={index} codeText={item} codeId={`CssCode${index}`} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="h-[15vh]"></div>
        </div>
    )
}