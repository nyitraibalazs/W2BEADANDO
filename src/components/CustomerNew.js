import React, { Component } from "react";

export class CustomerNew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            order: {
                comment: "",
                windows: []
            },
            error: {
            windowsSize: undefined,
                order: {
                windows: []
            }
        }
        };
    }

    NewShutterForCustomer = () => {
        let newWindow = {
            width: 0,
            height: 0,
            shutter: {
                color: "",
                material: "",
                type: ""
            }
        }

        let newWindowError = {
            width: undefined,
            height: undefined,
            shutter: {
                color: undefined,
                material: undefined,
                type: undefined
            }
        }

        this.setState((prevState) => ({
            ...prevState,
            order: {...prevState.order,
                windows:
                   [...prevState.order.windows,
                       newWindow]
            },
            error: {...prevState.error, windowsSize: false, order: {...prevState.error.order, windows: [...prevState.error.order.windows, newWindowError]}}
        }))
    }

    RealShutterDelete = (i) => {
        let windows = [...this.state.order.windows];
        windows.splice(i, 1);
        let exceptionWindows = [...this.state.error.order.windows];
        exceptionWindows.splice(i, 1);

        this.setState({order:{windows: windows}, error: {order: {windows: exceptionWindows}}
        })
    }

    WidthChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].width = newValue;

        this.setState((prevState) => ({...prevState, order: {...prevState.order, windows: windows}}),
            () => this.validWidth(i)
        )
    }

    HeightChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].height = newValue;

        this.setState((prevState) => ({...prevState, order: {...prevState.order, windows: windows}}),
            () => this.validHeight(i)
        )
    }

    ColorChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].shutter.color = newValue;

        this.setState((prevState) => ({...prevState, order: {...prevState.order, windows: windows}}),
            () => this.validColor(i)
        )
    }

    MaterialChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].shutter.material = newValue;

        this.setState((prevState) => ({...prevState, order: {...prevState.order, windows: windows}}),
            () => this.validMaterial(i)
        )
    }

    TypeChange = (i, event) => {
        const newValue = event.target.value;

        let windows = [...this.state.order.windows];
        windows[i].shutter.type = newValue;

        this.setState((prevState) => ({...prevState, order: {...prevState.order, windows: windows}}),
            () => this.validType(i)
        )
    }

    validWidth = (i)  => {
        const width = this.state.order.windows[i].width;
        if(width >= 0) {
            return true;
        }
    }

    validHeight = (i) => {
        const height = this.state.order.windows[i].height;
        if(height >= 0) {
            return true;
        }
    }

    validColor = (i) => {
        const color = this.state.order.windows[i].shutter.color;
        if(color.length>0) {
            return true;
        }
    }

    validMaterial = (i) => {
        const material = this.state.order.windows[i].shutter.material;
        if(material.length>0) {
            return true;
        }
    }

    validType = (i) => {
        const type = this.state.order.windows[i].shutter.type;
        if(type.length > 0) {
            return true;
        }
    }

    validRealForm = () => {
        let check = true;

        if(this.state.order.windows.length === 0) {
            check = false;
            this.setState((prevState) => ({
                ...prevState,
                error: {
                    ...prevState.error,
                    windowsSize: true
                }
            }))
        } else {
            this.setState((prevState) => ({
                ...prevState,
                error: {
                    ...prevState.error,
                    windowsSize: false
                }
            }))
        }

        this.state.order.windows.forEach((window, i) => {
            check = this.validWidth(i) && check;
            check = this.validHeight(i) && check;
            check = this.validColor(i) && check;
            check = this.validMaterial(i) && check;
            check = this.validType(i) && check;
        });

        return check;
    }

    saveThisValidForm = (event) => {
        event.preventDefault();
        if(this.validRealForm()) {
            this.props.createOrderCallback(this.state.order);
            this.setState({
                order: {comment: "", windows: []},
                error: {windowsSize: undefined, order: {windows: []}}
            })
        }
    }


    render() {
        return (

            <form  onSubmit={(e) => this.saveThisValidForm(e)}>
                <h2>Create order</h2>
                <div>
                    <div>
                        <h3>
                            {
                                this.state.error.windowsSize === true &&
                                <span className="error-desc">(min 1 needed)</span>
                            }
                        </h3>
                    </div>
                    <div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Width (mm)</th>
                                    <th>Height (mm)</th>
                                    <th>Color</th>
                                    <th>Material</th>
                                    <th>Type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.order.windows.map((window, i) =>
                                    <tr key={i}>
                                        <td>
                                            <div>
                                                <div
                                                    className={ this.state.error.order.windows[i].width === true
                                                        ? "form-group has-error"
                                                        : this.state.error.order.windows[i].width === false
                                                            ? "form-group has-success"
                                                            : "form-group"
                                                    }
                                                >
                                                    <div className="input-group">
                                                        <input
                                                            type="number"
                                                            placeholder="Enter width"
                                                            value={window.width}
                                                            onChange={(event) => this.WidthChange(i, event)}
                                                            onBlur={() => this.validWidth(i)}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    {
                                                        this.state.error.order.windows[i].width &&
                                                        <div className="error-desc">Invalid value!</div>
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div
                                                    className={ this.state.error.order.windows[i].height === true
                                                        ? "form-group has-error"
                                                        : this.state.error.order.windows[i].height === false
                                                            ? "form-group has-success"
                                                            : "form-group"
                                                    }
                                                >
                                                    <div className="input-group">
                                                        <input
                                                            type="number"
                                                            placeholder="Enter height"
                                                            value={window.height}
                                                            onChange={(event) => this.HeightChange(i, event)}
                                                            onBlur={() => this.validHeight(i)}
                                                            className="form-control"
                                                        />

                                                    </div>
                                                    {
                                                        this.state.error.order.windows[i].height &&
                                                        <div className="error-desc">Invalid value!</div>
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={ this.state.error.order.windows[i].shutter.color === true
                                                    ? "form-group has-error"
                                                    : this.state.error.order.windows[i].shutter.color === false
                                                        ? "form-group has-success"
                                                        : "form-group"
                                                }
                                            >
                                                <select
                                                    className="form-control"
                                                    value={window.shutter.color}
                                                    onChange={(event) => this.ColorChange(i, event)}
                                                >
                                                    <option disabled value={""}>Select a color</option>
                                                {
                                                    this.props.allShutterColor.map((color, i) =>
                                                        <option key={i} value={color.color}>{color.color}</option>
                                                    )
                                                }
                                                </select>
                                                {
                                                    this.state.error.order.windows[i].shutter.color &&
                                                    <div className="error-desc">Invalid value!</div>
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className={ this.state.error.order.windows[i].shutter.material === true
                                                    ? "form-group has-error"
                                                    : this.state.error.order.windows[i].shutter.material === false
                                                        ? "form-group has-success"
                                                        : "form-group"
                                                }
                                            >
                                                <select
                                                    className="form-control"
                                                    value={window.shutter.material}
                                                    onChange={(event) => this.MaterialChange(i, event)}
                                                >
                                                    <option disabled value={""}>Select a material</option>
                                                {
                                                    this.props.allShutterMaterials.map((material, i) =>
                                                        <option key={i} value={material.material}>{material.material}</option>
                                                    )
                                                }
                                                </select>
                                                {
                                                    this.state.error.order.windows[i].shutter.material &&
                                                    <div className="error-desc">Invalid value!</div>
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className={ this.state.error.order.windows[i].shutter.type === true
                                                    ? "form-group has-error"
                                                    : this.state.error.order.windows[i].shutter.type === false
                                                        ? "form-group has-success"
                                                        : "form-group"
                                                }
                                            >
                                                <select
                                                    className="form-control"
                                                    value={window.shutter.type}
                                                    onChange={(event) => this.TypeChange(i, event)}
                                                >
                                                    <option disabled value={""}>Select a type</option>
                                                {
                                                    this.props.allShutterTypes.map((type, i) =>
                                                        <option key={i} value={type.type}>{type.type}</option>
                                                    )
                                                }
                                                </select>
                                                {
                                                    this.state.error.order.windows[i].shutter.type &&
                                                    <div className="error-desc">Invalid value!</div>
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-block"
                                                onClick={() => this.RealShutterDelete(i)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                }

                                    <tr className="my-tr-row">
                                        <td colSpan={6}>
                                            <button
                                                type="button" 
                                                className="btn btn-primary btn-block"
                                                onClick={this.NewShutterForCustomer}
                                            >
                                               Add order
                                            </button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="form-group"> 
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
