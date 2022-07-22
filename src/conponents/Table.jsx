import React, { Component } from "react";
import { connect } from "react-redux";

export class Table extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state !== nextState || this.props !== nextProps ? true : false;
  // }
  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header text-light bg-dark font-weight-bold">
          Danh Sách Sinh Viên
        </div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
                type="text"
                placeholder="Search by full name..."
                className="form-control"
              />
            </div>
          </div>
          <div className="col-3 ml-auto">
            <div className="form-group mb-0">
              <select className="form-control">
                <option>All</option>
                <option>Client</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>mã SV</th>
                <th>Tên SV</th>
                <th>Email</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>

            <tbody>
              {this.props.sv.map((user) => {
                const { maSV, tenSV, email, soDT } = user;
                return (
                  <tr className="bg-light">
                    <td>{maSV}</td>
                    <td>{tenSV}</td>
                    <td>{email}</td>
                    <td>{soDT}</td>
                    <td>
                      <button
                        onClick={() =>
                          this.props.dispatch({
                            type: "EDIT",
                            payload: user,
                          })
                        }
                        className="btn btn-info mr-2 d-inline-block"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => {
                          this.props.dispatch({
                            type: "DEL",
                            payload: user.maSV,
                          });
                        }}
                        className="btn btn-danger"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.formReducer });

// const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(Table);
