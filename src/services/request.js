import { request as req } from 'umi';
import { history } from 'umi';
const base_url = `/api/fsfa`;
export const request = async (url, payload) => {
    let result = await req(base_url + url, {
        method: 'POST',
        headers: {
            token: window.localStorage.getItem('token'),
        },
        ...(payload || {}),
    });
    // return req(base_url + url, {
    //     method: 'POST',
    //     headers: {
    //         token: window.localStorage.getItem('token'),
    //     },
    //     ...(payload || {}),
    // });
    if (result.code == 0) {
        return result;
    } else if (result.code == -2) {
        history.push(`/user/login`);
    } else if (result.code == 0) {
        return result
    } else if (result.code == 3) {
        return result;
    }
}
export const requestOther = async (url, headers = {}, payload) => {
    let result = await req(url, {
        method: 'POST',
        headers: {
            ...headers,
            token: window.localStorage.getItem('token'),
        },
        ...(payload || {}),
    });
    // return req(base_url + url, {
    //     method: 'POST',
    //     headers: {
    //         token: window.localStorage.getItem('token'),
    //     },
    //     ...(payload || {}),
    // });
    if (result.code == 0) {
        return result;
    } else if (result.code == -2) {
        history.push(`/user/login`);
    } else if (result.code == 0) {
        return result
    } else if (result.code == 3) {
        return result;
    }
}
