import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function EditBtns({ openAddCodeAreaEventHandler, downloadFileHandler }) {
    
    return (
        <div className="flex justify-end items-center pl-[3vw] pr-[1vw] mb-6 mt-2">
            <Droppable droppableId={`Trash`} isCombineEnabled={true}>
                {(provided, snapshot) => ( 
                    <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`text-base sm:text-2xl md:text-3xl text-gray-50`}
                    >
                        <FontAwesomeIcon 
                        icon={['fas', snapshot.isDraggingOver ? 'trash-restore' : 'trash']}
                        />
                    </div>
                )}
            </Droppable>
            <div className="ml-7">
                <button 
                className={`border-0 rounded bg-gray-200 shadow p-2 hover:font-bold hover:bg-gray-300`}
                onClick={ openAddCodeAreaEventHandler }
                >
                    <span className={`text-xs sm:text-sm md:text-lg`}>
                        <FontAwesomeIcon icon={['fas', 'plus-square']} />&nbsp;
                        增加程式碼
                    </span>
                </button>
            </div>
            <div className="ml-7">
                <button 
                className={`border-0 rounded bg-gray-200 shadow p-2 hover:font-bold hover:bg-gray-300`}
                onClick={ downloadFileHandler }
                >
                    <span className={`text-xs sm:text-sm md:text-lg`}>
                        <FontAwesomeIcon icon={['fas', 'file-download']} />&nbsp;
                        下載程式碼
                    </span>
                </button>
            </div>
        </div>
    )
}