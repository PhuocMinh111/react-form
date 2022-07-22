import React, { Component } from "react";
import { connect } from "react-redux";

class Form extends Component {
  state = {
    maSV: "",
    tenSV: "",
    soDT: "",
    email: "",
    selected: false,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => ({
      ...this.state,
      [name]: value,
    }));
  };

  handleSub = async (e) => {
    e.preventDefault();
    if (!this.props.formReducer.selected) {
      this.props.dispatch({
        type: "VALIDATION",
        payload: {
          value: this.state,
          list: this.props.formReducer.sv,
          selected: this.props.formReducer.selected,
        },
      });
    }

    if (!this.props.validReducer) return;
    const { errMaSV, errSoDT, errTenSV, errEmail } = this.props.validReducer;
    let error = false;
    error = await (errMaSV.state ||
      errSoDT.state ||
      errTenSV.state ||
      errEmail.state);
    console.log(error);
    if (error) {
      return;
    }
    this.props.dispatch({
      type: "ADD",
      payload: this.state,
    });
    if (this.props.formReducer.selected) {
      this.props.dispatch({
        type: "EDIT_USER",
        payload: this.state,
      });
    }
    this.setState({
      maSV: "",
      tenSV: "",
      soDT: "",
      email: "",
    });
    // console.log(this.props.validReducer);
    // for (const error in this.props.validReducer) {
    //   const { state } = this.props.validReducer[error];
    //   if (state === true) return;
    // }

    // const name = e.target.name;
    // const value = e.target.value;
    // this.setState({ [name]: value });
  };
  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.formReducer.selected &&
      nextProps.formReducer.selected.maSV !== currentState.maSV
    ) {
      currentState = { ...nextProps.formReducer.selected, selected: true };
    }
    return currentState;
  }

  render() {
    const { errMaSV, errTenSV, errEmail, errSoDT } = this.props.validReducer;
    const { maSV, tenSV, soDT, email } = this.state;

    return (
      <div className="card p-0">
        <div className="card-header bg-dark text-white font-weight-bold">
          Thông tin sinh viên
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSub}>
            <div className="row">
              <div className="col-6 mb-3">
                <div className="form-group">
                  <label>mã Sinh Viên</label>
                  <input
                    name="maSV"
                    disabled={this.state.selected}
                    // onBlur={this.handleBlur}
                    value={maSV}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                  />
                  {errMaSV.state && (
                    <span className="text-danger">{errMaSV.msg}</span>
                  )}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="form-group">
                  <label>Họ Tên </label>
                  <input
                    onChange={this.handleChange}
                    name="tenSV"
                    // onBlur={this.handleBlur}
                    value={tenSV}
                    type="text"
                    className="form-control"
                  />
                  {errTenSV.state && (
                    <span className="text-danger">{errTenSV.msg}</span>
                  )}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="form-group">
                  <label>Số Điên Thoại</label>
                  <input
                    name="soDT"
                    // onBlur={this.handleBlur}
                    value={soDT}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                  />
                  {errSoDT.state && (
                    <span className="text-danger">{errSoDT.msg}</span>
                  )}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    // required
                    // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                    // onBlur={this.handleBlur}
                    value={email}
                    onChange={this.handleChange}
                    name="email"
                    type="text"
                    className="form-control"
                  />
                  {errEmail.state && (
                    <span className="text-danger">{errEmail.msg}</span>
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="btn d-inline-block btn-dark mr-2">
              SAVE
            </button>
            <button className="btn  ml-3">RESET</button>
          </form>
        </div>
        <div className="card-footer border text-muted"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });

// const mapDispatchToProps = () => {};

export default connect(mapStateToProps, null)(Form);
