import { Card, message, Form, Input, Button } from 'antd';
import ProForm, {
    ProFormDatePicker,
    ProFormDateTimePicker,
    ProFormUploadButton,
    ProFormDependency,
    ProFormSearchSelect,
    ProFormDigit,
    ProFormRadio,
    ProFormSelect,
    ProFormList,
    ProFormText,
    ModalForm,
    ProFormTextArea,
} from '@ant-design/pro-form';
import cloneDeep from "lodash/cloneDeep";

import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addServiceFee } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearch from '@/components/TalentSearch';
import CustomerSearch from '@/components/CustomerSearch';
import BFSearch from '../components/BFSearch';
import FenPeiYuanGong from '../components/FenPeiYuanGong'
import { useState } from 'react';
import { confirmUserKpi } from '@/services/eco'


const AddInvoice = () => {
    const [applyForm] = Form.useForm();
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const [bilibili, setBilibili] = useState(null);
    const [fenPeiList, setFenPeiList] = useState([]);
    const [sgrxOptions, setSgrxOptions] = useState([]);
    const [options, setOptions] = useState(0)
    const [noFenPeiMoney, setNoFenPeiMoney] = useState(null);
    const { run } = useRequest(addServiceFee, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/eco/bf-list`)
        },
    });

    /**
     * 
     * @param {Promise} values 
     */
    const onFinish = async (values) => {
        console.log(values)
        // run(values);
    };
    const computedMoney = () => {
        talentForm.validateFields().then(values => {
            console.log(values);
            let param = {
                serviceFee: values.serviceFee,
                rate: applyForm.getFieldValue('rate'),
                kpiUserInfos: []
            }
            values.allotPlan.map(item => {
                param.kpiUserInfos.push({ userId: item.empoylee.id, userName: item.empoylee.name, rate: item.rate });
            })
            confirmUserKpi(param).then(res => {
                console.log(res)
                let allotPlan = cloneDeep(values.allotPlan);
                allotPlan.map((item, index) => {
                    item.kpiFee = res.data[index].kpiFee;
                    item.commissionFee = res.data[index].commissionFee
                })
                console.log(applyForm.getFieldsValue());
                talentForm.setFieldsValue({
                    allotPlan: allotPlan
                })

            })
        })
    }
    const handleSubmit = () => {
        debugger
        Promise.all([
            applyForm.validateFields(),
            talentForm.validateFields(),
            noteForm.validateFields(),
        ]).then((values) => {
            console.log(values)
            run({ ...values[0], customerId: values[0].customerOut.customerId, customerName: values[0].customerOut.customerName, ...values[1], ...values[2], appUserId: values[0].appUser.recommenderUserId, talentProjectId: values[1]?.talent?.talentId })
        })
    }
    const stateChaneTypes = {
        0: [{
            ch: []
        }],
        1: [
            {
                label: "首付提成",
                value: 1,
                ch: [
                    {
                        label: "5%",
                        value: 5,
                    },
                    {
                        label: "15%",
                        value: 15,
                    },
                ]
            },
            {
                label: "首付尾款提成",
                value: 2,
                ch: [
                    {
                        label: "15%",
                        value: 15,
                    },
                ]
            },
        ],
        2: [
            {
                label: "首付尾款提成",
                value: 2,
                ch: [
                    {
                        label: "10%",
                        value: 10,
                    },
                ]
            },
        ],
        3: [
            {
                label: "全额付款提成",
                value: 3,
                ch: [
                    {
                        label: "15%",
                        value: 15,
                    },
                ]
            },
            {
                label: "分期付款提成",
                value: 4,
                ch: [
                    {
                        label: "15%",
                        value: 15,
                    },
                ]
            }
        ],
    };

    const setOptionsType = (e) => {
        console.log('111', e);
        e.tpList.map(item => {
            item.label = item.talentName;
            item.value = item.tpId;
        })
        console.log('newarr', e.tpList);
        setSgrxOptions(e.tpList)
        // talentForm.setFieldsValue({

        // })
        // setOptions(e.isKpi)
    }
    const modalFormss = () => {
        return (<ModalForm
            title="选择人员"
            name="modal"
            width={'980px'}
            form={talentForm}
            trigger={
                <Button type="primary">+分配方案</Button>
            }
            submitter={{
                render: (props, defaultDoms) => {
                    return [
                        ...defaultDoms,
                        <Button
                            key="computed"
                            onClick={computedMoney}
                        >
                            计算
                    </Button>,
                    ];
                },
            }}
            autoFocusFirstInput
            // modalProps={{
            //     onCancel: () => console.log('run'),
            // }}
            layout="vertical"
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values.name);
                message.success('提交成功');
                return true;
            }}
        >
            <ProForm.Group >
                分配金额<ProFormText name="serviceFee" label=""></ProFormText>
                上岗人选<ProFormSelect name="sgrx" options={sgrxOptions} label=""></ProFormSelect>
                业绩分类<ProFormSelect name="yjfl" label="" options={[{
                    value: 1,
                    label: '独立运作'
                }, {
                    value: 2,
                    label: '组内合作'
                }, {
                    value: 3,
                    label: '同城合作'
                }, {
                    value: 4,
                    label: '跨区合作'
                }]}></ProFormSelect>
            </ProForm.Group>
            <ProFormList
                layout="inline"
                name={['allotPlan']}
                creatorButtonProps={{
                    position: 'bottom',

                    creatorButtonText: '点击添加提成人员',
                }}

                initialValue={[
                    {
                        name: '1111',
                    },
                ]}
                itemContainerRender={(doms) => {
                    return <ProForm.Group>{doms}</ProForm.Group>;
                }}
            >
                {(f, index, action) => {
                    console.log(f, index, action);
                    return (
                        <>
                            {/* <ProFormText name="tarent" label={`提成人`} labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} /> */}
                            <Form.Item name="empoylee" labelCol={{ style: { width: '100px' } }} rules={[
                                // {
                                //     required: true,
                                //     message: '必填',
                                // },
                            ]} wrapperCol={{ style: { width: '100px' } }} label={`提成人`}>
                                <FenPeiYuanGong onChange={e => {
                                    console.log(e)
                                    action.setCurrentRowData({
                                        com: e.comName,
                                        empoylee: { ...e }
                                    })
                                }}></FenPeiYuanGong>
                            </Form.Item>

                            <ProFormText name="com" label="所在公司" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />
                            <ProFormText onChange={() => {
                                talentForm.getFieldValue('allotPlan').map(item => item?.rate || 0).reduce(function (prev, curr, idx, arr) {
                                    return Number(prev) + Number(curr);
                                })
                            }} name="rate" label="业绩比例" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />

                            <ProFormText name="kpiFee" disabled label="业绩金额" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />
                            <ProFormText name="commissionFee" disabled label="提成金额" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />
                        </>
                    );
                }}
            </ProFormList>
        </ModalForm>)
    }
    const renderModalForm = () => {
        console.log(applyForm.getFieldValue('rate'))
        let rate = applyForm.getFieldValue('rate')
        if (rate == 5) {
            return null;
        } else {
            return <>
                <Card title={['分配方案', modalFormss()]} >
                </Card>
            </>
        }
    }
    return (
        <PageContainer content="">

            <ProForm

                style={{
                    // margin: 'auto',
                    marginTop: 8,
                    // maxWidth: 600,
                }}
                form={applyForm}
                name="basic"
                layout="horizontal"
                submitter={{
                    render: (props, dom) => {
                        return null;
                    },
                }}
            >
                <Card bordered={false} title={'新增业绩'} style={{ width: '100%' }}>
                    <ProForm.Group>
                        <Form.Item name="appUser" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="选择回款">
                            <BFSearch onChange={setOptionsType}></BFSearch>
                        </Form.Item>
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="comName" label="归属公司"></ProFormText>
                    </ProForm.Group>


                    <ProFormDependency name={['appUser']}>
                        {({ appUser }) => {
                            console.log(appUser)
                            return <ProForm.Group>
                                <ProFormSelect options={appUser ? stateChaneTypes[appUser.isKpi] : []} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="type" label="提成分类" rules={[
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ]} />
                                <ProFormDependency name={['type']}>
                                    {({ type }) => {
                                        console.log(type);
                                        let ind = 0;
                                        if (type && appUser) {
                                            ind = type - appUser.isKpi;
                                            console.log(stateChaneTypes[appUser?.isKpi][ind].ch)
                                        }
                                        // console.log(stateChaneTypes[appUser?.isKpi][ind])
                                        return < ProFormSelect onChange={(e) => { console.log(e); setBilibili(e) }} options={appUser ? stateChaneTypes[appUser?.isKpi][ind]?.ch : []} labelCol={{ style: { width: '113px' } }
                                        } wrapperCol={{ style: { width: '168px' } }} name="rate" label="提成比例" rules={[
                                            {
                                                required: true,
                                                message: '必填',
                                            },
                                        ]} />
                                    }}
                                </ProFormDependency>

                            </ProForm.Group>
                        }}
                    </ProFormDependency>
                    {/* </ProForm.Group> */}
                    <ProFormDependency name={['type', 'rate']}>
                        {({ type, rate }) => {
                            console.log(rate)
                            if (type && type == 1 && rate == 5) {


                                return <ProForm.Group>
                                    <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceFee" label="回款金额" rules={[
                                        {
                                            required: true,
                                            message: '必填',
                                        },
                                    ]} />
                                    <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceType" label="提成金额" rules={[
                                        {
                                            required: true,
                                            message: '必填',
                                        },
                                    ]} />

                                </ProForm.Group>
                            } else {
                                return <ProFormSelect options={[
                                    {
                                        label: '服务费',
                                        value: 0,
                                    },
                                    {
                                        label: '咨询费',
                                        value: 1,
                                    }, {
                                        label: '首付款',
                                        value: 2,
                                    }, {
                                        label: '其他',
                                        value: 9,
                                    },]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceFee" label="回款金额" rules={[
                                        {
                                            required: true,
                                            message: '必填',
                                        },
                                    ]} />
                            }
                        }}
                    </ProFormDependency>
                </Card>
            </ProForm>
            {
                bilibili && bilibili != 5 ? renderModalForm() : ''

            }
        </PageContainer >
    );
};

export default AddInvoice;
