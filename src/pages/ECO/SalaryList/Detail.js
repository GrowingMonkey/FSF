import { Card, message, Form, Button, Descriptions } from 'antd';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addInvoice, getAlreadyFee, sejsq, selectInvoiceById } from '@/services/eco'
import { useState } from 'react';
import { useEffect } from 'react';

const AddInvoice = () => {
    const [detailData, setDetailData] = useState(null);
    const [applyForm] = Form.useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [applyUser, setApplyUser] = useState('');
    const [talentForm] = Form.useForm();
    const [noteForm] = Form.useForm();
    const { run } = useRequest(addInvoice, {
        manual: true,
        onSuccess: () => {
            message.success('提交成功');
            history.push(`/eco/invioce-list`)
        },
    });
    useEffect(() => {
        const { location: { query, state } } = history;
        console.log(history)
        if (query.id) {
            setIsEdit(true);
            selectInvoiceById({ id: query.id }).then(res => {
                console.log(res);
                setDetailData(res?.data || {})
            })
        } else {
            setDetailData(state || {})
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
    const lableCss = {
        width: 120,
        justifyContent: 'left',
        color: '#999'
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
    return (
        <PageContainer content="">
            <Card bordered={false} title={'工资详情'}>
                <Descriptions title="" column={2}>
                    <Descriptions.Item labelStyle={lableCss} label="员工姓名" span={2}>{detailData?.userName}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="归属公司">{detailData?.comName}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="发放日期">{detailData?.payDay}</Descriptions.Item>
                    {/* <Descriptions.Item labelStyle={lableCss} label="开票对象">{detailData?.invoiceObj == 0 ? '外部对象' : detailData?.invoiceObj == 1 ? '内部客户' : '其他'}</Descriptions.Item> */}
                </Descriptions>
                <Descriptions title="" column={2}>
                    <Descriptions.Item labelStyle={lableCss} label="基本工资">{detailData?.baseSalary}</Descriptions.Item>

                    <Descriptions.Item labelStyle={lableCss} label="提成金额">
                        {detailData?.commision}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="考勤天数">
                        {detailData?.workDays}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="法定工作日">{detailData?.totalDays}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="绩效工资">
                        {detailData?.kpiFee}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="月度绩效">
                        {detailData?.kpiFeeMonth}
                    </Descriptions.Item>



                    <Descriptions.Item labelStyle={lableCss} label="交通补助">
                        {detailData?.traffic}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="餐补">
                        {detailData?.food}
                    </Descriptions.Item>

                    <Descriptions.Item labelStyle={lableCss} label="其他补助">
                        {detailData?.other}

                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="合计扣款">
                        {detailData?.reduceFee}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="实发工资">
                        {detailData?.salary}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="" column={2}>
                    <Descriptions.Item labelStyle={lableCss} label="病假扣款">
                        {detailData?.sickFee}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="事假扣款">
                        {detailData?.thingFee}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="迟到早退">
                        {detailData?.lateEarlyFee}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="其他扣款">
                        {detailData?.otherDeduction}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card bordered={false} title={null}>
                <Descriptions title="" column={2}>
                    <Descriptions.Item labelStyle={lableCss} label="社保扣除">
                        {detailData?.socialInsurance}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="公司社保" span={2}>{detailData?.companyInsurance}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="公积金">{detailData?.accumulationFund}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="公司公积金">{detailData?.companyAccumulation}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="个税">{detailData?.tax}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="员工成本">
                        {detailData?.employCost}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card title={null} bordered={false}>
                <Descriptions title="提醒内容" column={2}>
                    <Descriptions.Item label="" span={2}>{detailData?.remark}</Descriptions.Item>
                </Descriptions>
            </Card>
        </PageContainer >
    );
};

export default AddInvoice;
