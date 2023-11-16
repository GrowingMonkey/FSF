import { PageContainer } from '@ant-design/pro-layout';
import { Input, Dropdown, Menu, Button, Row, Divider, Tag, Descriptions, Col, message } from 'antd';
import { history } from 'umi';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import ProForm, {
    ProFormTextArea,
} from '@ant-design/pro-form';
import { updateTPFlow } from "@/services/project"
const StepItem = ({ title, isEnd, info, isEdit = true, flash = () => { }, projectId = '' }) => {
    const [isRemarkModalVisible, setIsRemarkModalVisible] = useState(false);
    console.log(info);
    const onFinishRemark = (values) => {
        console.log(values);
        updateTPFlow({ ...values, id: info.id, projectId: projectId }).then(res => {
            console.log(res);
            message.info(res.message);
            setIsRemarkModalVisible(false);
            flash();
        })
    }
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
                                {/* <Descriptions.Item label="Telephone">1810000000</Descriptions.Item> */}
                                {/* <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item> */}
                                {/* <Descriptions.Item label="Remark">操作</Descriptions.Item> */}
                            </Descriptions>
                        </Col>
                        <Col span={6}>{info?.createTime || ''}</Col>
                        <Col span={3}>{}</Col>
                        {isEdit ? <Col span={4}><Button type="link" onClick={() => setIsRemarkModalVisible(true)}>编辑</Button></Col> : ''}

                    </Row>
                    <Divider></Divider>
                </div>
            </div>
            <Modal title={"修改"} visible={isRemarkModalVisible} footer={null} onCancel={() => setIsRemarkModalVisible(false)}>
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
                        remark: info?.remark || '',
                    }}
                    onFinish={onFinishRemark}
                >
                    <ProFormTextArea label="备注信息" name="remark" />

                </ProForm>
            </Modal>
        </>
    );
};

export default StepItem;
