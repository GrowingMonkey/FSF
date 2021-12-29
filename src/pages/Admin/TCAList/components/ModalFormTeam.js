import { useState, useEffect } from "react";
import { Modal, Form, Input, Cascader } from "antd";
import { info, getCodeByProvinceName } from "china-region";
import { cityList } from "../../../../utils/CityList";
import { addTCA, updateTCA } from "../../../../services/admin";

const ModalFormTeam = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增团队");
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        let payload = { ...values };
        if (payload.cityCode.length === 2) {
          payload.cityCode = payload.cityCode[1];
        }
        if (payload.cityCode.length === 1) {
          payload.cityCode = payload.cityCode[0];
        }
        if (record) {
          updateTCA({ id: record.id, ...payload }).then(() => {
            onSubmit();
            form.resetFields();
            setConfirmLoading(false);
          });
        } else {
          addTCA({ ...payload, level: 2 }).then(() => {
            onSubmit();
            form.resetFields();
            setConfirmLoading(false);
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  useEffect(() => {
    if (visible) {
      if (record) {
        let value = { ...record };
        let cityInfo = info(`${value.cityCode}`);
        console.log(cityInfo);
        let provinceCode = "";
        let prefectureCode = cityInfo.code;
        if (cityInfo.prefecture !== cityInfo.province) {
          provinceCode = getCodeByProvinceName(cityInfo.province);
        } else {
          provinceCode = prefectureCode;
        }
        value.cityCode = [provinceCode, prefectureCode];
        console.log(value);
        form.setFieldsValue({ ...value });
        setModalTitle("编辑团队");
      } else {
        setModalTitle("新增团队");
      }
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      title={modalTitle}
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
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="cityCode" label="城市">
          <Cascader options={cityList} placeholder="请选择" />
        </Form.Item>
        <Form.Item name="address" label="地址">
          <Input></Input>
        </Form.Item>
        <Form.Item name="superiorId" label="上级">
          <Input></Input>
        </Form.Item>
        <Form.Item name="details" label="说明">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFormTeam;
