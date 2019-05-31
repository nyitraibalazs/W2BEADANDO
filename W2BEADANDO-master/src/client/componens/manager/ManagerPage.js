import React, { Component } from "react";
import { CreateInvoice } from "./CreateInvoice";
import { getPriceFormattedString } from "../../../backend/price-format";
import OrderStore from "./../../store/OrderStore"
import OrderActions from "./../../actions/OrderActions"

export class ManagerPage extends Component {

   constructor(props) {
      super(props);

      this.state = {
         allOrders: OrderStore._allOrders,
         filter: ""
      };
   }

   onAllOrdersChange = () => {
      this.setState({allOrders : OrderStore._allOrders});
   }

   componentDidMount() {
      OrderStore.addAllOrdersChange(this.onAllOrdersChange);
      if (OrderStore._isAllOrdersFecthed === false) {
         OrderActions.refreshAllOrders();
      }
   }

   componentWillUnmount() {
      OrderStore.removeAllOrdersChange(this.onAllOrdersChange);
   }

   getOrderStatus = (order) => {
      let isUnassembled = false;
      order.windows.forEach((window) => {
         if(window.shutter.isFinished === false) {
            isUnassembled = true;
         }
      })

      if(isUnassembled === true) {
         return "UNASSEMBLED";
      }

      let isInstalled = (order.isInstalled === true);

      if(isInstalled === false) {
         return "ASSEMBLED";
      }

      let hasInvoice =  (order.invoice !== undefined && order.invoice !== null)

      if(hasInvoice === false) {
         return "INSTALLED";
      }

      let isInvoicePaid = (order.invoice.isPaid === true);

      if(isInvoicePaid === false) {
         return "UNPAID";
      } else {
         return "PAID";
      }
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
      OrderActions.finishInstallation(orderId);
   }

   createInvoiceForOrder = (invoice, orderId) => {
      const invoiceToCreate = {
         price: parseInt(invoice.price),
         isPaid: invoice.isPaid
      }

      OrderActions.createInvoiceForOrder(orderId, invoiceToCreate);
   }

   render() {
      return (
         <React.Fragment>
            <div className="container-fluid">

               <div className="text-center header-text">
                  <h1>
                     Manager page
                  </h1>
               </div>

               <div>
                 <ul className="list-group margin-top-30">
                     {
                        this.state.allOrders.length === 0 &&
                        <div>no orders</div>
                     }
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
                                                <h3>Customer data:</h3>
                                             </div>
                                             <div>
                                                <div><label className="details-label">Name: </label>{order.customerData.name}</div>
                                                <div><label className="details-label">Email: </label>{order.customerData.email}</div>
                                                <div><label className="details-label">Address: </label>{order.customerData.address}</div>
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
                                                Install shutter(s)
                                             </button>
                                          }

                                          {
                                             (orderStatus === "INSTALLED") &&
                                             <CreateInvoice createInvoiceCallback={(invoice) => this.createInvoiceForOrder(invoice, order._id)} />

                                          }

                                          {
                                             (orderStatus === "UNPAID" || orderStatus === "PAID") &&
                                             <div>
                                                <div>
                                                   <h3>Invoice:</h3>
                                                </div>
                                                <div>
                                                   <div><label className="details-label">Name: </label>{order.customerData.name}</div>
                                                   <div><label className="details-label">Price: </label>{getPriceFormattedString(order.invoice.price)} HUF</div>
                                                   <div><label className="details-label">Paid: </label>{order.invoice.isPaid ? "true" : "false"}</div>
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

