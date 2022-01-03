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
import { selectEmployList, addMsg } from '@/services/employ'
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
    const [employList, setEmployList] = useState([]);
    const [receiver, setReceiver] = useState('');
    useEffect(async () => {
        let result = await getData({ selectType, selectSearchValue });
        const { data } = result;
        setSelectList(data?.list || []);
        console.log(selectList);
    }, [selectType, selectSearchValue]);
    useEffect(async () => {
        let ress = [];
        const { data } = await selectEmployList({ name: receiver });
        console.log(data);
        data?.list.map((item) => {
            let temp = {};
            temp['label'] = item.name;
            temp['value'] = item.userId + ',' + item.name;
            ress.push(temp)
        })
        console.log(ress);
        setEmployList(ress || []);
    }, [receiver])
    const { run } = useRequest(addMsg, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/employ/message-list`)
        },
    });

    const onFinish = async (values) => {
        run({ ...values, receiverId: values.receiver.split(",")[0], receiverName: values.receiver.split(",")[1] });
    };
    const handleChange = (e) => {
        console.log(e)
        setReceiver('');
    }
    const changeType = (e) => {
        setSelectType(e.target.value);
        setSelectList([]);
    }
    const InputChange = (e) => {
        setReceiver(e);
        //搜索框的值
    }
    const selectedReceiver = (e) => {
        console.log(e)
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


                    <ProFormTextArea
                        label="提醒内容"
                        width="xl"
                        name="details"
                        rules={[
                            {
                                required: true,
                                message: '请输入目标描述',
                            },
                        ]}
                        placeholder="请输入你的阶段性工作目标"
                    />
                    <ProFormSelect showSearch
                        width="md"
                        fieldProps={{//这里使用了select的onChange方法，必须使用这样的写法来进行调用onChange方法
                            onSearch: (val) => InputChange(val),
                            onChange: (e) => handleChange(e)
                        }}
                        name="receiver"
                        label="接受者"
                        help=""//备注
                        options={employList}
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
                                        onChange={selectedReceiver}
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
