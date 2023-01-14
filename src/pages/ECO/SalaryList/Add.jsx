import { Card, Form, message, Divider, Button } from 'antd';
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
import { addSalary, gzjsq, updateSalary } from '@/services/eco';
import { selectPList } from '@/services/project';
import { selectTalentList } from '@/services/talent';
import { addTrip } from '@/services/employ'



import ApplyYuanGong from '@/components/employSelect'


const addTripC = () => {
    const [selectType, setSelectType] = useState('');
    const [applyForm] = Form.useForm();

    const [selectList, setSelectList] = useState([]);
    const [selectSearchValue, setSelectSearchVlaue] = useState('');
    const { run } = useRequest(addSalary, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/eco/salary-list`)
        },
    });
    useEffect(() => {
        const { location: { query, state } } = history;
        if (state) {
            console.log(state);
            applyForm.setFieldsValue({
                ...state,
                empoylee: state.userName,
                appComName: state.comName,
            })
        }
    })
    const onFinish = async (values) => {
        const { location: { query, state } } = history;
        if (state) {
            updateSalary({ id: state.id, ...values, appComId: state.comId, appUserId: state.userId, appUserName: state.userName }).then(res => {
                message.success('修改成功');
                history.push(`/eco/salary-list`)
            })
        } else {
            run({ ...values, appComId: values.empoylee.comId, appUserId: values.empoylee.userId, appUserName: values.empoylee.name });
        }
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
                    style={{
                        margin: 'auto',
                        marginTop: 8,
                        // maxWidth: 600,
                    }}
                    form={applyForm}
                    name="basic"
                    layout="horizontal"
                    initialValues={{
                        public: '1',
                    }}
                    onFinish={onFinish}
                >
                    <ProForm.Group>
                        <Form.Item name="empoylee" wrapperCol={{ style: { width: '216px' } }} rules={[
                            {
                                required: true,
                                message: '必填',
                            },
                        ]} label={`员工姓名`}>
                            <ApplyYuanGong onChange={e => {
                                console.log(e)
                                applyForm.setFieldsValue({
                                    appComName: e.comName,
                                })
                            }} filedProps={{
                                disabled: (() => {
                                    const { location: { query, state } } = history;
                                    if (state) return true;
                                    else {
                                        return false
                                    }
                                })()
                            }}></ApplyYuanGong>
                        </Form.Item>
                        <ProFormText
                            width="sm"
                            label="归属公司"
                            name="appComName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                    </ProForm.Group>
                    <ProFormDatePicker
                        label="发放日期"
                        width="sm"
                        name="payDay"
                        rules={[
                            {
                                required: true,
                                message: '请选择起止日期',
                            },
                        ]}
                        placeholder={['开始日期']}
                    />
                    <Divider></Divider>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="基本工资"
                            name="baseSalary"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="提成金额"
                            name="commissionFee"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        ></ProFormText>
                    </ProForm.Group>

                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="考勤天数"
                            name="workDays"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="法定工作日"
                            name="totalDays"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />

                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="绩效工资"
                            name="kpiFee"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="月度绩效"
                            name="kpiFeeMonth"
                            placeholder="请输入"
                        />


                    </ProForm.Group>

                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="交通补助"
                            name="traffic"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入标题',
                            //     },
                            // ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="餐补"
                            name="food"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入标题',
                            //     },
                            // ]}
                            placeholder="请输入"
                        />

                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="其他补助"
                            name="other"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入标题',
                            //     },
                            // ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="合计扣款"
                            name="reduceFee"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入标题',
                            //     },
                            // ]}
                            placeholder="请输入"
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="实发工资"
                            name="salary"

                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        >

                        </ProFormText>
                        <Button size="small" onClick={() => {
                            applyForm.validateFields(['reduceFee', 'totalDays', 'traffic', 'workDays', 'other', 'kpiFee', 'food', 'commissionFee', 'baseSalary']).then(value => {
                                console.log(value);
                                gzjsq({ ...value }).then(res => {
                                    if (res.code == 0) {
                                        applyForm.setFieldsValue({ salary: JSON.parse(res.data).salary })
                                    } else {
                                        applyForm.setFieldsValue({ salary: 0 })
                                    }
                                })
                            })
                        }}>计算</Button>

                    </ProForm.Group>
                    <Divider></Divider>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="病假扣款"
                            name="sickFee"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入标题',
                            //     },
                            // ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="事假扣款"
                            name="thingFee"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入标题',
                            //     },
                            // ]}
                            placeholder="请输入"
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="迟到早退"
                            name="lateEarlyFee"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入标题',
                            //     },
                            // ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="其他扣款"
                            name="otherDeduction"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入标题',
                            //     },
                            // ]}
                            placeholder="请输入"
                        />
                    </ProForm.Group>
                    <Divider></Divider>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="社保扣除"
                            name="socialInsurance"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="公司社保"
                            name="companyInsurance"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                    </ProForm.Group><ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="公积金"
                            name="accumulationFund"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="公司公积金"
                            name="companyAccumulation"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            label="个税"
                            name="tax"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            placeholder="请输入"
                        />
                        <ProFormText
                            width="sm"
                            label="员工成本"
                            name="employCost"
                            placeholder="请输入"
                        />
                    </ProForm.Group>
                    <ProFormTextArea
                        label="提醒内容"
                        width="xl"
                        name="remark"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: '请输入目标描述',
                        //     },
                        // ]}
                        placeholder="请输入你的阶段性工作目标"
                    />
                </ProForm>
            </Card>
        </PageContainer >
    );
};

export default addTripC;
