import { useState, useRef } from 'react';
import { Select, DatePicker, Checkbox, Space } from 'antd';
import debounce from 'lodash/debounce';
import { cstList } from '../services/customer';
import ProForm, { ProFormCheckbox } from '@ant-design/pro-form';

/**
 * 客户查询select控件
 * @param {props} param0
 */
const SelfDate = ({
  value = {},
  CustomerStyle = {},
  returnType = 'string',
  onChange,
  filedProps,
}) => {
  const startElement = useRef();
  const endTimeElement = useRef();
  const isNowElement = useRef();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isNow, setIsNow] = useState(false);
  const triggerChange = (changedValue) => {
    onChange?.({
      ...value,
      ...changedValue,
    });
  };
  const onCustomerChange = (newValue, type) => {
    let startTimes = startTime,
      endTimes = endTime,
      isNows = isNow;
    switch (type) {
      case 'startTime':
        newValue && setStartTime(returnType == 'string' ? newValue.format('YYYY-MM-DD') : newValue);
        if (newValue) {
          startTimes = returnType == 'string' ? newValue.format('YYYY-MM-DD') : newValue;
        }
        break;
      case 'endTime':
        newValue && setEndTime(returnType == 'string' ? newValue.format('YYYY-MM-DD') : newValue);
        if (newValue) {
          endTimes = returnType == 'string' ? newValue.format('YYYY-MM-DD') : newValue;
        }
        if (newValue) {
          isNowElement.current.checked = false;
          setIsNow(false);
        }
        break;
      case 'isNow':
        console.log(newValue.target.checked);
        isNows = newValue.target.checked;
        setIsNow(newValue.target.checked);
        break;
    }
    console.log(startTimes, endTimes, isNows);
    triggerChange({
      startTime: startTimes,
      endTime: endTimes,
      isNow: isNows,
    });
  };

  return (
    <>
      <Space>
        <DatePicker
          ref={startElement}
          picker="month"
          onChange={(e) => onCustomerChange(e, 'startTime')}
        ></DatePicker>
        至
        <DatePicker
          picker="month"
          ref={endTimeElement}
          onChange={(e) => onCustomerChange(e, 'endTime')}
        ></DatePicker>
        <input
          ref={isNowElement}
          type="checkbox"
          style={{ lineHeight: '22px', width: '18px', height: '18px', marginTop: '4px' }}
          onChange={(e) => onCustomerChange(e, 'isNow')}
        />
        至今
      </Space>
    </>
  );
};

export default SelfDate;
