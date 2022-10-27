import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";

import UserAddModal from "../partials/UserAddModal";
import UserUpdateModal from "../partials/UserUpdateModal";
import Image from 'react-bootstrap/Image';
//import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer} from "react-toastify";

import MUIDataTable from 'mui-datatables';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
  const instance = axios.create({
    baseURL: 'http://localhost:5000'
});
class Reservations extends Component {

    constructor(props) {
        super(props);

        this.columns = [/*les champs qui sont trouvés dans la table */ 
            // {
            //     key: "_id",
            //     text: "Id",
            //     align: "left",
            //     bgcolor:"red",
            //    sortable:true
               
            // },
            {
                key: "title",
                text: "Title Réclamation",
                className: "username",
                align: "left",
                sortable:true
            },
           
            {
                key: "type",
                text: "type",
                className: "email",
                align: "left",
                sortable:true
            },
            {
                key: "message",
                text: "message",
                className: "phoneNumber",
                align: "left",
                sortable:true
            },
       
            
            {
                key: "action",
                text:"Action",
                className:"action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

       
this.options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    print: true,
    rowsPerPage: 10,
    page: 1
  };
        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                title: '',
                type: '',
                message: '',
           
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {/* pour lister tous  réclamations */
        instance
            .get("/api/complaints/complaint-data")
            .then(res => {
                this.setState({ records: res.data})
            })
            .catch()
    }

    deleteRecord(record) {
        instance
            .post("/api/complaints/complaint-delete", {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }

    render() {
        
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    
                    <UserAddModal/>
                    <UserUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                   
            
                            <CardHeader>
                  <CardTitle tag="h4" className="mt-2 text-warning">Réservations  List</CardTitle>
                </CardHeader>
               
                            <CardBody>
                         
                            <ReactDatatable id="reactdatatable"
                                records={this.state.records}
                                columns={this.columns}
                                options={this.options}
                            />
                                </CardBody>
                                
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}


Reservations.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Reservations);

