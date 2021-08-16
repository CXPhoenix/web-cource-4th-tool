import React from 'react'

export default function Header({ children }) {
    return (
        <header className={`w-full p-2 text-center bg-gradient-to-tl from-blue-800 to-blue-400`}>
            <span className={`text-[2vw] text-gray-100`}>{ children }</span>
        </header>
    )
}