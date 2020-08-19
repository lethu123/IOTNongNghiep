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
        <div className="row mt-5">
            <div className="col-lg-5 mx-auto">
                <h3 className="text-center">LOGIN</h3>
                <hr />
                <form  class="was-validated mt-5" onSubmit={submit}>
                    <div class="form-group">
                        <label for="uname">Username:</label>
                        <input type="text" class="form-control" id="uname" value={formData.username} placeholder="Enter username" name="username" required onChange={onChangeHandler} />
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" id="pwd" value={formData.password} placeholder="Enter password" name="password" required onChange={onChangeHandler} />
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login
