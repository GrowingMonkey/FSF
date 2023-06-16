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
export const addContract = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/abandonCustomer", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/addContract', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const checkCustomer = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/acceptWorkOrder", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/checkCustomer', {
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
export const selectCustomerForSF = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/cstList", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/eco/selectCustomerForSF', {
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
  return request('/customer/ulfq', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const ulfqAll = (payload) => {
  // return new Promise((resolve, reject) => {
  //   request.post("/customer/ulfq", payload).then((data) => {
  //     resolve(data);
  //   });
  // });
  return request('/customer/ulfqAll', {
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
  return request('/customer/updateContact', {
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
  return request('/customer/updateCustomer', {
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
  return request('/customer/woInfo', {
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
  return request('/customer/wolfq', {
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
  return request('/customer/zdzr', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//公共客户
export const ggCustomerList = (payload) => {

  return request('/customer/ggCustomerList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//我的客户
export const myCustomerList = (payload) => {

  return request('/customer/myCustomerList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const shiftCustomer = (payload) => {

  return request('/customer/shiftCustomer', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

//合作客户
export const hzCustomerList = (payload) => {
  return request('/customer/hzCustomerList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

//客户详情
export const selectCstById = (payload) => {
  return request('/customer/selectCstById', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
//新增沟通记录
export const addcc = (payload) => {
  return request('/customer/addcc', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};

export const TCAList = (payload) => {
  return request('/customer/TCAList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const getCustomerNumber = (payload) => {
  return request('/customer/getCustomerNumber', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const selectPList = (payload) => {
  return request('/customer/selectPList', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const delTeamPerson = (payload) => {
  return request('/customer/delTeamPerson', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};
export const addTeamPerson = (payload) => {
  return request('/customer/addTeamPerson', {
    method: 'POST',
    data: { ...(payload || {}) },
  });
};




