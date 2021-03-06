import { Card, message, Form, Input, Button } from 'antd';
import ProForm, {
    ProFormDatePicker,
    ProFormDateTimePicker,
    ProFormUploadButton,
    ProFormDependency,
    ProFormSearchSelect,
    ProFormDigit,
    ProFormRadio,
    ProFormList,
    Divider,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addServiceFee, selectServiceFeeById } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearch from './TalentSearchBF';
import CustomerSearch from '@/components/CustomerSearch';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect } from 'react';



const AddInvoice = () => {
    const [applyForm] = Form.useForm();
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const { run } = useRequest(addServiceFee, {
        manual: true,
        onSuccess: () => {
            message.success('ζδΊ€ζε');
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
    useEffect(() => {
        const { location: { query } } = history;
        console.log(query)
        if (query?.bfId) {
            selectServiceFeeById({ id: query?.bfId }).then(ress => {
                applyForm.setFieldsValue({
                    fee: ress.data.fee,
                    payWay: ress.data.payWay,
                    payType: ress.data.payType,
                    serviceType: ress.data.serviceType,
                    dateType: ress.data.dateType,
                    isTalent: ress.data.tpList.lenght > 0 ? 1 : 0,
                    customerOut: ress.data.customerName,
                    appUser: ress.data.auditorName
                })

                noteForm.setFieldsValue({
                    remark: ress.data.remark
                })
            })
        }
    }, [])
    const handleSubmit = () => {
        debugger
        Promise.all([
            applyForm.validateFields(),
            // talentForm.validateFields(),
            noteForm.validateFields(),
        ]).then(async (values) => {
            const { location: { query } } = history;
            console.log(values)
            let realFee = [];
            if (values[0].isTalent == 1 && values[0].users) {
                values[0].users.map(item => {
                    realFee.push({ realFee: item.realFee, tpId: item.talents.talents.id })
                })

            }
            if (query?.bfId) {
                await run({ ...values[0], customerId: values[0].customerOut.customerId, customerName: values[0].customerOut.customerName, ...values[1], appUserId: values[0].appUser.recommenderUserId, tpIds: realFee, id: query.bfId })
                history.push('/eco/bf-list')

            } else {
                await run({ ...values[0], customerId: values[0].customerOut.customerId, customerName: values[0].customerOut.customerName, ...values[1], appUserId: values[0].appUser.recommenderUserId, tpIds: realFee })
                history.push('/eco/bf-list')

            }
        })
    }
    const changedTalent = (e, index) => {
        console.log(applyForm.getFieldsValue(true).users);
        // applyForm.getFieldsValue(true).users;
        // applyForm.setFieldsValue({
        //     users: applyForm.getFieldsValue(true).users.splice(index, 1, e),
        // })
    }
    const renderItem = () => {
        console.log(applyForm.getFieldsValue(true));
    }
    return (
        <PageContainer content="">

            <ProForm

                style={{
                    // margin: 'auto',
                    marginTop: 8,
                    maxWidth: 600,
                }}
                form={applyForm}
                name="basic"
                layout="horizontal"
                initialValues={{
                    isTalent: 0
                }}
                submitter={{
                    render: (props, dom) => {
                        return null;
                    },
                }}
            >
                <Card bordered={false} title={(() => {
                    const { location: { query } } = history;
                    if (query.bfId) {
                        return 'ηΌθΎεζ¬Ύ'
                    } else {
                        return 'ζ°ε’εζ¬Ύ'
                    }
                })()} style={{ minWidth: '700px' }}>
                    <Form.Item labelCol={{ style: { width: '113px' } }} name="fee" label="εζ¬Ύιι’" rules={[
                        {
                            required: true,
                            message: 'εΏε‘«',
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <ProForm.Group>
                        <Form.Item name="appUser" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: 'εΏε‘«',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="ζε‘ι‘Ύι?">
                            <SearchInput></SearchInput>
                        </Form.Item>
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="appUserCompany" label="ε½ε±ε¬εΈ"></ProFormText>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect options={[
                            {
                                label: 'η°ιζ―δ»',
                                value: 0,
                            },
                            {
                                label: 'ζ―η₯¨θ½¬θ΄¦',
                                value: 1,
                            },
                            {
                                label: 'η½ιΆθ½¬θ΄¦',
                                value: 2,
                            },
                            {
                                label: 'εΆδ»ζΉεΌ',
                                value: 3,
                            }, {
                                label: 'δΈͺδΊΊη΅ζ±',
                                value: 4,
                            }

                        ]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payWay" label="ζ―δ»ζΉεΌ" rules={[
                            {
                                required: true,
                                message: 'εΏε‘«',
                            },
                        ]} />
                        <Form.Item name="customerOut" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: 'εΏε‘«',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="ε?’ζ·εη§°">
                            <CustomerSearch url={2}></CustomerSearch>
                        </Form.Item>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect options={[
                            {
                                label: 'ζε‘θ΄Ή',
                                value: 0,
                            },
                            {
                                label: 'ε¨θ―’θ΄Ή',
                                value: 1,
                            }, {
                                label: 'ι¦δ»ζ¬Ύ',
                                value: 2,
                            }, {
                                label: 'εΆδ»',
                                value: 9,
                            },]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payType" label="ζΆε₯η±»ε" rules={[
                                {
                                    required: true,
                                    message: 'εΏε‘«',
                                },
                            ]} />
                        <ProFormSelect options={[
                            {
                                label: 'ηε€΄δΈε‘',
                                value: 0,
                            },
                            {
                                label: 'ε¨θ―’δΈε‘',
                                value: 1,
                            }, {
                                label: 'εΆδ»',
                                value: 9,
                            },]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceType" label="δΈε‘η±»ε" rules={[
                                {
                                    required: true,
                                    message: 'εΏε‘«',
                                },
                            ]} />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} options={[
                            {
                                label: 'δΈζ',
                                value: 'δΈζ',
                            },
                            {
                                label: 'δΊζ',
                                value: 'δΊζ',
                            },
                            {
                                label: 'δΈζ',
                                value: 'δΈζ',
                            },
                            {
                                label: 'ε¨ζ¬Ύ',
                                value: 'ε¨ζ¬Ύ',
                            }]} name="dateType" label="εζ¬Ύζι" rules={[
                                {
                                    required: true,
                                    message: 'εΏε‘«',
                                },
                            ]} />
                        <ProFormRadio.Group options={[
                            {
                                label: 'ε¦',
                                value: 0,
                            },
                            {
                                label: 'ζ―',
                                value: 1,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="isTalent" label="ζ―ε¦ε³θδΊΊι" rules={[
                                {
                                    required: true,
                                    message: 'εΏε‘«',
                                },
                            ]} />
                    </ProForm.Group>
                </Card>
                <ProFormDependency name={['isTalent']}>
                    {({ isTalent }) => {
                        if (+isTalent == 1) {
                            return (
                                <Card title="δΊΊιδΏ‘ζ―" bordered={false} style={{ minWidth: '700px' }}>
                                    <ProFormList
                                        // name="users"
                                        name={['users']}
                                        alwaysShowItemLabel={true}
                                        creatorButtonProps={{
                                            position: 'bottom',
                                            style: { marginLeft: '45px', background: '#999', width: '550px', textAlign: 'center', cursor: 'pointer' },
                                            creatorButtonText: 'ηΉε»ζ·»ε δΊΊι',
                                        }}
                                        itemContainerRender={(doms) => {
                                            return <ProForm.Group>{doms}</ProForm.Group>;
                                        }}
                                    >
                                        {
                                            (f, index, action) => {
                                                console.log(f, index, action);
                                                return (
                                                    <>
                                                        {/* <ProFormText initialValue={index} name="rowKey" label={`η¬¬ ${index} ιη½?`} />*/}

                                                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name={[index, 'talents']} label="ιζ©δΊΊι" >
                                                            <TalentSearch style={{ width: '196px' }} applyUserId={() => applyForm.getFieldValue('appUser')} />
                                                        </Form.Item>
                                                        <ProFormDependency name={['talents']}>
                                                            {({ talents }) => {
                                                                console.log(talents)
                                                                if (!talents) {
                                                                    return (
                                                                        <span
                                                                            style={{
                                                                                lineHeight: '32px',
                                                                            }}
                                                                        >

                                                                        </span>
                                                                    );
                                                                }
                                                                return <ProFormText name="company" label="ε¬εΈε" disabled value={talents.talents.company} />;
                                                            }}
                                                        </ProFormDependency>
                                                        <ProForm.Group>
                                                            <ProFormDependency name={['talents']}>
                                                                {({ talents }) => {
                                                                    console.log(talents)
                                                                    if (!talents) {
                                                                        return (
                                                                            <span
                                                                                style={{
                                                                                    lineHeight: '32px',
                                                                                }}
                                                                            >

                                                                            </span>
                                                                        );
                                                                    }
                                                                    return <ProFormText name="job" label="θδ½ε" disabled value={talents.talents.job} />;
                                                                }}
                                                            </ProFormDependency>
                                                            <ProFormDependency name={['talents']}>
                                                                {({ talents }) => {
                                                                    console.log(talents)
                                                                    if (!talents) {
                                                                        return (
                                                                            <span
                                                                                style={{
                                                                                    lineHeight: '32px',
                                                                                }}
                                                                            >

                                                                            </span>
                                                                        );
                                                                    }
                                                                    return <ProFormText name="refundPayment" label="εΊδ»ζ¬Ύιι’" disabled value={talents.talents.needPayment || 0} />;
                                                                }}
                                                            </ProFormDependency>
                                                            <ProFormDependency name={['talents']}>
                                                                {({ talents }) => {
                                                                    console.log(talents)
                                                                    if (!talents) {
                                                                        return (
                                                                            <span
                                                                                style={{
                                                                                    lineHeight: '32px',
                                                                                }}
                                                                            >

                                                                            </span>
                                                                        );
                                                                    }
                                                                    return <ProFormText name="realFee" label="ε?ιεζ¬Ύιι’" />;
                                                                }}
                                                            </ProFormDependency>
                                                        </ProForm.Group>
                                                    </>
                                                );
                                            }
                                        }
                                    </ProFormList>
                                </Card>
                            );
                        } else {
                            return null;
                        }

                    }}
                </ProFormDependency>
            </ProForm>
            {/* <Card title="δΊΊιδΏ‘ζ―" bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        marginTop: 8,
                        maxWidth: 600,
                    }}
                    form={talentForm}
                    name="basic"
                    layout="horizontal"
                    initialValues={{
                        public: '1',
                    }}
                    submitter={{
                        render: (props, dom) => {
                            return null;
                        },
                    }}
                >
                    <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="talents" label="ιζ©δΊΊι" >
                        <TalentSearch style={{ width: '196px' }} filedProps={{ mode: 'multiple' }} />
                    </Form.Item>
                </ProForm>

            </Card>
            */}
            <Card title="ε€ζ³¨" bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        // margin: 'auto',
                        marginTop: 8,
                        maxWidth: 600,
                    }}
                    form={noteForm}
                    name="basic"
                    layout="horizontal"
                    submitter={{
                        render: (props, dom) => {
                            return null;
                        },
                    }}
                >
                    <ProFormTextArea name="remark" label="" />
                </ProForm>
                <Button type="primary" onClick={handleSubmit}>ζδΊ€</Button>
            </Card>

        </PageContainer>
    );
};

export default AddInvoice;
