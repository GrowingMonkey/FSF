import { useState } from 'react';
import { Select, message, Tooltip } from 'antd';
import debounce from 'lodash/debounce';
import { invoiceInfoList } from '@/services/eco';
/**
 * 人选查询select组件
 * @param {props} param0
 */
const TalentSearch = ({ value = {}, onChange, filedProps = {}, applyUserId }) => {
    const { Option } = Select;
    const [options, setOptions] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const triggerChange = (changedValue) => {
        onChange?.({
            ...changedValue,
        });
    };

    const onCustomerChange = (newValue) => {
        if (Array.isArray(newValue)) {
            let newArray = [];
            let id = sourceList.map((item, index) => {
                if (item.id == newValue) {
                    console.log(index, newValue);
                    newArray.push(item);
                }
            });
            console.log(id);
            newArray.push(JSON.parse(newValue));
            triggerChange({
                ...newArray,
            });
        } else {
            let currentI = null;
            sourceList.map((item, index) => {
                if (item.id == newValue) {
                    currentI = item;
                }
            });

            triggerChange({
                ...currentI,
            });
        }
    };
    const handleSearch = (value) => {
        if (value) {
            invoiceInfoList({ pageNo: 1, pageSize: 10, name: value.trim() }).then((res) => {
                const { data } = res;
                setOptions(
                    data.list.map((item) => {
                        return (
                            <Option key={item.id} title={`${item.name}`} style={{ width: '100%' }}>
                                <Tooltip><div>{item.name}</div></Tooltip>
                            </Option>
                        );
                    }),
                );
                setSourceList(res.data.list);
            });
        } else {
            invoiceInfoList({ pageNo: 1, pageSize: 10, name: '' }).then((res) => {
                const { data } = res;
                setOptions(
                    data.list.map((item) => {
                        return (
                            <Option key={item.id} title={`${item.name}`} style={{ width: '100%' }}>
                                <Tooltip><div>{item.name}</div></Tooltip>
                            </Option>
                        );
                    }),
                );
                setSourceList(res.data.list);
            });
        }
    };
    const debouncedSeach = debounce(handleSearch, 250);
    console.log('value');
    console.log(value);
    return (
        <Select
            {...filedProps}
            showSearch
            placeholder=""

            value={value?.talents?.talentName}
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
