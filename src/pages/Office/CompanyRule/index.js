import { Form, Row, Col, Modal, Input, Button, Select, Table, Divider, Space, DatePicker, message } from 'antd';
import styles from './index.less';
import { PageContainer, } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { queryDKList, applyKQ, CIList } from '@/services/office';
import ProForm, {
    ProFormRadio,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi'
const AttendanceList = () => {
    const [form] = Form.useForm();
    const [total, setTotal] = useState(0);
    const [searchValues, setSearchValues] = useState(null);
    const [attendanceList, setAttendanceList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { run } = useRequest(applyKQ, {
        manual: true,
        onSuccess: () => {
            message.success('打卡成功');
            CIList(searchValues).then((res) => {
                const { data } = res;
                setAttendanceList(
                    data?.list || []
                );
            });
        },
    });
    const formList = [
        {
            name: 'type',
            label: '打卡类型',
            type: 'select',
            span: 6,
            options: [
                { label: '行政管理', value: 0 },
                { label: '奖金提成', value: 1 },
                { label: '招聘制度', value: 2 },
                { label: '晋升制度', value: 3 },
                { label: '合伙人制', value: 4 },
                { label: '绩效考核', value: 5 },
                { label: '年终奖', value: 6 },
                { label: '加薪制度', value: 7 },
                { label: '降薪制度', value: 8 },
                { label: '财务制度', value: 9 },
                { label: '其他政策', value: 10 },
            ],
        },
        {
            name: 'title',
            label: '标题',
            type: 'input',
            span: 6,
        },
    ];
    const attendanceColumns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,

        },
        {
            title: '发布者',
            dataIndex: 'userName',
            ellipsis: true,
            key: 'userName',
        },
        {
            title: '类型',
            dataIndex: 'type',
            ellipsis: true,
            key: 'type',
            render: (text, record) => {
                return +text == 0 ? "行政管理" : +text == 1 ? '奖金提成' : +text == 2 ? '招聘制度' : +text == 3 ? '晋升制度' : +text == 4 ? '合伙人制' : +text == 5 ? '绩效考核' : +text == 6 ? '年终奖' : +text == 7 ? '加薪制度' : +text == 8 ? '降薪制度' : +text == 9 ? '财务制度' : '其他政策'
            }
        },
        {
            title: '内容',
            dataIndex: 'content',
            ellipsis: true,
        },

        {
            title: '发布日期',
            dataIndex: 'createTime',
            ellipsis: true,

            key: 'createTime',
        },
    ];

    const handleSearchClear = () => {
        form.resetFields();
        setSearchValues(null);
    };

    const handleSearch = () => {
        form.validateFields().then((values) => {
            let payload = Object.assign({}, values);
            // if (values.cityCode) {
            //     if (values.cityCode[1]) {
            //         payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
            //     } else {
            //         payload.cityCode = `${values.cityCode[0]}`;
            //     }
            // }
            if (values.customer) {
                payload.customerName = values.customer.customerName;
                delete payload.customer;
            }

            setSearchValues(payload);
        });
    };

    useEffect(() => {
        CIList(searchValues).then((res) => {
            const { data } = res;
            setAttendanceList(
                data?.list || []
            );
            setTotal(data?.count || 0)
        });
    }, [searchValues]);
    const handleAdd = () => {
        setIsModalVisible(true)
    }
    const onFinish = (values) => {

        run(values);
        setIsModalVisible(false)
    }
    return (
        <PageContainer>
            <div className={styles['search-container']}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className={styles['page-title']}>公司制度</div>
                    </Col>
                    <Col>
                        <Space size={8}>
                            <Button type="primary" onClick={handleSearch}>
                                搜索
                            </Button>
                            <Button type="primary" onClick={() => history.push('/office/rule-add')}>
                                添加
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Divider />
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
                    {
                        <Row gutter={32}>
                            {formList.map((col) => {
                                if (col.render) {
                                    return col.render();
                                }
                                if (col.type === 'input') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label} rules={col.rules}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'select') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label} rules={col.rules}>
                                                <Select options={col.options} />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'datePicker') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label}>
                                                <DatePicker style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                return null;
                            })}
                        </Row>
                    }
                </Form>
            </div>
            <div className={styles['list-container']}>
                <Table
                    columns={attendanceColumns}
                    dataSource={attendanceList}
                    pagination={{
                        total: total,
                        pageSize: 10,
                        onChange: e => setSearchValues({ pageNo: e }),
                        showTotal: total => `共${total}条`

                    }}
                    size="small"
                    bordered
                    scroll={{ x: 900 }}
                />
            </div>
            <div style={{ width: '100%', minHeight: '15px' }} />
            <Modal title="打卡" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
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
                    <ProFormRadio.Group
                        options={[
                            {
                                value: '0',
                                label: '上班打卡',
                            },
                            {
                                value: '1',
                                label: '下班打卡',
                            },
                        ]}
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
                            },
                        ]}
                        label="打卡类型"
                        help=""//备注
                        name="type"

                    />

                </ProForm>
            </Modal>
        </PageContainer>
    );
};

export default AttendanceList;
