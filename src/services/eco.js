import { request } from './request';

// 业绩查询
export const queryKpiList = (payload) => {
  return request('/eco/selectKpiList', {
    method: 'POST',
    ...(payload || {}),
  });
};

// 新增kpi
export const addKpi = (payload) => {
  return request('/eco/addKpi', {
    method: 'POST',
    ...(payload || {}),
  });
};

// 工资管理
export const querySalaryList = (payload) => {
  return request('/eco/selectSalaryList', {
    method: 'POST',
    ...(payload || {}),
  });
};

// 发票管理
export const queryInvoiceList = (payload) => {
  return request('/eco/selectInvoiceList', {
    method: 'POST',
    ...(payload || {}),
  });
};

// 公司收入
export const queryComIncomeList = (payload) => {
  return request('/eco/selectComIncomeList', {
    method: 'POST',
    ...(payload || {}),
  });
};

// 我的提成
export const queryCommisionList = (payload) => {
  return request('/eco/selectCommisionList', {
    method: 'POST',
    ...(payload || {}),
  });
};

// 议价服务费审核
export const queryBFList = (payload) => {
  return request('/eco/selectBFList', {
    method: 'POST',
    ...(payload || {}),
  });
};

// 财务申请list
export const queryAFList = (payload) => {
  return request('/eco/selectAFList', {
    method: 'POST',
    ...(payload || {}),
  });
};
