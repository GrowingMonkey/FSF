import { Card, message, Form, Button } from 'antd';
import ProForm, {
    ProFormDatePicker,
    ProFormDateTimePicker,
    ProFormUploadButton,
    ProFormDependency,
    ProFormSearchSelect,
    ProFormDigit,
    ProFormRadio,
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

const AddInvoice = () => {
    const [applyForm] = Form.useForm();
    const [applyUser, setApplyUser] = useState('');
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const { run } = useRequest(addInvoice, {
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
    const handleSubmit = () => {
        debugger
        Promise.all([
            applyForm.validateFields(),
            talentForm.validateFields(),
            noteForm.validateFields(),
        ]).then((values) => {
            console.log(values);
            console.log({ ...values[0], ...values[1], ...values[2], appUserId: values[0].appUser.recommenderUserId, talentId: values[1].talent.talentId })
            run({ ...values[0], ...values[1], ...values[2], appUserId: values[0].appUser.recommenderUserId, talentId: values[1].talent.talentId })
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
                    ]} label="开票公司">
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
                    <ProForm.Group>
                        <ProFormSelect labelCol={{ style: { width: '113px' } }} options={[
                            {
                                label: '外部客户',
                                value: 0,
                            },
                            {
                                label: '内部客户',
                                value: 1,
                            },
                            {
                                label: '其他',
                                value: 2,
                            }]} wrapperCol={{ style: { width: '175px' } }} name="invoiceObj" label="开票对象" rules={[
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]} />
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="customerName" label="客户名称" rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]}></ProFormText>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="name" label="开票名称" rules={[
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
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="serviceType" label="业务类型" rules={[
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]} />
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
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="payType" label="收入类型" rules={[
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]} />
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
                    <ProFormText labelCol={{ style: { width: '112px' } }} name="invoiceNumber" label="纳税人识别号" rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]} />
                </ProForm>
            </Card>
            <Card title="人选信息" bordered={false}>
                <ProForm
                    style={{
                        marginTop: 8,
                        maxWidth: 600,
                    }}
                    form={talentForm}
                    name="talent"
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
                    <Form.Item name="basic" name="talent" labelCol={{ style: { width: '112px' } }} label="选择人选" rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]}>
                        <TalentSearchForEco onChange={changedTalent} style={{ width: '196px' }} applyUser={() => applyForm.getFieldValue('appUser')} />
                    </Form.Item>
                    <ProForm.Group>
                        <ProFormText rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]} labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="serviceFee" label="议价服务费" />
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
                            onBlur: blurFee
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
                            }]} onChange={blurFee} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="invoiceRate" label="税率" />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="freeFee" label="不含税率金额"></ProFormText>
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="invoiceFee" label="税额" />
                    </ProForm.Group>
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
