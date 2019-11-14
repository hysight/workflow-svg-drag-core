/**
 *@Author: hy-zhangb
 *Date: 2018/3/13 11:04
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-11-14 17:58:29
 *Email: lovewinders@163.com
 *File Path: bezier-line - LineTwo
 *@File Name: LineTwo
 *@Description: Description
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

//css
import './style.scss';

//class
class LineTwo extends Component {
    constructor(props) {

        super(props);
        this.state = {
            points: {
                // startPoint: [250, 110],
                startPoint: [100, 20],
                endPoint: [255, 111],
                lastStartPoint: [250, 110],
                lastEndPoint: [500, 250]
            },
            canvasPosition: {
                top: 0,
                left: 0
            }
        };
        //是否开启拖拽
        this.isDraggable = false;
        this.selPoint = '';

        //是否开启画布移动
        this.isCanvasDraggable = false;
        this.initCanvasPosition = {
            top: 0,
            left: 0
        };
        //记录鼠标点击得位置
        this.downCanvasPosition = {
            x: 0,
            y: 0
        };

    }

    //setBezierLine
    setBezierLine = () => {

        const {points: {startPoint, endPoint}} = this.state;
        const lastStartPoint = [(endPoint[0] - startPoint[0]) / 2 + startPoint[0], endPoint[1]];
        const lastEndPoint = [(endPoint[0] - startPoint[0]) / 2 + startPoint[0], startPoint[1]];
        
        const np = Object.assign({}, {startPoint, endPoint}, {lastStartPoint, lastEndPoint});
        this.setState({
            points: np
        });

    };

    /*----------------节点区域-----------------*/
    //mouseUp
    mouseUp = (e) => {

        console.log(e);
        this.isDraggable = false;
        this.selPoint = '';
    
    };

    //MouseDown
    MouseDown = (item, e) => {

        console.log(e);
        this.isDraggable = true;
        this.selPoint = item;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    
    };

    //mouseMove
    mouseMove = (e) => {

        if(this.isDraggable) {

            console.log(e, e.clientX, e.clientY);
            const {points, canvasPosition: {left, top}} = this.state;
            let nw = Object.assign({}, {...points});

            nw[this.selPoint] = [e.clientX - left, e.clientY - top];

            this.setState({
                points: nw
            });
        
        }
    
    };

    /*----------------画布区域-----------------*/
    //downCanvas
    downCanvas = (e) => {

        this.isCanvasDraggable = true;
        this.downCanvasPosition = {
            x: e.clientX,
            y: e.clientY
        };
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    
    };

    //upCanvas
    upCanvas = (e) => {

        this.isCanvasDraggable = false;
        const {canvasPosition: {left, top}} = this.state;
        this.initCanvasPosition = {
            top,
            left
        };
    
    };

    //moveCanvas
    moveCanvas = (e) => {

        if(this.isCanvasDraggable) {

            console.log(e);
            const {left, top} = this.initCanvasPosition;
            const {x, y} = this.downCanvasPosition;
            const nx = e.clientX - x + left ;
            const ny = e.clientY - y + top ;

            this.setState({
                canvasPosition: {
                    top: ny,
                    left: nx
                }
            });

        }
    
    };

    //toRenderPath
    toRenderPath = () => {

        const {points: {startPoint, endPoint, lastStartPoint, lastEndPoint}} = this.state;
        const path = `M${startPoint.join(' ')} C${lastStartPoint.join(' ')} ${lastEndPoint.join(' ')} ${endPoint.join(' ')}`;
        //路径样式
        const pathStyle = {
            stroke: '#000000',
            fill: 'none',
            strokeWidth: '2px'
        };

        return (
            <React.Fragment>
                <path d={path} style={{...pathStyle}}  markerEnd={'url(#markerArrow)'} >
                </path>
                <text x='90' y='60'>三次贝塞尔平滑曲线</text>
                <text x='90' y='300'>{path}</text>
            </React.Fragment>
        );
    
    };

    //toRenderCircle
    toRenderCircle = () => {

        const {points} = this.state;
        const pointStyle = {
            fill: 'rgba(200, 200, 200, 1)',
            stroke: 'rgba(200, 200, 200, 1)',
            strokeWidth: 3,
            cursor: 'pointer'
        };

        return Object.entries(points).map(([key, v]) =>
            <circle cx={v[0]} cy={v[1]} r={3} style={{...pointStyle}} key={'points' + key} onMouseDown={this.MouseDown.bind(this, key)} />);
    
    };

    //toRenderPolyLine
    toRenderPolyLine = () => {

        const {points: {startPoint, endPoint, lastStartPoint, lastEndPoint}} = this.state;
        const path = `${startPoint.join(' ')} ${lastStartPoint.join(' ')} ${lastEndPoint.join(' ')} ${endPoint.join(' ')}`;
        const pathStyle = {
            fill: 'rgba(200, 200, 200, 0)',
            stroke: 'rgba(200, 200, 200, 1)',
            strokeWidth: 1
        };

        return (
            <polyline points={path} style={{...pathStyle}}>
            </polyline>
        );
    
    };
    getThereBezierPoint = (t = 0.8) => {
        const { points: {startPoint, endPoint, lastStartPoint, lastEndPoint}} = this.state;
        const cx = startPoint[0] * Math.pow((1 - t) ,3) + 3 * lastStartPoint[0] * t * Math.pow((1 - t) ,2) + 3 * lastEndPoint[0] * t * t * (1 - t) + endPoint[0] * t * t * t;
        const cy = startPoint[1] * Math.pow((1 - t) ,3) + 3 * lastStartPoint[1] * t * Math.pow((1 - t) ,2) + 3 * lastEndPoint[1] * t * t * (1 - t) + endPoint[1] * t * t * t;
        return ([cx, cy]);
    }
    getThereBezierArrow = (fromPoint, targetPoint, theta = 15, headlen = 5, width = 3, color = 'black') => {
        const angle = Math.atan2(fromPoint[1] - targetPoint[1], fromPoint[0] - targetPoint[0]) * 180 / Math.PI;
        const fromAngle = (angle + theta) * Math.PI / 180;
        const targetAngle = (angle - theta) * Math.PI / 180;
        const topX = Math.cos(fromAngle) * headlen + targetPoint[0];
        const topY = Math.sin(fromAngle) * headlen + targetPoint[1];
        const botX = Math.cos(targetAngle) * headlen + targetPoint[0];
        const botY = Math.sin(targetAngle) * headlen + targetPoint[1];
        // debugger;
        // const arrPoint = [fromPoint, [topX, topY], [botX, botY], targetPoint]
        const arrPoint = [[topX, topY], [botX, botY], targetPoint];
        // debugger;
        const path = arrPoint.reduce((pre, item, i, arr) => {
            // debugger;
            return i < arr.length - 1 ? (i === 0 ? "M" + item.join(",") + " " : pre + "L" + item.join(",") + " ") : pre + "L" + item.join(",") + " Z"
        }, "");
        return path;
    }
    getThereBezierArrow2 = (fromPoint, targetPoint, theta = 15, headlen = 5, width = 10, color = 'black') => {
        const axisAngle = Math.atan2(targetPoint[1] - fromPoint[1], targetPoint[0] - fromPoint[0]);
        const jiaodu = axisAngle * 180 / Math.PI;
        // const axisAngle = Math.atan2(targetPoint[1] - fromPoint[1], targetPoint[0] - fromPoint[0]);
        console.log("=-=-=", axisAngle);
        const fromAngle = (jiaodu - theta) * Math.PI / 180;
        const targetAngle = (jiaodu + theta) * Math.PI / 180;
        const topX = targetPoint[0] - Math.cos(fromAngle) * headlen;
        const topY = targetPoint[1] - Math.sin(fromAngle) * headlen;
        const botX = targetPoint[0] - Math.cos(targetAngle) * headlen;
        const botY = targetPoint[1] - Math.sin(targetAngle) * headlen;

        const fX = targetPoint[0] - Math.cos(axisAngle) * width;
        const fY = targetPoint[1] - Math.sin(axisAngle) * width;
        // debugger;
        const arrPoint = [fromPoint, [topX, topY], [botX, botY], targetPoint]
        // const arrPoint = [[topX, topY], [botX, botY], targetPoint]
        // debugger;
        const path = arrPoint.reduce((pre, item, i, arr) => {
            // debugger;
            return i < arr.length - 1 ? (i === 0 ? "M" + item.join(",") + " " : pre + "L" + item.join(",") + " ") : pre + "L" + item.join(",") + " Z"
        }, "");
        // return path;
        return `M${topX},${topY} L${fX},${fY} L${botX},${botY} L${targetPoint[0]},${targetPoint[1]} Z`;

        const a = 180 - Math.atan2(fY - topY, fX - topX) * 180 / Math.PI;
        const r = (fX - topX) / Math.cos(a * Math.PI / 180);
        return `M${topX},${topY} A${r},${r} ${jiaodu - theta} 0,1 ${botX},${botY} L${botX},${botY} L${targetPoint[0]},${targetPoint[1]} Z`;
    }
    toRenderLinePoint = () => {
        // const { points: {startPoint, endPoint, lastStartPoint, lastEndPoint}} = this.state;
        const pointStyle = {
            fill: 'rgba(200, 200, 200, .5)',
            stroke: 'rgba(200, 200, 200, 1)',
            strokeWidth: 3,
            cursor: 'pointer'
        };
        const markPointStyle = {
            fill: 'rgba(200, 200, 200, .5)',
            stroke: 'rgba(250, 0, 250, 1)',
            strokeWidth: 3,
            cursor: 'pointer'
        };
        const [cx, cy] = this.getThereBezierPoint(0.8);
        const [cx1, cy1] = this.getThereBezierPoint(0.7);
        const [cx2, cy2] = this.getThereBezierPoint(0.9);
        const d = this.getThereBezierArrow2(this.getThereBezierPoint(0.899), this.getThereBezierPoint(0.9), 30, 25, 15);
        const d2 = this.getThereBezierArrow2(this.getThereBezierPoint(0.299), this.getThereBezierPoint(0.3), 15, 20);
        // const d = this.getThereBezierArrow2([150, 50], [400, 100], 15, 50);
        return (
            <React.Fragment>
                <circle cx={cx} cy={cy} r={3} style={{...pointStyle}} />
                <circle cx={cx1} cy={cy1} r={3} style={{...markPointStyle}} />
                {/* <circle cx={cx2} cy={cy2} r={3} style={{...markPointStyle}} /> */}
                {/* <path d={d} /> */}
                <path d={d} style={{fill: 'red'}} />
                <path d={d2} style={{fill: 'blue'}} />
            </React.Fragment>
        );
    }

    componentDidMount () {

        this.setBezierLine();
    
    }

    render() {

        const {canvasPosition} = this.state;
        const style = Object.assign({}, {position: 'relative'}, {...canvasPosition});
        return(
            <div className='hm-line-two' style={{...style}} onMouseDown={this.downCanvas} onMouseUp={this.upCanvas} onMouseMove={this.moveCanvas}>
                <svg id='svg' width='1900' height='700' onMouseUp={this.mouseUp} onMouseMove={this.mouseMove}>
                    <desc>三次贝塞尔平滑曲线</desc>
                    {this.toRenderCircle()}
                    {this.toRenderPolyLine()}
                    {this.toRenderPath()}
                    {this.toRenderLinePoint()}

                    <marker id='markerArrow' markerWidth='10' markerHeight='13' refX='8' refY='5' orient='auto'>
                        <path d='M2,2 L3,5 2,8 L8,5 Z' style={{fill: 'black'}} />
                    </marker>

                    <path pointer-events='all' version='1.1' xmlns='http://www.w3.org/2000/svg' d='M165.9415926535898,50.5 L175.9415926535898,45.5 L172.17159265358978,50.5 L175.9415926535898,55.5 L165.9415926535898,50.5' class='' stroke='#f76258' fill='#f76258' transform='translate(4.999999999999999,3.5)'></path>
                </svg>
            </div>
        );

    }
}

export default LineTwo;