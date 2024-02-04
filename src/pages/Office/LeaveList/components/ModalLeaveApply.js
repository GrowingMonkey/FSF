import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Upload, Button, message } from "antd";
import { addLeave } from '@/services/office'
import { upload } from '@/utils/lib/upload';
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
import moment from 'moment'
// import { upload } from '@/utils/lib/upload'
import useTime from '@/components/useTime'

const ModalLeaveApply = ({ visible, onSubmit, onCancel, record }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { format, disabledDate, onOpenChange, timevalue, settimeValue, hackValue, setDates } = useTime();

  const [yearMsg, setYearMsg] = useState('');
  const [form] = Form.useForm();
  const formList = [
    {
      name: "leaveDate",
      label: "请假日期",
      type: "useTime",
      span: 6,
      rules: [{
        required: true,
        message: '请输入请假时间'
      }]
    },
    {
      name: "type",
      label: "请假类型",
      type: "select",
      span: 6,
      rules: [{
        required: true,
        message: '请选择请假类型'
      }],
      options: [
        { label: '事假', value: 0 },
        { label: '病假', value: 1 },
        { label: '婚假', value: 2 },
        { label: '丧假', value: 3 },
        { label: '产假', value: 4 },
        { label: '年假', value: 6 },
        { label: '其他', value: 5 }]
    },
    {
      name: "reason",
      label: "请假原因",
      type: "textArea",
      rules: [{
        required: true,
        message: '请输入请假原因'
      }],
      span: 6,
    },
    {
      name: "file",
      label: "附件",
      type: "file",
      span: 6,
    },
  ];
  const handleCancel = () => {
    onCancel()
  };
  const handleOk = () => {
    console.log(111);
    form.validateFields().then(value => {
      debugger
      console.log(value);
      addLeave({ reason: value.reason, file: fileUrl, type: value.type, startTime: moment(value?.leaveDate[0]).format('YYYY-MM-DD HH:mm:ss'), endTime: moment(value.leaveDate[1]).format('YYYY-MM-DD HH:mm:ss') }).then(res => {
        onSubmit()
      })
    })
  };
  const changeType = async (e) => {
    console.log(e);
    if (e == 6) {
      // let result = await getYearLeave();
      setYearMsg('当前年假剩余天数:' + 0)

    }
    else { setYearMsg('') }
  }
  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal
      forceRender
      visible={visible}
      title="请假申请"
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
        {formList.map((col) => {
          if (col.type === "input") {
            return (
              <Form.Item
                name={col.name}
                label={col.label}
                rules={col.rules}
                key={col.label}
              >
                <Input></Input>
              </Form.Item>
            );
          }
          if (col.type === "select") {
            return (
              <Form.Item
                name={col.name}
                label={col.label}
                rules={col.rules}
                extra={<div style={{ color: 'red' }}>{yearMsg}</div>}
                key={col.label}
              >
                <Select options={col.options} onChange={(value) => changeType(value)}></Select>
              </Form.Item>
            );
          }
          if (col.type === "datePicker") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
                <DatePicker style={{ width: "100%" }} format={"YYYY-MM-DD HH"}></DatePicker>
              </Form.Item>
            );
          }
          if (col.type === "textArea") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
                <TextArea
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            );
          }
          if (col.type === "dateRange") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            );
          }
          if (col.type === 'useTime') {
            return (<Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
              <RangePicker
                // @ts-ignore
                value={hackValue || timevalue} showTime format={'YYYY-MM-DD hh'}
                disabledDate={false} allowClear={false}
                disabledDate={(current) => {
                  const disabledTime = moment();
                  const hour = moment(disabledTime).hour();
                  return current && hour < 23 ? current < moment(disabledTime).subtract(1, 'd') : current < moment(disabledTime)
                }}
                hideDisabledOptions={true}
                disabledTime={(now, partial) => {
                  if (now) {
                    const disabledTime = moment();
                    const disabledDay = moment(disabledTime).date();
                    const nowDay = moment(now).date();
                    // console.log(nowDay, disabledDay)
                    if (disabledDay === nowDay) {
                      return ({
                        disabledHours: () => {
                          let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23];
                          let time = moment();
                          let hour = moment(time).hour();
                          for (let i = 0; i < hour + 1; i++) {
                            hours.push(i);
                          }

                          // console.log(hours);
                          return hours
                        }
                      })
                    } else {
                      return {
                        disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23]
                      }
                    }
                  }
                  return {}
                }}
                onCalendarChange={(val) => setDates(val)}
                onChange={(val) => settimeValue(val)}
                onOpenChange={onOpenChange}
              />
            </Form.Item>)
          }
          if (col.type === 'file') {
            return (<Form.Item name={col.name} label={col.label} key={col.label}>
              <Upload
                name="file"
                showUploadList={false}
                listType='picture-card'
                onChange={() => { }}
                customRequest={async (options) => {
                  let result = await upload(options.file, () => { console.log('chenggong') }, '/file/');
                  console.log(result.res);
                  if (result.res.status == 200) {
                    message.info('上传成功');
                    let name = result.name.split('/').filter(i => i.indexOf('.') > 0);
                    console.log(name)
                    console.log(result.res.requestUrls[0]);
                    form.setFieldsValue({ file: result.name.split('?')[0] });
                    setFileUrl(result.res.requestUrls[0])
                    console.log(form.getFieldValue('file'))

                  }
                  options.onSuccess();
                }}>
                {fileUrl ? (
                  <img
                    src={fileUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                    uploadButton
                  )}
              </Upload>

            </Form.Item>)
          }
          return null;
        })}
      </Form>
    </Modal>
  );
};

export default ModalLeaveApply;
