import React, { memo } from "react";
import './index.less';

const Terminal = () => {
    return (
        <div className="terminal">
            <div className="terminal-wrap">
                <div>
                    <div>root@root: batchid: 6369bad7a352b1706bc10410</div>
                    <div>root@root: Copy routing data...</div>
                    <div>root@root: Copy routing data over</div>
                    <div>root@root: batchid: 6369bad7a352b1706bc10410</div>
                    <div>root@root: Copy prediction data...</div>
                    <div>root@root: Copy prediction data over</div>
                    <div>root@root: batchid: 6369bad7a352b1706bc10410</div>
                    <div>root@root: Control module is not required, nothing to do!</div>
                    <div>root@root: Copy routing data...</div>
                    <div>root@root: Copy routing data...</div>
                </div>
            </div>
        </div>
    )
}

export default memo(Terminal);
