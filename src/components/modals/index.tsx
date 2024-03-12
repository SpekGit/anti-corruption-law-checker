import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

const portal = document.getElementById('modal')
type Props ={
    open:boolean;
    close:Function|undefined;
    children:ReactNode;
    clearData?:Function;
    isOverFlow?:boolean
}
 
export const Portal: React.FC<Props> = ({ open, children, close, clearData, isOverFlow }) => {

    React.useEffect(() => {
        open && document.body.classList.add('hidden');
        !open && document.body.classList.remove('hidden');
    }, [open]);

    if (open) {
        return ReactDOM.createPortal(
            <div className='modal__wrapper' onClick={() => {close&&close(false);clearData&&clearData(null)}}>
                <div className='modal__content' onClick={(e) => e.stopPropagation()} >
                    <div className='modal__main' style={isOverFlow ? { overflowY : "visible"}:{ overflowY:"auto" }}>
                        {children}
                    </div>
                </div>
            </div>, portal!!
        )
    } else {
        return null
    }
}

