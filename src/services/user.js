import { request } from "./request";

export async function getPhoneCode(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/getPhoneCode", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/login/getPhoneCode', {
    method: 'POST',
    ...(payload || {}),
  });
};

export const getToken = (body, options) => {
  return request('/login/getToken', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function getVerifyCode(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/getVerifyCode", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/login/getVerifyCode', {
    method: 'POST',
    ...(payload || {}),
  });
};

export async function getVerifyCodeImg(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/getVerifyCodeImg", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/login/getVerifyCodeImg', {
    method: 'POST',
    ...(payload || {}),
  });
};

export async function login(payload) {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/login/login", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((code) => {
  //       reject(code);
  //     });
  // });
  return request('/login/login', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export async function loginOut(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/login/loginOut', {
    method: 'POST',
    ...(payload || {}),
  });
};
