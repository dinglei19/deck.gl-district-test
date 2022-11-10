import React, { memo, useState, useEffect } from 'react';
import FlipNumbers from 'react-flip-numbers';
import './index.less';

const CenterPanel = (props) => {
    const { show, data = {
        city: '南京',
        imgUrl: 'http://10.78.6.180:9000/test.png',
        map: 12,
        duration: 200,
        mileage: 23330,
        dataAmount: 12
    }  } = props;
    const [timeState, setTimeState] = useState(true)

    useEffect(() => {
        setTimeState(true)
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            setTimeState(false);
        }, 2000);
    }, [show])

    return (!timeState && show && data) ? (
        <div className={`center-panel ${show ? 'show': 'hide' }`}>
            <div className="panel-dialog">
                <div className="dialog-title">自动驾驶数据（{data.city}）</div>
                <div className="dialog-content">
                    <img src={data.imgUrl} />
                    <div className="data-list">
                        <div className="data-item">
                            <div className="item-left" />
                            <div className="item-right">
                                <div className="item-text">地图数据</div>
                                <div className="item-data">
                                    <FlipNumbers
                                        height={27}
                                        width={15}
                                        play
                                        duration={2}
                                        numbers={String(data.map)}
                                    />
                                    <span>个</span>
                                </div>
                            </div>
                        </div>
                        <div className="data-item">
                            <div className="item-left" />
                            <div className="item-right">
                                <div className="item-text">自动驾驶数据</div>
                                <div className="item-data">
                                    <FlipNumbers
                                        height={27}
                                        width={15}
                                        play
                                        duration={2}
                                        numbers={String(data.dataAmount)}
                                    />
                                    <span>TB</span>
                                </div>
                            </div>
                        </div>
                        <div className="data-item">
                            <div className="item-left" />
                            <div className="item-right">
                                <div className="item-text">自动驾驶里程</div>
                                <div className="item-data">
                                    <FlipNumbers
                                        height={27}
                                        width={15}
                                        play
                                        duration={2}
                                        numbers={String(data.mileage)}
                                    />
                                    <span>千米</span>
                                </div>
                            </div>
                        </div>
                        <div className="data-item">
                            <div className="item-left" />
                            <div className="item-right">
                                <div className="item-text">自动驾驶时长</div>
                                <div className="item-data">
                                    <FlipNumbers
                                        height={27}
                                        width={15}
                                        play
                                        duration={2}
                                        numbers={String(data.duration)}
                                    />
                                    <span>小时</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel-path">
                <svg width="100%" height="100%">
                    <path
                        id="svg-path"
                        d="M0 7.3 C90.80000000000001,7.3 136.2,195.70000000000002 217, 195.70000000000002"
                        stroke="rgb(90, 90, 90)"
                        fill="none"
                        style={{
                            strokeWidth: '3px',
                            strokeDasharray: '5 5',
                            strokeLinecap: 'butt'
                        }}
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            from="-200"
                            to="0"
                            begin="0s"
                            dur="10s"
                            repeatCount="indefinite"></animate>
                    </path>
                </svg>
            </div>
        </div>
    ) : null;
}

export default memo(CenterPanel);
