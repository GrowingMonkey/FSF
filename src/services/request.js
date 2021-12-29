import { request as req } from 'umi';
const base_url = `/api/fsfa`
export const request = (url, payload) => {
    return req(base_url + url, {
        method: 'POST',
        headers: {
            token: window.localStorage.getItem('token'),
        },
        ...(payload || {}),
    });
}