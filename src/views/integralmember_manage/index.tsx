import React, {Component} from 'react';
import Rule from './component/rule';

class IntegralRule extends Component<any ,any> {
    constructor(props: any){
        super(props)
    }
    render(){
        return(
            <div className="container">
                <div className="ikd-page-header"><div className="title">积分规则</div></div>
                <Rule></Rule>
            </div>
        )
    }
}

export default IntegralRule;