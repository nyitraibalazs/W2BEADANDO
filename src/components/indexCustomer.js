import React, { Component } from "react";
import { CustomerDataForm } from "./CustomerDataForm"
import { MainPageCustomer } from "./mainPageCustomer"

export class IndexCustomer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customerData: undefined
        };
    
    }

    setCustomerData = (customerData) => {
        this.setState({customerData: customerData});
    }

    render() {
        return (
            <React.Fragment>
                <div className="customerlogo">
                   <h1>Shop - Entering</h1>
                </div>
                    <div className="customer-c-mod">
                         <div className="container-fluid">
                             {
                                 (this.state.customerData === undefined)
                                 ? <CustomerDataForm setCustomerData={this.setCustomerData} />
                                 : <MainPageCustomer customerData={this.state.customerData} />
                             }
                         </div>
                    </div>
            </React.Fragment>
        )
    }
}
