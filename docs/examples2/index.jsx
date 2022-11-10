import React, { memo } from "react";
import Header from './components/header';
import RightPanel from './components/right-panel';
import CenterPanel from './components/center-panel';
import './index.less';

const DashBoard = () => {
    return (
        <div className="simulation-dashboard">
            <Header />
            <RightPanel />
            <CenterPanel />
        </div>
    )
}

export default memo(DashBoard);
