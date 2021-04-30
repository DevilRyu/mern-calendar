import Swal from "sweetalert2";
import { fetchWithOutToken, fetchWithToken } from "../helpers/fecth";
import { types } from "../types/types";
import { eventLogout } from "./events";


export const startLogin = (email, password) => {

    return async (dispatch) => {

        const resp = await fetchWithOutToken('auth', { email, password }, 'POST');

        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    };

};

const login = (user) => {
    return {
        type: types.authLogin,
        payload: user
    }
};

export const startRegister = (name, email, password) => {

    return async (dispatch) => {

        const resp = await fetchWithOutToken('auth/new', { name, email, password }, 'POST');

        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    };

};

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchWithToken('auth/renew');

        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch(checkingFinish());
        }
    }

};

export const checkingFinish = () => {

    return {
        type: types.authCheckingFinish
    };
};

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(eventLogout());
        dispatch(logout());
    }
};

const logout = () => {
    return{
        type: types.authLogout
    };
}

