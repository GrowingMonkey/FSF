import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { selectTalentList } from "../services/talent";
/**
 * 人选查询select组件
 * @param {props} param0 
 */
const TalentSearch = ({ value = {}, onChange, filedProps = {} }) => {
  const { Option } = Select;
  const [talentId, setTalentId] = useState(null);
  const [name, setName] = useState(null);
  const [options, setOptions] = useState([]);
  const triggerChange = (changedValue) => {
    onChange?.({
      talentId,
      name,
      ...value,
      ...changedValue,
    });
  };
  const onCustomerChange = (newValue) => {
    debugger
    if (Array.isArray(newValue)) {
      let newArray = [];
      newValue.map((item) => {
        let list = item.split("/");
        let talentId = list[0];
        let name = list[1];
        newArray.push({
          talentId, name
        })
      })
      triggerChange({
        talents: newArray
      });
    } else {
      let list = newValue.split("/");
      let talentId = list[0];
      let name = list[1];
      if (!("talentId" in value)) {
        setTalentId(talentId);
      }
      if (!("name" in value)) {
        setName(name);
      }
      triggerChange({
        talentId: talentId,
        name: name,
      });
    }
  };
  const handleSearch = (value) => {
    if (value) {
      selectTalentList({ pageNo: 1, pageSize: 1000, name: value }).then(
        (res) => {
          const { data } = res;
          console.log(data.list);
          setOptions(
            data.list.map((item) => {
              return (
                <Option key={`${item.talentId}/${item.name}`}>
                  {item.name}
                </Option>
              );
            })
          );
        }
      );
    } else {
      setOptions([]);
    }
  };
  const debouncedSeach = debounce(handleSearch, 250);
  return (
    <Select
      {...filedProps}
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

export default TalentSearch;
