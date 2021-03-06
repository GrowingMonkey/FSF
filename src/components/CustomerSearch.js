import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { cstList, selectCustomerForSF } from "../services/customer";
import { selectCustomerListForProject } from "@/services/project";

/**
 * 客户查询select控件
 * @param {props} param0 
 */
const CustomerSearch = ({ value = {}, CustomerStyle = {}, url = 0, onChange }) => {
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
    if (url == 1) {
      selectCustomerListForProject({ pageNo: 1, pageSize: 1000, name: value ? value : '' }).then((res) => {
        const { data } = res;
        console.log(data.list);
        if (data.list) {
          setOptions(
            data.list.map((item) => {
              return (
                <Option key={`${item.customerId}/${item.name}`}>
                  {item.name}
                </Option>
              );
            })
          );
        } else {
          setOptions([])
        }
      });
    } else if (url == 2) {
      selectCustomerForSF({ pageNo: 1, pageSize: 1000, name: value ? value : '' }).then((res) => {
        const { data } = res;
        console.log(data.list);
        if (data.list) {
          setOptions(
            data.list.map((item) => {
              return (
                <Option key={`${item.customerId}/${item.name}`}>
                  {item.name}
                </Option>
              );
            })
          );
        } else {
          setOptions([])
        }
      });
    } else {
      cstList({ pageNo: 1, pageSize: 1000, name: value ? value : '' }).then((res) => {
        const { data } = res;
        console.log(data.list);
        if (data.list) {
          setOptions(
            data.list.map((item) => {
              return (
                <Option key={`${item.customerId}/${item.name}`}>
                  {item.name}
                </Option>
              );
            })
          );
        } else {
          setOptions([])
        }
      });
    }
  }
  const debouncedSeach = debounce(handleSearch, 250);
  return (
    <Select
      style={{ ...CustomerStyle }}
      showSearch
      placeholder=""
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onFocus={() => handleSearch('')}
      onSearch={debouncedSeach}
      onChange={onCustomerChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

export default CustomerSearch;
