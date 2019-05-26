import React, { Component } from "react";

export class CreateInvoice extends Component {

   constructor(props) {
      super(props);

      this.state = {
         invoice: {
            price: 0,
            isPaid: false
         },
         error: {
            invoice: {
               error: undefined
            }
         }
      };
   }

   handlePriceChange = (event) => {
      const newValue = event.target.value;

      this.setState((prevState) => ({
         ...prevState,
         invoice: {
            ...prevState.invoice,
            price: newValue
         }
      }))
   }

   validatePrice = () => {
      if(this.state.invoice.price > 0) {
         this.setState((prevState) => (
            {
               ...prevState,
               error: {
                  ...prevState.error,
                  invoice: {
                     ...prevState.error.invoice,
                     price: false
                  }
               }
            }
         ))

         return true;
      } else {
         this.setState((prevState) => (
            {
               ...prevState,
               error: {
                  ...prevState.error,
                  invoice: {
                     ...prevState.error.invoice,
                     price: true
                  }
               }
            }
         ))

         return false;
      }
   }

   saveForm = (event) => {
      event.preventDefault();
      if(this.validatePrice()) {
         this.props.createInvoiceCallback(this.state.invoice);
      }
   }



   render() {
      return (
         <div className="container-fluid invoice-form">
            <form  className="form-horizontal" onSubmit={(e) => this.saveForm(e)}>
               <div
                  className={ this.state.error.invoice.price === true
                     ? "form-group has-error"
                     : this.state.error.invoice.price === false
                        ? "form-group has-success"
                        : "form-group"
                  }
               >
                  <label className="control-label col-sm-1">Price:</label>
                  <div className="col-sm-11">
                     <input
                        type="number"
                        placeholder="Enter price"
                        value={this.state.invoice.price}
                        onChange={(event) => this.handlePriceChange(event)}
                        onBlur={() => this.validatePrice()}
                        className="form-control"
                     />
                     {
                        this.state.error.invoice.price &&
                        <div className="error-desc">Invalid value!</div>
                     }
                  </div>
               </div>


               <div className="form-group">
                  <div className="col-sm-offset-1 col-sm-11">
                     <button
                        type="submit"

                        className="btn btn-primary btn-block"
                     >
                        Create invoice
                     </button>
                  </div>
               </div>
            </form>
         </div>
      )
   }
}

