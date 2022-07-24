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
import { queryDKList, applyKQ, addCI } from '@/services/office';

import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { applyBK } from '@/services/office'
import { upload } from '@/utils/lib/upload'
import QuillEditor from './QuillEditor';

const AddedAttendanceList = () => {
    const { run } = useRequest(applyBK, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/office//attendance-list`)
        },
    });
    const [applyForm] = Form.useForm();
    /**
     * 
     * @param {Promise} values 
     */
    const onFinish = async (values) => {
        addCI(values).then(res => {
            if (res) {
                message.info(res.message);
                history.push('/office/company-rule')
            }
        })
        // run(values);
    };


    return (
        <PageContainer content="">
            <Card bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        margin: 'auto',
                        marginTop: 8,
                        maxWidth: 600,
                    }}
                    form={applyForm}
                    name="basic"
                    layout="vertical"
                    initialValues={{
                        public: '1',
                    }}
                    onFinish={onFinish}
                >
                    <ProFormText
                        label="标题"
                        width="md"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
                            },
                        ]}
                    />
                    <ProFormRadio.Group
                        options={[
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
                        ]}
                        rules={[
                            {
                                required: true,
                                message: '请选则类型',
                            },
                        ]}
                        label="制度类型"
                        help=""//备注
                        name="type"

                    />
                    <Form.Item name="content" label="内容">
                        <QuillEditor setQuillMaps={e => applyForm.setFieldsValue({ content: e })} setDataLoading={null} />
                    </Form.Item>


                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default AddedAttendanceList;
