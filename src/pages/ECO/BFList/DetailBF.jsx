import { Card, message, Form, Input, Button, Descriptions } from 'antd';
import ProForm, {
    ProFormDatePicker,
    ProFormDateTimePicker,
    ProFormUploadButton,
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
import { addServiceFee, selectServiceFeeById } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearch from '@/components/TalentSearch';
import { useEffect } from 'react';
import { useState } from 'react';

const AddInvoice = () => {
    const [bfDetail, setBfDetail] = useState(null);
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
    useEffect(() => {
        const { location: { query } } = history;
        console.log(query)
        if (query?.serviceFeeId) {
            selectServiceFeeById({ id: query?.serviceFeeId }).then(ress => {
                setBfDetail(ress?.data)
            })
        }
    }, [])
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
            talentForm.validateFields(),
            noteForm.validateFields(),
        ]).then((values) => {
            console.log(values)
            run({ ...values[0], ...values[1], ...values[2], appUserId: values[0].appUser.recommenderUserId, talentProjectId: values[1].talents.talents.map(i => i.talentId).join(',') })
        })
    }

    return (
        <PageContainer content="">
            <Card bordered={false} title={'εζ¬ΎδΏ‘ζ―'}>
                <ProForm
                    hideRequiredMark
                    style={{
                        // margin: 'auto',
                        marginTop: 8,
                        maxWidth: 600,
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
                    <Form.Item labelCol={{ style: { width: '113px' } }} name="fee" label="εζ¬Ύιι’" rules={[
                        {
                            required: true,
                            message: 'εΏε‘«',
                        },
                    ]}>
                        {/* <Input /> */}
                        <span>{bfDetail?.fee || ''}</span>
                    </Form.Item>
                    <ProForm.Group>
                        <Form.Item name="appUser" labelCol={{ style: { width: '112px' } }} rules={[
                            {
                                required: true,
                                message: 'εΏε‘«',
                            },
                        ]} wrapperCol={{ style: { width: '175px' } }} label="ζε‘ι‘Ύι?">
                            {/* <SearchInput></SearchInput> */}
                            <span>{bfDetail?.auditorName || ''}</span>
                        </Form.Item>
                        <Form.Item name="appUserCompany" labelCol={{ style: { width: '112px' } }} wrapperCol={{ style: { width: '168px' } }} label="ε½ε±ε¬εΈ">
                            <span>{
                                bfDetail?.comName}</span>
                        </Form.Item>
                        {/* <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="appUserCompany" label="ε½ε±ε¬εΈ"></ProFormText> */}
                    </ProForm.Group>
                    <ProForm.Group>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payWay" label="ζ―δ»ζΉεΌ">
                            <span>{bfDetail?.payWay == 0 ? 'η°ιζ―δ»' : bfDetail?.payWay == 1 ? 'ζ―η₯¨θ½¬θ΄¦' : bfDetail?.payWay == 2 ? 'η½ιΆθ½¬θ΄¦' : bfDetail?.payWay == 3 ? 'εΆδ»ζΉεΌ' : bfDetail?.payWay == 4 ? 'δΈͺδΊΊη΅ζ±' : ''}</span>
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="customerName" label="ε?’ζ·εη§°" >
                            <span>{bfDetail?.customerName || ""}</span>
                        </Form.Item>
                        {/* <ProFormSelect options={[
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
                        ]} /> */}
                        {/* <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="customerName" label="ε?’ζ·εη§°" rules={[
                            {
                                required: true,
                                message: 'εΏε‘«',
                            },
                        ]}></ProFormText> */}
                    </ProForm.Group>
                    <ProForm.Group>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payType" label="ζΆε₯η±»ε">
                            <span>{bfDetail?.payType == 0 ? 'ζε‘θ΄Ή' : bfDetail?.payType == 1 ? 'ε¨θ―’θ΄Ή' : bfDetail?.payType == 2 ? 'ι¦δ»ζ¬Ύ' : bfDetail?.payType == 9 ? 'εΆδ»' : '' || ' '}</span>
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="serviceType" label="δΈε‘η±»ε" >
                            <span>{bfDetail?.serviceType == 0 ? 'ηε€΄δΈε‘' : bfDetail?.serviceType == 1 ? 'ε¨θ―’δΈε‘' : bfDetail?.serviceType == 9 ? 'εΆδ»' : '' || ' '}</span>
                        </Form.Item>
                        {/* <ProFormSelect options={[
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
                            ]} /> */}
                    </ProForm.Group>
                    <ProForm.Group>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="dateType" label="εζ¬Ύζι">
                            <span>{bfDetail?.dateType || ' '}</span>
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="isTalent" label="ζ―ε¦ε³θδΊΊι" >
                            <span>{bfDetail?.tpList.length > 0 ? 'ζ―' : 'ε¦'}</span>
                        </Form.Item>
                        {/* <ProFormSelect labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} options={[
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
                            ]} /> */}
                    </ProForm.Group>
                </ProForm>
            </Card>
            <Card title="δΊΊιδΏ‘ζ―" bordered={false}>
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
                        {/* <TalentSearch style={{ width: '196px' }} filedProps={{ mode: 'multiple' }} /> */}
                        <span>{bfDetail?.tpList?.map(item => item.name).join(',')}</span>
                    </Form.Item>
                </ProForm>

            </Card>
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
                    <span>{bfDetail?.remark}</span>
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default AddInvoice;
