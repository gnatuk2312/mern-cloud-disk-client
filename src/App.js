import Navbar from "./components/navbar/Navbar";
import "./app.scss"
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Registration from "./components/registration/Registration";
import Login from "./components/registration/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";
import Disk from "./components/disk/Disk";

const App = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [dispatch])

    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
                <div className="wrap">
                    {!isAuth ? (
                        <Routes>
                            <Route path="/registration" element={<Registration />}/>
                            <Route path="/login" element={<Login />}/>
                            <Route path="*" element={<Navigate replace to="/login" />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route exact path="/" element={<Disk />}/>
                            <Route path="*" element={<Navigate replace to="/" />} />
                        </Routes>
                    )}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
