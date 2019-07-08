import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, MarkSeriesCanvas, DiscreteColorLegend, Hint } from 'react-vis';

import './Graph.scss';
import '../../node_modules/react-vis/dist/style.css';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearestXY: false,
            width: 450,
            height: 400
        }
    };

    componentDidMount() {
        this.drawGraph();
    }

    updateNearestXY = (point) => {
        this.setState({
            nearestXY: point
        })
    }

    drawGraph = () => {
        this.props.getMaxAngleData();
    }

    render() {

        const {
            title,
            data,
            max_angle,
            max_value,
            min_value,
            e_res
        } = this.props;

        const {
            nearestXY,
            width,
            height
        } = this.state

        const yMaxValue = max_value > 0.024 ? max_value : 0.024;
        const yMinValue = min_value < 0 ? min_value : 0;

        const xDomain = [0, 2];
        const yDomain = [yMinValue, yMaxValue];

        const isValid = Object.keys(data).length !== 0;

        return (
            <div className="graph-wrapper">
                <div className="header-wrapper m-b-15">
                    <h2 className="graph-title">
                        {title}
                    </h2>
                    <button className="graph-button" onClick={() => this.drawGraph()}>
                        Draw
                    </button>
                </div>
                <div className="graph">
                    <LineGraph
                        data={data}
                        e_res={e_res}
                        max_angle={max_angle}
                        xDomain={xDomain}
                        yDomain={yDomain}
                        width={width}
                        height={height}
                        updateNearestXY={this.updateNearestXY}
                        isValid={isValid}
                    />
                    <DotGraph
                        xDomain={xDomain}
                        yDomain={yDomain}
                        width={width}
                        height={height}
                        nearestXY={nearestXY}
                    />
                </div>
            </div>
        );
    }
}


class LineGraph extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return !(nextProps.data === this.props.data);
    }

    render() {

        const {
            data,
            xDomain,
            yDomain,
            updateNearestXY,
            isValid,
            e_res,
            max_angle,
            width,
            height
        } = this.props;

        const lineSeriesProps = {
            animation: true,
            opacityType: 'literal',
            stroke: 'blue',
            data,
            onNearestXY: point => { updateNearestXY(point) }
        };

        const constMaxAngleProps = {
            animation: true,
            opacityType: 'literal',
            stroke: 'red',
            strokeStyle: 'dashed',
            data: [{ x: 0, y: 0.022 }, { x: 2, y: 0.022 }],
        };

        const xAxisProps = {
            animation: true,
            opacityType: 'literal',
            stroke: 'black',
            data: [{ x: 0, y: 0 }, { x: 2, y: 0 }],
        }

        const defaultEresProps = {
            animation: true,
            opacityType: 'literal',
            stroke: 'grey',
            strokeStyle: 'dashed',
            data: [{ x: e_res, y: 0 }, { x: e_res, y: max_angle }],
        }

        const defaultMaxAngleProps = {
            animation: true,
            opacityType: 'literal',
            stroke: 'grey',
            strokeStyle: 'dashed',
            data: [{ x: 0, y: max_angle }, { x: e_res, y: max_angle }],
        }

        const defaultMarkProps = {
            size: 5,
            fill: 'grey',
            style: {
                pointerEvents: 'none'
            },
            data: [{x: e_res, y: max_angle}]
        }

        const ITEMS = [
            { title: 'Acceptable Max', color: 'red', strokeStyle: 'dashed' },
            { title: 'Selected Value', color: 'grey', strokeStyle: 'dashed' },
            { title: 'Data', color: 'blue', strokeWidth: 2 },
        ];

        const isMarkValid = e_res !== 0 || max_angle !== 0;

        return (
            <XYPlot
                width={width}
                height={height}
                {...{ xDomain, yDomain }}
                onMouseLeave={() => updateNearestXY(false)}
            >
                <DiscreteColorLegend orientation='horizontal' width={300} items={ITEMS} />
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Eres (MeV)" />
                <YAxis title="max angle" tickSize={0.5} />
                {isValid && <LineSeries {...lineSeriesProps} />}
                {isMarkValid && <LineSeries {...defaultEresProps} />}
                {isMarkValid && <LineSeries {...defaultMaxAngleProps} />}
                {isMarkValid && <MarkSeriesCanvas {...defaultMarkProps} />}
                <LineSeries {...xAxisProps} />
                <LineSeries {...constMaxAngleProps} />
            </XYPlot>
        );
    }
}

class DotGraph extends React.Component {

    render() {

        const {
            nearestXY,
            xDomain,
            yDomain,
            width,
            height
        } = this.props;

        const markSeriesProps = {
            size: 5,
            fill: 'black',
            style: {
                pointerEvents: 'none'
            },
            data: [nearestXY]
        }

        return (
            <XYPlot
                width={width}
                height={height}
                {...{ xDomain, yDomain }}
            >
                {nearestXY && <MarkSeriesCanvas {...markSeriesProps} />}
                {nearestXY && <Hint value={nearestXY} />}
            </XYPlot>
        );
    }
}