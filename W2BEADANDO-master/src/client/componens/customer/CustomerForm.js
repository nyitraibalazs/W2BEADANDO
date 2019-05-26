import React, { Component } from "react";
import CostumerDataActions from "./../../actions/CustomerActions"

export class CustomerForm extends Component {

   constructor(props) {
      super(props);

      this.state = {
         customerData: {
            name: "",
            email: "",
            address: ""
         },
         error: {
            customerData: {
               name: undefined,
               email: undefined,
               address: undefined
            }
         }
      };
   }

   handleNameChange = (event) => {
      const newValue = event.target.value;
      this.setState((prevState) => ({
            ...prevState,
            customerData: {
               ...prevState.customerData,
               name: newValue
            }
         }),
         () => this.validateName()
      )
   }

   handleEmailChange = (event) => {
      const newValue = event.target.value;
      this.setState((prevState) => (
            {
               ...prevState,
               customerData: {
                  ...prevState.customerData,
                  email: newValue
               }
            }
         ),
         () => this.validateEmail()
      )
   }

   handleAddressChange = (event) => {
      const newValue = event.target.value;
      this.setState((prevState) => (
            {
               ...prevState,
               customerData: {
                  ...prevState.customerData,
                  address: newValue
               }
            }
         ),
         () => this.validateAddress()
      )
   }

   validateName = () => {
      if(this.state.customerData.name === "") {
         this.setState((prevState) => (
            {
               ...prevState,
               error: {
                  ...prevState.error,
                  customerData: {
                     ...prevState.error.customerData,
                     name: true
                  }
               }
            }
         ))

         return false;
      } else {
         this.setState((prevState) => (
            {
               ...prevState,
               error: {
                  ...prevState.error,
                  customerData: {
                     ...prevState.error.customerData,
                     name: false
                  }
               }
            }
         ))

         return true;
      }
   }

   validateEmail = () => {
      const emailRegexp = new RegExp('\\S+@\\S+\\.\\S+','i');
      if(this.state.customerData.email === "" || !emailRegexp.test(this.state.customerData.email)) {
         this.setState((prevState) => (
            {
               ...prevState,
               error: {
                  ...prevState.error,
                  customerData: {
                     ...prevState.error.customerData,
                     email: true
                  }
               }
            }
         ))

         return false;
      } else {
         this.setState((prevState) => (
            {
               ...prevState,
               error: {
                  ...prevState.error,
                  customerData: {
                     ...prevState.error.customerData,
                     email: false
                  }
               }
            }
         ))

         return true;
      }
   }

   validateAddress = () => {
      if(this.state.customerData.address === "") {
         this.setState((prevState) => (
            {
               ...prevState,
               error: {
                  ...prevState.error,
                  customerData: {
                     ...prevState.error.customerData,
                     address: true
                  }
               }
            }
         ))

         return false;
      } else {
         this.setState((prevState) => (
            {
               ...prevState,
               error: {
                  ...prevState.error,
                  customerData: {
                     ...prevState.error.customerData,
                     address: false
                  }
               }
            }
         ))

         return true;
      }
   }

   validateForm = () => {
      let isValid = true;

      isValid = this.validateName() && isValid;
      isValid = this.validateEmail() && isValid;
      isValid = this.validateAddress() && isValid;

      return isValid;
   }

   saveForm = (event) => {
      event.preventDefault();
      if(this.validateForm()) {
         CostumerDataActions.setCostumerData(this.state.customerData)
      }
   }

   render() {
      return (

         <form className="form-horizontal"  onSubmit={(e) => this.saveForm(e)}>
            <div
               className={ this.state.error.customerData.name === true
                  ? "form-group has-error"
                  : this.state.error.customerData.name === false
                     ? "form-group has-success"
                     : "form-group"
               }
            >
               <label className="control-label col-sm-1">Name:</label>
               <div className="col-sm-11">
                  <input
                     id="name"
                     type="text"
                     name="name"
                     placeholder="Enter name"
                     value={this.state.customerData.name}
                     onChange={this.handleNameChange}
                     onBlur={this.validateName}
                     className={"form-control"}
                  />
                  {
                     this.state.error.customerData.name &&
                     <div className="error-desc">Invalid value!</div>
                  }
               </div>
            </div>

            <div
               className={ this.state.error.customerData.email === true
                  ? "form-group has-error"
                  : this.state.error.customerData.email === false
                     ? "form-group has-success"
                     : "form-group"
               }
            >
               <label className="control-label col-sm-1">Email:</label>
               <div className="col-sm-11">
                  <input
                     id="email"
                     type="email"
                     name="email"
                     placeholder="Enter email"
                     value={this.state.customerData.email}
                     onChange={this.handleEmailChange}
                     onBlur={this.validateEmail}
                     className={"form-control"}
                  />
                  {
                     this.state.error.customerData.email &&
                     <div className="error-desc">Invalid value!</div>
                  }
               </div>
            </div>

            <div
               className={ this.state.error.customerData.address === true
                  ? "form-group has-error"
                  : this.state.error.customerData.address === false
                     ? "form-group has-success"
                     : "form-group"
               }
            >
               <label className="control-label col-sm-1">Address:</label>
               <div className="col-sm-11">
                  <input
                     id="address"
                     type="text"
                     name="address"
                     placeholder="Enter address"
                     value={this.state.customerData.address}
                     onChange={this.handleAddressChange}
                     onBlur={this.validateAddress}
                     className={"form-control"}
                  />
                  {
                     this.state.error.customerData.address &&
                     <div className="error-desc">Invalid value!</div>
                  }
               </div>
            </div>

            <div className="form-group">
               <div className="col-sm-offset-1 col-sm-11">
                  <button type="submit" className="btn btn-primary">Submit</button>
               </div>
            </div>
         </form>
      )
   }
}
