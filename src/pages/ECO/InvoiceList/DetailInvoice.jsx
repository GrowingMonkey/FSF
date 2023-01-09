import { Card, message, Form, Button, Descriptions } from 'antd';
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
                        {detailData?.serviceType == 0 ? '否' : '是'}
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
            <Card bordered={false} title={'开票信息'}>
                <Descriptions title="" column={2}>
                    <Descriptions.Item labelStyle={lableCss} label="议价服务费" span={2}>{detailData?.serviceFee}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="开票金额">{detailData?.fee}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="税率">{detailData?.invoiceRate}%</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="不含税金额">{detailData?.freeFee}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="税额">
                        {detailData?.invoiceFee}
                    </Descriptions.Item>
                </Descriptions>
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
