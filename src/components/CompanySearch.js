// TODO
import { useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";
import { TCAList } from "../services/customer";
/**
 * 分公司列表
 * @param {props} param0 
 */
const CompanySearch = ({ value = {}, onChange, filedProps = {} }) => {
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
        debugger
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
            debugger
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
            TCAList({ name: value }).then((res) => {
                const { data } = res;
                setOptions(
                    data.list.map((item) => {
                        return (
                            <Option key={`${item.id}/${item.name}`}>{item.name}</Option>
                        );
                    })
                );
            });
        } else {
            TCAList({ name: '' }).then((res) => {
                const { data } = res;
                setOptions(
                    data.list.map((item) => {
                        return (
                            <Option key={`${item.id}/${item.name}`}>{item.name}</Option>
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

export default CompanySearch;
