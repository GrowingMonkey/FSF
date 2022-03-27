import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { myJobList } from "../services/project";


/**
 * 项目查询select控件
 * @param {props} param0 
 */
const ProjectSearch = ({ value = {}, CustomerStyle = {}, onChange }) => {
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
        if (!("projectId" in value)) {
            setCustomerId(customerId);
        }
        if (!("projectName" in value)) {
            setCustomerName(customerName);
        }
        triggerChange({
            projectId: customerId,
            projectName: customerName,
        });
    };
    const handleSearch = (value) => {
        myJobList({ pageNo: 1, pageSize: 1000, name: value ? value : '' }).then((res) => {
            const { data } = res;
            console.log(data.list);
            if (data.list) {
                setOptions(
                    data.list.map((item) => {
                        return (
                            <Option key={`${item.projectId}/${item.name}`}>
                                {item.name}/{item.customerName}
                            </Option>
                        );
                    })
                );
            } else {
                setOptions([])
            }
        });
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

export default ProjectSearch;
