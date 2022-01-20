import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { ulfq } from "../../../../services/customer";

const UserSearch = ({ value = {}, onChange, filedProps = {} }) => {
  const { Option } = Select;
  const [comId, setComId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [options, setOptions] = useState([]);
  const triggerChange = (changedValue) => {
    onChange?.({
      comId,
      userId,
      name,
      ...value,
      ...changedValue,
    });
  };
  const onNameChange = (newValue) => {
    //单选
    if (!Array.isArray(newValue)) {
      let list = newValue.split("/");
      let comId = list[0];
      let userId = list[1];
      let name = list[2];
      if (!("comId" in value)) {
        setComId(comId);
      }
      if (!("userId" in value)) {
        setUserId(userId);
      }
      if (!("name" in value)) {
        setName(name);
      }
      triggerChange({
        comId: comId,
        userId: userId,
        name: name,
      });
    } else {
      let ArrayValue = [];
      newValue.map(item => {
        let list = item.split("/");
        let comId = list[0];
        let userId = list[1];
        let name = list[2];
        if (!("comId" in value)) {
          setComId(comId);
        }
        if (!("userId" in value)) {
          setUserId(userId);
        }
        if (!("name" in value)) {
          setName(name);
        }
        ArrayValue.push({
          comId: comId,
          userId: userId,
          name: name
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
              <Option key={`${item.comId}/${item.userId}/${item.name}`}>
                {item.name}
              </Option>
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
      onChange={onNameChange}
      notFoundContent={null}
      {...filedProps}
    >
      {options}
    </Select>
  );
};

export default UserSearch;
