import { MAX, MIN, TEMP, AUTO_MODE, CONTROL_LIGHT_GREEN, CONTROL_TEMP_RED, CONTROL_TEMP_BLUE, CONTROL_LIGHT_WHITE, TEMP_MIN, TEMP_MAX } from '../actions/types';

const initialState = {
    data: [],
    labels: [],
    max: {},
    min: {},
    auto: null,
    control_light_green: null,
    control_light_white: null,
    CONTROL_LIGHT_GREEN: null,
    control_temp_red: null,
    control_temp_blue: null,
    control_max: null,
    control_min: null
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

        case TEMP_MIN: {
            return {
                ...state,
                control_min: action.res_api
            }
        }

        case TEMP_MAX: {
            return {
                ...state,
                control_max: action.res_api
            }
        }

        case AUTO_MODE: {
            return {
                ...state,
                auto: action.res_api === 1 ? true : false
            }
        }

        case CONTROL_LIGHT_GREEN: {
            return {
                ...state,
                control_light_green: action.res_api === 1 ? true : false
            }
        }
        case CONTROL_LIGHT_WHITE: {
            return {
                ...state,
                control_light_white: action.res_api === 1 ? true : false
            }
        }

        case CONTROL_TEMP_RED: {
            return {
                ...state,
                control_temp_red: action.res_api === 1 ? true : false
            }
        }

        case CONTROL_TEMP_BLUE: {
            return {
                ...state,
                control_temp_blue: action.res_api === 1 ? true : false
            }
        }

        default: return state;
    }
}

export default tempReducer;