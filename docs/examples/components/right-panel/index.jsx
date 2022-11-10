import React, { memo, useEffect, useRef } from 'react';
import FlipNumbers from 'react-flip-numbers';
import echarts from "echarts";
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

import 'echarts/lib/chart/bar'     // 引入柱状图
import 'echarts/lib/chart/radar'   // 引入雷达图
import 'echarts/lib/chart/pie'   // 引入饼状图
import 'echarts/lib/chart/line'   // 引入折线图

import PanelCard from '../panel-card';
import RowUp from '../rowup';
import { DATA_MAP, DATA_UPLOAD_DWONLOAD } from '../../data';
import './index.less';

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
                left: '10%',
                right: '10%',
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
    }, [])

    return (
        <div className="right-panel">
            <div className="panel-header">
                <div className="header-text">
                    <div className="text-zh">
                        <span>数据平台</span>
                        <span>业务概况</span>
                    </div>
                    <div className="text-en">Data Platform Statistical Analysis</div>
                </div>
                <div className="header-icon" />
            </div>
            <PanelCard title="高精度地图" subTitle="High Precision Map" >
                <div className="item-list">
                    {
                        DATA_MAP.map((item, index) => (
                            <div key={index} className="card-item">
                                <div className="item-data">
                                    <FlipNumbers
                                        height={24}
                                        width={12}
                                        play
                                        duration={3}
                                        numbers={String(item.value)}
                                    />
                                    <span>个</span>
                                </div>
                                <div className="item-text">
                                    <div className="text-zh">
                                        <span>{item.name}</span>
                                        <span className="text-en">{`(${item.subName})`}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </PanelCard>
            <PanelCard title="数据上传下载" subTitle="Data Upload && Data Download" >
                <div
                    ref={lineChart}
                    className="data-chart"
                    style={{ height: '240px' }}
                ></div>
            </PanelCard>
            <PanelCard title="最近上传数据" subTitle="Data Storage" >
                <RowUp />
            </PanelCard>
        </div>
    )
}

export default memo(RightPanel);
