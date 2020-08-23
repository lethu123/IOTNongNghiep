import { firebaseConnect } from '../firebaseConnect';
import { getCurrent } from "../helper-func";
import { MAX, MIN, TEMP, AUTO_MODE, CONTROL_LIGHT_GREEN, CONTROL_TEMP_RED, CONTROL_TEMP_BLUE, CONTROL_LIGHT_WHITE, TEMP_MAX, TEMP_MIN } from './types';

export const getTemp = () => async dispatch => {
    const today = getCurrent();
    firebaseConnect.child(`statistical/${today}`).limitToLast(22).on('value', snapshop => {
        dispatch({
            type: TEMP,
            res_api: snapshop.val()
        })
    })
}

export const getMaxTemp = () => async dispatch => {
    firebaseConnect.child('max').on('value', snapshop => {
        dispatch({
            type: MAX,
            res_api: snapshop.val()
        })
    })
}


export const getMinTemp = () => async dispatch => {
    firebaseConnect.child('min').on('value', snapshop => {
        dispatch({
            type: MIN,
            res_api: snapshop.val()
        })
    })
}

export const getControlMaxTemp = () => async dispatch => {
    firebaseConnect.child('setControl/max').on('value', snapshop => {
        dispatch({
            type: TEMP_MAX,
            res_api: snapshop.val()
        })
    })
}


export const getControlMinTemp = () => async dispatch => {
    firebaseConnect.child('setControl/min').on('value', snapshop => {
        dispatch({
            type: TEMP_MIN,
            res_api: snapshop.val()
        })
    })
}

export const getControlLightGreen = () => async dispatch => {
    firebaseConnect.child('setControl/led_light_green').on('value', snapshop => {
        dispatch({
            type: CONTROL_LIGHT_GREEN,
            res_api: snapshop.val()
        })
    })
}

export const getControlLightWhite = () => async dispatch => {
    firebaseConnect.child('setControl/led_light_white').on('value', snapshop => {
        dispatch({
            type: CONTROL_LIGHT_WHITE,
            res_api: snapshop.val()
        })
    })
}

export const getControlTempRed = () => async dispatch => {
    firebaseConnect.child('setControl/led_temp_red').on('value', snapshop => {
        dispatch({
            type: CONTROL_TEMP_RED,
            res_api: snapshop.val()
        })
    })
}

export const getControlTempBlue = () => async dispatch => {
    firebaseConnect.child('setControl/led_temp_blue').on('value', snapshop => {
        dispatch({
            type: CONTROL_TEMP_BLUE,
            res_api: snapshop.val()
        })
    })
}

export const getModeAuto = () => async dispatch => {
    firebaseConnect.child('setControl/auto').on('value', snapshop => {
        dispatch({
            type: AUTO_MODE,
            res_api: snapshop.val()
        })
    })
}

export const updateModeAuto = (status) => async dispatch => {
    let ref = firebaseConnect.child('setControl');
    ref.update({ 'auto': status ? 1 : 0 })
        .then(() =>
            dispatch(getModeAuto())
        )
        .then(snapshot => snapshot.val())
        .catch(error => console.log("jdsjhd", error));
}

export const updateControlLightGreen = (status) => async dispatch => {
    let ref = firebaseConnect.child('setControl');
    ref.update({ 'led_light_green': status ? 1 : 0 })
        .then(() =>
            dispatch(getControlLightGreen())
        )
        .then(snapshot => snapshot.val())
        .catch(error => console.log("jdsjhd", error));
}

export const updateControlLightWhite = (status) => async dispatch => {
    let ref = firebaseConnect.child('setControl');
    ref.update({ 'led_light_white': status ? 1 : 0 })
        .then(() =>
            dispatch(getControlLightWhite())
        )
        .then(snapshot => snapshot.val())
        .catch(error => console.log("jdsjhd", error));
}

export const updateControlTempRed = (status) => async dispatch => {
    let ref = firebaseConnect.child('setControl');
    ref.update({ 'led_temp_red': status ? 1 : 0 })
        .then(() =>
            dispatch(getControlTempRed())
        )
        .then(snapshot => snapshot.val())
        .catch(error => console.log("jdsjhd", error));
}

export const updateControlTempBlue = (status) => async dispatch => {
    let ref = firebaseConnect.child('setControl');
    ref.update({ 'led_temp_blue': status ? 1 : 0 })
        .then(() =>
            dispatch(getControlTempBlue())
        )
        .then(snapshot => snapshot.val())
        .catch(error => console.log("jdsjhd", error));
}

export const updateControlMaxMin = (max, min) => async dispatch => {
    console.log("mac", max);
    let ref = firebaseConnect.child('setControl');
    ref.update({
        'max': max,
        'min': min,
        'avg': Math.round(((max + min) / 2) * 100) / 100
    }).then(() => {
        dispatch(getControlMaxTemp());
        dispatch(getControlMinTemp());
    }).then(snapshot => snapshot.val())
        .catch(error => console.log("max", error));
}
