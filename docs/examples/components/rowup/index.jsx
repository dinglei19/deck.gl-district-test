import React, { memo } from "react";
import './index.less';

const RowUp = (props) => {
    const { data = [{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "hello"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "liujiaqi"
    },{
        vehicle: "HongQi-EV-B9",
        data_name : "直行无故减速直行无故减速",
        name: "hello"
    }]} = props;
    return (
        <div className="rowup-wrap">
            <div className="rowup-title">
                <div />
                <div>数据名称</div>
                <div>上传者</div>
                <div>车辆</div>
            </div>
            <div className="rowup-list">
                {
                    data.map((item, index) => (
                        <div key={index} className="rowup-item">
                            <div />
                            <div>{item.data_name}</div>
                            <div>{item.name}</div>
                            <div>{item.vehicle}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default memo(RowUp);
