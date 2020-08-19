import { firebaseConnect } from '../firebaseConnect';
import { CURRENT_USER } from './types';
import { toast } from 'react-toastify';

export let is_auth = null;

export const login = (data, history) => async dispatch => {
    firebaseConnect.child('/admin').on('value', snapshop => {
        let user = snapshop.val();
        if (user.username === data.username && user.password === data.password) {
            dispatch({
                type: CURRENT_USER,
                res: true
            });
            is_auth = true;
            user.isAuth = true;
            localStorage.setItem("user", JSON.stringify(user));
            history.push('/');
        } else {
            localStorage.clear();

            dispatch({
                type: CURRENT_USER,
                res: false
            });
            toast.error("Thông tin đăng nhập không chính xác !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    })
}
