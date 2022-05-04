import { Cascader, Tag } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

const CascaderMul = (props) => {
    const { options, style = {}, onChange } = props;
    const [value, setValue] = useState([]);
    const [allLabel, setAllLabel] = useState([]);
    const deepLoop = (selectedOptions) => {
        selectedOptions.forEach((item) => {
            if (item.children && item.children.length > 0) {
                deepLoop(item.children, allLabel);
            } else {
                allLabel.push(item);
            }
        });
    };
    deepLoop(options);
    const cusOnChange = (v) => {
        const lastValue = v[v.length - 1];
        if (!value.includes(lastValue)) {
            const vs = [...value, lastValue];
            setValue([...value, lastValue]);
            console.log(value)

        }
    }
    const deleteTag = (e, item) => {
        console.log(item);
        console.log(value);
        let a = [...value];
        a.splice(a.indexOf(item.value), 1);
        setValue([...a])
    }
    const displayRender = () => {
        console.log(allLabel);
        const items = _.unionBy(allLabel, 'value').filter((item) => value.includes(item.value));
        console.log(items);
        console.log(value)
        onChange?.({
            value
        })
        return items.map((item) => {
            if (value.includes(item.value)) {
                return (
                    <Tag closable key={item.label} style={{ lineHeight: '17px' }} onClose={(e) => deleteTag(e, item)}>
                        {item.label}
                    </Tag>
                );
            } else {
                return (<Tag closable key={item.label}>
                    {item.label}
                </Tag>)
            }
            return null;
        });
    };
    return (
        <>
            <Cascader
                options={options}
                expandTrigger="hover"
                onChange={cusOnChange}
                placeholder="请选择"
                style={style}
                fieldNames={{ label: 'label', value: 'value', children: 'children' }}
                allowClear={false}
                value={value || []}
                displayRender={displayRender}
            />
        </>
    )
}
export default CascaderMul;