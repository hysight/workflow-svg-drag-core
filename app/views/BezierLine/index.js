/**
 * @Author: zhangb
 * @Date: 2019-11-14 17:52:04
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-11-14 17:59:30
 * @Description: 
 */
import React, {Component} from 'react';


//containers
import LineOne from 'app/containers/BezierLine/LineOne';
import LineTwo from 'app/containers/BezierLine/LineTwo';
//component

//css
import './style.scss';

//BezierLine
class BezierLine extends Component {
    constructor(props) {

        super(props);

    }

    render() {

        return (
            <div className='hv-bezier-line' style={{overflow: 'hidden'}}>
                {/*<LineOne />*/}
                <LineTwo />
            </div>
        );

    }
}

export default BezierLine;