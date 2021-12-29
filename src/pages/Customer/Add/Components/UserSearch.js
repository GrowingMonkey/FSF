import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { ulfq } from "../../../../services/customer";

const UserSearch = ({ value = {}, onChange }) => {
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
  };
  const handleSearch = (value) => {
    if (value) {
      ulfq({ name: value }).then((data) => {
        console.log(data.list);
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
      onChange={onNameChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

export default UserSearch;
