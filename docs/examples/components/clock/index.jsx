import React, { memo, useEffect } from "react";
import { useState } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timeout = setInterval(() => {
            setTime(new Date());
        }, 1000)

        return () => {
            clearInterval(timeout)
        }
    }, [])

    const dateString = time.toLocaleDateString().split('/').join('-')
    const timeString = time.toTimeString().slice(0,8)

    return (
        <div style={{textAlign: 'right'}} className="clock-wrap">
            <div style={{fontSize: '25px', fontWeight: 'bold'}} className="clock-date">{dateString}</div>
            <div style={{fontSize: '18px', fontWeight: 'bold'}} className="clock-time">{timeString}</div>
        </div>
    )
}

export default memo(Clock);
