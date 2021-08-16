import React from 'react'

export default function JsEditor({isActive}) {
    return(
        <div className={`p-3 text-gray-200 ${isActive ? "" : "hidden"}`}>
            請下載 HTML 檔案後直接在上面撰寫 JavaScript 囉～
        </div>
    )
}