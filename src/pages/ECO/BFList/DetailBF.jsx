import { Card, message, Form, Input, Button, Descriptions } from 'antd';
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
import { addServiceFee, selectServiceFeeById } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearch from '@/components/TalentSearch';
import { useEffect } from 'react';
import { useState } from 'react';

const AddInvoice = () => {
    const [bfDetail, setBfDetail] = useState(null);
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
    useEffect(() => {
        const { location: { query } } = history;
        console.log(query)
        if (query?.serviceFeeId) {
            selectServiceFeeById({ id: query?.serviceFeeId }).then(ress => {
                setBfDetail(ress?.data)
            })
        }
    }, [])
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
            console.log(values)
            run({ ...values[0], ...values[1], ...values[2], appUserId: values[0].appUser.recommenderUserId, talentProjectId: values[1].talents.talents.map(i => i.talentId).join(',') })
        })
    }

    return (
        <PageContainer content="">
            <Card bordered={false} title={'回款信息'}>
                <ProForm
                    hideRequiredMark
                    style={{
                        // margin: 'auto',
                        marginTop: 8,
                        maxWidth: 600,
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
                    <Form.Item labelCol={{ style: { width: '113px' } }} name="fee" label="回款金额" rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]}>
                        {/* <Input /> */}
                        <span>{bfDetail?.fee || ''}</span>
                    </Form.Item>
                    <ProForm.Group>
                        <Form.Item name="appUser" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="服务顾问">
                            {/* <SearchInput></SearchInput> */}
                            <span>{bfDetail?.auditorName || ''}</span>
                        </Form.Item>
                        <Form.Item name="appUserCompany" labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} label="归属公司">
                            <span>{
                                bfDetail?.comName}</span>
                        </Form.Item>
                        {/* <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="appUserCompany" label="归属公司"></ProFormText> */}
                    </ProForm.Group>
                    <ProForm.Group>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payWay" label="支付方式">
                            <span>{bfDetail?.payWay == 0 ? '现金支付' : bfDetail?.payWay == 1 ? '支票转账' : bfDetail?.payWay == 2 ? '网银转账' : bfDetail?.payWay == 3 ? '其他方式' : bfDetail?.payWay == 4 ? '个人电汇' : ''}</span>
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="customerName" label="客户名称" >
                            <span>{bfDetail?.customerName || ""}</span>
                        </Form.Item>
                        {/* <ProFormSelect options={[
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
                        ]} /> */}
                        {/* <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="customerName" label="客户名称" rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]}></ProFormText> */}
                    </ProForm.Group>
                    <ProForm.Group>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payType" label="收入类型">
                            <span>{bfDetail?.payType == 0 ? '服务费' : bfDetail?.payType == 1 ? '咨询费' : bfDetail?.payType == 2 ? '首付款' : bfDetail?.payType == 9 ? '其他' : '' || ' '}</span>
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceType" label="业务类型" >
                            <span>{bfDetail?.serviceType == 0 ? '猎头业务' : bfDetail?.serviceType == 1 ? '咨询业务' : bfDetail?.serviceType == 9 ? '其他' : '' || ' '}</span>
                        </Form.Item>
                        {/* <ProFormSelect options={[
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
                            ]} /> */}
                    </ProForm.Group>
                    <ProForm.Group>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="dateType" label="回款期限">
                            <span>{bfDetail?.dateType || ' '}</span>
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="isTalent" label="是否关联人选" >
                            <span>{bfDetail?.tpList.length > 0 ? '是' : '否'}</span>
                        </Form.Item>
                        {/* <ProFormSelect labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} options={[
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
                            ]} /> */}
                    </ProForm.Group>
                </ProForm>
            </Card>
            <Card title="人选信息" bordered={false}>
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
                        {/* <TalentSearch style={{ width: '196px' }} filedProps={{ mode: 'multiple' }} /> */}
                        <span>{bfDetail?.tpList?.map(item => item.talentName).join(',')}</span>
                    </Form.Item>
                </ProForm>

            </Card>
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
                    <span>{bfDetail?.remark}</span>
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default AddInvoice;
