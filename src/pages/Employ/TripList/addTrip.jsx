import { Card, message } from 'antd';
import ProForm, {
    ProFormDatePicker,
    ProFormDependency,
    ProFormSearchSelect,
    ProFormDigit,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { cstList } from '@/services/customer';
import { selectPList } from '@/services/project';
import { selectTalentList } from '@/services/talent';
import { addTrip } from '@/services/employ'
// import { fakeSubmitForm } from './service';

const getData = async (options) => {
    let result = {};
    switch (+options.selectType) {
        case 0:
            result = await cstList({ name: options.selectSearchValue });
            break;
        case 1:
            result = await selectPList({ name: options.selectSearchValue });
            break;
        case 2:
            result = await selectTalentList({ name: options.selectSearchValue });

    }
    return result;
}
const addTripC = () => {
    const [selectType, setSelectType] = useState('');
    const [selectList, setSelectList] = useState([]);
    const [selectSearchValue, setSelectSearchVlaue] = useState('');
    useEffect(async () => {
        let result = await getData({ selectType, selectSearchValue });
        const { data } = result;
        setSelectList(data?.list || []);
        console.log(selectList);
    }, [selectType, selectSearchValue]);
    const { run } = useRequest(addTrip, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/employ/trip-list`)
        },
    });

    const onFinish = async (values) => {
        run(values);
    };
    const changeType = (e) => {
        setSelectType(e.target.value);
        setSelectList([]);
    }
    const InputChange = (e) => {
        const { keyWords } = e;
        //搜索框的值
        setSelectSearchVlaue(keyWords);
    }
    return (
        <PageContainer content="">
            <Card bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        margin: 'auto',
                        marginTop: 8,
                        maxWidth: 600,
                    }}
                    name="basic"
                    layout="vertical"
                    initialValues={{
                        public: '1',
                    }}
                    onFinish={onFinish}
                >
                    <ProFormText
                        width="md"
                        label="提醒标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
                            },
                        ]}
                        placeholder="给目标起个名字"
                    />
                    <ProFormDatePicker
                        label="提醒日期"
                        width="md"
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: '请选择起止日期',
                            },
                        ]}
                        placeholder={['开始日期']}
                    />

                    <ProFormTextArea
                        label="提醒内容"
                        width="xl"
                        name="goal"
                        rules={[
                            {
                                required: true,
                                message: '请输入目标描述',
                            },
                        ]}
                        placeholder="请输入你的阶段性工作目标"
                    />
                    <ProFormRadio.Group
                        options={[
                            {
                                value: '0',
                                label: '客户提醒',
                            },
                            {
                                value: '1',
                                label: '职位提醒',
                            },
                            {
                                value: '2',
                                label: '人选提醒',
                            },
                            {
                                value: '3',
                                label: '面试提醒',
                            },
                            {
                                value: '4',
                                label: '待办事项',
                            },
                            {
                                value: '5',
                                label: '其他提醒',
                            }
                        ]}
                        defaultValue={selectType}
                        onChange={changeType}
                        label="日程类型"
                        help=""//备注
                        name="type"
                    />
                    <ProFormDependency name={['type']}>
                        {({ type }) => {
                            if (+type == 0 || +type == 1 || +type == 2) {
                                return (

                                    <ProFormSelect
                                        showSearch
                                        width="md"
                                        name="workId"
                                        request={async () => {//返回的select网络请求
                                            let res = [];
                                            selectList.map(item => {
                                                let temp = {};
                                                temp['label'] = item.name;
                                                temp['value'] = +selectType == 0 ? item.customerId : +selectType == 1 ? item.projectId : item.talentId
                                                res.push(temp)
                                            });
                                            return res;
                                        }

                                        }
                                        fieldProps={{
                                            style: {
                                                margin: '8px 0',
                                                display: type === '2' || type === '1' || type === '0' ? 'block' : 'none',
                                            },
                                        }}
                                        rules={[{
                                            required: true,
                                            message: '请输入目标描述',
                                        }]}
                                        options={[
                                            {
                                                value: '1',
                                                label: '同事甲',
                                            },
                                            {
                                                value: '2',
                                                label: '同事乙',
                                            },
                                            {
                                                value: '3',
                                                label: '同事丙',
                                            },
                                        ]}


                                    />
                                );
                            } else {
                                return null;
                            }

                        }}
                    </ProFormDependency>
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default addTripC;
