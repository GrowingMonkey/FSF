import { useState, useEffect } from "react";
import moment from 'moment'
const useTime = () => {
    const format = "YYYY-MM-DD HH:mm:ss";
    const [dates, setDates] = useState([]);
    const [hackValue, setHackValue] = useState();
    // 默认当天
    const [timevalue, settimeValue] = useState([moment(moment().format("YYYY-MM-DD") + " 00:00:00", format), moment(moment().format("YYYY-MM-DD") + " 23:59:59", format)]);
    const disabledDate = (time: any) => {
        if (!time) {
            return false
        } else {
            //限制三个月内
            const timeRange = time < moment().subtract(3, 'month') || time > moment().add(3, 'm');
            //只能选择七天
            const tooLate = dates[0] && time.diff(dates[0], 'days') > 7;
            const tooEarly = dates[1] && (dates[1] as any).diff(time, 'days') > 7;
            return timeRange || tooEarly || tooLate;
        }
    };
    const onOpenChange = (open: boolean) => {
        if (open) {
            const arr: any = [];
            setHackValue(arr);
            setDates([]);
        } else {
            setHackValue(undefined);
        }
    };
    return { format, disabledDate, onOpenChange, timevalue, settimeValue, hackValue, setDates };
}
export default useTime