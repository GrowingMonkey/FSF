import { request } from "./request";

export const addMsg = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/addMsg", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/addMsg', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addTrip = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/addTrip", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/addTrip', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const allotQuota = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/allotQuota", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/allotQuota', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const changeMsgState = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/changeMsgState", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/changeMsgState', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const changeTripState = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/changeTripState", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/changeTripState', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectEmployList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/changeTripState", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/selectEmployList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delMsg = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/delMsg", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/delMsg', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delTrip = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/delTrip", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/delTrip', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const myInfo = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/myInfo", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/myInfo', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const currentUser = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/myInfo", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/myInfo', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectMsgList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/selectMsgList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/selectMsgList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTripList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/selectTripList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/selectTripList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectUser = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/selectUser", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/selectUser', {
    method: 'POST',

    data: { ...(payload || {}) },
  });
};
export const ulfq = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/ulfq", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/ulfq', {
    method: 'POST',
    ...(payload || {}),
  });
};
export const updatePwd = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/updatePwd", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/updatePwd', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const sysNotice = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/updatePwd", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/sysNotice', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addNotice = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/updatePwd", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/addNotice', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};


export const notice = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/updatePwd", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/notice', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const publishSys = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/updatePwd", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/publishSys', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateNotice = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/employ/updatePwd", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/employ/updateNotice', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
