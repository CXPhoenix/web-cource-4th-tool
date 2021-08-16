import React from 'react'

export default function ModalBtns({ addCodeEventHandler, closeModalEventHandler }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 place-items-center">
            <button className={`w-4/5 bg-green-500 text-gray-200 rounded p-3 m-2`} onClick={addCodeEventHandler}>增加程式碼</button>
            <button className={`w-4/5 bg-red-500 text-gray-200 rounded p-3 m-2`} onClick={closeModalEventHandler}>取消</button>
        </div>
    )
}