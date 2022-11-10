export const GRAPH_DATA = {
    nodes: [
        {
            id: "node1",
            label: "Circle1",
            x: 50,
            y: 300,
            type: 'background-animate',
        },
        {
            id: "node2",
            label: "Circle2",
            x: 150,
            y: 300,
            type: 'background-animate',
        },
        {
            id: "node3",
            label: "Circle2",
            x: 250,
            y: 300,
            type: 'background-animate',
        },{
            id: "node4",
            label: "Circle2",
            x: 350,
            y: 50,
            type: 'background-animate',
        },
        {
            id: "node5",
            label: "Circle2",
            x: 350,
            y: 150,
            type: 'background-animate',
        },{
            id: "node6",
            label: "Circle2",
            x: 350,
            y: 250,
            type: 'background-animate',
        },{
            id: "node7",
            label: "Circle2",
            x: 350,
            y: 350,
            type: 'background-animate',
        },{
            id: "node8",
            label: "Circle2",
            x: 350,
            y: 450,
            type: 'background-animate',
        },{
            id: "node9",
            label: "Circle2",
            x: 350,
            y: 550,
            type: 'background-animate',
        },{
            id: "node10",
            label: "Circle2",
            x: 450,
            y: 300,
            type: 'background-animate',
        }
    ],
    edges: [
        {
            source: "node1",
            target: "node2",
            type: 'line-dash'
        },{
            source: "node2",
            target: "node3",
            type: 'line-dash'
        },{
            source: "node3",
            target: "node4",
            type: 'line-dash'
        },{
            source: "node3",
            target: "node5",
            type: 'line-dash'
        },{
            source: "node3",
            target: "node6",
            type: 'line-dash'
        },{
            source: "node3",
            target: "node7",
            type: 'line-dash'
        },{
            source: "node3",
            target: "node8",
            type: 'line-dash'
        },{
            source: "node3",
            target: "node9",
            type: 'line-dash'
        },{
            source: "node4",
            target: "node10",
            type: 'line-dash'
        },{
            source: "node5",
            target: "node10",
            type: 'line-dash'
        },{
            source: "node6",
            target: "node10",
            type: 'line-dash'
        },{
            source: "node7",
            target: "node10",
            type: 'line-dash'
        },{
            source: "node8",
            target: "node10",
            type: 'line-dash'
        },{
            source: "node9",
            target: "node10",
            type: 'line-dash'
        }
    ]
}

export const BAR_DATA = [{
    name: 'SpeedConfig',
    value: 65
},{
    name: 'RedLightRunningConfig',
    value: 20
},{
    name: 'OverlapRoadBoundaryConfig',
    value: 80
},{
    name: 'YieldPedestrianAtCrosswalkConfig',
    value: 100
},{
    name: 'JerkLonConfig',
    value: 100
},{
    name: 'LonJerkRmsConfig',
    value: 80
},{
    name: 'AccLonConfig',
    value: 80
},{
    name: 'CollisionConfig',
    value: 100
},{
    name: 'UnnecessaryHardBrakeConfig',
    value: 80
},{
    name: 'SafeDistanceConfig',
    value: 50
},{
    name: 'DestinationArrivalConfig',
    value: 100
}]


export const TEXT_DATA = [{
    name: '执行时长',
    value: '226.37',
    unit: '秒'
},{
    name: '成功指标个数',
    value: '226.37',
    unit: '秒'
},{
    name: '场景总数',
    value: '226.37',
    unit: '秒'
},{
    name: '失败指标个数',
    value: '226.37',
    unit: '秒'
}];