import React, { memo } from "react";
import FlipNumbers from 'react-flip-numbers';
import './index.less';

const BottomPanel = () => {
    return (
        <div className="bottom-panel">
            <div className="bottom-list">
                <div className="bottom-item">
                    <div className="item-num">
                        <FlipNumbers
                            height={27}
                            width={15}
                            play
                            duration={2}
                            numbers="87342.1"
                        />
                        <span>小时</span>
                    </div>
                    <div className="item-label">自动驾驶总时长</div>
                </div>
                <div className="bottom-item">
                    <div className="item-num">
                        <FlipNumbers
                            height={27}
                            width={15}
                            play
                            duration={2}
                            numbers="87342.1"
                        />
                        <span>KM</span>
                    </div>
                    <div className="item-label">自动驾驶总里程</div>
                </div>
                <div className="bottom-item">
                    <div className="item-num">
                        <FlipNumbers
                            height={27}
                            width={15}
                            play
                            duration={2}
                            numbers="24.1"
                        />
                        <span>TB</span>
                    </div>
                    <div className="item-label">自动驾驶总数据量</div>
                </div>
            </div>
        </div>
    )
}

export default memo(BottomPanel);
