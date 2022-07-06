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

import styles from "./Detail.less";
import { PageContainer } from "@ant-design/pro-layout";
import { useEffect, useState } from "react";
import { selectUser } from '@/services/employ'
import { useRequest, history } from 'umi'
import TextArea from "antd/lib/input/TextArea";

const Detail = () => {
    const [employ, setEmploy] = useState({})
    const { location: { query } } = history
    console.log(query);
    useEffect(() => {
        selectUser({ userId: query.userId }).then(res => {
            setEmploy(res?.data || {})
        })
    }, [])
    const { headUrl, name, roleName, comName, phone, email, hrLevel, flowerName, domicile, birthday, details } = employ;
    return (
        <PageContainer>
            <div className={styles["input-container"]}>
                <Row justify="center">
                    <Col span={4}><Image style={{ maxWidth: '100px' }} src={headUrl ? 'https://faithful.oss-cn-shanghai.aliyuncs.com' + headUrl + '?x-oss-process=image/resize,w_100,h_100/quality,q_50' : `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffb9431a4c99691e54952d85ed034faf9a6b7e4f22d45-xy5FHF_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647160965&t=81c9ce7f726dd9c62bd6b4e0a446684c`} /></Col>
                    <Col span={20}>
                        <Descriptions
                            column={2}
                        >
                            <Descriptions.Item label="姓名">{name}</Descriptions.Item>
                            <Descriptions.Item label="职位">{roleName}</Descriptions.Item>
                            <Descriptions.Item label="公司">{comName}</Descriptions.Item>
                            <Descriptions.Item label="电话">{phone}</Descriptions.Item>
                            <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
                            <Descriptions.Item label="级别">{hrLevel}</Descriptions.Item>
                            <Descriptions.Item label="籍贯">{domicile}</Descriptions.Item>
                            <Descriptions.Item label="花名">{flowerName}</Descriptions.Item>
                            <Descriptions.Item label="生日">{birthday}</Descriptions.Item>
                            <Descriptions.Item label="简介" contentStyle={{ border: '1px solid #ddd', padding: '16px 10px', minHeight: '150px' }}>
                                {details}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
        </PageContainer>
    );
};
export default Detail;
