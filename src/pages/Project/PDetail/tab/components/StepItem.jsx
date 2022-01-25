import { PageContainer } from '@ant-design/pro-layout';
import { Input, Dropdown, Menu, Button, Row, Divider, Tag, Descriptions } from 'antd';
import { history } from 'umi';
import { DownOutlined } from '@ant-design/icons';


const StepItem = ({ title }) => {




    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Tag color="#f39f0cfa" style={{ margin: '0 auto' }}>{title}</Tag><Divider type="vertical" dashed={true} orientation="right" orientationMargin="0" style={{ flexGrow: 1, borderColor: '#096dd9' }}></Divider><DownOutlined style={{ color: '#096dd9' }}
                    />
                </div>
                <div style={{ flexGrow: 1, marginLeft: '12px', }}>
                    <Descriptions column={1} >
                        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    </Descriptions>
                    <Divider></Divider>
                </div>
            </div>

        </>
    );
};

export default StepItem;
