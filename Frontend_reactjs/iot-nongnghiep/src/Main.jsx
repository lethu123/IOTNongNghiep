import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.scss';
import { Line } from "react-chartjs-2";
import { Switch } from '@material-ui/core';
import { getTemp, getMaxTemp, getMinTemp, getModeAuto, updateModeAuto, getControlLightGreen, getControlTempRed, getControlTempBlue, updateControlLightGreen, updateControlTempRed, updateControlTempBlue, getControlLightWhite, updateControlLightWhite } from './actions/tempAction';
import { Redirect } from 'react-router-dom';
import { is_auth } from './actions/loginAction';


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

    const [auto, setAuto] = useState();
    const [controlLight, setControlLight] = useState();
    const [controlLightWhite, setControlLightWhite] = useState();
    const [controlTempRed, setControlTempRed] = useState();
    const [controlTempBlue, setControlTempBlue] = useState();

    let user = JSON.parse(localStorage.getItem('user'));


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


    return (
        <>
            {!user ? <Redirect to="/login" /> :
                <div className="container py-5">
                    <h3 className="text-center mb-5">Xin chào, {user.username}</h3>
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
