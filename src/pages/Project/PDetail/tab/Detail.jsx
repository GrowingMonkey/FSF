import { PageContainer } from '@ant-design/pro-layout';
import { Input, Card, Divider, Descriptions, Row, Col, Tabs, Button, Space } from 'antd';
import { history } from 'umi';
import StepItem from './components/StepItem';
const { TabPane } = Tabs;
const Search = () => {
    return (
        <>
            <Card title={null}>
                <h1>成都鸣笛快闪服饰有限公司<span style={{ marginLeft: '12px', fontSize: '16px', color: 'red' }}>30-50万</span></h1>
                <div>公司名称<Divider type='vertical'></Divider>地址<Divider type='vertical'></Divider>年限<Divider type='vertical'></Divider>学历</div>
                <Descriptions contentStyle={{ color: '#5e5c5c', fontSize: '14px' }} labelStyle={{ color: '#5e5c5c', fontSize: '14px' }} title={null} column={3}>
                    <Descriptions.Item label="职位编号">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="发布时间">1810000000</Descriptions.Item>
                    <Descriptions.Item label="更新时间">Hangzhou, Zhejiang</Descriptions.Item>
                </Descriptions>
            </Card>
            <Space></Space>
            <Row gutter={12} style={{ marginTop: '12px' }}>
                <Col span="17">
                    <Card>
                        <Tabs defaultActiveKey="2">

                            <TabPane
                                tab={'职位信息'}
                                key="1"
                            >
                                <Descriptions title="基本信息" column={2}>
                                    <Descriptions.Item label="所属行业">Zhou Maomao</Descriptions.Item>
                                    <Descriptions.Item label="职位类别">1810000000</Descriptions.Item>
                                    <Descriptions.Item label="招聘人数">Hangzhou, Zhejiang</Descriptions.Item>
                                    <Descriptions.Item label="所属部门">empty</Descriptions.Item>
                                </Descriptions>
                                <Descriptions title="岗位描述" column={1}>
                                    <Descriptions.Item label="岗位职责">Zhou Maomao</Descriptions.Item>
                                </Descriptions>
                            </TabPane>
                            <TabPane
                                tab={'入职确选人'}
                                key="2"
                            >
                                <StepItem></StepItem></TabPane>
                        </Tabs>
                    </Card>
                </Col>
                <Col span="7">
                    <Card title="执行团队" extra={<Button>申请加入</Button>}>

                    </Card>
                </Col>
            </Row>
        </>


    );
};

export default Search;
