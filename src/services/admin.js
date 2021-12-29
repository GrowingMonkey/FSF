import { request } from "./request";

export const tcaList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/admin/TCAList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/admin/TCAList', {
    method: 'POST',
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
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
    ...(payload || {}),
  });
};
