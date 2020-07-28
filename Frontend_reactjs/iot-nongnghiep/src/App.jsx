import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.scss';
import { Line } from "react-chartjs-2";
import { Switch } from '@material-ui/core';
import { getTemp, getMaxTemp, getMinTemp, getModeAuto, getControlLED } from './actions/tempAction';


function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.tempReducer.data);
  const labels = useSelector(state => state.tempReducer.labels);
  const max = useSelector(state => state.tempReducer.max);
  const min = useSelector(state => state.tempReducer.min);

  const auto_mode = useSelector(state => state.tempReducer.auto);
  const control = useSelector(state => state.tempReducer.control_led);


  const [auto, setAuto] = useState();
  const [controlLED, setControlLED] = useState();

  console.log("auto", auto);
  console.log("auto_mode", auto_mode);

  // setAuto(auto_mode);
  // setControlLED(control);
  // console.log("APP mode 1", auto_mode);
  // console.log("APP control 2", control);

  useEffect(() => {
    dispatch(getTemp());
    dispatch(getMaxTemp());
    dispatch(getMinTemp());
    dispatch(getModeAuto());
    dispatch(getControlLED());

    

    return () => { }
  }, [])

  const toggleAuto = (e) => {
    console.log("checked auto mode", auto)
    e.preventDefault();
    setAuto(!auto);
    console.log("auto", !auto);
  }

  const toggleLED = (e) => {
    console.log("checked control", controlLED);
    e.preventDefault();
    setControlLED(!controlLED);
    console.log("led", !controlLED);
  }

  return (
    <div className="container py-5">
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
          <div>Off   <Switch checked={auto !== undefined ? auto : auto_mode} value="đs" onChange={toggleAuto} />  On</div>

        </div>
        {auto === false ? 
        <div className="col-md-6">
          <h4>Điều khiển led</h4>
          <div>Off   <Switch checked={controlLED !== undefined ? controlLED : control} value="đs" onChange={toggleLED} />  On</div>
        </div>
        : ''
        }
        
      </div>

    </div>
  );
}

export default App;
