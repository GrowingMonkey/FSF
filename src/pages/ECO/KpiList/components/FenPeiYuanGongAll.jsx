import { useState } from "react";
import { Select, message } from "antd";
import debounce from "lodash/debounce";
import { ulfqAll } from "@/services/customer";/**
 * 人选查询select组件
 * @param {props} param0 
 */
const TalentSearch = (props) => {
    console.log(props)
    const { value = {}, onChange, filedProps = {}, applyUserId } = props;
    const { Option } = Select;
    const [options, setOptions] = useState([]);
    const [sourceList, setSourceList] = useState([])
    const triggerChange = (changedValue) => {
        onChange?.({
            ...changedValue,
            value: changedValue
        });
    };

    const onCustomerChange = (newValue) => {
        debugger
        if (Array.isArray(newValue)) {
            let newArray = [];
            let id = sourceList.map((item, index) => {
                if (item.id == newValue) {
                    console.log(index, newValue)
                    newArray.push(item);
                }
            });
            console.log(id);
            newArray.push(JSON.parse(newValue));
            triggerChange([
                ...newArray
            ]);
        } else {
            let currentI = null
            sourceList.map((item, index) => {
                if (item.id == newValue) {
                    currentI = item;
                }
            });

            triggerChange({
                ...currentI
            });
        }
    };
    const handleSearch = (value) => {
        if (value) {
            ulfqAll({ pageNo: 1, pageSize: 10, name: value }).then(
                (res) => {
                    const { data } = res;
                    setOptions(
                        data.list.map((item) => {
                            return (
                                <Option key={item.id}>
                                    {item.name}
                                </Option>
                            );
                        })
                    );
                    setSourceList(res.data.list);
                }
            );
        } else {
            setOptions([]);
        }
    };
    const debouncedSeach = debounce(handleSearch, 250);
    console.log('value111');
    console.log(value);
    return (
        <Select
            style={{ width: "100%" }}
            {...filedProps}
            showSearch
            placeholder=""
            value={value.name}
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
