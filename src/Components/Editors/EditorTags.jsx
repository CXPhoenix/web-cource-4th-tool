import React from 'react'



export default function EditorTags({ children, className, tagId, clickEventHandler, isActive }) {
    return (
        <button 
        className={`tag py-2 px-1 mx-2 text-gray-50 focus:outline-none border-green-400 border-t-4 ${isActive ? "border-opacity-100" : "border-opacity-0"} ${className}`} 
        onClick={clickEventHandler} 
        id={tagId}
        >
            { children }
        </button>
    )
}