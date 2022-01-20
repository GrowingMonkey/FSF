import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { cstList } from "../services/customer";


/**
 * 客户查询select控件
 * @param {props} param0 
 */
const CustomerSearch = ({ value = {}, CustomerStyle = {}, onChange }) => {
  const { Option } = Select;
  const [customerId, setCustomerId] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [options, setOptions] = useState([]);
  const triggerChange = (changedValue) => {
    onChange?.({
      customerId,
      customerName,
      ...value,
      ...changedValue,
    });
  };
  const onCustomerChange = (newValue) => {
    let list = newValue.split("/");
    let customerId = list[0];
    let customerName = list[1];
    if (!("customerId" in value)) {
      setCustomerId(customerId);
    }
    if (!("customerName" in value)) {
      setCustomerName(customerName);
    }
    triggerChange({
      customerId: customerId,
      customerName: customerName,
    });
  };
  const handleSearch = (value) => {
    if (value) {
      cstList({ pageNo: 1, pageSize: 1000, name: value }).then((res) => {
        const { data } = res;
        console.log(data.list);
        setOptions(
          data.list.map((item) => {
            return (
              <Option key={`${item.customerId}/${item.name}`}>
                {item.name}
              </Option>
            );
          })
        );
      });
    } else {
      setOptions([]);
    }
  };
  const debouncedSeach = debounce(handleSearch, 250);
  return (
    <Select
      style={{ ...CustomerStyle }}
      showSearch
      placeholder=""
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={debouncedSeach}
      onChange={onCustomerChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

export default CustomerSearch;
