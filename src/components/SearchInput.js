// TODO
import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { ulfq } from "../services/customer";
/**
 * 员工列表，同事列表select组件
 * @param {props} param0 
 */
const SearchInput = ({ value = {}, onChange, filedProps = {} }) => {
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

    //单选
    if (!Array.isArray(newValue)) {

      let list = newValue.split("/");
      let id = list[0];
      let name = list[1];

      console.log(id, name);
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
    } else {
      //多选

      let ArrayValue = [];
      newValue.map(item => {
        let list = item.split("/");
        let id = list[0];
        let name = list[1];
        if (!("recommenderName" in value)) {
          setRecommenderName(name);
        }
        if (!("recommenderUserId" in value)) {
          setRecommenderUserId(id);
        }
        ArrayValue.push({
          recommenderName: name,
          recommenderUserId: id,
        })
      })
      triggerChange(ArrayValue)
    }
  };

  const handleSearch = (value) => {
    if (value) {
      ulfq({ name: value }).then((res) => {
        const { data } = res;
        setOptions(
          data.list.map((item) => {
            return (
              <Option key={`${item.userId}/${item.name}`}>{item.name}</Option>
            );
          })
        );
      });
    } else {
      ulfq({ name: '' }).then((res) => {
        const { data } = res;
        setOptions(
          data.list.map((item) => {
            return (
              <Option key={`${item.userId}/${item.name}`}>{item.name}</Option>
            );
          })
        );
      })
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
      onFocus={() => handleSearch('')}
      onSearch={debouncedSeach}
      onChange={onRecommenderNameChange}
      notFoundContent={null}
      {...filedProps}
    >
      {options}
    </Select>
  );
};

export default SearchInput;
