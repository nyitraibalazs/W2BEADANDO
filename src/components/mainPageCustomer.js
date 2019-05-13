import React, { Component } from "react";
import axios from "axios";
import { OwnCustomer } from "./ownCustomer";
import { CustomerNew } from "./CustomerNew";

export class MainPageCustomer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allShutterColors: [],
            allShutterMaterials: [],
            allShutterTypes: [],
            ownOrders: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/shutter-data/getAllShutterColors")
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                allShutterColors: response.data.colors
            }))
        })

        axios.get("http://localhost:8080/shutter-data/getAllShutterMaterials")
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                allShutterMaterials: response.data.materials
            }))
        })

        axios.get("http://localhost:8080/shutter-data/getAllShutterTypes")
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                allShutterTypes: response.data.types
            }))
        })

        axios.post("http://localhost:8080/order/getOrdersByEmail", {
            "email": this.props.customerData.email
        })
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                ownOrders: response.data.orders
            }))
        })
    }

    createOrder = (order) => {

        let parsedWindows = [...order.windows];
        for (let i = 0; i < parsedWindows.length; i++) {
            parsedWindows[i].width = parseInt(parsedWindows[i].width);
            parsedWindows[i].height = parseInt(parsedWindows[i].height);
            parsedWindows[i].shutter = {
                ...parsedWindows[i].shutter,
                isFinished: false
            }
        }

        let data = {
            order: {
                ...order,
                isInstalled: false,
                customerData: this.props.customerData,
                windows: parsedWindows
            }
        }

        axios.post("http://localhost:8080/order/createOrder", data)
        .then((response) => {
            
            let id = response.data.createdId;
            axios.post("http://localhost:8080/order/getOrderById", {
                "orderId": id
            })
            .then((response) => {
                this.setState((prevState) => ({
                    ...prevState,
                    ownOrders: [
                        ...prevState.ownOrders,
                        response.data.order
                    ]
                }))
            })
        })

    }

    render() {
        return (
            <React.Fragment>
                <CustomerNew
                    allShutterColor={this.state.allShutterColors}
                    allShutterMaterials={this.state.allShutterMaterials}
                    allShutterTypes={this.state.allShutterTypes}
                    createOrderCallback={this.createOrder}
                />
                <hr />
                <OwnCustomer customerData={this.props.customerData} ownOrders={this.state.ownOrders} />
            </React.Fragment>
        )
    }
}
