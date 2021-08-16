import React from 'react'

export default function ModalInfo({infoLabel, infoId, inputType}) {
    return (
        <div className={`flex flex-col sm:flex-row justify-start items-center p-3 pl-4 w-full`}>
            <label className={`mr-3 text-lg w-full sm:w-[8vw] text-center sm:text-left`} htmlFor="elementName">{infoLabel}:</label>
            {
                inputType === 'text' ? 
                <input className={`sm:flex-grow pl-3 sm:p-2 text-lg border-[2px] border-blue-300 rounded`} type={inputType} name={infoId} id={infoId} /> : 
                ``
            }
            {
                inputType === 'textarea' ? 
                <textarea className={`sm:flex-grow pl-3 sm:p-2 text-lg border-[2px] border-blue-300 rounded resize-y overflow-scroll`} rows={`3`} cols={`30`} id={infoId} name={infoId}></textarea>:
                ``
            }
        </div>
    )
}