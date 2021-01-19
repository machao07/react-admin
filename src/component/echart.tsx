import React, { Component } from 'react';
// import echarts from 'echarts';

interface chartProps {
    key: string,
    option: object|null,
    style: {
        weidth: string,
        height: string
    },
    className?: string 
}

class ChartComponent extends Component<chartProps> {
    constructor(props: chartProps){
        super(props);
        this.state = {
            chartDom: null
        };
    }

    render() {
        const refOnRender = (el: any): void => {
            this.setState({
                chartDom: el
            })
        }
        return (
            <div ref={refOnRender} style={this.props.style} className={this.props.className}></div>
        )
    }
}

export default ChartComponent;
