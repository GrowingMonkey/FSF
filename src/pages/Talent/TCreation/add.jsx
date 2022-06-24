import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Select,
    Divider,
    Radio,
    Cascader,
    InputNumber,
    DatePicker,
    message,
    Upload,
} from 'antd';
import moment from 'moment'
import CascaderMul from '@/components/CascaderMul';
import ProForm, {
    ProFormText,
    ProFormRadio,
    ProFormDatePicker,
    ProFormCheckbox,
    ProFormSelect,
    ProFormUploadButton,
    ProFormGroup,
    ProFormDateRangePicker,
} from '@ant-design/pro-form';
import { FormattedMessage } from 'umi';
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { cityList } from '../../../utils/CityList';
import { industryList } from '../../../utils/Industry';
import { positionList } from '../../../utils/Position';
import {
    getTalentId,
    addTalent,
    addEP,
    addEdu,
    addEC,
    talentCheck,
    upFileLimit,
    parseBase
} from '../../../services/talent';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { upload } from '@/utils/lib/upload';
import SelfDate from '@/components/SelfDate';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;
//将文件转换成base64
const getFileBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader);
            resolve(reader.result)
        }
        reader.onerror = (error) => reject(error);
    });
};
const TCreation = () => {
    const history = useHistory();
    const [isFirst, setIsFirst] = useState(true);
    const [industryChildList, setIndustryChildList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [pIndustryChildList, setPIndustryChildList] = useState([]);
    const [eIndustryChildList, setEIndustryChildList] = useState([]);
    const [basicForm] = Form.useForm();
    const [educationForm] = Form.useForm();
    const [projectForm] = Form.useForm();
    const [experienceForm] = Form.useForm();
    const [contactForm] = Form.useForm();
    const [infoForm] = Form.useForm();
    const [jobForm] = Form.useForm();
    const [jiexiNum, setJiexiNum] = useState(0);
    const [sourceFile, setSourceFile] = useState(null);

    useEffect(() => {
        upFileLimit().then(res => {
            setJiexiNum(res)
        })
    }, [])
    const handleSubmit = () => {
        basicForm.validateFields().then((basicValues) => {
            debugger;
            getTalentId().then(async (res) => {
                const { data } = res;
                let id = data;
                let payload = Object.assign(
                    {},
                    { ...basicValues, birthday: basicValues?.birthday?.format('YYYY-MM-DD') },
                );

                if (basicValues.headUrl?.length > 0) {
                    payload.headUrl = basicValues.headUrl[0];
                }
                let contactFormResult = await contactForm.validateFields();
                let inFormResult = await infoForm.validateFields();
                let jobFormResult = await jobForm.validateFields();
                if (jobFormResult.RCity) {
                    // if (jobFormResult.RCity[1]) {
                    //   jobFormResult.RCity = `${jobFormResult.RCity[0]}/${jobFormResult.RCity[1]}`;
                    // } else {
                    //   jobFormResult.RCity = `${jobFormResult.RCity[0]}/`;
                    // }
                    jobFormResult.RCity = jobFormResult.RCity?.join(',') || jobFormResult.RCity
                }
                if (jobFormResult.RJob) {
                    jobFormResult.RJob = jobFormResult.RJob[jobFormResult.RJob.length - 1];
                }
                Promise.all([
                    educationForm.validateFields(),
                    projectForm.validateFields(),
                    experienceForm.validateFields(),
                ]).then((values) => {
                    // console.log(values);
                    let gzjl = [];
                    let xmjl = [];
                    let jyjl = [];
                    let isSub = true;
                    values.forEach((item) => {
                        if (Object.keys(item)[0] === 'education') {
                            // console.log(item["education"], 1, item["education"].length);
                            debugger;
                            if (item['education'] && item['education'].length > 0) {
                                item['education'].forEach((education) => {
                                    // console.log(education.startTime.format("YYYY-MM-DD"));
                                    let payload = Object.assign({}, education);
                                    if (education.startTime) {
                                        payload.startTime = education.startTime.startTime;
                                        payload.endTime = education.startTime.endTime;
                                        payload.isNow = education.startTime.isNow;
                                    }
                                    if (education.endTime) {
                                        payload.endTime = education.startTime[1].format('YYYY-MM-DD');
                                    }
                                    // extraInfo.push(addEdu({ talentId: id, ...payload }));
                                    console.log('education');
                                    console.log(payload);
                                    jyjl.push(payload);
                                });
                            } else {
                                message.error('教育经历至少一项')
                                isSub = false;
                            }
                        }
                        if (Object.keys(item)[0] === 'project') {
                            debugger;
                            // console.log(item["project"], 2, item["project"].length);
                            if (item['project']) {
                                item['project'].forEach((project) => {
                                    let payload = Object.assign({}, project);
                                    if (project.startTime) {
                                        payload.startTime = project.startTime.startTime;
                                        payload.endTime = project.startTime.endTime;
                                        payload.isNow = project.startTime.isNow;
                                    }
                                    if (project.endTime) {
                                        payload.endTime = project.startTime[1].format('YYYY-MM-DD');
                                    }
                                    // extraInfo.push(addEP({ talentId: id, ...payload }));
                                    console.log('project');
                                    console.log(payload);
                                    xmjl.push(payload);
                                });
                            }
                        }
                        if (Object.keys(item)[0] === 'experience') {
                            // console.log(item["experience"], 3, item["experience"].length);
                            debugger;
                            if (item['experience'] && item['experience'].length > 0) {
                                item['experience'].forEach((experience) => {
                                    let payload = Object.assign({}, experience);
                                    if (experience.startTime) {
                                        payload.startTime = experience.startTime.startTime;
                                        payload.endTime = experience.startTime.endTime;
                                        payload.isNow = experience.startTime.isNow;
                                    }
                                    if (experience.endTime) {
                                        payload.endTime = experience.startTime[1].format('YYYY-MM-DD')[1];
                                    }

                                    console.log('experience');
                                    console.log(payload);
                                    // extraInfo.push(addEC({ talentId: id, ...payload }));
                                    gzjl.push(payload);
                                });
                            } else {
                                isSub = false;
                                message.error('工作经历至少一项')
                            }
                        }

                    });
                    console.log(gzjl, xmjl, jyjl);
                    if (isSub) {
                        addTalent({
                            talentId: data,
                            ...payload,
                            ...jobFormResult,
                            ...inFormResult,
                            ...contactFormResult,
                            gzjl: gzjl,
                            xmjl: xmjl,
                            jyjl: jyjl,
                        }).then((data) => {
                            console.log(data);
                            if (data.code == 0) {
                                message.success('新增人选成功');
                                history.push('/talent/t-list');
                            } else {
                                message.error(data.message);
                            }
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
                // addTalent({
                //   talentId: data,
                //   ...payload,
                //   ...jobFormResult,
                //   ...inFormResult,
                //   ...contactFormResult,
                // }).then((data) => {
                //   Promise.all([
                //     educationForm.validateFields(),
                //     projectForm.validateFields(),
                //     experienceForm.validateFields(),
                //   ]).then((values) => {
                //     // console.log(values);
                //     let extraInfo = [];
                //     values.forEach((item) => {
                //       if (Object.keys(item)[0] === 'education') {
                //         // console.log(item["education"], 1, item["education"].length);
                //         debugger;
                //         if (item['education']) {
                //           item['education'].forEach((education) => {
                //             // console.log(education.startTime.format("YYYY-MM-DD"));
                //             let payload = Object.assign({}, education);
                //             if (education.startTime) {
                //               payload.startTime = education.startTime.startTime;
                //               payload.endTime = education.startTime.endTime;
                //               payload.isNow = education.startTime.isNow;
                //             }
                //             if (education.endTime) {
                //               payload.endTime = education.startTime[1].format('YYYY-MM-DD');
                //             }
                //             extraInfo.push(addEdu({ talentId: id, ...payload }));
                //           });
                //         }
                //       }
                //       if (Object.keys(item)[0] === 'project') {
                //         debugger;
                //         // console.log(item["project"], 2, item["project"].length);
                //         if (item['project']) {
                //           item['project'].forEach((project) => {
                //             let payload = Object.assign({}, project);
                //             if (project.startTime) {
                //               payload.startTime = project.startTime.startTime;
                //               payload.endTime = project.startTime.endTime;
                //               payload.isNow = project.startTime.isNow;
                //             }
                //             if (project.endTime) {
                //               payload.endTime = project.startTime[1].format('YYYY-MM-DD');
                //             }
                //             extraInfo.push(addEP({ talentId: id, ...payload }));
                //           });
                //         }
                //       }
                //       if (Object.keys(item)[0] === 'experience') {
                //         // console.log(item["experience"], 3, item["experience"].length);
                //         debugger;
                //         if (item['experience']) {
                //           item['experience'].forEach((experience) => {
                //             let payload = Object.assign({}, experience);
                //             if (experience.startTime) {
                //               payload.startTime = experience.startTime.startTime;
                //               payload.endTime = experience.startTime.endTime;
                //               payload.isNow = experience.startTime.isNow;
                //             }
                //             if (experience.endTime) {
                //               payload.endTime = experience.startTime[1].format('YYYY-MM-DD')[1];
                //             }
                //             extraInfo.push(addEC({ talentId: id, ...payload }));
                //           });
                //         }
                //       }
                //     });
                //     Promise.all(extraInfo).then((datas) => {
                //       message.success('新增人选成功');
                //       history.push('/talent/t-list');
                //     });
                //   });
                // });
            });
        }).catch(err => {
            console.log(err);
            basicForm.scrollToField(err.errorFields[0].name, {
                inline: 'center',
                block: 'center'
            })
        });
    };
    const onIndustryChange = (value, data) => {
        setIndustryChildList(data.children);
        basicForm.setFieldsValue({
            RIndustryChild: data.children ? data.children[0].value : data.value,
        });
    };
    const fileProps = {
        name: 'file',
        multiple: false,
        showUploadList: true,
        customRequest: async (options) => {
            console.log(options);
            setSourceFile(options.file);
            options.onSuccess();
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    }
    const onPIndustryChange = (value, data, key) => {
        const fields = projectForm.getFieldsValue();
        const { project } = fields;
        setPIndustryChildList(data.children);
        Object.assign(project[key], { industryChild: data.children[0].value });
        projectForm.setFieldsValue({ project });
    };
    const onEIndustryChange = (value, data, key) => {
        const fields = experienceForm.getFieldsValue();
        const { experience } = fields;
        setEIndustryChildList(data.children);
        Object.assign(experience[key], {
            industryChild: data.children ? data.children[0].value : data.value,
        });
        experienceForm.setFieldsValue({ experience });
    };
    const cnkiPhoneAndEmail = (value) => {
        console.log(value);
        //检查手机号或邮箱是否重复
        if (value.phone && value.phone.length == 11) {
            talentCheck(value).then((res) => {
                if (res.data == 1) {
                    message.error('该号码已经被注册');
                }
            });
        } else if (value.email && value.email.indexOf('@') > -1) {
            talentCheck(value).then((res) => {
                if (res.data == 1) {
                    message.error('该邮箱已经被注册');
                }
            });
        }
    };
    const uploadButton = (
        <div>
            {<PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    /**
     * 简历解析接口
     * resume_base base64文件流
     * file_name 文件名称
     */
    const jiexiJianLi = async () => {
        // let xhr = null, result = null, json = null;
        let forms = new FormData();
        let reader = new FileReader()
        //     // 发送异步请求
        //     // 0.使用readAsText方法（读取结果普通文本）
        //     // reader.readAsText(this.files[0]);
        let file = sourceFile;
        reader.readAsDataURL(file);
        reader.onload = (res) => {
            console.log(res.currentTarget.result)
            //         let formss = new FormData();
            //         formss.append('resume-file', res.currentTarget.result);
            //         formss.append('file-name', sourceFile.name)
            let basefile = res.currentTarget.result;
            // let basefile = await getFileBase64(sourceFile)
            forms.append('resume-file', basefile);
            forms.append('file-name', sourceFile.name)
            parseBase({
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'APPCODE 0b0c24b75da2405d810b21ba17435cfa' //替换为您的密匙
            }, {
                resume_base: basefile.split(';base64,')[1],
                file_name: sourceFile.name
            }
            ).then(res => {
                console.log(res);
                if (res.errorcode == 0) {
                    message.success('解析成功');
                    const { parsing_result } = res;
                    contactForm.setFieldsValue({
                        phone: parsing_result.contact_info.phone_number,
                        email: parsing_result.contact_info.email
                    })
                    const eduArr = [
                        {
                            label: '大专以下',
                            value: 3,
                        },
                        {
                            label: '大专',
                            value: 4,
                        },
                        {
                            label: '本科',
                            value: 5,
                        },
                        {
                            label: '硕士',
                            value: 6,
                        },
                        {
                            label: '博士',
                            value: 7,
                        },
                    ]
                    const gedArr = [
                        {
                            value: '1',
                            label: '男',
                        },
                        {
                            value: '2',
                            label: '女',
                        },
                    ]
                    basicForm.setFieldsValue({
                        name: parsing_result.basic_info.name,
                        age: parsing_result.basic_info.age,
                        education: eduArr.filter(item => item.label == parsing_result.basic_info.degree)[0]?.value || '',
                        experience: parsing_result.basic_info.num_work_experience,
                        gender: gedArr.filter(item => item.label == parsing_result.basic_info.gender)[0]?.value || '',
                        birthday: parsing_result.basic_info.date_of_birth ? moment(parsing_result.basic_info.date_of_birth, 'YYYY-MM-DD') : null,
                        salary: parsing_result.basic_info.current_salary,
                        domicile: parsing_result.basic_info.expect_location,
                        location: parsing_result.basic_info.current_location,
                        workState: parsing_result.basic_info.current_status,
                    })
                    infoForm.setFieldsValue({
                        introduce: parsing_result.others.self_evaluation
                    })
                    jobForm.setFieldsValue({
                        RIndustry: parsing_result.basic_info.desired_industry,
                        RSalary: parsing_result.basic_info.desired_salary,
                        RJob: parsing_result.basic_info.desired_position,
                        RCity: [parsing_result.basic_info.detailed_location],
                    })
                    let educationC = parsing_result.education_experience.map(item => {
                        return {
                            startTime: { startTime: `${item.start_time_year}-${item.start_time_month}`, endTime: `${item.end_time_year}-${item.end_time_month}` },
                            name: item.school_name,
                            education: item.degree,
                            classes: item.major,
                            isAllTime: item.still_active
                        }
                    })
                    console.log(educationC);
                    educationForm.setFieldsValue({
                        education: educationC
                    })
                    let projectC = parsing_result.project_experience.map(item => {
                        return {
                            job: item.job_function,
                            duty: item.description,
                            startTime: { startTime: `${item.start_time_year}-${item.start_time_month}`, endTime: `${item.end_time_year}-${item.end_time_month}` },
                            name: item.project_name
                        }
                    })
                    projectForm.setFieldsValue({
                        project: projectC
                    })
                    let experienceC = parsing_result.work_experience.map(item => {
                        return {
                            startTime: { startTime: `${item.start_time_year}-${item.start_time_month}`, endTime: `${item.end_time_year}-${item.end_time_month}` },
                            name: item.company_name,
                            duty: item.description,
                            industry: item.job_function
                        }
                    })
                    experienceForm.setFieldsValue({
                        experience: experienceC
                    })
                    //解析成功
                }
                else {
                    message.error('解析失败')
                    // let reader = new FileReader()
                    // //     // 发送异步请求
                    // //     // 0.使用readAsText方法（读取结果普通文本）
                    // //     // reader.readAsText(this.files[0]);
                    // let file = sourceFile;
                    // reader.readAsDataURL(file);
                    // reader.onload = (res) => {
                    //     console.log(res.currentTarget.result)
                    //     //         let formss = new FormData();
                    //     //         formss.append('resume-file', res.currentTarget.result);
                    //     //         formss.append('file-name', sourceFile.name)
                    // }
                }
            })
        }
    }
    return (
        <PageContainer style={{ background: '#fff' }}>
            <div className={styles['basic-container']}>
                <Row justify="space-between">
                    <Col>
                        <div className={styles['title']}>联系方式</div>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={handleSubmit}>
                            提交
            </Button>
                    </Col>
                </Row>
                <Divider></Divider>
                <ProForm
                    labelAlign="left"
                    layout={'horizontal'}
                    form={contactForm}
                    onValuesChange={(changeValues) => cnkiPhoneAndEmail(changeValues)}
                    submitter={{
                        render: (props, dom) => {
                            return null;
                        },
                    }}
                >
                    <ProForm.Group>
                        <ProFormText
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                                {
                                    pattern: /^1[2-9]\d{9}$/,
                                    message: '手机号格式不正确'
                                },
                            ]}
                            width="sm"
                            name="phone"
                            label="手机号码"
                        />
                        <ProFormText width="sm" name="email" label="邮箱地址" rules={[
                            {
                                required: true,
                                message: '请输入邮箱地址',
                            },
                            {
                                pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                                message: '邮箱格式不正确',
                            },
                        ]} />
                        <Dragger {...fileProps} style={{ width: '300px' }}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text" >简历解析</p>
                        </Dragger>
                        <Button type="primary" size="small" onClick={jiexiJianLi}>解析</Button>
                    </ProForm.Group>
                </ProForm>

            </div>

            <div className={styles['education-container']}>
                <Row justify="space-between">
                    <Col>
                        <div className={styles['title']}>基本信息</div>
                    </Col>
                </Row>
                <Divider></Divider>
                <ProForm
                    form={basicForm}
                    style={{ position: 'relative' }}
                    layout={'horizontal'}
                    labelAlign="left"
                    submitter={{
                        render: (props, dom) => {
                            return null;
                        },
                    }}
                    initialValues={{ education: 3, gender: '1' }}
                >
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入人选姓名',
                                },
                            ]}
                            name="name"

                            label="人选姓名"
                        />
                        <ProFormText label="人选年龄" name="age" rules={[
                            {
                                required: true,
                                message: '请输入人选年龄',
                            },
                            {
                                pattern: /^[1-9]\d*$/,
                                message: '年龄只能为数字',
                            }
                        ]} />
                    </ProForm.Group>
                    <ProFormRadio.Group
                        label="最高学历"
                        name="education"
                        labelCol={{
                            style: { width: '95.33px' },
                        }}
                        rules={[
                            {
                                required: true,
                                message: '请选择人选学历',
                            },
                        ]}
                        options={[
                            // {
                            //   label: '不限',
                            //   value: 0,
                            // },
                            // {
                            //   label: '初中及以上',
                            //   value: 1,
                            // },
                            // {
                            //   label: '中专及以上',
                            //   value: 2,
                            // },
                            {
                                label: '大专以下',
                                value: 3,
                            },
                            {
                                label: '大专',
                                value: 4,
                            },
                            {
                                label: '本科',
                                value: 5,
                            },
                            {
                                label: '硕士',
                                value: 6,
                            },
                            {
                                label: '博士',
                                value: 7,
                            },
                        ]}
                    />
                    <ProForm.Group>
                        <ProFormSelect
                            width="sm"
                            name="experience"
                            label="工作经验"
                            options={[
                                {
                                    label: '3年以下',
                                    value: '3年以下',
                                },
                                {
                                    label: '3-5年',
                                    value: '3-5年',
                                },
                                {
                                    label: '5-10年',
                                    value: '5-10年',
                                },
                                {
                                    label: '10年以上',
                                    value: '10年以上',
                                },
                            ]}
                        />
                        <ProFormRadio.Group
                            label="人选性别"
                            name="gender"
                            labelCol={{
                                style: { width: '95.33px' },
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: '请选择人选性别',
                                },
                            ]}
                            options={[
                                {
                                    value: '1',
                                    label: '男',
                                },
                                {
                                    value: '2',
                                    label: '女',
                                },
                            ]}
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormDatePicker
                            format={'YYYY-MM-DD'}
                            label="出生日期"
                            width="sm"
                            help="" //备注
                            name="birthday"
                        />
                        <ProFormText
                            label="目前年薪"
                            help="" //备注
                            fieldProps={{
                                prefix: '￥',
                                suffix: '万元',
                            }}
                            width="sm"
                            name="salary"
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText
                            label="户籍地址"
                            help="" //备注
                            width="sm"
                            name="domicile"
                        />
                        <ProFormText
                            label="现居地址"
                            width="sm"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入人选地址',
                                },
                            ]}
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect
                            width="sm"
                            name="workState"
                            label="工作状态"
                            options={[
                                { label: '当前在职', value: 0 },
                                { label: '已离职', value: 1 },
                                { label: '失业', value: 2 },
                            ]}
                        />
                        <ProFormSelect
                            width="sm"
                            name="source"
                            label="推荐来源"
                            options={[
                                { label: '未知来源', value: 0 },
                                { label: '官网应聘', value: 1 },
                                { label: '智联招聘', value: 2 },
                                { label: '中华英才', value: 3 },
                                { label: '前程无忧', value: 4 },
                                { label: '猎聘网', value: 5 },
                                { label: '陌生电话', value: 6 },
                                { label: '人脉推荐', value: 7 },
                                { label: '微博私信', value: 8 },
                                { label: '论坛发帖', value: 9 },
                                { label: '其他途径', value: 10 },
                                { label: 'LinkedIn', value: 11 },
                                { label: '卓聘网', value: 12 },
                                { label: '无忧精英', value: 13 },
                                { label: '公共池', value: 14 },
                            ]}
                        />
                    </ProForm.Group>
                    <ProForm.Group>

                    </ProForm.Group>
                    <div style={{ position: 'absolute', top: 0, left: 630 }}>
                        <ProFormUploadButton
                            icon={null}
                            fieldProps={{
                                listType: 'picture-card',
                                className: 'avatar-uploader',
                                showUploadList: false,
                                customRequest: async (options) => {
                                    let result = await upload(options.file, () => { });
                                    console.log(result.res.requestUrls[0]);
                                    basicForm.setFieldsValue({ headUrl: [result.name] });
                                    setImageUrl(
                                        result.res.requestUrls[0].split('?')[0] +
                                        '?x-oss-process=image/resize,w_100,h_100/quality,q_50',
                                    );
                                    options.onSuccess(result.res.requestUrls[0], result.res.requestUrls[0]);
                                },
                            }}
                            name="headUrl"
                            title={
                                imageUrl ? (
                                    <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                ) : (
                                        uploadButton
                                    )
                            }
                        />
                    </div>
                </ProForm>
            </div>
            <div className={styles['education-container']}>
                <div className={styles['title']}>个人简介</div>
                <Divider></Divider>
                <Form
                    form={infoForm}
                    labelAlign="left"
                    labelCol={{ style: { width: '95.33px' } }}
                    wrapperCol={{ style: { width: '328px' } }}
                >
                    <Form.Item name="introduce">
                        <TextArea style={{ width: '740px' }} autoSize={{ minRows: 5, maxRows: 15 }}></TextArea>
                    </Form.Item>
                </Form>
            </div>
            <div className={styles['education-container']}>
                <div className={styles['title']}>求职意向</div>
                <Divider></Divider>
                <Form
                    form={jobForm}
                    labelCol={{ style: { width: '95.33px' } }}
                    wrapperCol={{ style: { width: '328px' } }}
                    labelAlign="left"
                >
                    <Form.Item name="RIndustry" label="期望行业">
                        <Select
                            style={{ width: '328px' }}
                            options={industryList}
                            onChange={onIndustryChange}
                        ></Select>
                    </Form.Item>
                    <Form.Item name="RJob" label="期望岗位">
                        <Cascader style={{ width: '328px' }} options={positionList} placeholder=""></Cascader>
                    </Form.Item>
                    <Form.Item name="RSalary" label="期望薪资">
                        <Input style={{ width: '328px' }}></Input>
                    </Form.Item>
                    <Form.Item name="RCity" label="期望地点"
                        rules={[
                            {
                                required: true,
                                message: '请输入人选地址',
                            },
                        ]}
                    >
                        {/* <Cascader
              style={{ width: '328px' }}
              options={cityList}
              onChange={() => { }}
              multiple
            /> */}
                        <CascaderMul style={{ width: '328px' }} onChange={(e) => {
                            console.log(e)
                            jobForm.setFieldsValue({
                                RCity: e.value
                            })
                        }} options={cityList} />
                    </Form.Item>
                </Form>
            </div>

            <div className={styles['experience-container']}>
                <div className={styles['title']}>工作经历</div>
                <Form
                    form={experienceForm}
                    labelCol={{ style: { width: '95.33px' } }}
                    wrapperCol={{ style: { width: '328px' } }}
                    labelAlign="left"
                >
                    <Form.List name="experience">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.length === 0 ? <Divider></Divider> : null}
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Divider orientation="right">
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Divider>
                                        <Form.Item
                                            name={[name, 'startTime']}
                                            fieldKey={[fieldKey, 'startTime']}
                                            label="工作时间"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            {/* <RangePicker picker="month" style={{ width: "328px" }}></RangePicker> */}
                                            <SelfDate
                                                fieldProps={{ picker: 'month' }}
                                                returnType={'string'}
                                                style={{ width: '328px' }}
                                            ></SelfDate>
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'name']}
                                            fieldKey={[fieldKey, 'name']}
                                            label="所在公司"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: '328px' }}></Input>
                                        </Form.Item>
                                        <ProForm.Group>
                                            <Form.Item
                                                name={[name, 'industry']}
                                                fieldKey={[fieldKey, 'industry']}
                                                label="所在行业"
                                                style={{ width: '242px' }}
                                            >
                                                <Select
                                                    options={industryList}
                                                    onChange={(value, data) => {
                                                        onEIndustryChange(value, data, fieldKey);
                                                    }}
                                                    style={{ width: '146px' }}
                                                ></Select>
                                            </Form.Item>
                                            <Form.Item
                                                name={[name, 'industryChild']}
                                                fieldKey={[fieldKey, 'industryChild']}
                                                label=""
                                            >
                                                <Select options={eIndustryChildList} style={{ width: '150px' }}></Select>
                                            </Form.Item>
                                        </ProForm.Group>

                                        <Form.Item
                                            name={[name, 'job']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                            fieldKey={[fieldKey, 'job']}
                                            label="工作岗位"
                                        >
                                            <Input style={{ width: '328px' }}></Input>
                                        </Form.Item>

                                        {/* <Form.Item
                                                    name={[name, "endTime"]}
                                                    fieldKey={[fieldKey, "endTime"]}
                                                    label="结束日期"
                                                >
                                                    <DatePicker style={{ width: "100%" }}></DatePicker>
                                                </Form.Item> */}
                                        <Form.Item
                                            name={[name, 'duty']}
                                            fieldKey={[fieldKey, 'duty']}
                                            label="工作职责"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                                {
                                                    min: 20,
                                                    message: '至少20位!!',
                                                },
                                            ]}
                                        >
                                            <TextArea
                                                style={{ width: '358px' }}
                                                autoSize={{ minRows: 5, maxRows: 15 }}
                                            ></TextArea>
                                        </Form.Item>
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    添加工作经历
                </Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
            <div className={styles['project-container']}>
                <div className={styles['title']}>项目经历</div>
                <Form
                    form={projectForm}
                    labelCol={{ style: { width: '95.33px' } }}
                    wrapperCol={{ style: { width: '328px' } }}
                    labelAlign="left"
                >
                    <Form.List name="project">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.length === 0 ? <Divider></Divider> : null}
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Divider orientation="right">
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Divider>
                                        <Form.Item
                                            name={[name, 'startTime']}
                                            fieldKey={[fieldKey, 'startTime']}
                                            label="项目时间"
                                        >
                                            <SelfDate
                                                fieldProps={{ picker: 'month' }}
                                                returnType={'string'}
                                                style={{ width: '328px' }}
                                            ></SelfDate>
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'name']}
                                            fieldKey={[fieldKey, 'name']}
                                            label="项目名称"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: '328px' }} ></Input>
                                        </Form.Item>

                                        <Form.Item
                                            name={[name, 'job']}
                                            fieldKey={[fieldKey, 'job']}
                                            label="项目职位"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: '328px' }}></Input>
                                        </Form.Item>

                                        <Form.Item name={[name, 'duty']} fieldKey={[fieldKey, 'duty']} label="项目职责">
                                            <TextArea
                                                style={{ width: '328px' }}
                                                autoSize={{ minRows: 5, maxRows: 15 }}
                                            ></TextArea>
                                        </Form.Item>
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    添加项目经历
                </Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
            <div className={styles['education-container']}>
                <div className={styles['title']}>教育经历</div>
                <Form
                    form={educationForm}
                    labelCol={{ style: { width: '95.33px' } }}
                    wrapperCol={{ style: { width: '328px' } }}
                    labelAlign="left"
                    initialValues={{ education: [{ name: '' }] }}
                >
                    <Form.List name="education">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.length === 0 ? <Divider></Divider> : null}
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Divider orientation="right">
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Divider>

                                        <Form.Item
                                            name={[name, 'startTime']}
                                            fieldKey={[fieldKey, 'startTime']}
                                            label="学习时间"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            <SelfDate
                                                fieldProps={{ picker: 'month' }}
                                                returnType={'string'}
                                                style={{ width: '328px' }}
                                            ></SelfDate>
                                        </Form.Item>

                                        <Form.Item
                                            name={[name, 'name']}
                                            fieldKey={[fieldKey, 'name']}
                                            label="毕业院校"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: '328px' }} ></Input>
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'education']}
                                            fieldKey={[fieldKey, 'education']}
                                            label="学历"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            <Select
                                                width="sm"
                                                style={{ width: '328px' }}
                                                options={[
                                                    {
                                                        label: '不限',
                                                        value: 0,
                                                    },
                                                    {
                                                        label: '初中',
                                                        value: 1,
                                                    },
                                                    {
                                                        label: '中专',
                                                        value: 2,
                                                    },
                                                    {
                                                        label: '高中',
                                                        value: 3,
                                                    },
                                                    {
                                                        label: '大专',
                                                        value: 4,
                                                    },
                                                    {
                                                        label: '本科',
                                                        value: 5,
                                                    },
                                                    {
                                                        label: '硕士',
                                                        value: 6,
                                                    },
                                                    {
                                                        label: '博士',
                                                        value: 7,
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'classes']}
                                            fieldKey={[fieldKey, 'classes']}
                                            label="所读专业"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: '328px' }}></Input>
                                        </Form.Item>

                                        <Form.Item
                                            name={[name, 'isAllTime']}
                                            fieldKey={[fieldKey, 'isAllTime']}
                                            label="是否统招"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '必填',
                                                },
                                            ]}
                                        >
                                            <Radio.Group>
                                                <Radio value={0}>是</Radio>
                                                <Radio value={1}>否</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    添加教育经历
                </Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>

            <div className={styles['attachment-container']}>
                <div className={styles['title']}>附件</div>
                <Divider></Divider>
                {/* <Upload /> */}
            </div>

            <Button type="primary" onClick={handleSubmit}>
                提交
      </Button>
            <div style={{ width: '100%', minHeight: '15px' }}></div>
        </PageContainer>
    );
};

export default TCreation;
