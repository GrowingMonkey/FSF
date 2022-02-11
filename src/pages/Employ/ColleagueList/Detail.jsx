import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Descriptions,
    Image,
    Select,
    Table,
    Divider,
    Space,
    DatePicker,
} from "antd";
import ModalMyInfo from "./component/ModalMyInfo";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
import { useEffect, useState } from "react";
import { selectEmployList } from '@/services/employ'
import { useRequest, history } from 'umi'

const Detail = () => {


    return (
        <PageContainer style={{ background: '#fff' }}>
            <Row>
                <Col><Image /></Col>
                <Col>
                    <Descriptions
                        bordered
                        column={2}
                    >
                        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
                        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                        <Descriptions.Item label="简介" contentStyle={{ border: '1px solid black' }}>$60.00</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </PageContainer>
    );
};
export default Detail;
