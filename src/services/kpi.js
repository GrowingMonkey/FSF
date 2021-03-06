import { request } from "./request";

export const getSignKpi = (payload) => {
    // return new Promise((resolve, reject) => {
    //   request("home/changeMsgState", payload).then((data) => {
    //     resolve(data);
    //   });
    // });
    return request('/kpi/signRank', {
        method: 'POST',
        data: { ...(payload || {}) },
    });
};
export const userKpiData = (payload) => {
    // return new Promise((resolve, reject) => {
    //   request("home/changeMsgState", payload).then((data) => {
    //     resolve(data);
    //   });
    // });
    return request('/kpi/userKpiData', {
        method: 'POST',
        data: { ...(payload || {}) },
    });
};
export const teamList = (payload) => {
    // return new Promise((resolve, reject) => {
    //   request("home/changeMsgState", payload).then((data) => {
    //     resolve(data);
    //   });
    // });
    return request('/kpi/teamList', {
        method: 'POST',
        data: { ...(payload || {}) },
    });
};
export const kpiRank = (payload) => {
    // return new Promise((resolve, reject) => {
    //   request("home/changeMsgState", payload).then((data) => {
    //     resolve(data);
    //   });
    // });
    return request('/kpi/kpiRank', {
        method: 'POST',
        data: { ...(payload || {}) },
    });
};
export const getCRank = (payload) => {
    // return new Promise((resolve, reject) => {
    //   request("home/changeMsgState", payload).then((data) => {
    //     resolve(data);
    //   });
    // });
    return request('/kpi/cRank', {
        method: 'POST',
        data: { ...(payload || {}) },
    });
};
export const getHKRank = (payload) => {
    // return new Promise((resolve, reject) => {
    //   request("home/changeMsgState", payload).then((data) => {
    //     resolve(data);
    //   });
    // });
    return request('/kpi/hkRank', {
        method: 'POST',
        data: { ...(payload || {}) },
    });
};
export const recommendRank = (payload) => {
    // return new Promise((resolve, reject) => {
    //   request("home/changeMsgState", payload).then((data) => {
    //     resolve(data);
    //   });
    // });
    return request('/kpi/recommendRank', {
        method: 'POST',
        data: { ...(payload || {}) },
    });
};
export const feeRank = (payload) => {
    // return new Promise((resolve, reject) => {
    //   request("home/changeMsgState", payload).then((data) => {
    //     resolve(data);
    //   });
    // });
    return request('/kpi/feeRank', {
        method: 'POST',
        data: { ...(payload || {}) },
    });
};


