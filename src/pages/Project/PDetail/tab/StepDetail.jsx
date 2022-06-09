import { PageContainer } from '@ant-design/pro-layout';
import { Input, Form, Dropdown, Menu, Modal, Button, Row, Divider, Tag, Descriptions, Card, Col, Avatar, Space, message } from 'antd';
import { history } from 'umi';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import StepItem from './components/StepItem';
import { useEffect } from 'react'
import { selectTalentById, selectTPById } from '@/services/talent'
import { updateTpInfo } from '@/services/project'

import { useState } from 'react';
const StepDetail = () => {
    const { location: { query } } = history;
    console.clear();
    console.log(query);
    const { talentId, id } = query;
    const [form] = Form.useForm();
    const [talentVisible, setTalentVisible] = useState(false);
    const [talentDetail, setTalentDetail] = useState({});
    const [talentJoinDetail, setTalentJoinDetail] = useState({})
    const [fresh, setFresh] = useState(false);
    useEffect(() => {
        selectTalentById({ talentId: talentId }).then(res => {
            const { data } = res;
            setTalentDetail(data || {})
            console.log(res);
        })
        selectTPById({ id: id }).then(res => {
            // const { data } = res;
            setTalentJoinDetail(res?.data || {
                tpFlowList: [{
                    createTime: '创建时间',
                    id: '',
                    remark: 'string',
                    state: 1,
                    time: 'string',
                    tpId: 'string',
                    ID: '',
                    updateTime: 'string'
                }, {
                    createTime: '创建时间',
                    id: '',
                    remark: 'string',
                    state: 2,
                    time: 'string',
                    tpId: 'string',
                    ID: '',
                    updateTime: 'string'
                }, {
                    createTime: '创建时间',
                    id: '',
                    remark: 'string',
                    state: 0,
                    time: 'string',
                    tpId: 'string',
                    ID: '',
                    updateTime: 'string'
                }]
            })
            console.log(res);
        })
    }, [talentId, fresh])
    const stateStr = (state) => {
        switch (+state) {
            case 0:
                return '加入项目';
                break;
            case 1:
                return '推给客户';
                break;
            case 2:
                return '否决人选';
                break;
            case 4:
                return '人选放弃';
                break;
            case 5:
                return '预约面试';
                break;
            case 6:
                return '客户面试';
                break;
            case 7:
                return '客户否决';
                break;
            case 8:
                return '确认Offer';
                break;
            case 9:
                return '成功入职';
                break;
            case 10:
                return '人选离职';
                break;
        }
    }
    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log(values)
            updateTpInfo({ ...values, id: id }).then(res => {
                message.info(res.message)
                setTalentVisible(false);
                setFresh(fresh ? false : true)
            })
        })
    }
    return (
        <>
            <Card title="人选基本信息" extra={<Button type="primary" size="small" onClick={() => setTalentVisible(true)}>编辑</Button>}>
                <Row>
                    <Col span={2}><Avatar size={64} icon={<UserOutlined />} />
                    </Col>
                    <Col span={20}>
                        <Descriptions title={talentDetail.name} column={2}>
                            <Descriptions.Item>{talentDetail.gender == 1 ? '男' : '女'}  <Divider type="vertical" />{talentDetail.education}<Divider type="vertical" />{talentDetail.age}岁</Descriptions.Item>
                            <Descriptions.Item label="服务客户">{talentJoinDetail.customerName}</Descriptions.Item>
                            <Descriptions.Item label="联系电话">{talentDetail.phone}</Descriptions.Item>
                            <Descriptions.Item label="当前公司">{talentDetail.lastCompany}</Descriptions.Item>
                            <Descriptions.Item label="电子邮箱">{talentDetail.email}</Descriptions.Item>
                            <Descriptions.Item label="当前职位">{talentDetail.job}</Descriptions.Item>
                            <Descriptions.Item label="目前薪资">{talentDetail.salary}</Descriptions.Item>
                            <Descriptions.Item label="人选状态">{stateStr(talentJoinDetail.state)}</Descriptions.Item>
                            <Descriptions.Item label="推荐人">{talentJoinDetail.userName}</Descriptions.Item>
                            {/* <Descriptions.Item label="人选相关">Zhou Maomao</Descriptions.Item> */}
                            {/* <Descriptions.Item label="执行团队">1810000000</Descriptions.Item> */}
                            <Descriptions.Item label="保用期限">{talentJoinDetail.quot}</Descriptions.Item>
                            <Descriptions.Item label="标记信息">{talentJoinDetail.remark}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
            <Card>
                <div style={{ width: '100%', display: "flex", alignItems: 'center', background: '#096dd9', marginBottom: '12px' }}>
                    <div style={{ width: '64px', textAlign: 'center', color: '#fff', fontWeight: 600 }}>步骤</div>
                    <Row style={{ width: '100%', marginLeft: '12px', color: '#fff', padding: '12px', fontWeight: 600 }}>
                        <Col span={10}>详细内容</Col>
                        {/* <Col span={2}>操作人</Col> */}
                        <Col span={6}>时间</Col>
                        {/* <Col span={4}>绩效审核</Col> */}
                        {/* <Col span={4}>操作</Col> */}
                    </Row>
                </div>
                {/* <StepItem title="加入项目"></StepItem>
                <StepItem title="推给客户"></StepItem>
                <StepItem title="预约面试"></StepItem>
                <StepItem title="客户面试"></StepItem>
                <StepItem title="确认offer"></StepItem>
                <StepItem title="客户确认"></StepItem>
                <StepItem title="成功入职" isEnd={true}></StepItem> */
                    talentJoinDetail.tpFlowList && talentJoinDetail.tpFlowList.map((item, index) => <StepItem title={stateStr(item.state)} isEnd={index == (talentJoinDetail.tpFlowList.length - 1)} info={item}></StepItem>)
                }
                <div style={{ marginLeft: '76px' }}>
                    {/* <Space><Button type="primary">添加评语</Button><Button>申请离职</Button><Button>添加评语</Button></Space> */}
                </div>

            </Card>
            <Modal title="修改人选信息" cancelText="取消" okText="确定" visible={talentVisible} onCancel={() => setTalentVisible(false)} onOk={handleOk}>
                <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} labelAlign="left">

                    <Form.Item name="phone" label="联系电话">
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="电子邮箱">
                        <Input />
                    </Form.Item>
                    <Form.Item name="salary" label="目前薪资">
                        <Input />
                    </Form.Item>
                    <Form.Item name="company" label="当前公司">
                        <Input />
                    </Form.Item>
                    <Form.Item name="job" label="当前职位">
                        <Input />
                    </Form.Item>
                    <Form.Item name="remark" label="备注信息">
                        <Input />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};

export default StepDetail;
