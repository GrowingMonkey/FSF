import { useState, useRef } from 'react';
import { Select, DatePicker, Checkbox, Space } from 'antd';
import moment from 'moment'
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
  defaultValue = null,
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
  const formatDefault = (type) => {
    if (type == 'start') {
      if (defaultValue) {
        if (defaultValue.startTime) {
          return moment(defaultValue.startTime, 'YYYY/MM');
        } else {
          return;
        }
      } else {
        if (value.startTime && value.startTime != '-') {
          return moment(value.startTime, 'YYYY/MM');
        } else {
          return '';
        }
      }
    } else {
      if (defaultValue) {
        if (defaultValue && defaultValue.endTime != '至今' && defaultValue.endTime != null) {
          console.log('end', defaultValue.endTime)
          let str = defaultValue.endTime.split('.').join('-');
          console.log(moment(str, 'YYYY/MM'))
          return moment(str, 'YYYY/MM');
        } else {
          return;
        }
      } else {
        if (value && value.endTime != '至今' && value.endTime != null && value.startTime != '-') {
          console.log('end', value.endTime)
          let str = value.endTime.split('.').join('-');
          console.log(moment(str, 'YYYY/MM'))
          return moment(str, 'YYYY/MM');
        } else {
          return "";
        }
      }
    }
  }
  console.log(value)
  const startT = formatDefault('start');
  const endT = formatDefault('endT');
  console.log('startandend', startT, endT);
  return (
    <>
      <Space>
        <DatePicker
          ref={startElement}
          picker="month"
          placeholder="请选择"
          defaultValue={startT}
          onChange={(e) => onCustomerChange(e, 'startTime')}
        ></DatePicker>
        至
        <DatePicker
          picker="month"
          placeholder="请选择"
          defaultValue={endT}
          // value={value.endTime || ''}
          ref={endTimeElement}
          // defaultValue={moment(defaultValue?.endTime || null, 'YYYY/MM')}
          onChange={(e) => onCustomerChange(e, 'endTime')}
        ></DatePicker>
        <div style={{ display: 'inline-block', width: '50px', verticalAlign: 'sub' }}>
          <input
            ref={isNowElement}
            type="checkbox"
            style={{ lineHeight: '22px', width: '18px', height: '18px', marginTop: '4px' }}
            onChange={(e) => onCustomerChange(e, 'isNow')}
          />
        至今
        </div>
      </Space>
    </>
  );
};

export default SelfDate;
