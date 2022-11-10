import React, { memo } from 'react';
import Clock from '../clock';
import './index.less';

const Header = () => {
    return (
        <div className="dashboard-header">
            <div className="header-bg" />
            <div className="header-container">
                <div className="header-left">
                    <div className="header-icon" />
                    <div className="header-text">
                        <div>FAW AI 鲲鹏开发平台数据大屏</div>
                        <div>FAW AI Development WorkBench Management System Dashboard</div>
                    </div>
                    <div className="header-split-icon" />
                </div>
                <Clock />
            </div>
        </div>
    )
}

export default memo(Header);
