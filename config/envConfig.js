/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
    dev: {
        // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
        // API_ADDRESS: 'http://www.aiyu2019.com',
        // OSS_ADDRESS: 'https://aiyuout.oss-cn-shenzhen.aliyuncs.com',
        // OSS_IN_ADDRESS: 'https://aiyuin.oss-cn-shenzhen.aliyuncs.com',
        OSS_BURKET: 'faithful',
        OSS_END_POINT: 'oss-cn-shanghai.aliyuncs.com',
        STACK_NUM: ''
    },
    test: {
        // API_ADDRESS: 'http://www.aiyu2019.com',
        // OSS_ADDRESS: 'https://aiyuout.oss-cn-shenzhen.aliyuncs.com',
        // OSS_IN_ADDRESS: 'https://aiyuin.oss-cn-shenzhen.aliyuncs.com',
        OSS_BURKET: 'faithful',
        OSS_END_POINT: 'oss-cn-shanghai.aliyuncs.com',
        STACK_NUM: ''
    },
    pre: {
        // API_ADDRESS: 'http://www.aiyu2019.com',
        // OSS_ADDRESS: 'https://aiyuout.oss-cn-shenzhen.aliyuncs.com',
        // OSS_IN_ADDRESS: 'https://aiyuin.oss-cn-shenzhen.aliyuncs.com',
        OSS_BURKET: 'faithful',
        OSS_END_POINT: 'oss-cn-shanghai.aliyuncs.com',
        STACK_NUM: ''
    },
};
