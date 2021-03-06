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
            message.success('????????????');
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
        //???????????????
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
                        label="????????????"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '???????????????',
                            },
                        ]}
                        placeholder="?????????????????????"
                    />


                    <ProFormTextArea
                        label="????????????"
                        width="xl"
                        name="details"
                        rules={[
                            {
                                required: true,
                                message: '?????????????????????',
                            },
                        ]}
                        placeholder="????????????????????????????????????"
                    />
                    <ProFormSelect showSearch
                        width="md"
                        fieldProps={{//???????????????select???onChange???????????????????????????????????????????????????onChange??????
                            onSearch: (val) => InputChange(val),
                            onChange: (e) => handleChange(e)
                        }}
                        name="receiver"
                        label="?????????"
                        help=""//??????
                        options={employList}
                    />

                    <ProFormRadio.Group
                        options={[
                            {
                                value: '0',
                                label: '????????????',
                            },
                            {
                                value: '1',
                                label: '????????????',
                            },
                            {
                                value: '2',
                                label: '????????????',
                            },
                            {
                                value: '3',
                                label: '????????????',
                            },
                            {
                                value: '4',
                                label: '????????????',
                            },
                            {
                                value: '5',
                                label: '????????????',
                            }
                        ]}
                        defaultValue={selectType}
                        onChange={changeType}
                        label="????????????"
                        help=""//??????
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
                                        request={async () => {//?????????select????????????
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
                                            message: '?????????????????????',
                                        }]}
                                        options={[
                                            {
                                                value: '1',
                                                label: '?????????',
                                            },
                                            {
                                                value: '2',
                                                label: '?????????',
                                            },
                                            {
                                                value: '3',
                                                label: '?????????',
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
