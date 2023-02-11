import { Card, message, Form, Button, Text, Descriptions } from 'antd';
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
import { addInvoice, getAlreadyFee, sejsq, selectInvoiceById } from '@/services/eco'
import { upload } from '@/utils/lib/upload'
import SearchInput from '@/components/SearchInput';
import TalentSearchForEco from '@/components/TalentSearchForEco';
import { useState } from 'react';
import CustomerSearch from '@/components/CustomerSearch';
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
        const { location: { query } } = history;
        console.log(query)
        if (query.id) {
            setIsEdit(true);
            selectInvoiceById({ id: query.id }).then(res => {
                console.log(res);
                setDetailData(res?.data || {})
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
        justifyContent: 'right',
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
            <Card bordered={false} title={'申请发票'}>
                <Descriptions title="" column={2}>
                    <Descriptions.Item labelStyle={lableCss} label="开票公司" span={2}>{detailData?.customerName}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="申请用户">{detailData?.userName}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="申请人归属公司">{detailData?.companyName}</Descriptions.Item>
                    {/* <Descriptions.Item labelStyle={lableCss} label="开票对象">{detailData?.invoiceObj == 0 ? '外部对象' : detailData?.invoiceObj == 1 ? '内部客户' : '其他'}</Descriptions.Item> */}

                    <Descriptions.Item labelStyle={lableCss} label="发票属性">{detailData?.invoiceType == 0 ? '服务费' : detailData?.invoiceType == 1 ? '咨询费' : '其他'}</Descriptions.Item>

                    <Descriptions.Item labelStyle={lableCss} label="客户名称">
                        {detailData?.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="收入类型">
                        {detailData?.payType == 0 ? '服务费' : detailData?.payType == 1 ? '咨询费' : detailData?.payType == 2 ? '首付款' : '其他'}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="开票名称">{detailData?.name}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label={<b>是否关联人选</b>}>
                        {detailData?.talentProjects.length == 0 ? '否' : '是'}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label={<b>纳税人识别号</b>}>
                        {detailData?.invoiceNumber}
                    </Descriptions.Item>



                    <Descriptions.Item labelStyle={lableCss} label="业务类型">
                        {detailData?.serviceType == 0 ? '猎头业务' : detailData?.serviceType == 1 ? '咨询业务' : '其他'}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="开户银行">
                        {detailData?.bankName}
                    </Descriptions.Item>

                    <Descriptions.Item labelStyle={lableCss} label="发票类型">
                        {detailData?.type == 0 ? '普通发票' : detailData?.type == 1 ? '专用发票' : '电子普通发票'}

                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="银行账户">
                        {detailData?.bankNumber}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="公司地址">
                        {detailData?.address}
                    </Descriptions.Item>

                    <Descriptions.Item labelStyle={lableCss} label="公司电话">
                        {detailData?.phone}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card bordered={false} title={'开票信息'}
                actions={[
                    <div>总应收服务费:<b style={{ color: 'red' }}>{detailData?.talentProjects?.length > 0 ? detailData.talentProjects.map(i => i.serviceFee).reduce(function (pre, curr) { return Number(pre) + Number(curr); }) : 0}</b></div>,
                    <div>总开票金额:<b style={{ color: 'red' }}>{detailData?.talentProjects?.length > 0 ? detailData.talentProjects.map(i => i.fee).reduce(function (pre, curr) { return Number(pre) + Number(curr); }) : 0}</b></div>,
                    <div>总不含税金额:<b style={{ color: 'red' }}>{detailData?.talentProjects?.length > 0 ? detailData.talentProjects.map(i => i.freeFee).reduce(function (pre, curr) { return Number(pre) + Number(curr); }) : 0}</b></div>,
                    <div>总税额:<b style={{ color: 'red' }}>{detailData?.talentProjects?.length > 0 ? detailData.talentProjects.map(i => i.invoiceFee).reduce(function (pre, curr) { return Number(pre) + Number(curr); }) : 0}</b></div>
                ]}>

                {detailData?.talentProjects && detailData.talentProjects.length > 0 && detailData.talentProjects.map((tpItem) => {
                    console.log(tpItem)
                    return <><Descriptions title="" column={2}>
                        <Descriptions.Item labelStyle={lableCss} label="人选名称" span={2}><b>{tpItem?.talentName}</b></Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="应收服务费" span={2}>{tpItem?.serviceFee}</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="开票金额">{tpItem?.fee}</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="税率">{tpItem?.invoiceRate}%</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="不含税金额">{tpItem?.freeFee}</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="税额">
                            {tpItem?.invoiceFee}
                        </Descriptions.Item>
                    </Descriptions>
                    </>
                })}
            </Card>
            <Card bordered={false} title={'回款信息'}>
                {detailData?.serviceFeeSet && detailData.serviceFeeSet.length > 0 && detailData.serviceFeeSet.map((tpItem) => {
                    console.log(tpItem)
                    return <><Descriptions title="" column={2}>
                        <Descriptions.Item labelStyle={lableCss} label="回款金额" >{tpItem?.fee}</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="服务顾问" >{tpItem?.userName}</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="归属公司">{tpItem?.comName}</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="支付方式">{tpItem?.payWay == 0 ? '现金支付' : tpItem?.payWay == 1 ? '支票转账' : tpItem?.payWay == 2 ? '网银转账' : tpItem?.payWay == 3 ? '其他方式' : '个人电汇'}</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="客户名称">{tpItem?.customerName}</Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="收入类型">
                            {tpItem?.payType == 0 ? '服务费' : tpItem?.payType == 1 ? '咨询费' : tpItem?.payType == 2 ? '首付款' : '其他'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="业务类型">
                            {tpItem?.serviceType == 0 ? '猎头业务' : tpItem?.serviceType == 1 ? '咨询业务' : '其他'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={lableCss} label="回款期限">
                            {tpItem?.dateType}
                        </Descriptions.Item>
                    </Descriptions>
                    </>
                })}

            </Card>
            <Card title="申请发票备注" bordered={false}>
                <Descriptions title="" column={2}>
                    <Descriptions.Item label="" span={2}>{detailData?.remark}</Descriptions.Item>
                </Descriptions>
            </Card>
        </PageContainer>
    );
};

export default AddInvoice;
