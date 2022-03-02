import { PageContainer } from '@ant-design/pro-layout';
import { Input, Card, Divider, Descriptions, Row, Col, Tabs, Button, Space, Modal, Form, message } from 'antd';
import { history } from 'umi';
import StepItem from './components/StepItem';
import { selectPById, selectTPList, applyForProject } from '@/services/project';
import { selectCstById } from '@/services/customer';
import { useEffect } from 'react';
import { useState } from 'react';
import ProjectSearch from '@/components/ProjectSearch';
import ProForm, {
    ProFormRadio, ProFormSelect, ProFormText, ProFormDatePicker, ProFormDateTimePicker, ProFormTextArea,
} from '@ant-design/pro-form';
const { TabPane } = Tabs;
const Search = () => {
    const [project, setProject] = useState({});
    const [custom, setCustom] = useState(null);
    const [team, setTeam] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.clear();
    console.log(history);
    useEffect(() => {
        const { location: { query } } = history;
        console.log(query)
        selectPById({ projectId: query.projectId }).then(res => {
            setProject(res?.data || {});
        })
        selectCstById({ customerId: query.customerId }).then(res => {
            setCustom(res?.data || {});
        })
        selectTPList({ projectId: query.projectId }).then(res => {
            setTeam(res?.data || {});
        })
    }, [history])
    const onFinish = () => {
        const { location: { query } } = history;
        applyForProject({ projectId: query.projectId }).then(res => {
            message.success("加入团队成功");
            setIsModalVisible(false);
        })
    }
    return (
        <>
            <Card title={null}>
                <h1>{project.name}<span style={{ marginLeft: '12px', fontSize: '16px', color: 'red' }}>{project.salary}万</span></h1>
                <div>{project.customerName}<Divider type='vertical'></Divider>{custom?.cityCode || ''}<Divider type='vertical'></Divider>{project.experience}<Divider type='vertical'></Divider>{project.requireEdu}</div>
                <Descriptions contentStyle={{ color: '#5e5c5c', fontSize: '14px' }} labelStyle={{ color: '#5e5c5c', fontSize: '14px' }} title={null} column={3}>
                    <Descriptions.Item label="职位编号">{project.projectId}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{project.startTime}</Descriptions.Item>
                    <Descriptions.Item label="更新时间">{project.updateTime}</Descriptions.Item>
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
                                    <Descriptions.Item label="职位类别">{project.job}</Descriptions.Item>
                                    <Descriptions.Item label="招聘人数">{project.recruitNum}</Descriptions.Item>
                                    <Descriptions.Item label="薪资范围">{project.salary}</Descriptions.Item>
                                    <Descriptions.Item label="所属部门">{project.job}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions title="岗位描述" column={1}>
                                    <Descriptions.Item label="岗位职责">{project.details}</Descriptions.Item>
                                </Descriptions>
                            </TabPane>
                            {/* <TabPane
                                tab={'入职确选人'}
                                key="2"
                            >
                                </TabPane> */}
                        </Tabs>
                    </Card>
                </Col>
                <Col span="7">
                    <Card title="执行团队" extra={<Button type="primary" onClick={onFinish}>申请加入</Button>}>
                        {team.length > 0 ? team.map(item => <span>{item?.userName}</span>) : '暂无人员'}
                    </Card>
                </Col>
                {/* <Modal title="加入团队" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                    <ProForm
                        hideRequiredMark
                        style={{
                            margin: 'auto',
                            marginTop: 8,
                            maxWidth: 600,
                        }}
                        name="basic"
                        layout="vertical"
                        initialValues={{
                            public: '1',
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="推荐人"
                            name="project"
                        >
                            <ProjectSearch />
                        </Form.Item>

                    </ProForm>
                </Modal> */}
            </Row>
        </>


    );
};

export default Search;
