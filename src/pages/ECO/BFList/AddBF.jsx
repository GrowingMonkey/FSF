import { Card, message, Form, Input, Button } from 'antd';
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
import { addServiceFee } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearch from '@/components/TalentSearch';

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
            <Card bordered={false} title={'新增回款'}>
                <ProForm

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
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="customerName" label="客户名称" rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]}></ProFormText>
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
                        <TalentSearch style={{ width: '196px' }} filedProps={{ mode: 'multiple' }} />
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
                    <ProFormTextArea name="remark" label="" />
                </ProForm>
                <Button type="primary" onClick={handleSubmit}>提交</Button>
            </Card>
        </PageContainer>
    );
};

export default AddInvoice;
