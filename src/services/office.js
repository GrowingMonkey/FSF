import { request } from './request';

// 打卡记录
export const queryDKList = (payload) => {
  return request('/office/selectDKList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addCI = (payload) => {
  return request('/office/addCI', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateCI = (payload) => {
  return request('/office/updateCI', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const CIList = (payload) => {
  return request('/office/CIList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
// 请假记录
export const queryLeaveList = (payload) => {
  return request('/office/selectLeaveList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

// 外出管理
export const queryBtripList = (payload) => {
  return request('/office/selectBtripList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//申请补卡
export const applyBK = (payload) => {
  return request('/office/addbk', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//打卡
export const applyKQ = (payload) => {
  return request('/office/addkq', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//申请出差
export const addBtrip = (payload) => {
  return request('/office/addBtrip', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectBtripById = (payload) => {
  return request('/office/selectBtripById', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//申请请假
export const addLeave = (payload) => {
  return request('/office/addLeave', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

//请假未通过
export const denyLeave = (payload) => {
  return request('/office/denyLeave', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//请假通过
export const passLeave = (payload) => {
  return request('/office/passLeave', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const denyBtrip = (payload) => {
  return request('/office/denyBtrip', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//请假通过
export const passBtrip = (payload) => {
  return request('/office/passBtrip', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

