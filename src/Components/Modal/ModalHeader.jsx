import React from 'react'

export default function ModalHeader({ modalTitle }) {
    return (
        <div className="w-full p-4 bg-blue-700 rounded-t-xl text-center">
            <span className={`text-gray-100 text-base sm:text-xl md:text-3xl`}>{modalTitle}</span>
        </div>
    )
}