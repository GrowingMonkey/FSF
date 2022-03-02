import { Card, message, Form } from 'antd';
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
import { applyBK } from '@/services/office'
import { upload } from '@/utils/lib/upload'
import CustomerSearch from '@/components/CustomerSearch';

const AddInvoice = () => {
    const [applyForm] = Form.useForm();

    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const { run } = useRequest(applyBK, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/office//attendance-list`)
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


    return (
        <PageContainer content="">
            <Card bordered={false} title={'申请发票'}>
                <ProForm
                    hideRequiredMark
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
                    <Form.Item name="basic" label="开票公司">
                        <CustomerSearch></CustomerSearch>
                    </Form.Item>
                    <ProForm.Group>
                        <ProFormSelect name="a1" label="开票公司" />
                        <ProFormText name="a2" label="申请人归属公司"></ProFormText>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect name="a3" label="开票对象" />
                        <ProFormText name="a4" label="客户名称"></ProFormText>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText name="a5" label="开票名称"></ProFormText>
                        <ProFormSelect name="a6" label="发票属性" />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect name="a7" label="业务类型" />
                        <ProFormSelect name="a8" label="收入类型" />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect name="a9" label="发票类型" />
                        <ProFormRadio name="a10" label="是否关联人选" />
                    </ProForm.Group>
                    <ProFormText name="a10" label="纳税人识别号" />
                </ProForm>
            </Card>
            <Card title="人选信息" bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        margin: 'auto',
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
                    <Form.Item name="basic" label="选择人选">
                        <CustomerSearch></CustomerSearch>
                    </Form.Item>
                    <ProForm.Group>
                        <ProFormText name="a1" label="议价服务费" />
                        <ProFormText name="a2" label="已开票金额"></ProFormText>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText name="a3" label="开票金额" />
                        <ProFormSelect name="a6" label="税率" />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText name="a5" label="不含税率金额"></ProFormText>
                        <ProFormSelect name="a6" label="税额" />
                    </ProForm.Group>
                </ProForm>

            </Card>
            <Card title="申请发票备注" bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        margin: 'auto',
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
                    <ProFormTextArea name="a12" label="" />
                </ProForm>

            </Card>
        </PageContainer>
    );
};

export default AddInvoice;
