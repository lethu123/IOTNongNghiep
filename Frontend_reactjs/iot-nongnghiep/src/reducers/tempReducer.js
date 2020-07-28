import { MAX, MIN, TEMP, AUTO_MODE, CONTROL_LED, STATUS_UPDATE_MODE, STATUS_UPDATE_CONTROL } from '../actions/types';

const initialState = {
    data: [],
    labels: [],
    max: {},
    min: {},
    auto: null,
    control_led: null,
    status_mode: "",
    status_control: ""
}

const tempReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEMP:
            {
                let labels = [];
                let data = [];
                if (action.res_api) {
                    labels = Object.keys(action.res_api);
                    data = Object.values(action.res_api).map(e => parseFloat(e));
                }

                return {
                    ...state,
                    data: data,
                    labels: labels
                }
            }

        case MAX: {
            return {
                ...state,
                max: action.res_api
            }
        }

        case MIN: {
            return {
                ...state,
                min: action.res_api
            }
        }

        case AUTO_MODE: {
            return {
                ...state,
                auto: action.res_api === 1 ? true : false
            }
        }

        case CONTROL_LED: {
            return {
                ...state,
                control_led: action.res_api === 1 ? true : false
            }
        }

        case STATUS_UPDATE_MODE: {
            console.log("status", action.res_api);
            return {
                ...state,
            }
        }

        default: return state;
    }
}

export default tempReducer;