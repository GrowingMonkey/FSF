import { Card, message, Form, Button } from 'antd';
import ProForm, {
    ProFormDatePicker,
    ProFormDateTimePicker,
    ProFormUploadButton,
    ProFormDependency,
    ProFormSearchSelect,
    ProFormDigit,
    ProFormRadio,
    ProFormList,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addInvoice, getAlreadyFee, sejsq } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearchForEco from '@/components/TalentSearchForEco';
import { useState } from 'react';
import CustomerSearch from '@/components/CustomerSearch';

const AddInvoice = () => {
    const [applyForm] = Form.useForm();
    const [applyUser, setApplyUser] = useState('');
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const { run } = useRequest(addInvoice, {
        manual: true,
        onSuccess: () => {
            message.success('ζδΊ€ζε');
            history.push(`/eco/invioce-list`)
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
    const handleSubmit = () => {
        debugger
        Promise.all([
            applyForm.validateFields(),
            // talentForm.validateFields(),
            noteForm.validateFields(),
        ]).then(async (values) => {
            console.log(values);

            await run({ ...values[0], ...values[1], appUserId: values[0].appUser.recommenderUserId, customerId: values[0].customerOut.customerId, customerName: values[0].customerOut.customerName })
            history.push(`/eco/invioce-list`)
        })
    }
    const changedTalent = (e) => {
        console.log(e);
        talentForm.setFieldsValue({
            serviceFee: e.needPayment,
        })
        getAlreadyFee({ tpId: e.talentId }).then(res => {
            talentForm.setFieldsValue({
                alreadyFee: res?.data || 0,
            })
        })
    }
    const blurFee = () => {
        let values = talentForm.getFieldsValue(['fee', 'invoiceRate']);
        console.log(values);
        if (values.fee && values.invoiceRate) {
            sejsq({ ...values }).then(res => {
                let result = JSON.parse(res.data);
                talentForm.setFieldsValue({
                    invoiceFee: result?.invoiceFee || 0,
                    freeFee: result.freeFee
                })
            })
        } else {
            return;
        }
    }
    applyForm.setFieldsValue({
        companyName: 'θ΄Ήζη¦(ζι½)δΊΊεθ΅ζΊε¨θ―’ζιε¬εΈ'
    })
    return (
        <PageContainer content="">
            <Card bordered={false} title={'η³θ―·εη₯¨'}>
                <ProForm
                    style={{
                        // margin: 'auto',
                        marginTop: 8,
                        maxWidth: 608,
                    }}
                    form={applyForm}
                    name="basic"
                    layout="horizontal"
                    initialValues={{
                        serviceType: 0,
                        payType: 1
                    }}
                    submitter={{
                        render: (props, dom) => {
                            return null;
                        },
                    }}
                >
                    <Form.Item name="companyName" labelCol={{ style: { width: '112px' } }} style={{ marginBottom: 0 }} rules={[
                        {
                            required: true,
                            message: 'εΏε‘«',
                        },
                    ]} label="ζεΈεη§°">
                        <ProFormText style={{ width: '196px' }} />
                    </Form.Item>
                    <ProForm.Group>
                        <Form.Item name="appUser" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: 'εΏε‘«',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="η³θ―·η¨ζ·">
                            <SearchInput></SearchInput>
                        </Form.Item>
                        <ProFormText labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '175px' } }} name="appUserCompanyName" label="η³θ―·δΊΊε½ε±ε¬εΈ"></ProFormText>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect labelCol={{ style: { width: '113px' } }} options={[
                            {
                                label: 'ε€ι¨ε?’ζ·',
                                value: 0,
                            },
                            {
                                label: 'ει¨ε?’ζ·',
                                value: 1,
                            },
                            {
                                label: 'εΆδ»',
                                value: 2,
                            }]} wrapperCol={{ style: { width: '175px' } }} name="invoiceObj" label="εΌη₯¨ε―Ήθ±‘" rules={[
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
                            <CustomerSearch></CustomerSearch>
                        </Form.Item>
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="name" label="εΌη₯¨εη§°" rules={[
                            {
                                required: true,
                                message: 'εΏε‘«',
                            },
                        ]}></ProFormText>
                        <ProFormSelect options={[
                            {
                                label: 'ζε‘θ΄Ή',
                                value: 0,
                            },
                            {
                                label: 'ε¨θ―’θ΄Ή',
                                value: 1,
                            },
                            {
                                label: 'εΆδ»',
                                value: 9,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="invoiceType" label="εη₯¨ε±ζ§" rules={[
                                {
                                    required: true,
                                    message: 'εΏε‘«',
                                },
                            ]} />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect options={[
                            {
                                label: 'ηε€΄δΈε‘',
                                value: 0,
                            },
                            {
                                label: ' ε¨θ―’δΈε‘',
                                value: 1,
                            },
                            {
                                label: 'εΆδ»',
                                value: 9,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="serviceType" label="δΈε‘η±»ε"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'εΏε‘«',
                        //     },
                        // ]} 
                        />
                        <ProFormSelect options={[
                            {
                                label: 'ζε‘θ΄Ή',
                                value: 0,
                            },
                            {
                                label: 'ε¨θ―’θ΄Ή',
                                value: 1,
                            },
                            {
                                label: 'ι¦δ»ζ¬Ύ',
                                value: 2,
                            },
                            {
                                label: 'εΆδ»',
                                value: 9,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="payType" label="ζΆε₯η±»ε"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'εΏε‘«',
                        //     },
                        // ]}
                        />

                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect options={[
                            {
                                label: 'ζ?ιεη₯¨',
                                value: 0,
                            },
                            {
                                label: 'δΈη¨εη₯¨',
                                value: 1,
                            },
                            {
                                label: 'η΅ε­ζ?ιεη₯¨',
                                value: 2,
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="type" label="εη₯¨η±»ε" rules={[
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
                            }]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="isTalent" label="ζ―ε¦ε³θδΊΊι" />
                    </ProForm.Group>
                    <ProFormDependency name={['type']}>
                        {({ type }) => {
                            if (+type == 1) {
                                return (
                                    <>
                                        <ProForm.Group>
                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="address" label="ε¬εΈε°ε" rules={[
                                                {
                                                    required: true,
                                                    message: 'εΏε‘«',
                                                },
                                            ]} />
                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="phone" label="θη³»η΅θ―" rules={[
                                                {
                                                    required: true,
                                                    message: 'εΏε‘«',
                                                },
                                            ]} />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="bankNumber" label="ιΆθ‘θ΄¦ε·" rules={[
                                                {
                                                    required: true,
                                                    message: 'εΏε‘«',
                                                },
                                            ]} />
                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '175px' } }} name="bankName" label="εΌζ·θ‘" rules={[
                                                {
                                                    required: true,
                                                    message: 'εΏε‘«',
                                                },
                                            ]} />
                                        </ProForm.Group>
                                    </>
                                );
                            } else {
                                return null;
                            }

                        }}
                    </ProFormDependency>
                    <ProFormText labelCol={{ style: { width: '112px' } }} name="invoiceNumber" label="ηΊ³η¨δΊΊθ―ε«ε·" rules={[
                        {
                            required: true,
                            message: 'εΏε‘«',
                        },
                    ]} />

                    <ProFormDependency name={['isTalent']}>
                        {({ isTalent }) => {
                            if (+isTalent == 1) {
                                return (
                                    <Card title="δΊΊιδΏ‘ζ―" bordered={false} style={{ minWidth: '700px' }}>
                                        <ProFormList
                                            // name="users"
                                            name={['talentProjects']}
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
                                                    return (<>
                                                        <Form.Item name="basic" name="talentProject" labelCol={{ style: { width: '112px' } }} label="ιζ©δΊΊι" rules={[
                                                            // {
                                                            //     required: true,
                                                            //     message: 'εΏε‘«',
                                                            // },
                                                        ]}>
                                                            <TalentSearchForEco onChange={async (e) => {
                                                                console.log(e);
                                                                action.setCurrentRowData({
                                                                    serviceFee: e.needPayment,
                                                                    talent: { ...e }
                                                                })
                                                                await getAlreadyFee({ tpId: e.id }).then(res => {
                                                                    action.setCurrentRowData({
                                                                        alreadyFee: res?.data || 0,
                                                                    })
                                                                })
                                                            }} style={{ width: '196px' }} applyUserId={() => applyForm.getFieldValue('appUser')} />
                                                        </Form.Item>
                                                        <ProForm.Group>
                                                            <ProFormText rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'εΏε‘«',
                                                                },
                                                            ]} labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="serviceFee" label="θ??δ»·ζε‘θ΄Ή" />
                                                            <ProFormText rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'εΏε‘«',
                                                                },
                                                            ]} labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="alreadyFee" label="ε·²εΌη₯¨ιι’"></ProFormText>
                                                        </ProForm.Group>
                                                        <ProForm.Group>
                                                            <ProFormText rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'εΏε‘«',
                                                                },
                                                            ]} fieldProps={{
                                                                onBlur: () => {
                                                                    let values = action.getCurrentRowData();
                                                                    console.log(values);
                                                                    if (values.fee && values.invoiceRate) {
                                                                        sejsq({ ...values }).then(res => {
                                                                            let result = JSON.parse(res.data);
                                                                            action.setCurrentRowData({
                                                                                invoiceFee: result?.invoiceFee || 0,
                                                                                freeFee: result.freeFee
                                                                            })
                                                                        })
                                                                    } else {
                                                                        return;
                                                                    }
                                                                }
                                                            }} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="fee" label="εΌη₯¨ιι’" />
                                                            <ProFormSelect options={[
                                                                {
                                                                    label: '0%',
                                                                    value: 0,
                                                                },
                                                                {
                                                                    label: '1%',
                                                                    value: 1,
                                                                },
                                                                {
                                                                    label: '3%',
                                                                    value: 3,
                                                                }, {
                                                                    label: '6%',
                                                                    value: 6,
                                                                }]} onChange={() => {

                                                                    let values = action.getCurrentRowData();
                                                                    console.log(values);
                                                                    if (values.fee && values.invoiceRate) {
                                                                        sejsq({ ...values }).then(res => {
                                                                            let result = JSON.parse(res.data);
                                                                            action.setCurrentRowData({
                                                                                invoiceFee: result?.invoiceFee || 0,
                                                                                freeFee: result.freeFee
                                                                            })
                                                                        })
                                                                    } else {
                                                                        return;
                                                                    }

                                                                }} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="invoiceRate" label="η¨η" />
                                                        </ProForm.Group>
                                                        <ProForm.Group>
                                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="freeFee" label="δΈε«η¨ηιι’"></ProFormText>
                                                            <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="invoiceFee" label="η¨ι’" />
                                                        </ProForm.Group>

                                                    </>)
                                                }}
                                        </ProFormList>
                                    </Card>
                                )
                            }
                        }}
                    </ProFormDependency>
                    <ProFormDependency name={['isTalent']}>
                        {({ isTalent }) => {
                            if (+isTalent == 0) {
                                return (
                                    <Card title="εΌη₯¨δΏ‘ζ―" bordered={false} style={{ minWidth: '700px' }}>


                                        <>
                                            <ProForm.Group>
                                                <ProFormText rules={[
                                                    {
                                                        required: true,
                                                        message: 'εΏε‘«',
                                                    },
                                                ]} labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceFee" label="θ??δ»·ζε‘θ΄Ή" />
                                            </ProForm.Group>
                                            <ProForm.Group>
                                                <ProFormText rules={[
                                                    {
                                                        required: true,
                                                        message: 'εΏε‘«',
                                                    },
                                                ]} fieldProps={{
                                                    onBlur: () => {
                                                        let values = applyForm.getFieldsValue();
                                                        console.log(values);
                                                        if (values.fee && values.invoiceRate) {
                                                            sejsq({ ...values }).then(res => {
                                                                let result = JSON.parse(res.data);
                                                                applyForm.setFieldsValue({
                                                                    invoiceFee: result?.invoiceFee || 0,
                                                                    freeFee: result.freeFee
                                                                })
                                                            })
                                                        } else {
                                                            return;
                                                        }
                                                    }
                                                }} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="fee" label="εΌη₯¨ιι’" />
                                                <ProFormSelect options={[
                                                    {
                                                        label: '0%',
                                                        value: 0,
                                                    },
                                                    {
                                                        label: '1%',
                                                        value: 1,
                                                    },
                                                    {
                                                        label: '3%',
                                                        value: 3,
                                                    }, {
                                                        label: '6%',
                                                        value: 6,
                                                    }]} onChange={() => {

                                                        let values = applyForm.getFieldsValue();
                                                        console.log(values);
                                                        if (values.fee && values.invoiceRate) {
                                                            sejsq({ ...values }).then(res => {
                                                                let result = JSON.parse(res.data);
                                                                applyForm.setFieldsValue({
                                                                    invoiceFee: result?.invoiceFee || 0,
                                                                    freeFee: result.freeFee
                                                                })
                                                            })
                                                        } else {
                                                            return;
                                                        }

                                                    }} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="invoiceRate" label="η¨η" />
                                            </ProForm.Group>
                                            <ProForm.Group>
                                                <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="freeFee" label="δΈε«η¨ηιι’"></ProFormText>
                                                <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} disabled name="invoiceFee" label="η¨ι’" />
                                            </ProForm.Group>

                                        </>


                                    </Card>
                                )
                            }
                        }}
                    </ProFormDependency>

                </ProForm>
            </Card>
            <Card title="η³θ―·εη₯¨ε€ζ³¨" bordered={false}>
                <ProForm
                    hideRequiredMark
                    style={{
                        // margin: 'auto',
                        marginTop: 8,
                        maxWidth: 608,
                    }}
                    form={noteForm}
                    name="note"
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
