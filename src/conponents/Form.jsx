import React, { Component } from "react";
import { connect } from "react-redux";

class Form extends Component {
  state = {
    value: {
      maSV: "",
      tenSV: "",
      soDT: "",
      email: "",
    },
    error: {
      maSV: "",
      tenSV: "",
      soDT: "",
      email: "",
    },
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => ({
      ...this.state,
      value: {
        ...this.state.value,
        [name]: value,
      },
    }));
    return e.target.value;
  };

  handleSub = (e) => {
    e.preventDefault();
    console.log(this.state.value);
    this.props.dispatch({
      type: "CHECK_MASV",
      payload: {
        value: this.state.value,
        list: this.props.formReducer.sv || [],
      },
    });
    console.log(this.props.validReducer);

    this.props.dispatch({ type: "ADD", payload: this.state.value });

    // const name = e.target.name;
    // const value = e.target.value;
    // this.setState({ [name]: value });
  };
  handleBlur = (e) => {
    const {
      name,
      title,
      maxLength,
      minLength,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = e.target;
    let msg = "";
    if (valueMissing) {
      msg += `${name} required`;
    }
    if (tooShort || tooLong) {
      msg += `from ${minLength} to ${maxLength} characters.`;
    }

    this.setState({
      error: {
        ...this.state.error,
        [name]: msg,
      },
    });
    // const {}
  };
  render() {
    const { errMaSV } = this.props.validReducer;
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
                    required
                    name="maSV"
                    onBlur={this.handleBlur}
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
                    required
                    minLength={4}
                    maxLength={12}
                    onChange={this.handleChange}
                    name="tenSV"
                    onBlur={this.handleBlur}
                    type="text"
                    className="form-control"
                  />
                  {/* {error.userName && (
                    <span className="text-danger">{error.userName}</span>
                  )} */}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="form-group">
                  <label>Số Điên Thoại</label>
                  <input
                    required
                    name="soDT"
                    minLength={4}
                    maxLength={12}
                    onBlur={this.handleBlur}
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    // required
                    // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    name="email"
                    type="text"
                    className="form-control"
                  />
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
