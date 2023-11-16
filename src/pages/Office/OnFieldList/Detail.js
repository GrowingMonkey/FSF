import { Card, message, Form, Button, Descriptions, Steps, Row, Col, Switch } from 'antd';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addInvoice, getAlreadyFee, sejsq, selectInvoiceById } from '@/services/eco'
import { useState } from 'react';
import { useEffect } from 'react';
import StepItem from './components/StepItem';

const description = 'This is a description.';
import { selectBtripById } from '@/services/office'


// import { selectBtripById } from '@/services/office'


const Detail = () => {
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
            selectBtripById({ id: query.id }).then(res => {
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
    const strFormat = (flow) => {
        switch (parseInt(flow)) {
            case 1:
                return '待团队leader审批'
                break;
            case 2:
                return '待人事审批'
                break;
            case 3:
                return '待总经理审批'
                break;
            case 4:
                return '团队leader拒绝'
                break;
            case 5:
                return '人事拒绝'
                break;
            case 6:
                return '总经理拒绝'
                break;
            case 7:
                return '申请通过'
                break;
            case 8:
                return '待人事审批（TL出差专属）'
                break;
        }
    }
    const lableCss = {
        width: 120,
        justifyContent: 'left',
        color: '#999'
    }

    return (
        <PageContainer content="">
            <Card bordered={false} title={'出差详情'}>
                <Descriptions title="" column={1}>
                    <Descriptions.Item labelStyle={lableCss} label="出差类型" span={2}>{detailData?.type == 0 ? '单人出差' : '多人出差'}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="出发城市">{detailData?.sourceCity}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="目的城市">{detailData?.targetCity}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="详细地址">{detailData?.targetAddress}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="出差时间">{detailData?.startTime + '-' + detailData?.endTime}</Descriptions.Item>
                    <Descriptions.Item labelStyle={lableCss} label="出差原因">{detailData?.reason}</Descriptions.Item>
                    {/* <Descriptions.Item labelStyle={lableCss} label="附件">{detailData?.files?.url}</Descriptions.Item> */}


                    {/* <Descriptions.Item labelStyle={lableCss} label="开票对象">{detailData?.invoiceObj == 0 ? '外部对象' : detailData?.invoiceObj == 1 ? '内部客户' : '其他'}</Descriptions.Item> */}
                </Descriptions>
            </Card>
            <Card title={null} bordered={false}>
                <div style={{ width: '100%', display: "flex", alignItems: 'center', background: '#096dd9', marginBottom: '12px' }}>
                    <div style={{ width: '64px', textAlign: 'center', color: '#fff', fontWeight: 600 }}>进程</div>
                    <Row style={{ width: '100%', marginLeft: '12px', color: '#fff', padding: '12px', fontWeight: 600 }}>
                        <Col span={20}>详细内容</Col>
                        {/* <Col span={2}>操作人</Col> */}
                        {/* <Col span={8}>时间</Col> */}
                    </Row>
                </div>
                {
                    detailData?.flows && detailData.flows.map((item, index) => <StepItem isEdit={false} title={index + 1} isEnd={index == (detailData.flows.length - 1)} info={{ remark: `${item.createTime} ${item.userName} ${item.flow == 1 ? '审核通过 ' + strFormat(item.flow) : '拒绝' + item.reasonNo}` }} ></StepItem>)
                }
            </Card>
        </PageContainer >
    );
};

export default Detail;
