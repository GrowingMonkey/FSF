import { useState } from "react";
import { Select, message } from "antd";
import debounce from "lodash/debounce";
import { selectTPListForInvoice } from "@/services/eco";
/**
 * 人选查询select组件
 * @param {props} param0 
 */
const TalentSearchForEco = ({ value = {}, onChange, filedProps = {}, applyUser = '' }) => {
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
        let user = applyUser();
        selectTPListForInvoice({ pageNo: 1, pageSize: 1000, name: value, appUserId: user?.recommenderUserId }).then(
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

        // setOptions([]);

    };
    const handleFocus = () => {
        let user = applyUser();
        console.log(user)
        if (user && user.recommenderUserId) {
            handleSearch('');
        } else {
            message.error('请先选择服务顾问或申请人');
            return;
        }
    }
    const debouncedSeach = debounce(handleSearch, 250);
    return (
        <Select
            {...filedProps}
            showSearch
            placeholder=""
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onFocus={handleFocus}
            onSearch={debouncedSeach}
            onChange={onCustomerChange}
            notFoundContent={null}
        >
            {options}
        </Select>
    );
};

export default TalentSearchForEco;
