import { request } from "./request";

export const addProject = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/addProject", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/addProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addProjectTeam = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/addProjectTeam", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/addProjectTeam', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const applyForProject = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/applyForProject", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/applyForProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const closeProject = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/closeProject", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/closeProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const finishProject = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/finishProject", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/finishProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const getProjectId = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/getProjectId", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/getProjectId', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const pauseProject = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/pauseProject", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/pauseProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const runProject = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/runProject", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/runProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectPList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/selectPList", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/selectPList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectPTList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/selectPTList", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/selectPTList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTPById = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/selectTPById", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/selectTPById', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectTPList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/selectTPList", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/selectTPList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateProject = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/updateProject", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/updateProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateTP = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/updateTP", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/updateTP', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
// 我的职位
export const myJobList = (payload) => {
  return request('/project/myJobList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
// 合作职位
export const hzJobList = (payload) => {
  return request('/project/hzJobList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//查询项目详情
export const selectPById = (payload) => {
  return request('/project/selectPById', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//推荐人选给客户
export const recommendTalent = (payload) => {
  return request('/project/recommendTalent', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//预约面试
export const Interview = (payload) => {
  return request('/project/interview', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//确认0ffer
export const sendOffer = (payload) => {
  return request('/project/sendOffer', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//确认入职
export const confirmOffer = (payload) => {
  return request('/project/confirmOffer', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//客户否决
export const customerReject = (payload) => {
  return request('/project/customerReject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//人选离职
export const quitWork = (payload) => {
  return request('/project/quitWork', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const rejectTalent = (payload) => {
  return request('/project/rejectTalent', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const talentGiveUp = (payload) => {
  return request('/project/talentGiveUp', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectCustomerListForProject = (payload) => {
  return request('/project/selectCustomerListForProject', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delTeamPerson = (payload) => {
  return request('/project/delTeamPerson', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addTeamPerson = (payload) => {
  return request('/project/addTeamPerson', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

