import React, { memo } from "react";
import './index.less';

const PanelCard = (props) => {
    const {data = {
        title: '仿真统计',
        subtitle: '仿真全量数据',
        titleEn: 'Simulation Statistics'
    }, children } = props;
    return (
        <div className="panel-card">
            <div className="card-header">
                <div className="header-title">{data.title}</div>
                <div className="header-split" />
            </div>
            <div className="card-content">{children}</div>
        </div>
    )
}

export default memo(PanelCard);
