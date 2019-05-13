import React, { Component } from "react";

export class CustomerDataForm extends Component {

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

    ChaneName = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => ({...prevState, customerData: {...prevState.customerData, name: newValue}}),
            () => this.validName()
        )
    }

    ChangeEmail = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
            {...prevState, customerData: {...prevState.customerData, email: newValue}}),
            () => this.validEmail()
        )
    }

    ChangeAdress = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
            {...prevState, customerData: {...prevState.customerData, address: newValue}}),
            () => this.validAdress()
        )
    }

    validName = () => {
        if(this.state.customerData.name === "") {
            this.setState((prevState) => (
                {...prevState, error: {...prevState.error, customerData: {...prevState.error.customerData, name: true}}}
            ))
            return false;

        } else {
            this.setState((prevState) => (
                {...prevState, error: {...prevState.error, customerData: {...prevState.error.customerData, name: false}}}
            ))

            return true;
        }
    }

    validEmail = () => {
        const emailRegexp = new RegExp('\\S+@\\S+\\.\\S+','i');
        if(this.state.customerData.email === "" || !emailRegexp.test(this.state.customerData.email)) {
            this.setState((prevState) => (
                {...prevState,
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

    validAdress = () => {
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
        let check = true;
        check = this.validName() && check;
        check = this.validEmail() && check;
        check = this.validAdress() && check;
        return check;
    }

    saveForm = (event) => {
        event.preventDefault();
        if(this.validateForm()) {
            this.props.setCustomerData(this.state.customerData);
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
                    <label className="control-label col-sm-12">Name:</label>
                    <div className="col-sm-12">
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.customerData.name}
                            onChange={this.ChaneName}
                            onBlur={this.validName}
                            className={"form-control"}
                        />
                        {
                            this.state.error.customerData.name &&
                            <div className="error-desc">Invalid name!</div>
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
                    <label className="control-label col-sm-12">Email:</label>
                    <div className="col-sm-12">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.customerData.email}
                            onChange={this.ChangeEmail}
                            onBlur={this.validEmail}
                            className={"form-control"}
                        />
                        {
                            this.state.error.customerData.email &&
                            <div className="error-desc">Invalid email adress!</div>
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
                    <label className="control-label col-sm-12">Address:</label>
                    <div className="col-sm-12">
                        <input
                            id="address"
                            type="text"
                            name="address"
                            placeholder="Enter address"
                            value={this.state.customerData.address}
                            onChange={this.ChangeAdress}
                            onBlur={this.validAdress}
                            className={"form-control"}
                        />
                        {
                            this.state.error.customerData.address &&
                            <div className="error-desc">Invalid adress!</div>
                        }
                    </div>
                </div>

                <div className="form-group"> 
                    <div className="col-sm-offset-1 col-sm-11">
                        <button type="submit" className="btn btn-primary">Entering</button>
                    </div>
                </div>
            </form>
        )
    }
}
