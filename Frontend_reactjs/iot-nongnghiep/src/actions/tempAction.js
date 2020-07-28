import { firebaseConnect } from '../firebaseConnect';
import { getCurrent } from "../helper-func";
import { MAX, MIN, TEMP, AUTO_MODE, CONTROL_LED, STATUS_UPDATE_MODE, STATUS_UPDATE_CONTROL } from './types';

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

export const getControlLED = () => async dispatch => {
    firebaseConnect.child('light/led_light').on('value', snapshop => {
        dispatch({
            type: CONTROL_LED,
            res_api: snapshop.val()
        })
    })
}

export const getModeAuto = () => async dispatch => {
    firebaseConnect.child('setTemp/auto').on('value', snapshop => {
        dispatch({
            type: AUTO_MODE,
            res_api: snapshop.val()
        })
    })
}

export const updateModeAuto = (status) => async dispatch => {
    firebaseConnect.child('setTemp/auto').update(status).then(() => firebaseConnect.child('setTemp/auto').on('value'))
        .then(() =>
            dispatch({
                type: STATUS_UPDATE_MODE,
                res_api: "success"
            })
        )
        .catch(error => {
            dispatch({
                type: STATUS_UPDATE_MODE,
                res_api: error
            })
        });
}