import { Card, message, Form, Button } from 'antd';
import ProForm, {
    ProFormDatePicker,
    ProFormDateTimePicker,
    ProFormUploadButton,
    ProFormDependency,
    ProFormSearchSelect,
    ProFormDigit,
    ProFormRadio,
    ProFormList,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addInvoice, getAlreadyFee, sejsq } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearchForEco from '@/components/TalentSearchForEco';
import { useState } from 'react';
import CustomerInput from '@/components/CustomerInput';
import CustomerSearch from '@/components/CustomerSearch';

const AddInvoice = () => {
    const [applyForm] = Form.useForm();
    const [applyUser, setApplyUser] = useState('');
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const { run } = useRequest(addInvoice, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/eco/invioce-list`)
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
    const handleSubmit = () => {
        debugger
        Promise.all([
            applyForm.validateFields(),
            // talentForm.validateFields(),
            noteForm.validateFields(),
        ]).then(async (values) => {
            console.log(values);

            await run({ ...values[0], ...values[1], appUserId: values[0].appUser.recommenderUserId, customerId: values[0].customerOut.customerId, customerName: values[0].customerOut.customerName })
            history.push(`/eco/invioce-list`)
        })
    }
    const changedTalent = (e) => {
        console.log(e);
        talentForm.setFieldsValue({
            serviceFee: e.needPayment,
        })
        getAlreadyFee({ tpId: e.talentId }).then(res => {
            talentForm.setFieldsValue({
                alreadyFee: res?.data || 0,
            })
        })
    }
    const blurFee = () => {
        let values = talentForm.getFieldsValue(['fee', 'invoiceRate']);
        console.log(values);
        if (values.fee && values.invoiceRate) {
            sejsq({ ...values }).then(res => {
                let result = JSON.parse(res.data);
                talentForm.setFieldsValue({
                    invoiceFee: result?.invoiceFee || 0,
                    freeFee: result.freeFee
                })
            })
        } else {
            return;
        }
    }
    applyForm.setFieldsValue({
        companyName: '费思福(成都)人力资源咨询有限公司'
    })
    return (
        <PageContainer content="">
            <Card bordered={false} title={'申请发票'}>
                <ProForm
                    style={{
                        // margin: 'auto',
                        marginTop: 8,
                        maxWidth: 608,
                    }}
                    form={applyForm}
                    name="basic"
                    layout="horizontal"
                    initialValues={{
                        serviceType: 0,
                        payType: 1
                    }}
                    submitter={{
                        render: (props, dom) => {
                            return null;
                        },
                    }}
                >
                    <Form.Item name="companyName" labelCol={{ style: { width: '112px' } }} style={{ marginBottom: 0 }} rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]} label="我司名称">
                        <ProFormText style={{ width: '196px' }} />
                    </Form.Item>

                    <ProForm.Group>
                        <Form.Item name="appUser" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="申请用户">
                            <SearchInput></SearchInput>
                        </Form.Item>
                        <ProFormText labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '175px' } }} name="appUserCompanyName" label="申请人归属公司"></ProFormText>
                    </ProForm.Group>
                    <Form.Item name="customerOut" labelCol={{ style: { width: '112px' } }} rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]} wrapperCol={{ style: { width: '175px' } }} label="客户名称">
                        <CustomerSearch></CustomerSearch>
                    </Form.Item>
                    <Form.Item name="invoiceNo" labelCol={{ style: { width: '112px' } }} style={{ marginBottom: 0 }} label="发票编号">
                        <ProFormText style={{ width: '196px' }} />
                    </Form.Item>
                    <Form.Item name="hsname" labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '175px' } }} label="历史开票查询">
                        <CustomerInput onChange={(e) => {
                            applyForm.setFieldsValue({
                                name: e.name || '',
                                invoiceNumber: e.invoiceNumber || '',
                                bankName: e.bankName || '',
                                bankNumber: e.bankNumber || '',
                                address: e.address || '',
                                phone: e.phone || ''
                            })
                        }}></CustomerInput>
                    </Form.Item>
                    <ProFormText
                        labelCol={{ style: { width: '113px' } }}
                        wrapperCol={{ style: { width: '175px' } }}
                        name="name"
                        label="开票名称"
                        rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]}></ProFormText>

                    <ProFormText labelCol={{ style: { width: '112px' } }} name="invoiceNumber" label={<b>纳税人识别号</b>} rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]} />
                    <ProFormText labelCol={{ style: { width: '112px' } }} name="bankName" label="开户银行" rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]} />
                    <ProFormText labelCol={{ style: { width: '112px' } }} name="bankNumber" label="银行账户" rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]} />

                    <ProFormText labelCol={{ style: { width: '112px' } }} name="address" label="公司地址" rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]} />
                    <ProForm.Group>

                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="phone" label="公司电话" rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]}></ProFormText>
                        <ProFormSelect options={[
                            {
                                label: '服务费',
                                value: 0,
                            },
                            {
                                label: '咨询费',
                                value: 1,
                            },
                            {
                                label: '其他',
                                value: 9,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="invoiceType" label="发票属性" rules={[
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]} />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect options={[
                            {
                                label: '猎头业务',
                                value: 0,
                            },
                            {
                                label: ' 咨询业务',
                                value: 1,
                            },
                            {
                                label: '其他',
                                value: 9,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="serviceType" label="业务类型"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: '必填',
                        //     },
                        // ]} 
                        />
                        <ProFormSelect options={[
                            {
                                label: '服务费',
                                value: 0,
                            },
                            {
                                label: '咨询费',
                                value: 1,
                            },
                            {
                                label: '首付款',
                                value: 2,
                            },
                            {
                                label: '其他',
                                value: 9,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="payType" label="收入类型"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: '必填',
                        //     },
                        // ]}
                        />

                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect options={[
                            {
                                label: '普通发票',
                                value: 0,
                            },
                            {
                                label: '专用发票',
                                value: 1,
                            },
                            {
                                label: '电子普通发票',
                                value: 2,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="type" label="发票类型" rules={[
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
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="isTalent" label="是否关联人选" />
                    </ProForm.Group>
                    {/* <ProFormDependency name={['type']}>
                        {({ type }) => {
                            if (+type == 1) {
                                return (
                                    <>
                                        <ProForm.Group>
                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="address" label="公司地址" rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]} />
                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="phone" label="联系电话" rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]} />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="bankNumber" label="银行账号" rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]} />
                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="bankName" label="开户行" rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]} />
                                        </ProForm.Group>
                                    </>
                                );
                            } else {
                                return null;
                            }

                        }}
                    </ProFormDependency> */}


                    <ProFormDependency name={['isTalent']}>
                        {({ isTalent }) => {
                            if (+isTalent == 1) {
                                return (
                                    <Card title="人选信息" bordered={false} style={{ minWidth: '700px' }}>
                                        <ProFormList
                                            // name="users"
                                            name={['talentProjects']}
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
                                                    return (<>
                                                        <Form.Item name="basic" name="talentProject" labelCol={{ style: { width: '112px' } }} label="选择人选" rules={[
                                                            // {
                                                            //     required: true,
                                                            //     message: '必填',
                                                            // },
                                                        ]}>
                                                            <TalentSearchForEco onChange={async (e) => {
                                                                console.log(e);
                                                                action.setCurrentRowData({
                                                                    serviceFee: e.needPayment,
                                                                    talent: { ...e }
                                                                })
                                                                await getAlreadyFee({ tpId: e.id }).then(res => {
                                                                    action.setCurrentRowData({
                                                                        alreadyFee: res?.data || 0,
                                                                    })
                                                                })
                                                            }} style={{ width: '196px' }} applyUserId={() => applyForm.getFieldValue('appUser')} />
                                                        </Form.Item>
                                                        <ProForm.Group>
                                                            <ProFormText rules={[
                                                                {
                                                                    required: true,
                                                                    message: '必填',
                                                                },
                                                            ]} labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="serviceFee" label="应收服务费" />
                                                            <ProFormText rules={[
                                                                {
                                                                    required: true,
                                                                    message: '必填',
                                                                },
                                                            ]} labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="alreadyFee" label="已开票金额"></ProFormText>
                                                        </ProForm.Group>
                                                        <ProForm.Group>
                                                            <ProFormText rules={[
                                                                {
                                                                    required: true,
                                                                    message: '必填',
                                                                },
                                                            ]} fieldProps={{
                                                                onBlur: () => {
                                                                    let values = action.getCurrentRowData();
                                                                    console.log(values);
                                                                    if (values.fee && values.invoiceRate) {
                                                                        sejsq({ ...values }).then(res => {
                                                                            let result = JSON.parse(res.data);
                                                                            action.setCurrentRowData({
                                                                                invoiceFee: result?.invoiceFee || 0,
                                                                                freeFee: result.freeFee
                                                                            })
                                                                        })
                                                                    } else {
                                                                        return;
                                                                    }
                                                                }
                                                            }} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="fee" label="开票金额" />
                                                            <ProFormSelect options={[
                                                                {
                                                                    label: '0%',
                                                                    value: 0,
                                                                },
                                                                {
                                                                    label: '1%',
                                                                    value: 1,
                                                                },
                                                                {
                                                                    label: '3%',
                                                                    value: 3,
                                                                }, {
                                                                    label: '6%',
                                                                    value: 6,
                                                                }]} onChange={() => {

                                                                    let values = action.getCurrentRowData();
                                                                    console.log(values);
                                                                    if (values.fee && values.invoiceRate) {
                                                                        sejsq({ ...values }).then(res => {
                                                                            let result = JSON.parse(res.data);
                                                                            action.setCurrentRowData({
                                                                                invoiceFee: result?.invoiceFee || 0,
                                                                                freeFee: result.freeFee
                                                                            })
                                                                        })
                                                                    } else {
                                                                        return;
                                                                    }

                                                                }} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="invoiceRate" label="税率" />
                                                        </ProForm.Group>
                                                        <ProForm.Group>
                                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="freeFee" label="不含税率金额"></ProFormText>
                                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="invoiceFee" label="税额" />
                                                        </ProForm.Group>

                                                    </>)
                                                }}
                                        </ProFormList>
                                    </Card>
                                )
                            }
                        }}
                    </ProFormDependency>
                    <ProFormDependency name={['isTalent']}>
                        {({ isTalent }) => {
                            if (+isTalent == 0) {
                                return (
                                    <Card title="开票信息" bordered={false} style={{ minWidth: '700px' }}>


                                        <>
                                            <ProForm.Group>
                                                <ProFormText rules={[
                                                    {
                                                        required: true,
                                                        message: '必填',
                                                    },
                                                ]} labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceFee" label="应收服务费" />
                                            </ProForm.Group>
                                            <ProForm.Group>
                                                <ProFormText rules={[
                                                    {
                                                        required: true,
                                                        message: '必填',
                                                    },
                                                ]} fieldProps={{
                                                    onBlur: () => {
                                                        let values = applyForm.getFieldsValue();
                                                        console.log(values);
                                                        if (values.fee && values.invoiceRate) {
                                                            sejsq({ ...values }).then(res => {
                                                                let result = JSON.parse(res.data);
                                                                applyForm.setFieldsValue({
                                                                    invoiceFee: result?.invoiceFee || 0,
                                                                    freeFee: result.freeFee
                                                                })
                                                            })
                                                        } else {
                                                            return;
                                                        }
                                                    }
                                                }} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="fee" label="开票金额" />
                                                <ProFormSelect options={[
                                                    {
                                                        label: '0%',
                                                        value: 0,
                                                    },
                                                    {
                                                        label: '1%',
                                                        value: 1,
                                                    },
                                                    {
                                                        label: '3%',
                                                        value: 3,
                                                    }, {
                                                        label: '6%',
                                                        value: 6,
                                                    }]} onChange={() => {

                                                        let values = applyForm.getFieldsValue();
                                                        console.log(values);
                                                        if (values.fee && values.invoiceRate) {
                                                            sejsq({ ...values }).then(res => {
                                                                let result = JSON.parse(res.data);
                                                                applyForm.setFieldsValue({
                                                                    invoiceFee: result?.invoiceFee || 0,
                                                                    freeFee: result.freeFee
                                                                })
                                                            })
                                                        } else {
                                                            return;
                                                        }

                                                    }} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="invoiceRate" label="税率" />
                                            </ProForm.Group>
                                            <ProForm.Group>
                                                <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="freeFee" label="不含税率金额"></ProFormText>
                                                <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="invoiceFee" label="税额" />
                                            </ProForm.Group>

                                        </>


                                    </Card>
                                )
                            }
                        }}
                    </ProFormDependency>

                </ProForm>
            </Card>
            <Card title="申请发票备注" bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        // margin: 'auto',
                        marginTop: 8,
                        maxWidth: 608,
                    }}
                    form={noteForm}
                    name="note"
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
