import { useState, useEffect } from "react";
import { Table, Button, Space, Divider, Row, Col, Pagination, message } from "antd";
import { info } from "china-region";
import ModalFormArea from "./components/ModalFormArea";
import ModalFormCompany from "./components/ModalFormCompany";
import ModalFormTeam from "./components/ModalFormTeam";
import { tcaList, teamList, delTeam } from "../../../services/admin";
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
        // level:'2'
        teamList({ pageNo: currentPage, pageSize: 10, level: '2' }).then((res) => {
            // const { data } = res;
            setList(
                res?.data?.list?.map((item) => {
                    return Object.assign(item, {
                        key: item.id,
                    });
                }) || []
            );
            setListLength(res?.data?.count);
        });
    }, [currentPage, isFresh]);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const deleteTeam = (id) => {
        delTeam({ id: id }).then(res => {
            message.info(res.message);
            setIsFreash(!isFresh)
        })
    }
    const onSubmit = () => {
        setVisibleTeam(false);
        setVisibleCompany(false);
        setVisibleArea(false);
        setIsFreash(!isFresh)
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
            width: "10%",
            ellipsis: true,
            render: (text, record) => {
                return (
                    <Space split={<Divider type="vertical" />}>
                        <span>{text}</span>
                        <span>{record.leaderTel}</span>
                    </Space>
                );
            },
        },
        {
            title: "团队成员",
            dataIndex: "userList",
            key: "userList",
            ellipsis: true,
            render: (text, record) => {
                return record.userList.map(item => item.name).join(',')
            }
        },
        {
            title: "归属",
            dataIndex: "superiorName",
            key: "superiorName",
            width: "20%",
            ellipsis: true,
        },
        {
            title: "操作",
            key: "action",
            ellipsis: true,
            fixed: 'right',
            render: (text, record) => (
                <Space size={10}>
                    <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={() => {
                            console.log(record)
                            // if (record.level === 0) {
                            //     setVisibleArea(true);
                            // }
                            // if (record.level === 1) {
                            //     setVisibleCompany(true);
                            // }
                            // if (record.level === 2) {
                            setVisibleTeam(true);
                            // }
                            setFormValue(record);
                        }}
                    >
                        编辑
          </Button>
                    <Button type="link" onClick={() => deleteTeam(record.id)} > 删除</Button>
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
                        <div className={styles["page-title"]}>团队列表</div>
                    </Col>
                    <Col>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setFormValue(null);
                                    setVisibleTeam(true);
                                }}
                            >
                                新增团队
              </Button>
                            {/* <Button
                                type="primary"
                                onClick={() => {
                                    setFormValue(null);
                                    setVisibleCompany(true);
                                }}
                            >
                                新增分公司 */}
                            {/* </Button>
                            <Button
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
