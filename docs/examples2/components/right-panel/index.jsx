import React, { memo, useEffect, useRef } from "react";
import FlipNumbers from 'react-flip-numbers';
import echarts from "echarts";
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/line'   // 引入折线图

import PanelCard from '../panel-card';
import RowUp from '../../../examples/components/rowup';
import './index.less';

const STATISTICAL_DATA = [
    {
        name: '仿真总时长',
        value: '482',
        unit: '小时'
    }, {
        name: '仿真总里程',
        value: '482121',
        unit: '千米'
    }, {
        name: '仿真成功率',
        value: '92',
        unit: '%'
    }, {
        name: '总执行场景数',
        value: '92',
        unit: '个'
    }
];

export const DATA_UPLOAD_DWONLOAD = {
    upload: [
        {
            date: '10-06',
            value: 0,
        }, {
            date: '10-07',
            value: 0,
        }, {
            date: '10-08',
            value: 0,
        }, {
            date: '10-09',
            value: 0,
        }, {
            date: '10-10',
            value: 13,
        }, {
            date: '10-11',
            value: 14,
        }, {
            date: '10-12',
            value: 7,
        }, {
            date: '10-13',
            value: 2,
        }, {
            date: '10-14',
            value: 2,
        }, {
            date: '10-15',
            value: 55,
        }, {
            date: '10-16',
            value: 86,
        }, {
            date: '10-17',
            value: 16,
        }, {
            date: '10-18',
            value: 22,
        }
    ],
    download: [
        {
            date: '10-06',
            value: 0,
        }, {
            date: '10-07',
            value: 36,
        }, {
            date: '10-08',
            value: 261,
        }, {
            date: '10-09',
            value: 58,
        }, {
            date: '10-10',
            value: 107,
        }, {
            date: '10-11',
            value: 317,
        }, {
            date: '10-12',
            value: 303,
        }, {
            date: '10-13',
            value: 158,
        }, {
            date: '10-14',
            value: 300,
        }, {
            date: '10-15',
            value: 0,
        }, {
            date: '10-16',
            value: 52,
        }, {
            date: '10-17',
            value: 1685,
        }, {
            date: '10-18',
            value: 2565,
        }
    ],
}

const RightPanel = () => {
    const lineChart = useRef(null);

    useEffect(() => {
        const lineInstance = echarts.init(lineChart.current);
        lineInstance.setOption({
            color: ['#80FFA5', '#00DDFF'],
            legend: {
                show: true,
                data: ['数据上传', '数据下载']
            },
            grid: {
                left: '40px',
                right: '15px',
                top: '10%',
                bottom: '10%'
            },
            xAxis: {
                show: true,
                boundaryGap: false,
                data: DATA_UPLOAD_DWONLOAD.upload.map(item => item.date),
                axisLine: {
                    lineStyle: {
                        color: "#858585"
                    }
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#858585"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#858585',
                        type: 'dashed'
                    }
                },
            },
            series: [
                {
                    name: '数据上传',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(128, 255, 165)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(1, 191, 236)'
                            }
                        ])
                    },
                    data: DATA_UPLOAD_DWONLOAD.upload.map(item => item.value)
                }, {
                    name: '数据下载',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(0, 221, 255)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(77, 119, 255)'
                            }
                        ])
                    },
                    data: DATA_UPLOAD_DWONLOAD.download.map(item => item.value)
                }
            ]
        });
        return () => {
            lineInstance.dispose();
        }
    }, []);

    return (
        <div className="right-panel">
            <PanelCard>
                <div className="panel-statistics">
                    <div className="statistics-number">
                        <div className="card-text">
                            <div>场景数</div>
                            <div>LOGSIM / WORLDSIM</div>
                        </div>
                        <div className="card-number">
                            <FlipNumbers
                                height={38}
                                width={20}
                                play
                                duration={3}
                                numbers="2312"
                            />
                            <span className="number-split"> / </span>
                            <FlipNumbers
                                height={38}
                                width={20}
                                play
                                duration={3}
                                numbers="1398"
                            />
                        </div>
                    </div>
                    <div className="statistics-list">
                        {
                            STATISTICAL_DATA.map((item, index) => (
                                <div key={index} className="statistics-item">
                                    <div className="item-content">
                                        <FlipNumbers
                                            height={28}
                                            width={15}
                                            play
                                            duration={3}
                                            numbers={item.value}
                                        />
                                        <span>{item.unit}</span>
                                    </div>
                                    <div className="item-title">{item.name}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div
                    ref={lineChart}
                    className="data-chart"
                    style={{ height: '240px', marginTop: '30px' }}
                ></div>
            </PanelCard>
            <PanelCard>
                <RowUp />
            </PanelCard>
        </div>
    )
}

export default memo(RightPanel);
