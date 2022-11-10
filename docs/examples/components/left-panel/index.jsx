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
import { DATA_OVERVIEW, DATA_CATEGORY, DATA_PLAY } from '../../data';
import './index.less';

const LeftPanel = () => {
    const dataChart = useRef(null);
    const lineChart = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(dataChart.current);
        chartInstance.setOption({
            grid: {
                left: '0%',
                right: '0%',
                top: '0%',
                bottom: '0%'
            },
            legend: {
                orient: 'vertical',
                top: 'center',
                left: 'left',
                textStyle: {
                    color: "#858585"
                }
            },
            series: [
                {
                    name: 'Radius Mode',
                    type: 'pie',
                    radius: [20, 100],
                    center: ['55%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5,
                        color: (colors) => {
                            const colorlist = [
                                '#34FFF5', '#32E0F2', '#2FE0F2', '#2DC0EE', '#2BC0EE', '#2AA1EB', '#29A1EB', '#2782E7', '#2582E7', '#2362E4', '#2162E4'
                            ]
                            return colorlist[colors.dataIndex]
                        }
                    },
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: DATA_CATEGORY
                }
            ]
        })

        const lineInstance = echarts.init(lineChart.current);
        lineInstance.setOption({
            grid: {
                left: '0%',
                right: '35%',
                top: '0%',
                bottom: '10%'
            },
            xAxis: {
                type: 'value',
                show: false,
            },
            yAxis: {
                type: 'category',
                data: DATA_PLAY.map(item => item.date),
                show: false,
            },
            series: [
                {
                    type: 'bar',
                    smooth: true,
                    symbol: 'none',
                    barCategoryGap: '40%',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0,
                                color: '#2782E7'
                            },
                            {
                                offset: 1,
                                color: '#34FFF5'
                            }
                        ]),
                        opacity: 0.9
                    },
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true,
                        formatter: '{b}: {c}km',
                        color: '#858585',
                        fontSize: 10,
                    },
                    data: DATA_PLAY.map(item => item.value)
                }
            ]
        })

        return () => {
            chartInstance.dispose();
            lineInstance.dispose();
        }
    }, [])

    return (
        <div className="left-panel">
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
            <PanelCard title="数据平台概览" subTitle="Data Platform Overview" >
                <div className="item-list">
                    {
                        DATA_OVERVIEW.map((item, index) => (
                            <div key={index} className="card-item">
                                <div className="item-data">
                                    <FlipNumbers
                                        height={22}
                                        width={12}
                                        play
                                        duration={3}
                                        numbers={item.value}
                                    />
                                    <span>{item.unit}</span>
                                </div>
                                <div className="item-text">
                                    <div className="text-zh">{item.name}</div>
                                    <div className="text-en"><div>{item.subName}</div></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </PanelCard>
            <PanelCard title="数据类型统计" subTitle="Data Type Statistics" >
                <div
                    ref={dataChart}
                    className="data-chart"
                    style={{ height: '250px' }}
                ></div>
            </PanelCard>
            <PanelCard title="车辆自动驾驶里程统计" subTitle="Vehicle Automatic Driving Mileage Statistics" >
                <div
                    ref={lineChart}
                    className="data-chart"
                    style={{ height: '260px' }}
                ></div>
            </PanelCard>
        </div>
    )
}

export default memo(LeftPanel);
