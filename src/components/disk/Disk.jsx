import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getFiles, uploadFile } from "../../actions/file"
import FileList from "./fileList/FileList";
import './disk.scss'
import Popup from "./Popup";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)


    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [dispatch, currentDir])

    const showPopupHandler = () => {
        dispatch(setPopupDisplay("flex"))
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    const fileUploadHandler = (event) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const dragEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return ( !dragEnter ?
        <div 
            className="disk" 
            onDragEnter={dragEnterHandler} 
            onDragLeave={dragLeaveHandler} 
            onDragOver={dragEnterHandler}
        >
            <div className="disk__btns">
                <button className="disk__back" onClick={backClickHandler}>Назад</button>
                <button className="disk__create" onClick={showPopupHandler}>Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Завантажити файл</label>
                    <input multiple={true} onChange={fileUploadHandler} type="file" id="disk__upload-input" className="disk__upload-input" />
                </div>
            </div>
            <FileList/>
            <Popup />
        </div>
        :
        <div 
            className="drop-area"
            onDragEnter={dragEnterHandler} 
            onDragLeave={dragLeaveHandler} 
            onDragOver={dragEnterHandler}
            onDrop={dropHandler}
        >
            Перетягніть файли сюди
        </div>
    )
}

export default Disk;