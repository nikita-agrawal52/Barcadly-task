import React, { Fragment, useEffect, useRef, useState } from 'react';
import './LoginSignup.css';
import Loader from './../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors, register } from '../../actions/userActions'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email, password } = user;
    // const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [alert, error, dispatch, navigate, isAuthenticated]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");


            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        dispatch(register(myForm));
    };
    const registerDataChange = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value });

    };



    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className='loginSignupContainer'>
                    <div className='loginSignupBox'>
                        <div>
                            <div className='login_Signup_toggle'>
                                <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                                <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail'>
                                <MailOutlineOutlinedIcon />
                                <input
                                    type='email'
                                    placeholder='email'
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)} />

                            </div>
                            <div className='loginPassword'>
                                <LockOpenOutlinedIcon />
                                <input
                                    type='password'
                                    placeholder='password'
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)} />

                            </div>
                            <Link to="/password/forgot">Forgot Password ?</Link>
                            <input type='submit' value="login" className='loginBtn' />
                        </form>
                        <form className='signupForm' ref={registerTab} onSubmit={registerSubmit} encType='multipart/form-data'>
                            <div className='signupName'>
                                <AccountCircleOutlinedIcon />
                                <input
                                    type='text'
                                    placeholder='name'
                                    required
                                    value={name}
                                    name='name'
                                    onChange={registerDataChange} />

                            </div>
                            <div className='signupEmail'>
                                <MailOutlineOutlinedIcon />
                                <input
                                    type='email'
                                    placeholder='email'
                                    required
                                    value={email}
                                    name='email'
                                    onChange={registerDataChange} />


                            </div>
                            <div className='signupPassword'>
                                <LockOpenOutlinedIcon />
                                <input
                                    type='password'
                                    placeholder='password'
                                    required
                                    value={password}
                                    name='password'
                                    onChange={registerDataChange} />

                            </div>
                            {/* <div id='registerImage'>
                                <img src={avatarPreview} alt='Avatar Preview' />
                                <input
                                    type='file'
                                    name='avatar'
                                    accept='image/*'
                                    onChange={registerDataChange} />

                            </div> */}
                            <input
                                type='submit'
                                value="Register"
                                className='signupBtn'
                            />
                        </form>
                    </div>
                </div>

            </Fragment>}
        </Fragment>
    )
}

export default LoginSignup
