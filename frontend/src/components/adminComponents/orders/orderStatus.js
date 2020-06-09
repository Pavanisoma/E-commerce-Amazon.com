import React, { Component } from 'react'
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import exportData from '../../../config/config';
import moment from 'moment';

class OrderStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productInfo: this.props.location.state? this.props.location.state.productInfo:[],
            redirect: '',

        }
    }

    render() {
        console.log(this.state.productInfo)
        if(!this.props.location.state){
            return(<div>

            </div>)
        }
        return (
            <div>
                <div>
                    <Timeline lineColor={'#ddd'}>
                        {this.state.productInfo.orderUpdates.map((update, i)=>{
                            return (
                                <div key ={i}>
                                     <TimelineItem
                            key={i}
                            // dateText={update.date}
                            dateText={moment(update.date).format('MMM') + " " + moment(update.date).format('DD') + ", " +
                            moment(update.date).format('YYYY')}

                            style={{ color: '#e86971' }}
                        >
                            <h4>{exportData.deliveryStatus[update.deliveryStatus]}</h4>

                        </TimelineItem>
                                </div>
                            )
                        })}
                       
                    </Timeline>
                </div>
            </div>
        )
    }
}

export default OrderStatus;