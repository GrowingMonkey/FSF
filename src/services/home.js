import { request } from "./request";

export const changeMsgState = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request("home/changeMsgState", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/changeMsgState', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const changeTripState = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/changeTripState", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/changeTripState', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const cRank = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/cRank", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/cRank', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delMsg = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/delMsg", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/delMsg', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const hkRank = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/hkRank", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/hkRank', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const kpiRank = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/kpiRank", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/kpiRank', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectMsgList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/selectMsgLis", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/selectMsgList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTripList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/selectTripList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/selectTripList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectWorkFlow = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/selectWorkFlow", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/selectWorkFlow', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const signRank = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("home/signRank", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/home/signRank', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
