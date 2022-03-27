import { useState, useEffect } from "react";
import { Modal, Form, Input, Tree, Row, Col, Divider } from "antd";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { addRole, updateRole } from "../../../../services/admin";

const ModalForm = ({
  visible,
  onSubmit,
  onCancel,
  record,
  functionTree,
  menuTree,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [functionExpandedKeys, setFunctionExpandedKeys] = useState([]);
  const [menuExpandedKeys, setMenuExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [functionCheckedKeys, setFunctionCheckedKeys] = useState([]);
  const [menuCheckedkeys, setMenuCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [functionSelectedKeys, setFunctionSelectedKeys] = useState([]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        // console.log(values, checkedKeys.checked);
        if (record) {
          // console.log(functionCheckedKeys, menuCheckedkeys);
          let payload = {
            roleId: record.id,
            menuIds: [],
          };
          if (functionCheckedKeys.checked) {
            payload.menuIds.push(...functionCheckedKeys.checked);
          } else {
            payload.menuIds.push(...functionCheckedKeys);
          }
          if (menuCheckedkeys.checked) {
            payload.menuIds.push(...menuCheckedkeys.checked);
          } else {
            payload.menuIds.push(...menuCheckedkeys);
          }
          // console.log(payload.menuIds);
          updateRole(Object.assign(values, payload)).then(() => {
            setConfirmLoading(false);
            setCheckedKeys([]);
            form.resetFields();
            onSubmit();
          });
        } else {
          let payload = {
            menuIds: [...checkedKeys.checked],
          };
          addRole(Object.assign(values, payload)).then(() => {
            setConfirmLoading(false);
            setCheckedKeys([]);
            setFunctionCheckedKeys([]);
            setMenuCheckedKeys([]);
            form.resetFields();
            onSubmit();
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setConfirmLoading(false);
      });
  };
  const handleCancel = () => {
    form.resetFields();
    setCheckedKeys([]);
    setFunctionCheckedKeys([]);
    setMenuCheckedKeys([]);
    setConfirmLoading(false);
    onCancel();
  };
  const onFunctionExpand = (expandedKeysValue) => {
    setFunctionExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onMenuExpand = (expandedKeysValue) => {
    setMenuExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onFunctionCheck = (checkedKeysValue, info) => {
    if (info.checked) {
      let parentKey = info.node.parentKey;
      console.log(info.node.key, parentKey);
      if (parentKey) {
        if (checkedKeysValue?.checked?.indexOf(parentKey) === -1) {
          checkedKeysValue.checked.push(parentKey);
        }
      }
    }
    // console.log(info.checkedNodes, info);
    // console.log("onCheck", checkedKeysValue);
    setFunctionCheckedKeys(checkedKeysValue);
  };
  const onMenuCheck = (checkedKeysValue, info) => {
    if (info.checked) {
      let parentKey = info.node.parentKey;
      if (parentKey) {
        // console.log(checkedKeysValue.checked);
        if (checkedKeysValue.checked.indexOf(parentKey) === -1) {
          checkedKeysValue.checked.push(parentKey);
        }
      }
    }
    setMenuCheckedKeys(checkedKeysValue);
  };
  const onFunctionSelect = (selectedKeysValue, info) => {
    // console.log("onSelect", info);
    // setSelectedKeys(selectedKeysValue);
    setFunctionCheckedKeys(selectedKeysValue);
  };
  const onMenuSelect = (selectedKeysValue, info) => {
    setMenuCheckedKeys(selectedKeysValue);
  };
  useEffect(() => {
    if (visible) {
      if (record) {
        form.setFieldsValue({ ...record });
        let functionList = [];
        let menuList = [];
        record.permissionList.forEach((item) => {
          if (item.url.startsWith("/")) {
            functionList.push(item.id);
          }
          if (item.url.startsWith("route")) {
            menuList.push(item.id);
          }
        });
        // console.log(functionList, menuList);
        setFunctionCheckedKeys(functionList);
        setMenuCheckedKeys(menuList);
      }
    }
  }, [visible]);
  return (
    <Modal
      forceRender
      visible={visible}
      title="新增角色"
      okText="提交"
      cancelText="取消"
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      width={1000}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Row gutter={16}>
          <Col
            span={10}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
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
            <Form.Item name="detail" label="角色说明">
              <Input.TextArea></Input.TextArea>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Divider type="vertical" style={{ height: "100%" }} />
          </Col>
          <Col span={12} style={{ maxHeight: "600px", overflow: "scroll" }}>
            <Form.Item label="功能列表权限">
              <Tree
                checkable
                autoExpandParent={true}
                onExpand={onFunctionExpand}
                expandedKeys={functionExpandedKeys}
                onCheck={onFunctionCheck}
                checkedKeys={functionCheckedKeys}
                treeData={functionTree}
              // checkStrictly={true}
              />
            </Form.Item>
            <Form.Item label="菜单列表权限">
              <Tree
                checkable
                autoExpandParent={true}
                onExpand={onMenuExpand}
                expandedKeys={menuExpandedKeys}
                onCheck={onMenuCheck}
                checkedKeys={menuCheckedkeys}
                treeData={menuTree}
                checkStrictly={true}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalForm;
