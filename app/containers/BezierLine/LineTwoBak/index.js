/**
 *@Author: hy-zhangb
 *Date: 2018/3/13 11:04
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-11-14 17:58:16
 *Email: lovewinders@163.com
 *File Path: bezier-line - LineTwo
 *@File Name: LineTwo
 *@Description: Description
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// import throttle from 'app/utils/throttle';


//css
import './style.scss';

//class
class LineTwo extends Component {
    constructor(props) {

        super(props);
        this.state = {
            points: {
                startPoint: [250, 110],
                endPoint: [500, 250],
                lastStartPoint: [300, 150],
                lastEndPoint: [400, 150]
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

            // this.updateNodePosition(e);
            console.log(e, e.clientX, e.clientY);
            const {points, canvasPosition: {left, top}} = this.state;
            let nw = Object.assign({}, {...points});

            nw[this.selPoint] = [e.clientX - left, e.clientY - 305 - top];

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
                <path d={path} style={{...pathStyle}}>
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

    render() {

        const {canvasPosition} = this.state;
        const style = Object.assign({}, {position: 'relative'}, {...canvasPosition});
        return(
            <div className='hm-line-two' style={{...style}} onMouseDown={this.downCanvas} onMouseUp={this.upCanvas} onMouseMove={this.moveCanvas}>
                <svg id='svg' width='1900' height='300' onMouseUp={this.mouseUp} onMouseMove={this.mouseMove}>
                    <desc>三次贝塞尔平滑曲线</desc>
                    {this.toRenderCircle()}
                    {this.toRenderPolyLine()}
                    {this.toRenderPath()}
                </svg>
            </div>
        );

    }
}

export default LineTwo;