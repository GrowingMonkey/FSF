import { useState, useEffect } from "react";
import { Table, Button, Space, Divider, Row, Col, Pagination } from "antd";
import { info } from "china-region";
import ModalFormArea from "./components/ModalFormArea";
import ModalFormCompany from "./components/ModalFormCompany";
import ModalFormTeam from "./components/ModalFormTeam";
import { tcaList } from "../../../services/admin";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const TCAList = () => {
    const [isFresh, setIsFreash] = useState(false);

    const [visibleTeam, setVisibleTeam] = useState(false);
    const [visibleCompany, setVisibleCompany] = useState(false);
    const [visibleArea, setVisibleArea] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [listLength, setListLength] = useState(0);
    const [list, setList] = useState([]);
    const [formValue, setFormValue] = useState(null);
    useEffect(() => {
        tcaList({ pageNo: currentPage, pageSize: 10, level: '1' }).then((res) => {
            const { data } = res;
            setList(
                data.list.map((item) => {
                    return Object.assign(item, {
                        key: item.id,
                    });
                })
            );
            setListLength(data.count);
        });
    }, [currentPage, isFresh]);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const onSubmit = () => {
        setVisibleTeam(false);
        setVisibleCompany(false);
        setVisibleArea(false);
        setIsFreash(!isFresh);
    };
    const onCancel = () => {
        setVisibleTeam(false);
        setVisibleCompany(false);
        setVisibleArea(false);
    };
    const tcaColumns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: "15%",
            ellipsis: true,
        },
        {
            title: "领导",
            dataIndex: "leaderName",
            key: "leaderName",
            ellipsis: true,
            render: (text, record) => {
                return (
                    <Space split={<Divider type="vertical" />}>
                        <span>{text}</span>
                        <span>{record.leaderTel}</span>
                    </Space>
                );
            },
            width: "35%",
        },
        {
            title: "归属",
            dataIndex: "superiorName",
            key: "superiorName",
            width: "20%",
            ellipsis: true,
        },
        {
            title: "城市",
            dataIndex: "cityCode",
            key: "cityCode",
            ellipsis: true,
            width: "15%",
            render: (text) => {
                if (`${text}`.length === 6) {
                    return <div>{info(`${text}`).name}</div>;
                }
                return <div>/</div>;
            },
        },
        {
            title: "操作",
            key: "action",
            ellipsis: true,
            fixed: 'right',
            render: (text, record) => (
                <Space size={16}>
                    <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={() => {
                            if (record.level === 0) {
                                setVisibleArea(true);
                            }
                            if (record.level === 1) {
                                setVisibleCompany(true);
                            }
                            if (record.level === 2) {
                                setVisibleTeam(true);
                            }
                            setFormValue(record);
                        }}
                    >
                        编辑
          </Button>
                </Space>
            ),
            width: 100,
        },
    ];
    return (
        <PageContainer>

            <ModalFormArea
                visible={visibleArea}
                onSubmit={onSubmit}
                onCancel={onCancel}
                record={formValue}
            ></ModalFormArea>
            <ModalFormCompany
                visible={visibleCompany}
                onSubmit={onSubmit}
                onCancel={onCancel}
                record={formValue}
            ></ModalFormCompany>
            <ModalFormTeam
                visible={visibleTeam}
                onSubmit={onSubmit}
                onCancel={onCancel}
                record={formValue}
            ></ModalFormTeam>
            <div className={styles["list-container"]}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className={styles["page-title"]}>公司列表</div>
                    </Col>
                    <Col>
                        <Space>
                            {/* <Button
                                type="primary"
                                onClick={() => {
                                    setFormValue(null);
                                    setVisibleTeam(true);
                                }}
                            >
                                新增团队
              </Button> */}
                            <Button
                                type="primary"
                                onClick={() => {
                                    setFormValue(null);
                                    setVisibleCompany(true);
                                }}
                            >
                                新增分公司
              </Button>
                            {/* <Button
                                type="primary"
                                onClick={() => {
                                    setFormValue(null);
                                    setVisibleArea(true);
                                }}
                            >
                                新增大区
              </Button> */}
                        </Space>
                    </Col>
                </Row>
                <Divider></Divider>
                <Table
                    style={{ marginTop: "25px" }}
                    columns={tcaColumns}
                    dataSource={list}
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ x: 900 }}
                />
                <Row justify="end" style={{ marginTop: "15px" }}>
                    <Col>
                        <Pagination
                            current={currentPage}
                            onChange={onPageChange}
                            total={listLength}
                            showTotal={listLength => `共${listLength}条`}

                        ></Pagination>
                    </Col>
                </Row>
            </div>
        </PageContainer>
    );
};

export default TCAList;
