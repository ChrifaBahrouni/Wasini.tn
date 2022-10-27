import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Col,
  } from "reactstrap";
  const instance = axios.create({
    baseURL: 'http://localhost:5000'
});
class Discussion extends Component {

    constructor(props) {
        super(props);

        this.columns = [/*pour avoir les champs de l'event dans la table*/
           
            {
                key:"reciever",
                text:"Receiver",
                align:"left",
                
            },
            {
                key:"sender",
                text:"Sender",
                align:"left",
                
            },
            {
                key:"message",
                text:"Message",
                align:"left",
                
            },

            {
                key: "action",
                text: "Get Discussion",
                width: 100,
                align: "left",
               
                cell: record => {
                    return (
                    
                        <Fragment>
                            <Link to = "/ChatBody"// onClick={e => (!record.receiver || !record.sender) ? e.preventDefault() : null} to={`/ChatBody?receiver=${record.receiver}&sender=${record.sender}`} //pour avoir le nom  sender et receiver
                            className="btn btn-warning btn-sm"><i className="fa fa-commenting"></i></Link>
                        </Fragment>
                    );
                }
            }



        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            filename: "Discuss",
            no_data_text: 'No Discuss Found',
           
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                message:'',
                reciever: '',
               
                sender: '',
                
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

    getData() {
        instance
            .get("/api/chats/get-chats")
            .then(res => {
                this.setState({ records: res.data })
            })
            .catch()
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">

                    <Sidebar />
                    
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            
                            <CardHeader>
                  <CardTitle tag="h4" className="mt-2 text-warning">Discussion List</CardTitle>
                </CardHeader>
               
                            <CardBody>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                             </CardBody>
                                
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        );
    }
}
Discussion.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Discussion);
