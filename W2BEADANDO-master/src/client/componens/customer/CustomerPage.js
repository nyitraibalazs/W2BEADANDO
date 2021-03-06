import React, { Component } from "react";
import { CustomerForm } from "./CustomerForm"
import { CustomerMainPage } from "./CustomerMainPage"
import CostumerDataStore from "./../../store/CustomerStore"
import CostumerDataActions from "./../../actions/CustomerActions"

export class CustomerPage extends Component {

   constructor(props) {
      super(props);

      this.state = {
         customerData: CostumerDataStore._costumerData,
         ownOrders: CostumerDataStore._ownOrders
      };
   }

   componentDidMount() {
      CostumerDataStore.addCostumerChange(this.onCostumerDataChange);
      CostumerDataStore.addOrdersChange(this.onOwnOrdersChange);
   }

   componentWillUnmount() {
      CostumerDataStore.removeCostumerChange(this.onCostumerDataChange);
      CostumerDataStore.removeOrdersChange(this.onOwnOrdersChange);
   }


   onCostumerDataChange = () => {
      this.setState({customerData : CostumerDataStore._costumerData});
   }

   onOwnOrdersChange = () => {
      this.setState({ownOrders : CostumerDataStore._ownOrders});
   }


   render() {
      return (
         <React.Fragment>
            <div className="container-fluid customerlogo">

               <div className="row">
                  <div className="text-center header-text">
                     <h1>
                        Enter the Shop
                     </h1>

                     <h1>Login:</h1>
                  </div>

                  <div className="customerpage__login row">
                  {
                     (this.state.customerData === undefined)
                        ? <CustomerForm />
                        : <CustomerMainPage customerData={this.state.customerData} ownOrders={this.state.ownOrders} />
                  }
                  </div>
               </div>
            </div>
         </React.Fragment>
      )
   }
}
