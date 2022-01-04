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
export const confirmOffer = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request
  //     .post("/project/confirmOffer", payload)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  return request('/project/confirmOffer', {
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
