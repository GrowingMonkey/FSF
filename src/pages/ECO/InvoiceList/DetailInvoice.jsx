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
            message.success('ζδΊ€ζε');
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
            <Card bordered={false} title={'η³θ―·εη₯¨'}>
                <Descriptions title="" column={2}>
                    <Descriptions.Item labelStyle={lableCss} label="εΌη₯¨ε¬εΈ" span={2}>{detailData?.customerName}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="η³θ―·η¨ζ·">{detailData?.userName}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="η³θ―·δΊΊε½ε±ε¬εΈ">{detailData?.companyName}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="εΌη₯¨ε―Ήθ±‘">{detailData?.invoiceObj == 0 ? 'ε€ι¨ε―Ήθ±‘' : detailData?.invoiceObj == 1 ? 'ει¨ε?’ζ·' : 'εΆδ»'}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="ε?’ζ·εη§°">
                        {detailData?.customerOut}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="εΌη₯¨εη§°">{detailData?.name}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="εη₯¨ε±ζ§">{detailData?.invoiceType == 0 ? 'ζε‘θ΄Ή' : detailData?.invoiceType == 1 ? 'ε¨θ―’θ΄Ή' : 'εΆδ»'}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="δΈε‘η±»ε">
                        {detailData?.serviceType == 0 ? 'ηε€΄δΈε‘' : detailData?.serviceType == 1 ? 'ε¨θ―’δΈε‘' : 'εΆδ»'}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="ζΆε₯η±»ε">
                        {detailData?.payType == 0 ? 'ζε‘θ΄Ή' : detailData?.payType == 1 ? 'ε¨θ―’θ΄Ή' : detailData?.payType == 2 ? 'ι¦δ»ζ¬Ύ' : 'εΆδ»'}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="εη₯¨η±»ε">
                        {detailData?.serviceType == 0 ? 'ζ?ιεη₯¨' : detailData?.serviceType == 1 ? 'δΈη¨εη₯¨' : 'η΅ε­ζ?ιεη₯¨'}

                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="ζ―ε¦ε³θδΊΊι">
                        {detailData?.serviceType == 0 ? 'ε¦' : 'ζ―'}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="ηΊ³η¨δΊΊθ―ε«ε·" span={2}>
                        {detailData?.invoiceNumber}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card bordered={false} title={'εΌη₯¨δΏ‘ζ―'}>
                <Descriptions title="" column={2}>
                    <Descriptions.Item labelStyle={lableCss} label="θ??δ»·ζε‘θ΄Ή" span={2}>{detailData?.serviceFee}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="εΌη₯¨ιι’">{detailData?.fee}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="η¨η">{detailData?.invoiceRate}%</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="δΈε«η¨ιι’">{detailData?.freeFee}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="η¨ι’">
                        {detailData?.invoiceFee}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card title="η³θ―·εη₯¨ε€ζ³¨" bordered={false}>
                <Descriptions title="" column={2}>
                    <Descriptions.Item label="" span={2}>{detailData?.remark}</Descriptions.Item>
                </Descriptions>
            </Card>
        </PageContainer>
    );
};

export default AddInvoice;
