import { request } from "./request";

export const tcaList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/TCAList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/TCAList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delTeam = (payload) => {
  return request('/admin/delTeam', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
}
export const resetPwd = (payload) => {
  return request('/employ/resetPwd', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
}
export const teamList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/TCAList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/teamList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const selectCom = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/TCAList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/selectCom', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addTCA = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/addTCA", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/addTCA', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const updateTCA = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/updateTCA", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/updateTCA', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const roleList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/roleList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/roleList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addRole = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/addRole", payload).then((res) => {
  //     resolve(res.data.data);
  //   });
  // });
  return request('/admin/addRole', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const updateRole = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/updateRole", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/updateRole', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const permissionList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/permissionList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/permissionList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addPermission = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/addPermission", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/addPermission', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const updatePermission = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/updatePermission", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/updatePermission', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const userList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/userList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/userList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addUser = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/addUser", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/addUser', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const updateUser = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/updateUser", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/updateUser', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export async function getOssSign(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/getALLSTSToken', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export async function selectArea(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/selectArea', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export async function addArea(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/addArea', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export async function addCom(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/addCom', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export async function addTeam(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/addTeam', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export async function updateCom(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/updateCom', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export async function updateTeam(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/updateTeam', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export async function updateArea(payload) {
  // return new Promise((resolve, reject) => {
  //   request.post("/login/loginOut", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/updateArea', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

