import { Card, message, Form, Input, Button, Space } from 'antd';
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
import { confirmUserKpi, addKpiFee } from '@/services/eco'
import { EditableProTable } from '@ant-design/pro-table';

const AddInvoice = () => {
    const [applyForm] = Form.useForm();
    const [sum, setSum] = useState(100);
    const [BFData, setBFData] = useState(null);
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const [bilibili, setBilibili] = useState(null);
    const [fenPeiList, setFenPeiList] = useState([]);
    const [sgrxOptions, setSgrxOptions] = useState([]);
    const [computedRedData, setComputedRedData] = useState(0)
    const [modalVisit, setModalVisit] = useState(false);
    const [options, setOptions] = useState(0)
    const [noFenPeiMoney, setNoFenPeiMoney] = useState(null);
    const { run } = useRequest(addKpiFee, {
        manual: true,
        onSuccess: () => {
            message.success('ζδΊ€ζε');
            // history.push(`/eco/bf-list`)
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
                let allotPlan = cloneDeep(values.allotPlan);
                allotPlan.map((item, index) => {
                    item.kpiFee = res.data[index].kpiFee;
                    item.commissionFee = res.data[index].commissionFee
                })
                setComputedRedData(`ζζζ»θ?‘ιι’${res.data[0].allCommissionFee}ε δΈη»©ζ»θ?‘ιι’${res.data[0].kpiFee}`)
                talentForm.setFieldsValue({
                    allotPlan: allotPlan
                })

            })
        })
    }
    const handleSubmit = () => {
        Promise.all([
            applyForm.validateFields()
        ]).then(async (values) => {
            debugger
            console.log(values)
            console.log(fenPeiList)
            console.log(BFData)
            run({ ...values[0], serviceType: BFData?.serviceType, sfId: BFData.sfId, payType: BFData.payType, customerId: BFData.customerId, customerName: BFData.customerName, allotPlan: [...fenPeiList] })
            history.push('/eco/kpi-list')
        })
    }
    const stateChaneTypes = {
        0: [{
            ch: []
        }],
        1: [
            {
                label: "ι¦δ»ζζ",
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
                label: "ι¦δ»ε°Ύζ¬Ύζζ",
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
                label: "ι¦δ»ε°Ύζ¬Ύζζ",
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
                label: "ε¨ι’δ»ζ¬Ύζζ",
                value: 3,
                ch: [
                    {
                        label: "15%",
                        value: 15,
                    },
                ]
            },
            {
                label: "εζδ»ζ¬Ύζζ",
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
    const handleModalSubmit = () => {
        let fpList = cloneDeep(fenPeiList)
        let list = cloneDeep(talentForm.getFieldValue('allotPlan'));
        let otherParams = cloneDeep(talentForm.getFieldsValue(true));
        debugger
        list.map(item => {
            item.serviceFee = otherParams.serviceFee;
            item.tpId = otherParams?.sgrx;
            try {
                item.talentName = sgrxOptions?.filter(item => item.value == otherParams?.sgrx)[0]?.label || '';
            } catch (err) {
                console.log(err)
                item.talentName = '';
            }
            item.type = otherParams.yjfl;
            item.userId = item.empoylee.userId;
            item.userName = item.empoylee.name;
            item.comId = item.empoylee.comId;
            item.comName = item.empoylee.comName;
        })
        otherParams.kpiUserInfos = list;
        debugger
        fpList.push(otherParams)
        setFenPeiList(fpList);
        talentForm.resetFields();
        setModalVisit(false);
    }
    const setOptionsType = (e) => {
        console.log('111', e);
        e.tpList.map(item => {
            item.label = item.talentName;
            item.value = item.tpId;
        })
        console.log('newarr', e.tpList);
        setSgrxOptions(e.tpList);
        console.log()
        setBFData(e)
        talentForm.setFieldsValue({
            serviceFee: e.fee
        })
        // setOptions(e.isKpi)
    }
    const modalFormss = () => {
        return (<ModalForm
            title="ιζ©δΊΊε"
            name="modal"
            width={'855px'}
            form={talentForm}
            visible={modalVisit}
            onVisibleChange={e => {
            }}
            submitter={{
                render: (props, defaultDoms) => {
                    return [
                        ...defaultDoms,
                        <Button
                            key="computed"
                            onClick={computedMoney}
                        >
                            θ?‘η?
                    </Button>,
                    ];
                },
            }}
            // autoFocusFirstInput
            modalProps={{
                onCancel: () => setModalVisit(false),
                maskClosable: false
            }}
            layout="vertical"
            onFinish={handleModalSubmit}
        >
            <ProForm.Group >
                <Space align="start">
                    <span style={{ lineHeight: '30px' }}>ειιι’</span><ProFormText name="serviceFee" label="" labelCol={{ style: { width: '125px' } }} wrapperCol={{ style: { width: '125px', marginRight: '50px' } }}></ProFormText>
                    <span style={{ lineHeight: '30px' }}>δΈε²δΊΊι</span> <ProFormSelect name="sgrx" options={sgrxOptions} label="" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px', marginRight: '50px' } }}></ProFormSelect>
                    <span style={{ lineHeight: '30px' }}>δΈη»©εη±»</span><ProFormSelect name="yjfl" label="" options={[{
                        value: 1,
                        label: 'η¬η«θΏδ½'
                    }, {
                        value: 2,
                        label: 'η»εεδ½'
                    }, {
                        value: 3,
                        label: 'εεεδ½'
                    }, {
                        value: 4,
                        label: 'θ·¨εΊεδ½'
                    }]} labelCol={{ style: { width: '125px' } }} wrapperCol={{ style: { width: '125px', marginRight: '50px' } }}></ProFormSelect>
                </Space>
            </ProForm.Group>
            <ProFormList
                layout="inline"
                name={['allotPlan']}
                creatorButtonProps={{
                    position: 'bottom',

                    creatorButtonText: 'ηΉε»ζ·»ε ζζδΊΊε',
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
                            {/* <ProFormText name="tarent" label={`ζζδΊΊ`} labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} /> */}
                            <Form.Item name="empoylee" labelCol={{ style: { width: '125px' } }} rules={[
                                // {
                                //     required: true,
                                //     message: 'εΏε‘«',
                                // },
                            ]} wrapperCol={{ style: { width: '125px' } }} label={`ζζδΊΊ`}>
                                <FenPeiYuanGong onChange={e => {
                                    console.log(e)
                                    action.setCurrentRowData({
                                        com: e.comName,
                                        empoylee: e
                                    })
                                }}></FenPeiYuanGong>
                            </Form.Item>

                            <ProFormText name="com" label="ζε¨ε¬εΈ" labelCol={{ style: { width: '125px' } }} wrapperCol={{ style: { width: '125px' } }} />
                            <ProFormText onChange={() => {
                                let sums = talentForm.getFieldValue('allotPlan').map(item => item?.rate || 0).reduce(function (prev, curr, idx, arr) {
                                    console.log(Number(prev) + Number(curr))
                                    return Number(prev) + Number(curr);
                                })
                                console.log(sums);
                                setSum(100 - sums)
                            }} name="rate" label={[`δΈη»©ζ―δΎ`, <span style={{ position: 'absolute', fontSize: '12px', color: 'red', width: '70px', right: '-70px' }}>ζͺει{sum}%</span>]} labelCol={{ style: { width: '125px', position: 'relative' } }} wrapperCol={{ style: { width: '125px' } }} />

                            <ProFormText name="kpiFee" disabled label="δΈη»©ιι’" labelCol={{ style: { width: '125px' } }} wrapperCol={{ style: { width: '125px' } }} />
                            <ProFormText name="commissionFee" disabled label="ζζιι’" labelCol={{ style: { width: '125px' } }} wrapperCol={{ style: { width: '125px' } }} />
                        </>
                    );
                }}
            </ProFormList>
            {
                computedRedData ? <div style={{ textAlign: 'right', color: 'red' }}>{computedRedData}</div> : null
            }
        </ModalForm >)
    }
    const columns = [
        {
            title: 'δΊΊιεη§°',
            dataIndex: 'talentName',
        },
        {
            title: 'ζζδΊΊ',
            render: (text, record) => {
                return <>{record.empoylee.name}</>
            },
            // η¬¬δΈθ‘δΈεθ?ΈηΌθΎ
            editable: (text, record, index) => {
                return index !== 0;
            },
            width: '15%',
        }, {
            title: 'ε½ε±ε¬εΈ',
            dataIndex: 'com',


        }, {
            title: 'δΈη»©ζ―δΎ',
            dataIndex: 'rate',


        }, {
            title: 'δΈη»©ιι’',
            dataIndex: 'kpiFee',


        }, {
            title: 'ζζιι’',
            dataIndex: 'commissionFee',
        },
        {
            title: 'ζδ½',
            valueType: 'option',
            width: 200,
            render: (text, record, _, action) => [
                <a key="delete" onClick={() => {
                    debugger
                    console.log(_)
                    console.log(record);
                    // let delFenPeiList = cloneDeep(record.allotPlan);
                    let currRecord = cloneDeep(fenPeiList[_].kpiUserInfos)
                    let newFenpei = cloneDeep(fenPeiList);
                    newFenpei[_] = {
                        ...fenPeiList[_],
                        kpiUserInfos: currRecord.filter((item) => item.userId !== record.userId)
                    }
                    setFenPeiList(newFenpei);
                }}>
                    ε ι€
        </a>,
            ],
        },
    ]
    const updateFenPeiList = (item) => {
        debugger
        console.log(item);
        setModalVisit(true);
        talentForm.setFieldsValue({
            allotPlan: item.allotPlan,
            serviceFee: item.serviceFee,
            sgrx: item.sgrx,
            yjfl: item.yjfl
        })
    }
    const renderModalForm = () => {
        console.log(applyForm.getFieldValue('rate'))
        let rate = applyForm.getFieldValue('rate')
        if (rate == 5) {
            return null;
        } else {
            return <>
                <Card title={['ειζΉζ‘', <Button type="primary" style={{
                    marginLeft: '50px',
                    width: '490px'
                }} onClick={() => {
                    let filterArr = fenPeiList.map(item => +(item.sgrx));
                    let newOp = sgrxOptions.filter((item, i) => {
                        // θΏζ»€arr
                        console.log(item);
                        return (!filterArr.includes(+(item.value)));
                    })
                    setSgrxOptions(newOp);
                    setModalVisit(true);
                }}>+ειζΉζ‘</Button>]} >
                    {fenPeiList.map((item, index) =>
                        <EditableProTable rowKey={index}
                            toolBarRender={() => [
                                <Button type="primary" size="small" onClick={() => updateFenPeiList(item)}>δΏ?ζΉ</Button>,
                                <Button type="dashed" size="small" onClick={() => {
                                    setFenPeiList(cloneDeep(fenPeiList).filter(item => item.sgrx != item.sgrx))
                                }}>ε ι€</Button>
                            ]}
                            recordCreatorProps={false} loading={false} columns={columns}
                            // request={async () => ({
                            //     data: defaultData,
                            //     total: 3,
                            //     success: true,
                            // })}
                            value={item.kpiUserInfos || []} onChange={setFenPeiList} editable={{
                                type: 'multiple',
                                // editableKeys,
                                // onSave: async (rowKey, data, row) => {
                                //     console.log(rowKey, data, row);
                                //     await waitTime(2000);
                                // },
                                // onChange: setEditableRowKeys,
                            }} />
                    )}
                    {modalFormss()}
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
                <Card bordered={false} title={'ζ°ε’δΈη»©'} style={{ width: '100%' }}>
                    <ProForm.Group>
                        <Form.Item name="appUser" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: 'εΏε‘«',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="εζ¬ΎδΌδΈ">
                            <BFSearch onChange={setOptionsType}></BFSearch>
                        </Form.Item>
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="comName" label="ε½ε±ε¬εΈ"></ProFormText>
                    </ProForm.Group>


                    <ProFormDependency name={['appUser']}>
                        {({ appUser }) => {
                            console.log(appUser)
                            return <ProForm.Group>
                                <ProFormSelect options={appUser ? stateChaneTypes[appUser.isKpi] : []} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="type" label="εζ¬Ύη±»ε" rules={[
                                    {
                                        required: true,
                                        message: 'εΏε‘«',
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
                                        } wrapperCol={{ style: { width: '168px' } }} name="rate" label="ζζζ―δΎ" rules={[
                                            {
                                                required: true,
                                                message: 'εΏε‘«',
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
                                    <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceFee" label="εζ¬Ύιι’" rules={[
                                        {
                                            required: true,
                                            message: 'εΏε‘«',
                                        },
                                    ]} />
                                    <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="commissionFee" label="ζζιι’" rules={[
                                        {
                                            required: true,
                                            message: 'εΏε‘«',
                                        },
                                    ]} />

                                </ProForm.Group>
                            } else {
                                return <ProForm.Group>
                                    <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceFee" label="εζ¬Ύιι’" rules={[
                                        {
                                            required: true,
                                            message: 'εΏε‘«',
                                        },
                                    ]} />
                                </ProForm.Group>
                            }
                        }}
                    </ProFormDependency>

                </Card>
            </ProForm>
            {
                bilibili && bilibili != 5 ? renderModalForm() : ''

            }
            <div style={{ background: '#fff', padding: '0 0 24px 24px' }}><Button type="primary" onClick={handleSubmit}>ζδΊ€</Button></div>
        </PageContainer >
    );
};

export default AddInvoice;
