import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { ulfq } from "../../../../services/customer";

const RecommenderSearch = ({ value = {}, onChange }) => {
  const { Option } = Select;
  const [recommenderName, setRecommenderName] = useState(null);
  const [recommenderUserId, setRecommenderUserId] = useState(null);
  const [options, setOptions] = useState([]);
  const triggerChange = (changedValue) => {
    onChange?.({
      recommenderName,
      recommenderUserId,
      ...value,
      ...changedValue,
    });
  };
  const onRecommenderNameChange = (newValue) => {
    let list = newValue.split("/");
    let id = list[0];
    let name = list[1];
    if (!("recommenderName" in value)) {
      setRecommenderName(name);
    }
    if (!("recommenderUserId" in value)) {
      setRecommenderUserId(id);
    }
    triggerChange({
      recommenderName: name,
      recommenderUserId: id,
    });
  };
  const handleSearch = (value) => {
    if (value) {
      ulfq({ name: value }).then((data) => {
        console.log(data.list);
        setOptions(
          data.list.map((item) => {
            return (
              <Option key={`${item.userId}/${item.name}`}>{item.name}</Option>
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
      showSearch
      placeholder=""
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={debouncedSeach}
      onChange={onRecommenderNameChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

export default RecommenderSearch;
