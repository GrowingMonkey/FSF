import { PageContainer } from '@ant-design/pro-layout';
import { Input, Dropdown, Menu, Button, Row, Divider, Tag, Descriptions, Col } from 'antd';
import { history } from 'umi';
import { DownOutlined } from '@ant-design/icons';


const StepItem = ({ title, isEnd }) => {




    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Tag color="#f39f0cfa" style={{ margin: '0 auto' }}>{title}</Tag>{!isEnd ? [<Divider type="vertical" dashed={true} orientation="right" orientationMargin="0" style={{ flexGrow: 1, borderColor: '#096dd9' }}></Divider>, <DownOutlined style={{ color: '#096dd9' }}
                    />] : null}
                </div>
                <div style={{ flexGrow: 1, marginLeft: '12px', }}>
                    <Row>
                        <Col span={10}>
                            <Descriptions column={1} >
                                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                                <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={2}>111</Col>
                        <Col span={4}>111</Col>
                        <Col span={4}>111</Col>
                        <Col span={4}>111</Col>
                    </Row>
                    <Divider></Divider>
                </div>
            </div>

        </>
    );
};

export default StepItem;
