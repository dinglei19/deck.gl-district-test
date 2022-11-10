import React, { memo } from 'react';
import "./index.less";

const PanelCard = (props) => {
    const { children, title = '', subTitle = '', type } = props
    return (
        <div className="panel-card">
            <div className="card-header">
                <div className="header-icon">
                    <span className={`icon ${type}`} />
                </div>
                <div className="header-text">
                    {title && <div className="text-zh">{title}</div>}
                    {subTitle && <div className="text-en">{subTitle}</div>}
                </div>
            </div>
            <div className="card-content">{children}</div>
        </div>
    )
}

export default memo(PanelCard);
