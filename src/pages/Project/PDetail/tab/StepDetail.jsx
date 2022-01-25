import { PageContainer } from '@ant-design/pro-layout';
import { Input, Dropdown, Menu, Button, Row, Divider, Tag, Descriptions, Card, Col, Avatar, Space } from 'antd';
import { history } from 'umi';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import StepItem from './components/StepItem';


const StepDetail = () => {
    return (
        <>
            <Card title="人选基本信息">
                <Row>
                    <Col span={2}><Avatar size={64} icon={<UserOutlined />} />
                    </Col>
                    <Col span={20}>
                        <Descriptions title="马XX" column={2}>
                            <Descriptions.Item>男  <Divider type="vertical" />硕士<Divider type="vertical" />31岁(1992-09-13)</Descriptions.Item>
                            <Descriptions.Item label="服务客户">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="联系电话">1810000000</Descriptions.Item>
                            <Descriptions.Item label="当前公司">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="电子邮箱">empty</Descriptions.Item>
                            <Descriptions.Item label="当前职位">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="目前薪资">1810000000</Descriptions.Item>
                            <Descriptions.Item label="人选状态">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="推荐人">empty</Descriptions.Item>
                            <Descriptions.Item label="人选相关">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="执行团队">1810000000</Descriptions.Item>
                            <Descriptions.Item label="推荐职位">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="回款信息">empty</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
            <Card>
                <div style={{ width: '100%', display: "flex", alignItems: 'center', background: '#096dd9', marginBottom: '12px' }}>
                    <div style={{ width: '64px', textAlign: 'center', color: '#fff', fontWeight: 600 }}>步骤</div>
                    <Row style={{ width: '100%', marginLeft: '12px', color: '#fff', padding: '12px', fontWeight: 600 }}>
                        <Col span={10}>详细内容</Col>
                        <Col span={2}>操作人</Col>
                        <Col span={4}>时间</Col>
                        <Col span={4}>绩效审核</Col>
                        <Col span={4}>操作</Col>
                    </Row>
                </div>
                <StepItem title="加入项目"></StepItem>
                <StepItem title="推给客户"></StepItem>
                <StepItem title="预约面试"></StepItem>
                <StepItem title="客户面试"></StepItem>
                <StepItem title="确认offer"></StepItem>
                <StepItem title="客户确认"></StepItem>
                <StepItem title="成功入职" isEnd={true}></StepItem>
                <div style={{ marginLeft: '76px' }}>
                    <Space><Button>添加评语</Button><Button>添加评语</Button><Button>添加评语</Button></Space>
                </div>

            </Card>

        </>
    );
};

export default StepDetail;
