import { Card, message, Form, Input, Button, Space, Descriptions, Table } from 'antd';

import cloneDeep from "lodash/cloneDeep";

import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addServiceFee } from '@/services/eco'
import { useState } from 'react';
import { confirmUserKpi, addKpiFee } from '@/services/eco'
import { useEffect } from 'react';


const AddInvoice = () => {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {

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
    const columns = []

    return (
        <PageContainer content="">
            <Card bordered={false} title={'新增业绩'} style={{ width: '100%' }}>
                <Descriptions>
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                </Descriptions>
            </Card>
            <Card bordered={false} title={'新增业绩'} style={{ width: '100%' }}>
                <List
                    bordered
                    dataSource={[]}
                    renderItem={item => (
                        <List.Item>
                            <Descriptions>
                                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                            </Descriptions>
                            <Table />
                        </List.Item>
                    )}>
                </List>
            </Card>
        </PageContainer >
    );
};

export default AddInvoice;
