import { useState } from "react";
import { Select, message } from "antd";
import debounce from "lodash/debounce";
import { selectTPListForInvoice } from "@/services/eco";
/**
 * 人选查询select组件
 * @param {props} param0 
 */
const TalentSearch = ({ value = {}, onChange, filedProps = {}, applyUserId, customerId = '' }) => {
    const { Option } = Select;
    const [options, setOptions] = useState([]);
    const [sourceList, setSourceList] = useState([])
    const triggerChange = (changedValue) => {
        onChange?.({
            ...changedValue,
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

            let user = applyUserId();
            console.log(user);
            if (!user) {
                message.error('请先选择客户');
                return;
            }
            selectTPListForInvoice({ pageNo: 1, pageSize: 10, name: value, appUserId: user.recommenderUserId, customerId: customerId }).then(
                (res) => {
                    const { data } = res;
                    setOptions(
                        data.list.map((item) => {
                            return (
                                <Option key={item.id}>
                                    {item.talentName}
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
    console.log('value');
    console.log(value);
    return (
        <Select
            style={{ width: "168px" }}
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
