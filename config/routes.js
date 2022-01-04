export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'home',
    component: './Home',
  },
  // 客户管理
  {
    icon: 'idcard',
    path: "/customer",
    name: "客户管理",
    routes: [
      {

        path: "/customer/list",
        name: "客户列表",
        component: "./Customer/CList/index",
      },
      {
        hideInMenu: true,
        path: "/customer/detail",
        name: "客户详情",
        component: "./Customer/Detail",
      },
      {
        path: "/customer/add",
        name: "新增客户",
        component: "./Customer/Add",
      },
    ],
  },
  {

    path: "/project",
    name: "职位管理",
    icon: 'project',
    routes: [
      {
        path: "/project/p-list",
        name: "职位列表",
        component: "./Project/PList/index",
      },
      {
        path: "/project/pm-list",
        name: "我的职位",
        component: "./Project/PMList/index",
      },
      {
        path: "/project/p-creation",
        name: "创建职位",
        component: "./Project/PCreation/index",
      },
    ],
  },
  //人才管理
  {
    icon: 'team',
    path: "/talent",
    name: "人才管理",
    routes: [
      {

        path: "/talent/t-list",
        name: "人才库",

        component: "./Talent/TList/index",
      },
      {
        path: "/talent/tp-list",
        name: "我的推荐",
        component: "./Talent/TPList/index",
      },
      {
        path: "/talent/t-creatiion",
        name: "新增人选",
        component: "./Talent/TCreation/index",
      },
    ],
  },
  {
    path: "/employ",
    name: "信息管理",
    icon: 'bell',
    routes: [
      {

        path: "/employ/trip-list",
        name: "我的日程",

        component: "./Employ/TripList",
      },
      {

        path: "/employ/trip-add",
        name: "添加日程",
        hideInMenu: 'true',
        component: "./Employ/TripList/addTrip",
      },
      {

        path: "/employ/publish-list",
        name: "系统公告",
        component: "./Employ/PublishList",
      },
      {

        path: "/employ/publish-add",
        name: "添加通知",
        hideInMenu: 'true',
        component: "./Employ/PublishList/addPublish",
      },
      {

        path: "/employ/message-list",
        name: "我的通知",

        component: "./Employ/MessageList",
      },
      {

        path: "/employ/message-add",
        name: "添加通知",
        hideInMenu: 'true',
        component: "./Employ/MessageList/addMessage",
      },
      {

        path: "/employ/colleague-list",
        name: "我的同事",

        component: "./Employ/ColleagueList",
      },
      {
        path: "/employ/password-manager",
        name: "修改密码",
        component: "./Employ/PasswordManager",
      },
    ],
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  //后台管理
  {
    icon: 'setting',
    path: "/admin",
    name: "后台管理",
    routes: [
      {
        path: "/admin/user-list",
        name: "员工列表",
        component: "./Admin/UserList/index",
      },
      {
        path: "/admin/tca-list",
        name: "架构列表",
        component: "./Admin/TCAList/index",
      },
      {
        path: "/admin/role-list",
        name: "角色列表",
        component: "./Admin/RoleList/index",
      },
      {
        path: "/admin/permission-list",
        name: "权限列表",
        component: "./Admin/PermissionList/index",
      },
    ],
  },

  //行政管理
  {
    icon: 'solution',
    path: "/office",
    name: "行政管理",
    routes: [
      {
        path: "/office/attendance-list",
        name: "考勤管理",
        component: "./Office/AttendanceList/index",
      },
      {
        path: "/office/added-attendance-list",
        name: "申请补卡",
        component: "./Office/AttendanceList/AddedAttendanceList",
      },
      {
        path: "/office/leave-list",
        name: "请假管理",
        component: "./Office/LeaveList/index",
      },
      {
        path: "/office/onfield-list",
        name: "外出管理",
        component: "./Office/OnFieldList/index",
      },
    ],
  },
  //财务管理
  {
    path: "/eco",
    name: "财务管理",
    icon: 'wallet',
    routes: [
      {
        path: "/eco/kpi-list",
        name: "我的业绩",
        component: "./ECO/KpiList/index",
      },
      {
        path: "/eco/salary-list",
        name: "工资管理",
        component: "./ECO/SalaryList/index",
      },
      {
        path: "/eco/invioce-list",
        name: "发票管理",
        component: "./ECO/InvoiceList/index",
      },
      {
        path: "/eco/company-earning-list",
        name: "公司收入",
        component: "./ECO/CompanyEarningList/index",
      },
      {
        path: "/eco/commission-list",
        name: "我的提成",
        component: "./ECO/CommissionList/index",
      },
      {
        path: "/eco/bf-list",
        name: "议价服务费审核",
        component: "./ECO/BFList/index",
      },
      {
        path: "/eco/ar-list",
        name: "应收管理",
        exact: true,
        component: "./ECO/ARList/index",
      },
      {
        path: "/eco/af-list",
        name: "财务申请",
        component: "./ECO/AFList/index",
      },
    ],
  },
  //绩效管理
  {
    icon: 'moneyCollect',
    path: "/kpi",
    name: "绩效管理",


    routes: [
      {

        path: "/kpi/sign-rank",
        name: "签约排行",

        component: "./KPI/SignRank/index",
      },
      {
        path: "/kpi/pay-rank",
        name: "回款排行",
        component: "./KPI/PayRank/index",
      },
      {

        path: "/kpi/commission-rank",
        name: "提成排行",
        component: "./KPI/CommissionRank/index",
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
