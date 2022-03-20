import { Cascader, Tag } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

const CascaderMul = (props) => {
    const { options, style = {} } = props;
    const [value, setValue] = useState([]);
    const [allLabel, setAllLabel] = useState([]);
    const deepLoop = (selectedOptions) => {
        selectedOptions.forEach((item) => {
            console.log(item);
            if (item.children && item.children.length > 0) {
                deepLoop(item.children, allLabel);
            } else {
                allLabel.push(item);
            }
        });
    };
    deepLoop(options);
    const onChange = (v) => {
        const lastValue = v[v.length - 1];
        if (!value.includes(lastValue)) {
            setValue([...value, lastValue]);
        }
    }
    const displayRender = () => {
        console.log(allLabel);
        const items = _.unionBy(allLabel, 'value').filter((item) => value.includes(item.value));
        console.log(items);
        return items.map((item) => {
            if (value.includes(item.value)) {
                return (
                    <Tag closable key={item.label} style={{ lineHeight: '17px' }}>
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
                onChange={onChange}
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