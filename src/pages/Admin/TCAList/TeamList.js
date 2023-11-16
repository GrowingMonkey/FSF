import { useState, useEffect } from "react";
import { Table, Tag, Modal, Button, Space, Form, Divider, Row, Col, Pagination, message } from "antd";
import { info } from "china-region";
import ModalFormArea from "./components/ModalFormArea";
import ModalFormCompany from "./components/ModalFormCompany";
import ModalFormTeam from "./components/ModalFormTeam";
import { tcaList, teamList, delTeam, addTeamUser, delTeamUser } from "../../../services/admin";
import styles from "./index.less";
import SearchInput from '@/components/SearchInput';

import { PageContainer } from "@ant-design/pro-layout";
import {
    EditTwoTone, PlusOutlined
} from '@ant-design/icons';
import ProForm from '@ant-design/pro-form';

const TCAList = () => {
    const [isFresh, setIsFreash] = useState(false);
    const [teamForm, setTeamForm] = Form.useForm();
    const [visibleTeam, setVisibleTeam] = useState(false);
    const [visibleCompany, setVisibleCompany] = useState(false);
    const [visibleArea, setVisibleArea] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [listLength, setListLength] = useState(0);
    const [list, setList] = useState([]);
    const [formValue, setFormValue] = useState(null);
    const [TeamModal, setTeamModal] = useState(false);
    const [TeamId, setTeamId] = useState('');
    const [TeamAddModal, setTeamAddModal] = useState(false);

    const [TeamData, setTeamData] = useState([]);
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
    useEffect(() => {
        if (TeamData.length > 0) {

        }
    }, [])
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
                return [record.userList.map(item => item.name).join(','), <EditTwoTone onClick={() => { setTeamModal(true), setTeamId(record.id), setTeamData(record.userList) }} />]
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
            <Modal
                visible={TeamAddModal}
                title={'新增成员'}
                onCancel={() => setTeamAddModal(false)}
                footer={null}
            >
                <ProForm
                    form={teamForm}
                    hideRequiredMark
                    style={{
                        margin: 'auto',
                        marginTop: 8,
                        maxWidth: 600,
                    }}
                    name="basic"
                    layout="vertical"
                    initialValues={{
                        public: '1',
                    }}
                    onFinish={(values) => {
                        addTeamUser({ appUserId: values.project.recommenderUserId, superId: TeamId }).then((v) => {
                            if (v.code == 0) {
                                TeamData.push({ name: values.project.recommenderName, id: values.project.recommenderUserId });
                                setTeamAddModal(false);
                                teamForm.resetFields();
                            } else {
                                message.error(v.message)
                            }
                        })

                    }}
                >
                    <Form.Item
                        label="顾问名称"
                        name="project"
                    >
                        <SearchInput></SearchInput>
                    </Form.Item>
                </ProForm>

            </Modal>
            <Modal
                visible={TeamModal}
                title={'团队成员'}
                cancelText={'关闭'}
                onCancel={() => { setTeamModal(false); setIsFreash(!isFresh) }}
                onOk={() => { setTeamModal(false); setIsFreash(!isFresh) }}
            >
                {TeamData.map((tag, index) => {
                    console.log(tag);
                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag.id}
                            closable
                            color={["#f50", "#87d068", "#2db7f5", "#108ee9"][index % 4]}
                            onClose={(e) => {
                                e.preventDefault();
                                delTeamUser({
                                    appUserId: tag.userId,
                                    superId: TeamId
                                }).then(res => {
                                    if (res.code == 0) {
                                        setTeamData(TeamData.filter((cur) => cur.userId != tag.userId))
                                    } else {
                                        message.error(res.message)
                                    }
                                })

                            }}
                        >
                            {tag.name}
                        </Tag>
                    );
                    return tagElem
                })}
                <Tag className="site-tag-plus" onClick={() => setTeamAddModal(true)}>
                    <PlusOutlined />新增成员
                </Tag>
            </Modal>

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
