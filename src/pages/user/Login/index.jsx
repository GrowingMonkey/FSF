import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs, Row, Col, Input, Form } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import homeBg1 from "../../../assets/images/signin1.png";
import Footer from '@/components/Footer';
// import { login } from '@/services/ant-design-pro/api';
import md5 from "md5";
import { getVerifyCode, getToken, login } from "@/services/user";
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const ProFormHeader = () => {
  return <>
    <div>
      <div style={{
        marginBottom: 8,
        color: '#0065FB',
        fontSize: 28,
        lineHeight: '40px'
      }}>Feisifu</div>
      <div style={{ fontSize: 30, lineHeight: '42px', marginBottom: 47 }}>费思福员工登陆</div>
    </div>
  </>
}
const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const [verifyCode, setVerifyCode] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [type, setType] = useState('account');
  const canvasRef = useRef();
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  useEffect(() => {
    if (canvasRef) {
      setCanvas(canvasRef.current);
      setContext(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef]);
  useEffect(() => {
    if (canvas && context) {
      canvas.width = canvasRef.current.clientWidth;
      canvas.height = canvasRef.current.clientHeight;
      context.font = "28px Comic Sans MS";
      context.fillStyle = "red";
      context.textAlign = "center";
      if (window.localStorage.getItem("token") && window.localStorage.getItem("token") !== 'undefined') {
        getVerifyCode().then((data) => {
          setVerifyCode(data.data.verifyCode);
          context.fillText(
            data.data.verifyCode,
            canvas.width / 2,
            canvas.height / 2 + 12
          );
        });
      } else {
        getToken().then((data) => {
          window.localStorage.setItem("token", data.data.token);
          getVerifyCode().then((data) => {
            setVerifyCode(data.data.verifyCode);
            context.fillText(
              data.data.verifyCode,
              canvas.width / 2,
              canvas.height / 2 + 12
            );
          });
        });
      }
    }
  }, [canvas, context]);
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log('userInfo', userInfo);
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const refreshVerifyCode = () => {
    getVerifyCode().then((data) => {
      setVerifyCode(data.verifyCode);
      context.clearRect(0, 0, canvas.width, canvas.height);
      console.log(1111)
      context.fillText(
        data.data.verifyCode,
        canvas.width / 2,
        canvas.height / 2 + 12
      );
    });
  };
  const handleSubmit = async (values) => {
    try {
      // 登录
      const msg = await login({ ...values, pwd: md5(values.password), account: values.username, type });
      console.log(msg);
      if (msg.code === 0) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        console.log(history);
        // if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }

      console.log(msg); // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div style={{ position: 'absolute', width: '100%', height: '100vh', zIndex: 1 }}>
        <Row gutter={24}>
          <Col style={{ background: '#F6F8FB', width: '70vw', height: '100vh' }}>
            <Row style={{ position: 'absolute' }}>
              <Col><div style={{ marginLeft: '3.5vw', width: '9vw', height: '22vh', background: 'linear-gradient(180deg, #DDE4F0 0%, #F6F8FB 100%)' }}></div></Col>
              <Col><div className={styles.point}></div></Col>
            </Row>
            <div className={styles.center}></div>
            <div style={{ fontSize: '0.9375vw', color: '#95A8C8', position: 'absolute', left: '5.46875vw', bottom: '5.4vh' }}>即连城科技 版权所有 粤ICP备1382</div>
            <div className={styles.content} style={{ zIndex: 999 }} >
              <div>
                <LoginForm
                  className={styles.loginForm}
                  // logo={<img alt="logo" src="/logo.svg" />}
                  // title="费思福"
                  // subTitle={intl.formatMessage({
                  //   id: 'pages.layouts.userLayout.title',
                  // })}
                  initialValues={{
                    autoLogin: true,
                  }}
                  onFinish={async (values) => {
                    await handleSubmit(values);
                  }}
                >
                  {status === 'error' && loginType === 'account' && (
                    <LoginMessage
                      content={intl.formatMessage({
                        id: 'pages.login.accountLogin.errorMessage',
                        defaultMessage: '账户或密码错误(admin/ant.design)',
                      })}
                    />
                  )}
                  {type === 'account' && (
                    <>

                      <ProFormHeader></ProFormHeader>
                      <ProFormText
                        name="username"
                        fieldProps={{
                          size: 'large',
                          prefix: <UserOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.username.placeholder',
                          defaultMessage: '用户名: admin or user',
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.username.required"
                                defaultMessage="请输入用户名!"
                              />
                            ),
                          },
                        ]}
                      />
                      <ProFormText.Password
                        name="password"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.password.placeholder',
                          defaultMessage: '密码: ant.design',
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.password.required"
                                defaultMessage="请输入密码！"
                              />
                            ),
                          },
                        ]}
                      />
                      <Form.Item
                        wrapperCol={{
                          span: 24,
                        }}
                        name="verifyCode"
                        rules={[
                          {
                            required: true,
                            message: "请输入验证码",
                          },
                        ]}
                      >
                        <Row gutter={24}>
                          <Col span={14}>
                            <Input placeholder="请输入验证码" style={{ padding: '6.5px 11px' }} />
                          </Col>
                          <Col span={10} style={{ width: '100%', overflow: 'hidden' }} >
                            <canvas
                              ref={canvasRef}
                              className={styles.canvas}
                              onClick={() => refreshVerifyCode()}
                            ></canvas>
                          </Col>
                        </Row>
                      </Form.Item>

                    </>
                  )}
                  {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
                </LoginForm>
              </div>
            </div>

          </Col>
          <Col style={{ background: '#0065FB', width: '30vw', height: '100vh' }}>
            <div style={{ marginLeft: '1.875vw', marginTop: '10.88vh', color: '#fff' }}>Employee use</div>
          </Col>
        </Row>
      </div>
      <div className={styles.lang} data-lang>
        {/* {SelectLang && <SelectLang />} */}
      </div>

    </div >
  );
};

export default Login;
