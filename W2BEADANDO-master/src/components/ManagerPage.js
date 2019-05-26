import React, { Component } from "react";
import axios from "axios";
import { PayManager } from "./payManager";
import { getPriceFormattedString } from "../backend/price-format";

export class ManagerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allOrders: [],
            filter: ""
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/order/getOrders")
           .then((response) => {
               this.setState((prevState) => ({
                   ...prevState,
                   allOrders: response.data.orders
               }))
           })
    }


    getOrderStatus = (order) => {
        let notOkRepair = false;
        order.windows.forEach((window) => {
            if(window.shutter.isFinished === false) {
                notOkRepair = true;
            }
        })

        if(notOkRepair === true) {return "UNASSEMBLED";}
        let isInstalled = (order.isInstalled === true);
        if(isInstalled === false) {return "ASSEMBLED";}
        let repaitInvoice =  (order.invoice !== undefined && order.invoice !== null)
        if(repaitInvoice === false) {return "INSTALLED";}
        let paidForWork = (order.invoice.isPaid === true);
        if(paidForWork === false) {return "SENDPAID";}
        else {return "PAID";}
    }

    getFilteredOrders = () => {
        return this.state.allOrders.filter((order) => {
            if(this.state.filter === "") {
                return true;
            } else {
                let status = this.getOrderStatus(order);

                return (this.state.filter === status);
            }
        })
    }

    installShutters = (orderId) => {
        let data = {
            orderId: orderId
        }

        axios.post("http://localhost:8080/order/finishInstallation", data)
           .then((response) => {
               let orders = [...this.state.allOrders];
               orders.forEach((order) => {
                   if(order._id === orderId) {
                       order.isInstalled = true;
                   }
               })

               this.setState((prevState) => ({
                   ...prevState,
                   allOrders: orders
               }))
           })
    }

    createInvoiceForOrder = (invoice, orderId) => {
        let data = {
            orderId: orderId,
            invoice: {
                price: parseInt(invoice.price),
                isPaid: invoice.isPaid
            }
        }

        axios.post("http://localhost:8080/order/createInvoiceForOrder", data)
           .then((response) => {
               let orders = [...this.state.allOrders];
               orders.forEach((order) => {
                   if(order._id === orderId) {
                       order.invoice = invoice;
                   }
               })

               this.setState((prevState) => ({
                   ...prevState,
                   allOrders: orders
               }))
           })
    }

    render() {
        return (
           <React.Fragment>
               <div className="container-fluid">
                   <div className="customerlogo customerlogo--manager">
                       <h1>Manager Price Page</h1>
                   </div>

                   <div>
                   <ul className="list-group margin-top-30">
                           {
                               this.getFilteredOrders()
                                  .map((order, i) =>
                                     {
                                         const orderStatus = this.getOrderStatus(order);

                                         return <li key={i} className="list-group-item">

                                             <div className="row">
                                                 <div className="col-sm-12">
                                                     <div>
                                                         <div>
                                                             <h3>Customer Info :</h3>
                                                         </div>
                                                         <div>
                                                             <div>
                                                                 <label className="details-label">Name: </label>{order.customerData.name}
                                                             </div>
                                                             <div>
                                                                 <label className="details-label">Email: </label>{order.customerData.email}
                                                             </div>
                                                             <div>
                                                                 <label className="details-label">Address: </label>{order.customerData.address}
                                                             </div>
                                                         </div>
                                                     </div>
                                                 </div>

                                                 <div className="col-sm-12">
                                                     <div>
                                                         <div>
                                                             <h3>Shutters:</h3>
                                                         </div>
                                                         <div>
                                                             <table className="table">
                                                                 <thead>
                                                                 <tr>
                                                                     <th>Window size(width first)</th>
                                                                     <th>Color</th>
                                                                     <th>Material</th>
                                                                     <th>Type</th>
                                                                 </tr>
                                                                 </thead>
                                                                 <tbody>
                                                                 {
                                                                     order.windows.map((window, j) =>
                                                                        <tr key={j}>
                                                                            <td>{window.width}mm x {window.height}mm</td>
                                                                            <td>{window.shutter.color}</td>
                                                                            <td>{window.shutter.material}</td>
                                                                            <td>{window.shutter.type}</td>
                                                                        </tr>
                                                                     )
                                                                 }
                                                                 </tbody>
                                                             </table>
                                                         </div>
                                                     </div>

                                                     <div>
                                                         <div><label className="status-label"><h3>Order status: </h3></label><span style={{fontSize: "1.2em"}}>{orderStatus}</span></div>
                                                     </div>

                                                     {
                                                         (orderStatus === "ASSEMBLED") &&
                                                         <button
                                                            type="button"
                                                            className="btn btn-primary btn-block"
                                                            onClick={() => this.installShutters(order._id)}
                                                         >
                                                             Ok -  Installed
                                                         </button>
                                                     }

                                                     {
                                                         (orderStatus === "INSTALLED") &&
                                                         <PayManager createInvoiceCallback={(invoice) => this.createInvoiceForOrder(invoice, order._id)} />

                                                     }

                                                     {
                                                         (orderStatus === "SENDPAID" || orderStatus === "PAID") &&
                                                         <div>
                                                             <div>
                                                                 <h3>Invoice:</h3>
                                                             </div>
                                                             <div>
                                                                 <div><label className="details-label">Name: </label>{order.customerData.name}</div>
                                                                 <div><label className="details-label">Price: </label>{getPriceFormattedString(order.invoice.price)} HUF</div>
                                                             </div>
                                                         </div>
                                                     }
                                                 </div>
                                             </div>
                                         </li>

                                     }

                                  )
                           }
                       </ul>
                   </div>


               </div>
           </React.Fragment>
        )
    }
}
