import { Card, Row, List, message, Form, Modal, Input, Button, Space, Descriptions, Table } from 'antd';

import cloneDeep from "lodash/cloneDeep";

import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addServiceFee } from '@/services/eco'
import { useState } from 'react';
import { confirmUserKpi, addKpiFee, selectKpiFeeById } from '@/services/eco'
import { useEffect } from 'react';


const DetailModal = ({ visibledetail = null, handleClose = () => { }, kpiId = null, sourceId = null }) => {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        const { location: { query } } = history;
        console.log(query)
        if (kpiId) {
            selectKpiFeeById({ kpiId: kpiId, sourceId: sourceId }).then(res => {
                console.log(res);
                setDataSource(res?.data || {})
            })
        }
    }, [kpiId, sourceId])
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
    const Allcolumns = [
        {
            title: '提成用户',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
        },
        {
            title: '提成金额',
            dataIndex: 'commissionFeeAll',
            key: 'commissionFeeAll',
            ellipsis: true,
        },
        {
            title: '业绩金额',
            dataIndex: 'kpiFeeAll',
            key: 'kpiFeeAll',
            ellipsis: true,
        },
    ]
    const columns = [
        {
            title: '类型',
            dataIndex: 'comisType',
            key: 'comisType',
            ellipsis: true,
        },
        {
            title: '提成人',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
        },
        {
            title: '归属公司',
            dataIndex: 'comName',
            key: 'comName',
            ellipsis: true,
        },
        {
            title: '业绩比例',
            dataIndex: 'commissionRate',
            key: 'commissionRate',
            ellipsis: true,
        },
        {
            title: '业绩金额',
            dataIndex: 'kpiFee',
            key: 'kpiFee',
            ellipsis: true,
            render: (text) => {
                return <span style={{ color: 'red' }}>{text}</span>
            }
        },
        {
            title: '提成金额',
            dataIndex: 'commissionFee',
            key: 'commissionFee',
            ellipsis: true,
            render: (text) => {
                return <span style={{ color: 'red' }}>{text}</span>
            }
        },
    ]
    console.log(visibledetail)
    return (
        <Modal
            width={1000}
            visible={visibledetail}
            title={'详情'}
            okText="关闭"
            cancelText="取消"
            onCancel={() => handleClose()}
            onOk={() => handleClose()}
        >
            <Card bordered={false} title={null} style={{ width: '100%' }}>
                <Descriptions column={2}>
                    <Descriptions.Item label="回款信息">{dataSource.customerName}</Descriptions.Item>
                    <Descriptions.Item label="归属公司">{dataSource.comName}</Descriptions.Item>
                    <Descriptions.Item label="提成分类">{dataSource.payType == 0 ? '服务费' : dataSource.type == 1 ? '咨询费' : dataSource.type == 3 ? '首付款' : ''}</Descriptions.Item>
                    <Descriptions.Item label="提成比例"><span style={{ color: 'red' }}>{dataSource.rate}</span></Descriptions.Item>
                    {dataSource.rate == 5 && [<Descriptions.Item label="回款金额">{dataSource.serviceFee}</Descriptions.Item>,
                    <Descriptions.Item label="提成金额">{dataSource.commissionFee}</Descriptions.Item>]}
                </Descriptions>
            </Card>
            <Card bordered={false} title={'分配方案'} style={{ width: '100%' }}>
                <List
                    bordered
                    dataSource={dataSource?.allotPlans || []}
                    renderItem={item => (
                        <List.Item style={{ flexDirection: 'column' }}>
                            <Descriptions>
                                <Descriptions.Item label="分配金额"><span style={{ color: 'red' }}>{item.serviceFee}</span></Descriptions.Item>
                                <Descriptions.Item label="关联人选">{item.talentName}</Descriptions.Item>
                                <Descriptions.Item label="业绩分类"> {item.type == 1 ? '独立运作' : item.type == 2 ? '组内合作' : item.type == 3 ? '同城合作' : item.type == 4 ? '跨区合作' : ''}</Descriptions.Item>
                            </Descriptions>

                            <Table
                                title={() => <b>各环节提成分配</b>}
                                columns={columns} dataSource={item?.kpiUserInfos || []} pagination={false} size="small"
                                bordered
                            />
                            <Table
                                title={() => <b>提成分配汇总</b>}
                                columns={Allcolumns} bordered dataSource={dataSource?.kpiuserTotalList || []} pagination={false} size="small"
                                footer={() => <div>提成总计金额<span style={{ color: 'red' }}>{item.kpiUserInfos[0].allCommissionFee}</span>元 业绩总计金额<span style={{ color: 'red' }}>{item.kpiUserInfos[0].allKpiFee}</span></div>}

                            />
                        </List.Item>
                    )}>
                </List>
            </Card>
        </Modal>
    );
};

export default DetailModal;
