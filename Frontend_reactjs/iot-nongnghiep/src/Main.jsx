import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.scss';
import { Line } from "react-chartjs-2";
import { Switch } from '@material-ui/core';
import { getTemp, getMaxTemp, getMinTemp, getModeAuto, updateModeAuto, getControlLightGreen, getControlTempRed, getControlTempBlue, updateControlLightGreen, updateControlTempRed, updateControlTempBlue, getControlLightWhite, updateControlLightWhite, getControlMaxTemp, getControlMinTemp, updateControlMaxMin } from './actions/tempAction';
import { Redirect } from 'react-router-dom';
import { is_auth } from './actions/loginAction';
import { getCurrentFE } from './helper-func';


const Main = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.tempReducer.data);
    const labels = useSelector(state => state.tempReducer.labels);
    const max = useSelector(state => state.tempReducer.max);
    const min = useSelector(state => state.tempReducer.min);

    const auto_mode = useSelector(state => state.tempReducer.auto);
    const _controlLightGreen = useSelector(state => state.tempReducer.control_light_green);
    const _controlLightWhite = useSelector(state => state.tempReducer.control_light_white);
    const _controlTempRed = useSelector(state => state.tempReducer.control_temp_red);
    const _controlTempBlue = useSelector(state => state.tempReducer.control_temp_blue);
    const _control_max = useSelector(state => state.tempReducer.control_max);
    const _control_min = useSelector(state => state.tempReducer.control_min);

    const [auto, setAuto] = useState();
    const [controlLight, setControlLight] = useState();
    const [controlLightWhite, setControlLightWhite] = useState();
    const [controlTempRed, setControlTempRed] = useState();
    const [controlTempBlue, setControlTempBlue] = useState();
    const [temp, setTemp] = useState({
        maxtemp: _control_max,
        mintemp: _control_min
    })

    let user = JSON.parse(localStorage.getItem('user'));
    const date = getCurrentFE();

    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }

        dispatch(getTemp());
        dispatch(getMaxTemp());
        dispatch(getMinTemp());
        dispatch(getModeAuto());
        dispatch(getControlLightGreen());
        dispatch(getControlLightWhite());
        dispatch(getControlTempRed());
        dispatch(getControlTempBlue());
        dispatch(getControlMaxTemp());
        dispatch(getControlMinTemp());

        return () => { }
    }, [])

    const toggleAuto = (e) => {
        e.preventDefault();
        setAuto(!auto);
        dispatch(updateModeAuto(!auto));
    }

    const toggleLightGreen = (e) => {
        e.preventDefault();
        setControlLight(!controlLight);
        dispatch(updateControlLightGreen(!controlLight));
    }
    const toggleLightWhite = (e) => {
        e.preventDefault();
        setControlLightWhite(!controlLightWhite);
        dispatch(updateControlLightWhite(!controlLightWhite));
    }
    const toggleTempRed = (e) => {
        e.preventDefault();
        setControlTempRed(!controlTempRed);
        dispatch(updateControlTempRed(!controlTempRed));
    }
    const toggleTempBlue = (e) => {
        e.preventDefault();
        setControlTempBlue(!controlTempBlue);
        dispatch(updateControlTempBlue(!controlTempBlue));
    }

    const onChangeTemp = (e) => {
        setTemp({ ...temp, [e.target.name]: e.target.value });
    }
    const submit = (e) => {
        e.preventDefault();
        let tempControl = {
            min: _control_min,
            max: _control_max
        }
        if (temp.maxtemp) {
            tempControl.max = parseFloat(temp.maxtemp);
        }
        if (temp.mintemp) {
            tempControl.min = parseFloat(temp.mintemp);
        }
        dispatch(updateControlMaxMin(tempControl.max, tempControl.min));
        setTemp({maxtemp: '', mintemp: ''});

    }
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <>
            {!user ? <Redirect to="/login" /> :
                <div className="container py-5">
                    <h3 className="title mb-5">
                        <span>{date}</span>
                        <span className="text-success"> Xin chào, {user.username}</span>

                        <button className="border-0 btn-danger" onClick={handleLogout} data-toggle="tooltip" data-placement="bottom" title="Đăng xuất">
                            <i className="fa fa-sign-in-alt"></i>
                        </button>
                    </h3>
                    <hr />
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    data: data,
                                    label: "Nhiệt độ",
                                    borderColor: "#3e95cd",
                                    fill: true
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: "World population per region (in millions)"
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            }
                        }}
                    />

                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div>Nhiệt độ cao nhất: {max.temp}</div>
                            <div>Thời gian: {max.time}</div>
                        </div>
                        <div className="col-md-6">
                            <div>Nhiệt độ thấp nhất: {min.temp}</div>
                            <div>Thời gian: {min.time}</div>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-md-6">
                            <h4>Chế độ auto</h4>
                            <div>Off   <Switch checked={auto_mode} onChange={toggleAuto} />  On</div>
                            <hr />
                            <h4>Thay đổi nhiệt độ</h4>
                            <form className="was-validated mt-2" onSubmit={submit}>
                                <div className="form-group dk">
                                    <label htmlFor="uname">Nhiệt độ max: {_control_max} °C</label>
                                    <input type="text" className="form-control" id="uname" name="maxtemp" value={temp.maxtemp} onChange={onChangeTemp} />
                                </div>
                                <div className="form-group dk">
                                    <label htmlFor="pwd">Nhiệt độ min: {_control_min} °C</label>
                                    <input type="text" className="form-control" id="pwd" value={temp.mintemp} name="mintemp" onChange={onChangeTemp} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                        {!auto_mode ?
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4>Điều khiển led ánh sáng yếu ( Xanh lá )</h4>
                                        <div>Off   <Switch checked={_controlLightGreen} onChange={toggleLightGreen} />  On</div>
                                    </div>
                                    <div className="col-md-12">
                                        <h4>Điều khiển led ánh sáng mạnh ( Trắng )</h4>
                                        <div>Off   <Switch checked={_controlLightWhite} onChange={toggleLightWhite} />  On</div>
                                    </div>
                                    <div className="col-md-12">
                                        <h4>Điều khiển led tỏa nhiệt cao ( Đỏ )</h4>
                                        <div>Off   <Switch checked={_controlTempRed} onChange={toggleTempRed} />  On</div>
                                    </div>
                                    <div className="col-md-12">
                                        <h4>Điều khiển led tỏa nhiệt thấp ( Xanh dương)</h4>
                                        <div>Off   <Switch checked={_controlTempBlue} onChange={toggleTempBlue} />  On</div>
                                    </div>
                                </div>

                            </div>
                            : ''
                        }

                    </div>

                </div>
            }
        </>
    );
}

export default Main
