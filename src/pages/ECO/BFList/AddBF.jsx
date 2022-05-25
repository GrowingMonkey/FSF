import { Card, message, Form, Input, Button } from 'antd';
import ProForm, {
    ProFormDatePicker,
    ProFormDateTimePicker,
    ProFormUploadButton,
    ProFormDependency,
    ProFormSearchSelect,
    ProFormDigit,
    ProFormRadio,
    ProFormList,
    Divider,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addServiceFee, selectServiceFeeById } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearch from './TalentSearchBF';
import CustomerSearch from '@/components/CustomerSearch';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect } from 'react';



const AddInvoice = () => {
    const [applyForm] = Form.useForm();
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const { run } = useRequest(addServiceFee, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/eco/bf-list`)
        },
    });

    /**
     * 
     * @param {Promise} values 
     */
    const onFinish = async (values) => {
        console.log(values)
        // run(values);
    };
    useEffect(() => {
        const { location: { query } } = history;
        console.log(query)
        if (query?.bfId) {
            selectServiceFeeById({ id: query?.bfId }).then(ress => {
                applyForm.setFieldsValue({
                    fee: ress.data.fee,
                    payWay: ress.data.payWay,
                    payType: ress.data.payType,
                    serviceType: ress.data.serviceType,
                    dateType: ress.data.dateType,
                    isTalent: ress.data.tpList.lenght > 0 ? 1 : 0,
                    customerOut: ress.data.customerName,
                    appUser: ress.data.auditorName
                })

                noteForm.setFieldsValue({
                    remark: ress.data.remark
                })
            })
        }
    }, [])
    const handleSubmit = () => {
        debugger
        Promise.all([
            applyForm.validateFields(),
            // talentForm.validateFields(),
            noteForm.validateFields(),
        ]).then((values) => {
            const { location: { query } } = history;
            console.log(values)
            let realFee = [];
            if (values[0].isTalent == 1 && values[0].users) {
                values[0].users.map(item => {
                    realFee.push({ realFee: item.realFee, tpId: item.talents.talents.id })
                })

            }
            if (query?.bfId) {
                run({ ...values[0], customerId: values[0].customerOut.customerId, customerName: values[0].customerOut.customerName, ...values[1], appUserId: values[0].appUser.recommenderUserId, tpIds: realFee, id: query.bfId })

            } else {
                run({ ...values[0], customerId: values[0].customerOut.customerId, customerName: values[0].customerOut.customerName, ...values[1], appUserId: values[0].appUser.recommenderUserId, tpIds: realFee })
            }
        })
    }
    const changedTalent = (e, index) => {
        console.log(applyForm.getFieldsValue(true).users);
        // applyForm.getFieldsValue(true).users;
        // applyForm.setFieldsValue({
        //     users: applyForm.getFieldsValue(true).users.splice(index, 1, e),
        // })
    }
    const renderItem = () => {
        console.log(applyForm.getFieldsValue(true));
    }
    return (
        <PageContainer content="">

            <ProForm

                style={{
                    // margin: 'auto',
                    marginTop: 8,
                    maxWidth: 600,
                }}
                form={applyForm}
                name="basic"
                layout="horizontal"
                initialValues={{
                    isTalent: 0
                }}
                submitter={{
                    render: (props, dom) => {
                        return null;
                    },
                }}
            >
                <Card bordered={false} title={(() => {
                    const { location: { query } } = history;
                    if (query.bfId) {
                        return '编辑回款'
                    } else {
                        return '新增回款'
                    }
                })()} style={{ minWidth: '700px' }}>
                    <Form.Item labelCol={{ style: { width: '113px' } }} name="fee" label="回款金额" rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <ProForm.Group>
                        <Form.Item name="appUser" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="服务顾问">
                            <SearchInput></SearchInput>
                        </Form.Item>
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="appUserCompany" label="归属公司"></ProFormText>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect options={[
                            {
                                label: '现金支付',
                                value: 0,
                            },
                            {
                                label: '支票转账',
                                value: 1,
                            },
                            {
                                label: '网银转账',
                                value: 2,
                            },
                            {
                                label: '其他方式',
                                value: 3,
                            }, {
                                label: '个人电汇',
                                value: 4,
                            }

                        ]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payWay" label="支付方式" rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]} />
                        <Form.Item name="customerOut" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="客户名称">
                            <CustomerSearch url={2}></CustomerSearch>
                        </Form.Item>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect options={[
                            {
                                label: '服务费',
                                value: 0,
                            },
                            {
                                label: '咨询费',
                                value: 1,
                            }, {
                                label: '首付款',
                                value: 2,
                            }, {
                                label: '其他',
                                value: 9,
                            },]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payType" label="收入类型" rules={[
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]} />
                        <ProFormSelect options={[
                            {
                                label: '猎头业务',
                                value: 0,
                            },
                            {
                                label: '咨询业务',
                                value: 1,
                            }, {
                                label: '其他',
                                value: 9,
                            },]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceType" label="业务类型" rules={[
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]} />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} options={[
                            {
                                label: '一期',
                                value: '一期',
                            },
                            {
                                label: '二期',
                                value: '二期',
                            },
                            {
                                label: '三期',
                                value: '三期',
                            },
                            {
                                label: '全款',
                                value: '全款',
                            }]} name="dateType" label="回款期限" rules={[
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]} />
                        <ProFormRadio.Group options={[
                            {
                                label: '否',
                                value: 0,
                            },
                            {
                                label: '是',
                                value: 1,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="isTalent" label="是否关联人选" rules={[
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]} />
                    </ProForm.Group>
                </Card>
                <ProFormDependency name={['isTalent']}>
                    {({ isTalent }) => {
                        if (+isTalent == 1) {
                            return (
                                <Card title="人选信息" bordered={false} style={{ minWidth: '700px' }}>
                                    <ProFormList
                                        // name="users"
                                        name={['users']}
                                        alwaysShowItemLabel={true}
                                        creatorButtonProps={{
                                            position: 'bottom',
                                            style: { marginLeft: '45px', background: '#999', width: '550px', textAlign: 'center', cursor: 'pointer' },
                                            creatorButtonText: '点击添加人选',
                                        }}
                                        itemContainerRender={(doms) => {
                                            return <ProForm.Group>{doms}</ProForm.Group>;
                                        }}
                                    >
                                        {
                                            (f, index, action) => {
                                                console.log(f, index, action);
                                                return (
                                                    <>
                                                        {/* <ProFormText initialValue={index} name="rowKey" label={`第 ${index} 配置`} />*/}

                                                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name={[index, 'talents']} label="选择人选" >
                                                            <TalentSearch style={{ width: '196px' }} applyUserId={() => applyForm.getFieldValue('appUser')} />
                                                        </Form.Item>
                                                        <ProFormDependency name={['talents']}>
                                                            {({ talents }) => {
                                                                console.log(talents)
                                                                if (!talents) {
                                                                    return (
                                                                        <span
                                                                            style={{
                                                                                lineHeight: '32px',
                                                                            }}
                                                                        >

                                                                        </span>
                                                                    );
                                                                }
                                                                return <ProFormText name="company" label="公司名" disabled value={talents.talents.company} />;
                                                            }}
                                                        </ProFormDependency>
                                                        <ProForm.Group>
                                                            <ProFormDependency name={['talents']}>
                                                                {({ talents }) => {
                                                                    console.log(talents)
                                                                    if (!talents) {
                                                                        return (
                                                                            <span
                                                                                style={{
                                                                                    lineHeight: '32px',
                                                                                }}
                                                                            >

                                                                            </span>
                                                                        );
                                                                    }
                                                                    return <ProFormText name="job" label="职位名" disabled value={talents.talents.job} />;
                                                                }}
                                                            </ProFormDependency>
                                                            <ProFormDependency name={['talents']}>
                                                                {({ talents }) => {
                                                                    console.log(talents)
                                                                    if (!talents) {
                                                                        return (
                                                                            <span
                                                                                style={{
                                                                                    lineHeight: '32px',
                                                                                }}
                                                                            >

                                                                            </span>
                                                                        );
                                                                    }
                                                                    return <ProFormText name="refundPayment" label="应付款金额" disabled value={talents.talents.needPayment || 0} />;
                                                                }}
                                                            </ProFormDependency>
                                                            <ProFormDependency name={['talents']}>
                                                                {({ talents }) => {
                                                                    console.log(talents)
                                                                    if (!talents) {
                                                                        return (
                                                                            <span
                                                                                style={{
                                                                                    lineHeight: '32px',
                                                                                }}
                                                                            >

                                                                            </span>
                                                                        );
                                                                    }
                                                                    return <ProFormText name="realFee" label="实际回款金额" />;
                                                                }}
                                                            </ProFormDependency>
                                                        </ProForm.Group>
                                                    </>
                                                );
                                            }
                                        }
                                    </ProFormList>
                                </Card>
                            );
                        } else {
                            return null;
                        }

                    }}
                </ProFormDependency>
            </ProForm>
            {/* <Card title="人选信息" bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        marginTop: 8,
                        maxWidth: 600,
                    }}
                    form={talentForm}
                    name="basic"
                    layout="horizontal"
                    initialValues={{
                        public: '1',
                    }}
                    submitter={{
                        render: (props, dom) => {
                            return null;
                        },
                    }}
                >
                    <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="talents" label="选择人选" >
                        <TalentSearch style={{ width: '196px' }} filedProps={{ mode: 'multiple' }} />
                    </Form.Item>
                </ProForm>

            </Card>
            */}
            <Card title="备注" bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        // margin: 'auto',
                        marginTop: 8,
                        maxWidth: 600,
                    }}
                    form={noteForm}
                    name="basic"
                    layout="horizontal"
                    submitter={{
                        render: (props, dom) => {
                            return null;
                        },
                    }}
                >
                    <ProFormTextArea name="remark" label="" />
                </ProForm>
                <Button type="primary" onClick={handleSubmit}>提交</Button>
            </Card>

        </PageContainer>
    );
};

export default AddInvoice;
