import { request } from "./request";

export const abandonCustomer = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/abandonCustomer", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/abandonCustomer', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const acceptWorkOrder = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/acceptWorkOrder", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/acceptWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addContact = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/addContact", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/addContact', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addCustomer = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/addCustomer", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/addCustomer', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addCustomerCompany = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/addCustomerCompany", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/addCustomerCompany', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addCustomerTeam = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/addCustomerTeam", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/addCustomerTeam', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addTags = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/addTags", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/addTags', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const addWorkOrder = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/addWorkOrder", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/addWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const cclfq = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/cclfq", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/cclfq', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const contractsQuery = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/contractsQuery", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/contractsQuery', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const cstList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/cstList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/cstList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const deleteContact = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/deleteContact", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/deleteContact', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const getCustomerId = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/getCustomerId", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/getCustomerId', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const refuseWorkOrder = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/refuseWorkOrder", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/refuseWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const reminderPayment = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/reminderPayment", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/reminderPayment', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const rzCustomer = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/rzCustomer", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/rzCustomer', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const selectContactList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/selectContactList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/selectContactList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const selectCTeamList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/selectCTeamList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/selectCTeamList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const selectCustomerCompany = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/selectCustomerCompany", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/selectCustomerCompany', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const selectWorkOrderList = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/selectWorkOrderList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/selectWorkOrderList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const signCustomer = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/signCustomer", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/signCustomer', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const twffq = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/twffq", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/twffq', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const ulfq = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/ulfq", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/acceptWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const updateContact = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/updateContact", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/acceptWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const updateCustomer = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/updateCustomer", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/acceptWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const woInfo = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/woInfo", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/acceptWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const wolfq = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/wolfq", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/acceptWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const zdzr = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/zdzr", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/acceptWorkOrder', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
