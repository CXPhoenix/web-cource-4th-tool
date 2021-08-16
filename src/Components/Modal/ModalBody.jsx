import React from 'react'
import ModalInfo from './ModalInfo'
import { info } from '../Data/ModalData'

export default function ModalBody({ modalType }) {
    
    return (
        <div className="grid grid-cols-1 gap-1 mt-2">
            {
                info[modalType].map((item, index) => (
                    <ModalInfo 
                    key={String(index)+item.infoLabel} 
                    infoLabel={item.infoLabel} 
                    infoId={item.infoId} 
                    inputType={item.inputType} />
                ))
            }
        </div>
    )
}