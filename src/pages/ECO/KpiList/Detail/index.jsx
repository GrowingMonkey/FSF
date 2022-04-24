import { Card, List, message, Form, Input, Button, Space, Descriptions, Table } from 'antd';

import cloneDeep from "lodash/cloneDeep";

import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addServiceFee } from '@/services/eco'
import { useState } from 'react';
import { confirmUserKpi, addKpiFee, selectKpiFeeById } from '@/services/eco'
import { useEffect } from 'react';


const AddInvoice = () => {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        const { location: { query } } = history;
        console.log(query)
        selectKpiFeeById({ kpiId: query.kpiId, sourceId: query.sourceId }).then(res => {
            console.log(res);
            setDataSource(res?.data || {})
        })
    }, [])
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
    const columns = [
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
            dataIndex: 'rate',
            key: 'rate',
            ellipsis: true,
        },
        {
            title: '业绩金额',
            dataIndex: 'kpiFee',
            key: 'kpiFee',
            ellipsis: true,
        },
        {
            title: '提成金额',
            dataIndex: 'commissionFee',
            key: 'commissionFee',
            ellipsis: true,
        },
    ]

    return (
        <PageContainer content="">
            <Card bordered={false} title={'基本详情'} style={{ width: '100%' }}>
                <Descriptions column={2}>
                    <Descriptions.Item label="回款信息">{dataSource.customerName}</Descriptions.Item>
                    <Descriptions.Item label="归属公司">{dataSource.comName}</Descriptions.Item>
                    <Descriptions.Item label="提成分类">{dataSource.type}</Descriptions.Item>
                    <Descriptions.Item label="提成比例">{dataSource.rate}</Descriptions.Item>
                    <Descriptions.Item label="回款金额">{dataSource.serviceFee}</Descriptions.Item>
                    <Descriptions.Item label="提成金额">{dataSource.commissionFee}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Card bordered={false} title={'分配方案'} style={{ width: '100%' }}>
                <List
                    bordered
                    dataSource={dataSource?.allotPlans || []}
                    renderItem={item => (
                        <List.Item>
                            <Descriptions>
                                <Descriptions.Item label="分配金额">{item.serviceFee}</Descriptions.Item>
                                <Descriptions.Item label="关联人选">{item.talentName}</Descriptions.Item>
                                <Descriptions.Item label="业绩分类"> {item.type}</Descriptions.Item>
                            </Descriptions>
                            <Table columns={columns} dataSource={item?.kpiUserInfos || []} pagination={false} size="small"
                                bordered
                                footer={() => <div>提成总计金额{item.kpiUserInfos[0].allCommissionFee}元 业绩总计金额{item.kpiUserInfos[0].kpiFee}</div>}
                            />
                        </List.Item>
                    )}>
                </List>
            </Card>
        </PageContainer >
    );
};

export default AddInvoice;
