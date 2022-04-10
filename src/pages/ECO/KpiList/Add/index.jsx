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
    ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addServiceFee } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearch from '@/components/TalentSearch';
import CustomerSearch from '@/components/CustomerSearch';
import BFSearch from '../components/BFSearch';
import { useState } from 'react';


const AddInvoice = () => {
    const [applyForm] = Form.useForm();
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const [options, setOptions] = useState(0)
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
        console.log(e);
        setOptions(e.isKpi)
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
                        <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="appUserCompany" label="归属公司"></ProFormText>
                    </ProForm.Group>


                    <ProFormDependency name={['appUser']}>
                        {({ appUser }) => {
                            console.log(appUser)
                            return <ProForm.Group>
                                <ProFormSelect options={appUser ? stateChaneTypes[appUser.isKpi] : []} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payWay" label="提成分类" rules={[
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ]} />
                                <ProFormDependency name={['payWay']}>
                                    {({ payWay }) => {
                                        console.log(payWay);
                                        let ind = 0;
                                        if (payWay && appUser) {
                                            ind = payWay - appUser.isKpi;
                                            console.log(stateChaneTypes[appUser?.isKpi][ind].ch)
                                        }
                                        // console.log(stateChaneTypes[appUser?.isKpi][ind])
                                        return < ProFormSelect options={appUser ? stateChaneTypes[appUser?.isKpi][ind]?.ch : []} labelCol={{ style: { width: '113px' } }
                                        } wrapperCol={{ style: { width: '168px' } }} name="payW1ay" label="提成比例" rules={[
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
                    <ProFormDependency name={['payWay', 'payW1ay']}>
                        {({ payWay, payW1ay }) => {
                            console.log(payW1ay)
                            if (payWay && payWay == 1 && payW1ay == 5) {


                                return <ProForm.Group>
                                    <ProFormText labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payType" label="回款金额" rules={[
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
                                    },]} labelCol={{ style: { width: '113px' } }} wrapperCol={{ style: { width: '168px' } }} name="payType" label="回款金额" rules={[
                                        {
                                            required: true,
                                            message: '必填',
                                        },
                                    ]} />
                            }
                        }}
                    </ProFormDependency>
                </Card>
                <ProFormDependency name={['pay1Way']}>
                    {({ payW1ay }) => {
                        console.log(payW1ay)
                        if (payW1ay && payW1ay == 5) {
                            return null;
                        } else {
                            return (<Card bordered={false} title={'提成分配'} style={{ width: '100%' }}>
                                <ProForm style={{
                                    // margin: 'auto',
                                    marginTop: 8,
                                }}
                                    form={applyForm}
                                    name="basic"
                                    layout="vertical"
                                    submitter={{
                                        render: (props, dom) => {
                                            return null;
                                        },
                                    }}>
                                    <ProFormList
                                        name={['default', 'users']}
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
                                                    <ProFormText name="rowKey" label={`提成人`} labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />
                                                    <ProFormText name="name" key="name" label="所在公司" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />
                                                    <ProFormText name="name" key="name" label="业绩比例" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />
                                                    <ProFormText name="name" key="name" label="业绩金额" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />
                                                    <ProFormText disabled name="name" key="name" label="提成金额" labelCol={{ style: { width: '100px' } }} wrapperCol={{ style: { width: '100px' } }} />
                                                </>
                                            );
                                        }}
                                    </ProFormList>

                                </ProForm>
                            </Card>)
                        }

                    }}
                </ProFormDependency>
            </ProForm>
        </PageContainer >
    );
};

export default AddInvoice;
