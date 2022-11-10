import React, { memo, useRef } from "react";
import { useEffect } from "react";
import echarts from "echarts";
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import FlipNumbers from 'react-flip-numbers';
import { BAR_DATA, TEXT_DATA } from '../../data';
import './index.less';

const StatisticsCard = () => {
    const barChart = useRef(null);
    const pieChart = useRef(null);

    useEffect(() => {
        const barInstance = echarts.init(barChart.current);
        barInstance.setOption({
            grid: {
                left: '40px',
                right: '35px',
                top: '10%',
                bottom: '10%'
            },
            xAxis: {
                show: true,
                data: BAR_DATA.map(item => item.name),
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
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        color: ({ value }) => {
                            const colors = [[35, 98, 288], [52, 255, 245]];
                            const delta = colors[0].map((item, index) => {
                                return item - (item - (colors[1][index])) * (value / 100)
                            })
                            return `rgb(${delta[0]}, ${delta[1]}, ${delta[2]})`
                        },
                    },
                    data: BAR_DATA.map(item => item.value),
                    markLine: {
                        silent: true,
                        data: [
                            {
                                yAxis: 90,
                                lineStyle: {
                                    color: '#52c41a'
                                },
                            },
                            {
                                yAxis: 60,
                                lineStyle: {
                                    color: '#ff7875'
                                },
                            },
                        ]
                    }
                }
            ]
        });

        const pieInstance = echarts.init(pieChart.current);
        pieInstance.setOption({
            radar: [
                {
                    indicator: [
                        { text: '舒适度评价', max: 100 },
                        { text: '安全性评价', max: 100 },
                        { text: '交规评价', max: 100 },
                        { text: '场景迭代评价', max: 100 },
                    ],
                    center: ['50%', '50%'],
                    radius: 80,
                    shape: 'circle',
                    splitArea: {
                        show: false
                    },
                    axisName: {
                        color: '#fff',
                    }
                }
            ],
            series: [{
                type: "radar",
                itemStyle: {
                    color: 'rgba(52, 255, 245, 0.5)'
                },
                lineStyle: {
                    color: 'rgba(52, 255, 245, 0.5)'
                },
                areaStyle: {
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                        {
                            color: 'rgba(35, 98, 288, 0.5)',
                            offset: 0
                        },
                        {
                            color: 'rgba(52, 255, 245, 0.8)',
                            offset: 1
                        }
                    ])
                },
                label: {
                    show: true,
                    formatter: function ({ value }) {
                        return value;
                    }
                },
                data: [{
                    value: [53.33, 100, 85, 85.17]
                }],
            }]
        });

        return () => {
            barInstance.dispose();
            pieInstance.dispose();
        }
    }, [])

    return (
        <div className="statistics-card">
            <div className="statistics-bar" ref={barChart} />
            <div className="statistics-pie" ref={pieChart} />
            <div className="statistics-text">
                <div className="text-top">
                    <div className="item-lable">
                        <div>总里程</div>
                        <div>米</div>
                    </div>
                    <div className="item-num">
                        <FlipNumbers
                            height={40}
                            width={22}
                            play
                            duration={3}
                            numbers="729.70"
                        />
                    </div>
                </div>
                <div className="text-bottom">
                    {
                        TEXT_DATA.map((item, index) => (
                            <div key={index} className="bottom-item">
                                <div className="item-lable">
                                    <div>{item.name}</div>
                                    <div>{item.unit}</div>
                                </div>
                                <div className="item-num">
                                    <FlipNumbers
                                        height={28}
                                        width={16}
                                        play
                                        duration={3}
                                        numbers={item.value}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(StatisticsCard);
