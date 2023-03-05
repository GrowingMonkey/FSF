/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
const RouterConfig = require('../config/routes').default;
export default function access(initialState) {
  const { currentUser } = initialState || {};
  function flatRoutes(routesConfig, selectPath) {
    function flat(routesConfig, pushCallback) {
      return routesConfig.reduce((prev, current) => {
        const { routes, ...restConfig } = current;
        const pushContent = pushCallback ? pushCallback(restConfig) : restConfig;
        if (pushContent) {
          prev.push(pushContent);
        }
        if (routes) {
          prev = [...prev, ...flat(routes, pushCallback)];
        }
        return prev;
      }, []);
    }

    function selectPathFunc(config) {
      if (selectPath === undefined) {
        return config;
      }
      if (Array.isArray(selectPath)) {
        const obj = selectPath.reduce((prev, path) => {
          if (config[path]) {
            prev[path] = config[path];
          }

          return prev;
        }, {});

        if (Object.keys(obj).length > 0) {
          return obj;
        } else {
          return undefined;
        }
      } else {
        return config[selectPath];
      }
    }

    return new Set(flat(routesConfig, selectPathFunc));
  }
  let serviceRoute;
  if (currentUser && currentUser.permissionSet && currentUser.permissionSet.length > 0) {
    let menuList = [];
    currentUser.permissionSet.forEach((item) => {
      if (item.url.startsWith('route')) {
        menuList.push(item);
      }
    });
    console.log(menuList);
    serviceRoute = flatRoutes(menuList, ['url']);
  }
  const RouteUrl = serviceRoute?.map((item) => item.url) || new Set([]);
  console.log(RouteUrl);
  return {
    canHome: RouteUrl.has('route/home'),

    canAdmin: RouteUrl.has('route/admin'),
    canAdminUser: RouteUrl.has('route/admin/user-list'),
    canAdminTca: RouteUrl.has('route/admin/tca-list'),
    canAdminRole: RouteUrl.has('route/admin/role-list'),
    canAdminPermission: RouteUrl.has('route/admin/permission-list'),

    canCustorm: RouteUrl.has('route/customer'),
    canCustormList: RouteUrl.has('route/customer/list'),
    canMyCustomList: RouteUrl.has('route/customer/my-list'),
    canCustomTeamList: RouteUrl.has('route/customer/team-list'),
    canCustomPublic: RouteUrl.has('route/customer/public-list'),
    canCustomDetail: RouteUrl.has('route/customer/detail'),
    canCustomAdd: RouteUrl.has('route/customer/add'),

    canProjectList: RouteUrl.has('route/project/p-list'),
    canProject: RouteUrl.has('route/project'),
    canMyProject: RouteUrl.has('route/project/pm-list'),
    canTeamProject: RouteUrl.has('route/project/team-list'),
    canProjectAdd: RouteUrl.has('route/project/p-creation'),

    cantalent: RouteUrl.has('route/talent'),
    canTalentList: RouteUrl.has('route/talent/t-list'),
    canMyTalent: RouteUrl.has('route/talent/my-list'),
    canTalentTp: RouteUrl.has('route/talent/tp-list'),
    canTalentOffer: RouteUrl.has('route/talent/my-offer'),
    canTalented: RouteUrl.has('route/talent/my-talented'),
    canTalentAdd: RouteUrl.has('route/talent/t-creatiion'),

    canEmploy: RouteUrl.has('route/employ'),
    canEmployPublish: RouteUrl.has('route/employ/publish-list'),
    canEmployMsg: RouteUrl.has('route/employ/message-list'),
    canEmployColleague: RouteUrl.has('route/employ/colleague-list'),
    canEmployPsd: RouteUrl.has('route/employ/password-manager'),
    canEmployTrip: RouteUrl.has('route/employ/trip-list'),

    canOffice: RouteUrl.has('route/office'),
    canOfficeList: RouteUrl.has('route/office/attendance-list'),
    canOfficeApply: RouteUrl.has('route/office/added-attendance-list'),
    canOfficeLeave: RouteUrl.has('route/office/leave-list'),
    canOfficeOnfield: RouteUrl.has('route/office/onfield-list'),

    canKpi: RouteUrl.has('route/kpi'),
    canKpiSign: RouteUrl.has('route/kpi/sign-rank'),
    canKpiPay: RouteUrl.has('route/kpi/pay-rank'),
    canKpiCommission: RouteUrl.has('route/kpi/commission-rank'),

    canEco: RouteUrl.has('route/eco'),
    canEcoInvioce: RouteUrl.has('route/eco/invioce-list'),
    canEcoInvioceDetail: RouteUrl.has('route/eco/invioce-detail'),
    canEcoInvioceAdd: RouteUrl.has('route/eco/invioce-add'),
    canEcoBF: RouteUrl.has('route/eco/bf-list'),
    canEcoBFAdd: RouteUrl.has('route/eco/bf-add'),
    canEcoBFDetail: RouteUrl.has('route/eco/bf-detail'),
    canEcoSalaryList: RouteUrl.has('route/eco/salary-list'),
    canEcoSalaryAdd: RouteUrl.has('route/eco/salary-add'),
    canEcoKpiList: RouteUrl.has('route/eco/kpi-list'),
    canEcoKpiAdd: RouteUrl.has('route/eco/kpi-add'),
  };
}
