import React, { memo, useRef, useEffect } from "react";
import G6 from "@antv/g6";
import Terminal from '../terminal';
import StatisticsCard from "../statistics-card";
import { GRAPH_DATA } from '../../data';

import './index.less';

G6.registerEdge(
    'line-dash',
    {
        afterDraw(cfg, group) {
            // get the first shape in the group, it is the edge's path here=
            const shape = group.get('children')[0];
            let index = 0;
            // Define the animation
            shape.animate(
                () => {
                    index++;
                    if (index > 9) {
                        index = 0;
                    }
                    const res = {
                        lineDash: [4, 2, 1, 2],
                        lineDashOffset: -index,
                    };
                    // returns the modified configurations here, lineDash and lineDashOffset here
                    return res;
                },
                {
                    repeat: true, // whether executes the animation repeatly
                    duration: 3000, // the duration for executing once
                },
            );
        },
    },
    'cubic', // extend the built-in edge 'cubic'
);
G6.registerNode(
    'background-animate',
    {
        afterDraw(cfg, group) {
            const r = cfg.size / 2;
            const back1 = group.addShape('circle', {
                zIndex: -3,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.6,
                },
                name: 'back1-shape',
            });
            const back2 = group.addShape('circle', {
                zIndex: -2,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.6,
                },
                name: 'back2-shape',
            });
            const back3 = group.addShape('circle', {
                zIndex: -1,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.6,
                },
                name: 'back3-shape',
            });
            group.sort(); // Sort according to the zIndex
            back1.animate(
                {
                    // Magnifying and disappearing
                    r: r + 15,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 0,
                    repeat: true, // repeat
                },
            ); // no delay
            back2.animate(
                {
                    // Magnifying and disappearing
                    r: r + 15,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 1000,
                    repeat: true, // repeat
                },
            ); // 1s delay
            back3.animate(
                {
                    // Magnifying and disappearing
                    r: r + 15,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 2000,
                    repeat: true, // repeat
                },
            ); // 3s delay
        },
    },
    'circle',
);

const CenterPanel = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const graph = new G6.Graph({
            container: "center-chart",
            width: 500,
            height: 600,
            defaultNode: {
                type: "circle",
                size: [30],
                color: "#5B8FF9",
                style: {
                    fill: "#9EC9FF",
                    lineWidth: 3
                },
                labelCfg: {
                    style: {
                        fill: "#fff",
                        fontSize: 12
                    }
                }
            },
            defaultEdge: {
                style: {
                    stroke: "#e2e2e2"
                }
            }
        });

        graph.data(GRAPH_DATA);
        graph.render();
    }, [])

    return (
        <div className="center-panel">
            <div style={{ height: '600px' }} className="center-chart" id="center-chart" />
            <StatisticsCard />
            <Terminal />
        </div>
    )
}

export default memo(CenterPanel);
