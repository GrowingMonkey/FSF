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
        console.log(values)
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
                    <ProFormDateTimePicker
                        label="补卡时间"
                        width="md"
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: '请选择时间',
                            },
                        ]}
                        placeholder={['开始日期']}
                    />
                    <ProFormTextArea
                        label="补卡原因"
                        width="xl"
                        name="reason"
                        rules={[
                            {
                                required: true,
                                message: '请输入原因',
                            },
                        ]}
                        placeholder="请输入你的补卡"
                    />
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
                        label="补卡类型"
                        help=""//备注
                        name="type"

                    />

                    <ProFormUploadButton
                        label="补卡类型"
                        name="type1"
                        fieldProps={{
                            customRequest: async (options) => {
                                let result = await upload(options.file, () => { console.log(11) })
                                applyForm.setFieldsValue({ type1: [result.res.requestUrls[0]] })
                                options.onSuccess(result.res.requestUrls[0], options.file)
                            },
                        }}
                    />

                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default AddedAttendanceList;
