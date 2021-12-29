import { request } from "./request";

export const addEC = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/talent/addEC", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/talent/addEC', {
    method: 'POST',
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
  });
};
