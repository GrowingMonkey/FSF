import { request, requestOther } from "./request";

export const addEC = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addEC", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/addEC', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const upFileLimit = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addEC", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/upFileLimit', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addEdu = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addEdu", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/addEdu', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addEP = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addEP", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/addEP', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addTA = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addTA", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/addTA', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addTalent = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/addTalent', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addTalentC = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addTalentC", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/addTalentC', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addTF = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addTF", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/addTF', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const checkTalentPhone = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/checkTalentPhone", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/checkTalentPhone', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delEC = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/delEC", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/delEC', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delEDU = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/delEDU", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/delEDU', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delEP = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/delEP", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/delEP', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const getTalentId = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/getTalentId", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/getTalentId', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectMyRecommend = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/selectMyRecommend", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/selectMyRecommend', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectProjectList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/selectProjectList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/selectProjectList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTalentById = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/selectTalentById", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/selectTalentById', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTalentList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/selectTalentList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/selectTalentList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTAList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/selectTAList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/selectTAList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTCList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/selectTCList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/selectTCList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTFList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/selectTFList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/selectTFList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const talentJoinProject = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/talentJoinProject", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/talentJoinProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateTalent = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/updateTalent', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTPById = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/selectTPById', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const myOfferList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/myOfferList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const myRZList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/myRZList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

//新增人选之号码邮箱查重复
export const talentCheck = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/talentCheck', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateEdu = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/updateEdu', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateEC = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/updateEC', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateEP = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/updateEP', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const myTalentList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/myTalentList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const parseBase = (header, payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/updateTalent", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return requestOther('http://xiaoxi.market.alicloudapi.com/v1/parser/parse_base?avatar=1&handle_image=1&rawtext=1&parse_mode=fast', header, {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

