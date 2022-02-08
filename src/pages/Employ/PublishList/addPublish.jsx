import { Card, message } from 'antd';
import ProForm, {
    ProFormDatePicker,
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
import { addNotice } from '@/services/employ'
// import { fakeSubmitForm } from './service';

const addTripC = () => {
    const { run } = useRequest(addNotice, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/employ/publish-list`)
        },
    });

    const onFinish = async (values) => {
        console.log(values)
        run(values);
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
                    name="basic"
                    layout="vertical"
                    initialValues={{
                        public: '1',
                    }}
                    onFinish={onFinish}
                >
                    <ProFormText
                        width="md"
                        label="公告标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
                            },
                        ]}
                        placeholder="给目标起个名字"
                    />

                    <ProFormTextArea
                        label="公告内容"
                        width="xl"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: '请输入目标描述',
                            },
                        ]}
                        placeholder="请输入你的阶段性工作目标"
                    />
                    <ProFormRadio.Group
                        options={[
                            {
                                value: '0',
                                label: '公司大事',
                            },
                            {
                                value: '1',
                                label: '大元宝',
                            },
                            {
                                value: '2',
                                label: '入职周年',
                            }, {
                                value: '3',
                                label: '大钻石',
                            }
                        ]}
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
                            },
                        ]}
                        label="公告类型"
                        help=""//备注
                        name="type"

                    />
                    <ProFormRadio.Group
                        options={[
                            {
                                value: '1',
                                label: '直接发布',
                            },
                            {
                                value: '2',
                                label: '暂不发布',
                            },
                        ]}
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
                            },
                        ]}
                        label="公告状态"
                        help=""//备注
                        name="state"
                    />
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default addTripC;
