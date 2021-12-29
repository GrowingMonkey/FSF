import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Cascader,
} from "antd";
import { addCustomerCompany } from "../../../../services/customer";

const ModalCustomerSubsidiary = ({
  visible,
  onSubmit,
  onCancel,
  record,
  customerId,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const formList = [
    {
      name: "name",
      label: "公司名",
      type: "input",
      span: 24,
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
    {
      name: "type",
      label: "类型",
      type: "select",
      span: 24,
      options: [
        { label: "子公司", value: 0 },
        { label: "关联公司", value: 1 },
      ],
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
  ];
  const handleCancel = () => {
    form.resetFields();
    setConfirmLoading(false);
    onCancel();
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
      setConfirmLoading(true);
      if (record) {
      } else {
        addCustomerCompany({ ...values, customerId: customerId }).then(
          (data) => {
            console.log(data);
            setConfirmLoading(false);
            form.resetFields();
            onSubmit();
          }
        );
      }
    });
  };
  useEffect(() => {
    if (visible) {
      console.log(record);
      form.setFieldsValue(record);
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      title="子/关联公司"
      okText="提交"
      cancelText="取消"
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        {
          <Row gutter={32}>
            {formList.map((col) => {
              if (col.render) {
                return col.render();
              }
              if (col.type === "input") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item
                      name={col.name}
                      label={col.label}
                      rules={col.rules}
                    >
                      <Input></Input>
                    </Form.Item>
                  </Col>
                );
              }
              if (col.type === "inputNumber") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item
                      name={col.name}
                      label={col.label}
                      rules={col.rules}
                    >
                      <InputNumber style={{ width: "100%" }}></InputNumber>
                    </Form.Item>
                  </Col>
                );
              }
              if (col.type === "select") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item
                      name={col.name}
                      label={col.label}
                      rules={col.rules}
                    >
                      <Select options={col.options}></Select>
                    </Form.Item>
                  </Col>
                );
              }
              if (col.type === "cascader") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item
                      name={col.name}
                      label={col.label}
                      rules={col.rules}
                    >
                      <Cascader options={col.options}></Cascader>
                    </Form.Item>
                  </Col>
                );
              }
              if (col.type === "datePicker") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item name={col.name} label={col.label}>
                      <DatePicker style={{ width: "100%" }}></DatePicker>
                    </Form.Item>
                  </Col>
                );
              }
              return null;
            })}
          </Row>
        }
      </Form>
    </Modal>
  );
};

export default ModalCustomerSubsidiary;
