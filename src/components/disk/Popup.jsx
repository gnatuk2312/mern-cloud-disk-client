import React from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../reducers/fileReducer";
import { createDir } from "../../actions/file"

const Popup = () => {
    const [dirName, setDirName] = useState("")
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    const createHandler = () => {
        dispatch(createDir(currentDir, dirName))
        setDirName("")
        dispatch(setPopupDisplay("none"))
    }

    return (
        <div 
            className="popup" 
            onClick={() => dispatch(setPopupDisplay("none"))} 
            style={{display: popupDisplay}}
        >
            <div className="popup__content" onClick={(event) => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Створити нову папку</div>
                    <button 
                        className="popup__close"
                        onClick={() => dispatch(setPopupDisplay("none"))}
                    >X</button>
                </div>
                <input 
                    type="text" 
                    placeholder="Введіть назву папки"
                    value={dirName}
                    onChange={(e) => setDirName(e.target.value)}
                />
                <button className="popup__create" onClick={() => createHandler()}>Створити</button>
            </div>
        </div>
    );
};

export default Popup;