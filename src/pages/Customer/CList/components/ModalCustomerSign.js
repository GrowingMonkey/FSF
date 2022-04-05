import { useState, useEffect } from "react";
import {
    Modal,
    Form,
} from "antd";
import ProForm, {
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormDependency

} from '@ant-design/pro-form';
import { addContact, updateContact } from "../../../../services/customer";
import { signCustomer } from '@/services/customer'
const ModalCustomerSign = ({
    visible,
    onSubmit,
    onCancel,
    record,
    customerId,
}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const handleCancel = () => {
        form.resetFields();
        setConfirmLoading(false);
        onCancel();
    };
    const handleOk = () => {
        form.validateFields().then((values) => {
            setConfirmLoading(true);
            if (record) {
                updateContact({
                    ...values,
                    id: record.id,
                    customerId: customerId,
                }).then((data) => {
                    form.resetFields();
                    setConfirmLoading(false);
                    onSubmit();
                });
            } else {
                addContact({ ...values, customerId: customerId }).then((data) => {
                    form.resetFields();
                    setConfirmLoading(false);
                    onSubmit();
                });
            }
        });
    };
    useEffect(() => {
        if (visible) {
            // console.log(record);
            form.setFieldsValue(record);
        }
    }, [visible]);
    const handleSubmit = async (value) => {
        await signCustomer({ customerId: customerId, ...value });
        handleCancel()
    }
    return (
        <Modal
            visible={visible}
            title="联系人"
            okText="提交"
            cancelText="取消"
            onCancel={handleCancel}
            onOk={handleOk}
            footer={null}
            confirmLoading={confirmLoading}
        >
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
                onFinish={handleSubmit}
            >
                <ProFormText
                    fieldProps={{
                        suffix: "%"
                    }}
                    width="md"
                    label="签约比例"
                    name="signPercent"
                    rules={[
                        {
                            required: true,
                            message: '请输入标题',
                        },
                    ]}
                />
                <ProFormRadio.Group
                    options={[
                        {
                            value: '0',
                            label: '否',
                        },
                        {
                            value: '1',
                            label: '是',
                        },
                    ]}
                    label="是否支付首付款"
                    help=""
                    name="isDownPayment"
                />
                <ProFormDependency name={['isDownPayment']}>
                    {({ isDownPayment }) => {
                        if (+isDownPayment == 1) {
                            return (<ProFormText
                                width="md"
                                label="首付款金额"
                                name="downPayment"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入标题',
                                    },
                                ]}
                            />)
                        }

                    }}
                </ProFormDependency>
                <ProFormText label="保用期"
                    name="quotTime" fieldProps={{
                        suffix: '月'
                    }} />
                <ProFormDependency name={['isDownPayment']}>
                    {({ isDownPayment }) => {
                        if (+isDownPayment != 1) {
                            return (<ProFormText label="预付款"
                                name="serviceCharge" fieldProps={{
                                    suffix: '元'
                                }} />)
                        }

                    }}
                </ProFormDependency>

            </ProForm>
        </Modal>
    );
};

export default ModalCustomerSign;
