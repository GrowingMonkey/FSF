import { useState } from 'react';
import { Select, message, Tooltip } from 'antd';
import debounce from 'lodash/debounce';
import { selectMyServiceFeeList } from '@/services/eco';
/**
 * 人选查询select组件
 * @param {props} param0
 */
const TalentSearch = ({ value = {}, onChange, filedProps = {}, applyUserId }) => {
  const { Option } = Select;
  const [options, setOptions] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const triggerChange = (changedValue) => {
    onChange?.({
      ...changedValue,
    });
  };

  const onCustomerChange = (newValue) => {
    if (Array.isArray(newValue)) {
      let newArray = [];
      let id = sourceList.map((item, index) => {
        if (item.id == newValue) {
          console.log(index, newValue);
          newArray.push(item);
        }
      });
      console.log(id);
      newArray.push(JSON.parse(newValue));
      triggerChange({
        ...newArray,
      });
    } else {
      let currentI = null;
      sourceList.map((item, index) => {
        if (item.id == newValue) {
          currentI = item;
        }
      });

      triggerChange({
        ...currentI,
      });
    }
  };
  const handleSearch = (value) => {
    // if (value) {
    selectMyServiceFeeList({ pageNo: 1, pageSize: 10, customerName: value }).then((res) => {
      const { data } = res;
      setOptions(
        data.list.map((item) => {
          return (
            <Option key={item.id} title={`${item.customerName}/¥${item.fee}`} style={{ width: '200px' }}>
              <Tooltip><div>¥{item.fee}/{item.customerName}</div></Tooltip>
            </Option>
          );
        }),
      );
      setSourceList(res.data.list);
    });
    // } else {
    //   setOptions([]);
    // }
  };
  const debouncedSeach = debounce(handleSearch, 250);
  console.log('value');
  console.log(value);
  return (
    <Select
      {...filedProps}
      showSearch
      placeholder=""
      value={value?.talents?.talentName}
      defaultActiveFirstOption={false}
      showArrow={false}
      onFocus={() => handleSearch('')}
      filterOption={false}
      onSearch={debouncedSeach}
      onChange={onCustomerChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

export default TalentSearch;
