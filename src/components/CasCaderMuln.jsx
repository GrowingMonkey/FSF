import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Cascader, Tag } from 'antd';

class CascaderMul extends PureComponent {
    state = {
        value: [],
    };

    allLabel = [];

    componentDidMount() {
        const { options } = this.props;
        const deepLoop = (selectedOptions) => {
            selectedOptions.forEach((item) => {
                if (item.children) {
                    deepLoop(item.children, this.allLabel);
                } else {
                    this.allLabel.push(item);
                }
            });
        };
        deepLoop(options);
    }

    onChange = (v) => {
        const { value } = this.state;
        const lastValue = v[v.length - 1];
        if (!value.includes(lastValue)) {
            this.setState({
                value: [...value, lastValue],
            });
        }
    };

    displayRender = () => {
        const { value } = this.state;
        const items = _.unionBy(this.allLabel, 'value').filter((item) => value.includes(item.value));
        return items.map((item) => {
            if (value.includes(item.value)) {
                return (
                    <Tag closable key={item.label}>
                        {item.label}
                    </Tag>
                );
            }
            return null;
        });
    };

    render() {
        const { style, options } = this.props;
        const { value } = this.state;
        return (
            <>
                <Cascader
                    options={options}
                    expandTrigger="hover"
                    onChange={this.onChange}
                    placeholder="请选择"
                    style={style}
                    fieldNames={{ label: 'label', value: 'value', children: 'children' }}
                    allowClear={false}
                    value={value || []}
                    displayRender={this.displayRender}
                />
            </>
        );
    }
}

export default CascaderMul;