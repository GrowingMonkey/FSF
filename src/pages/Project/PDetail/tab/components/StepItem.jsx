import { PageContainer } from '@ant-design/pro-layout';
import { Input, Dropdown, Menu, Button, Row, Divider, Tag, Descriptions, Col } from 'antd';
import { history } from 'umi';
import { DownOutlined, UpOutlined } from '@ant-design/icons';


const StepItem = ({ title, isEnd, info }) => {
    console.log(info);
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Tag color="#f39f0cfa" style={{ margin: '0 auto' }}>{title}</Tag>{!isEnd ? [<UpOutlined style={{ color: '#096dd9' }}
                    />, <Divider type="vertical" dashed={true} orientation="right" orientationMargin="0" style={{ flexGrow: 1, borderColor: '#096dd9' }}></Divider>] : null}
                </div>
                <div style={{ flexGrow: 1, marginLeft: '12px', }}>
                    <Row>
                        <Col span={10}>
                            <Descriptions column={1} >
                                <Descriptions.Item label={''}>{info?.remark || ''}</Descriptions.Item>
                                {/* <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                                <Descriptions.Item label="Remark">empty</Descriptions.Item> */}
                            </Descriptions>
                        </Col>
                        <Col span={6}>{info?.createTime || ''}</Col>
                        <Col span={3}>{}</Col>
                        <Col span={4}>{}</Col>
                    </Row>
                    <Divider></Divider>
                </div>
            </div>
        </>
    );
};

export default StepItem;
