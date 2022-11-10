import React, { memo } from "react";
import Clock from '../../../examples/components/clock';
import './index.less';

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-text">
                <div className="text-zh">仿真平台监控数据大屏</div>
                <div className="text-en">FAW AI Simulation Platform Dashboard</div>
            </div>
            <div className="header-bg">
                <div className="split-icon" />
                <div className="animate-icon"/>
            </div>
            <Clock />
        </div>
    )
}

export default memo(Header);
