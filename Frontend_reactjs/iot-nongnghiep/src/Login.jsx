import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './actions/loginAction';
import { ToastContainer } from 'react-toastify';

const Login = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    };
    const submit = (e) => {
        e.preventDefault();
        dispatch(login(formData, props.history));
    }

    return (
        <div className="background">
            <div className="relative">
                <div className="absolute p-5 bg-white">
                    <h3 className="text-center">LOGIN</h3>
                    <hr />
                    <form className="was-validated mt-5" onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="uname">Username:</label>
                            <input type="text" className="form-control" id="uname" value={formData.username} placeholder="Enter username" name="username" required onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input type="password" className="form-control" id="pwd" value={formData.password} placeholder="Enter password" name="password" required onChange={onChangeHandler} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login
