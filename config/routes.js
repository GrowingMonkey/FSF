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
    access: 'canHome',
    component: './Home',
  },
  // 客户管理
  {
    icon: 'idcard',
    path: '/customer',
    name: '客户管理',
    access: 'canCustorm',
    routes: [
      {
        path: '/customer/list',
        name: '客户列表',
        access: 'canCustormList',
        component: './Customer/CList/index',
      },
      {
        path: '/customer/my-list',
        name: '我的客户',
        access: 'canMyCustomList',
        component: './Customer/CList/MyCustomer',
        target: true,
      },
      {
        path: '/customer/team-list',
        name: '合作客户',
        access: 'canCustomTeamList',
        component: './Customer/CList/TeamCustomer',
      },
      {
        path: '/customer/public-list',
        name: '公共客户',
        access: 'canCustomPublic',
        component: './Customer/CList/PublicCustomer',
      },
      {
        hideInMenu: true,
        path: '/customer/detail',
        name: '客户详情',
        // access:'canCustomDetail',
        component: './Customer/Detail',
      },
      {
        path: '/customer/add',
        name: '新增客户',
        access: 'canCustomAdd',
        component: './Customer/Add',
      },
    ],
  },
  {
    path: '/project',
    name: '职位管理',
    icon: 'project',
    access: 'canProject',
    routes: [
      {
        path: '/project/p-list',
        name: '职位列表',
        access: 'canProjectList',
        component: './Project/PList/index',
      },
      {
        path: '/project/p-detail',
        name: '职位详情',
        hideInMenu: true,
        component: './Project/PDetail/index',
        routes: [
          {
            path: '/project/p-detail',
            redirect: '/project/p-detail/detail',
          },
          //职务详情
          {
            name: 'detail',
            path: '/project/p-detail/detail',
            component: './Project/PDetail/tab/Detail',
          },
          //推荐管理
          {
            name: 'chapter-manager',
            path: '/project/p-detail/chapter-manager',
            component: './Project/PDetail/tab/ChapterManager',
          },
        ],
      },
      //职位人选详情
      {
        name: 'talent',
        path: '/project/talent',
        hideInMenu: true,
        component: './Project/PDetail/tab/StepDetail',
      },
      {
        path: '/project/pm-list',
        name: '我的职位',
        access: 'canMyProject',
        component: './Project/PList/MyProject',
      },
      {
        path: '/project/team-list',
        name: '合作职位',
        access: 'canTeamProject',
        component: './Project/PList/TeamProject',
      },
      {
        path: '/project/p-creation',
        name: '创建职位',
        access: 'canProjectAdd',
        component: './Project/PCreation/index',
      },
    ],
  },
  //人才管理
  {
    icon: 'team',
    path: '/talent',
    name: '人才管理',
    access: 'cantalent',
    routes: [
      {
        path: '/talent/t-list',
        name: '人才库',
        access: 'canTalentList',
        target: true,
        component: './Talent/TList/index',
      },
      {
        hideInMenu: true,
        path: '/talent/detail',
        name: '人才详情',
        component: './Talent/TList/components/TalentDetail',
      },
      {
        path: '/talent/my-list',
        name: '我的简历',
        access: 'canMyTalent',
        component: './Talent/TList/resume',
      },
      {
        path: '/talent/tp-list',
        name: '我的推荐',
        access: 'canTalentTp',
        component: './Talent/TPList/index',
      },
      {
        path: '/talent/my-offer',
        name: '我的offer',
        access: 'canTalentOffer',
        component: './Talent/TPList/offer',
      },
      {
        path: '/talent/my-talented',
        name: '入职人选',
        access: 'canTalented',
        component: './Talent/TPList/talented',
      },
      {
        path: '/talent/t-creatiion',
        name: '新增人选',
        access: 'canTalentAdd',
        component: './Talent/TCreation/index',
      },
    ],
  },
  {
    path: '/employ',
    name: '信息管理',
    access: 'canEmploy',
    icon: 'bell',
    routes: [
      {
        path: '/employ/trip-list',
        name: '我的日程',
        access: 'canEmployTrip',
        component: './Employ/TripList',
      },
      {
        path: '/employ/trip-add',
        name: '添加日程',
        hideInMenu: 'true',
        component: './Employ/TripList/addTrip',
      },
      {
        path: '/employ/publish-list',
        name: '系统公告',
        access: 'canEmployPublish',
        component: './Employ/PublishList',
      },
      {
        path: '/employ/publish-add',
        name: '添加通知',
        hideInMenu: 'true',
        component: './Employ/PublishList/addPublish',
      },
      {
        path: '/employ/message-list',
        name: '我的通知',
        access: 'canEmployMsg',
        component: './Employ/MessageList',
      },
      {
        path: '/employ/message-add',
        name: '添加通知',
        hideInMenu: 'true',
        component: './Employ/MessageList/addMessage',
      },
      {
        path: '/employ/colleague-list',
        name: '我的同事',
        access: 'canEmployColleague',
        component: './Employ/ColleagueList',
      },
      {
        path: '/employ/colleague-detail',
        name: '简介详情',
        hideInMenu: true,
        component: './Employ/ColleagueList/Detail',
      },
      {
        path: '/employ/password-manager',
        name: '修改密码',
        access: 'canEmployPsd',
        component: './Employ/PasswordManager',
      },
    ],
  },

  //行政管理
  {
    icon: 'solution',
    path: '/office',
    name: '行政管理',
    access: 'canOffice',
    routes: [
      {
        path: '/office/attendance-list',
        name: '考勤管理',
        access: 'canOfficeList',
        component: './Office/AttendanceList/index',
      },
      {
        path: '/office/added-attendance-list',
        name: '申请补卡',
        access: 'canOfficeApply',
        component: './Office/AttendanceList/AddedAttendanceList',
      },
      {
        path: '/office/leave-list',
        name: '请假管理',
        access: 'canOfficeLeave',
        component: './Office/LeaveList/index',
      },
      {
        path: '/office/onfield-list',
        name: '外出管理',
        access: 'canOfficeOnfield',
        component: './Office/OnFieldList/index',
      },
    ],
  },
  // //财务管理
  {
    path: '/eco',
    name: '财务管理',
    icon: 'wallet',
    access: 'canEco',
    routes: [
      {
        path: "/eco/kpi-list",
        name: "我的业绩",
        component: "./ECO/KpiList/index",
      },
      {
        path: "/eco/kpi-add",
        name: "新增业绩",
        hideInMenu: true,
        component: "./ECO/KpiList/Add/index",
      },
      {
        path: "/eco/salary-list",
        name: "工资管理",
        component: "./ECO/SalaryList/index",
      },
      {
        path: "/eco/salary-add",
        name: "新增工资",
        component: "./ECO/SalaryList/Add",
      },
      {
        path: '/eco/invioce-list',
        name: '发票管理',
        access: 'canEcoInvioce',
        component: './ECO/InvoiceList/index',
      },
      {
        path: '/eco/invioce-detail',
        name: '发票详情',
        access: 'canEcoInvioceDetail',
        hideInMenu: true,
        component: './ECO/InvoiceList/DetailInvoice',
      },
      {
        path: '/eco/invioce-add',
        name: '申请发票',
        access: 'canEcoInvioceAdd',
        hideInMenu: true,
        component: './ECO/InvoiceList/AddInvoice',
      },
      // {
      //   path: "/eco/company-earning-list",
      //   name: "公司收入",
      //   component: "./ECO/CompanyEarningList/index",
      // },
      // {
      //   path: "/eco/commission-list",
      //   name: "我的提成",
      //   component: "./ECO/CommissionList/index",
      // },
      {
        path: '/eco/bf-list',
        name: '回款列表',
        access: 'canEcoBF',
        component: './ECO/BFList/index',
      },
      {
        path: '/eco/bf-add',
        name: '新增回款',
        access: 'canEcoBFAdd',
        hideInMenu: true,
        component: './ECO/BFList/AddBF',
      },
      {
        path: '/eco/bf-detail',
        name: '回款详情',
        access: 'canEcoBFDetail',
        hideInMenu: true,
        component: './ECO/BFList/DetailBF',
      },
      // {
      //   path: "/eco/ar-list",
      //   name: "应收管理",
      //   exact: true,
      //   component: "./ECO/ARList/index",
      // },
      // {
      //   path: "/eco/af-list",
      //   name: "财务申请",
      //   component: "./ECO/AFList/index",
      // },
    ],
  },
  //绩效管理
  {
    icon: 'moneyCollect',
    path: '/kpi',
    name: '绩效管理',
    access: 'canKpi',
    routes: [
      {
        path: '/kpi/sign-rank',
        name: '签约排行',
        access: 'canKpiSign',
        component: './KPI/SignRank/index',
      },
      {
        path: '/kpi/pay-rank',
        name: '回款排行',
        access: 'canKpiPay',
        component: './KPI/PayRank/index',
      },
      {
        path: '/kpi/commission-rank',
        name: '提成排行',
        access: 'canKpiCommission',
        component: './KPI/CommissionRank/index',
      },
    ],
  },
  //后台管理
  {
    icon: 'setting',
    path: '/admin',
    name: '后台管理',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/user-list',
        name: '员工列表',
        access: 'canAdminUser',
        component: './Admin/UserList/index',
      },
      {
        path: '/admin/tca-list',
        name: '架构列表',
        access: 'canAdminTca',
        component: './Admin/TCAList/index',
      },
      {
        path: '/admin/role-list',
        name: '角色列表',
        access: 'canAdminRole',
        component: './Admin/RoleList/index',
      },
      {
        path: '/admin/permission-list',
        name: '权限列表',
        access: 'canAdminPermission',
        component: './Admin/PermissionList/index',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
