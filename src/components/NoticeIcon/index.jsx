import { useEffect, useState } from 'react';
import { Tag, message } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
import { useModel, useRequest } from 'umi';

import { selectMsgList, selectTripList } from '@/services/home'
import NoticeIcon from './NoticeIcon';
import styles from './index.less';

const getNoticeData = (notices) => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.datetime) {
      newNotice.datetime = moment(notice.datetime).fromNow();
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }

    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag
          color={color}
          style={{
            marginRight: 0,
          }}
        >
          {newNotice.extra}
        </Tag>
      );
    }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData) => {
  const unreadMsg = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.read).length;
    }
  });
  return unreadMsg;
};

const NoticeIconView = () => {
  console.clear();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [msgList, setMsgList] = useState([]);
  const [tripList, setTripList] = useState([]);
  //消息列表
  const msgResult = useRequest(selectMsgList);
  useEffect(() => {
    setMsgList(msgResult?.data?.list || [])
  }, [msgResult])
  //代办事务列表
  const tripResult = useRequest(selectTripList);
  useEffect(() => {
    setTripList(tripResult?.data?.list || [])
  }, [tripResult])
  const noticeData = getNoticeData(tripResult);//通知
  // const unreadMsg = getUnreadData(noticeData || {});//消息
  const unreadMsg = getUnreadData(msgResult || []);
  const changeReadState = (id) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };

        if (notice.id === id) {
          notice.read = true;
        }

        return notice;
      }),
    );
  };

  const clearReadState = (title, key) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };

        if (notice.type === key) {
          notice.read = true;
        }

        return notice;
      }),
    );
    message.success(`${'清空了'} ${title}`);
  };
  console.log(noticeData, unreadMsg)
  return (
    <NoticeIcon
      className={styles.action}
      count={currentUser && currentUser.unreadCount}
      onItemClick={(item) => {
        changeReadState(item.id);
      }}
      onClear={(title, key) => clearReadState(title, key)}
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => message.info('Click on view more')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="message"
        count={unreadMsg.message}
        list={noticeData.message}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="日程"
        emptyText="你已完成所有待办"
        count={unreadMsg.event}
        list={noticeData.event}
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
