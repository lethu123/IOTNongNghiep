import { CURRENT_USER } from '../actions/types';

const initialState = {
    isAuth: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER:
            {
                return {
                    ...state,
                    isAuth: action.res
                }
            }
        default: return state;
    }
}

export default loginReducer;