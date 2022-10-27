import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";


import UserAddModal from "../partials/UserAddModal";
import UserUpdateModal from "../partials/UserUpdateModal";
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
class Posts extends Component {



    constructor(props) {
        super(props);
        this.columns = [/*pour avoir les champs de l'event dans la table*/
          
       
        {
            key: "_id",
            text: "Id",
           
            align: "left",
            bgcolor:"red",
           sortable:true
           
        },
            
            {
                key: "title",
                text: "Title",
                sortable:true,
                align: "left",
               
            },
            {
                key: "poids",
                text: "Poids",
                sortable:true,
                align: "left",
               
            },
            {
                key: "prix",
                text: "Prix",
                sortable:true,
                align: "left",
               
            },
            {
                key: "lien_web",
                text: "Lien Web",
                sortable:true,
                align: "left",
               
            },
            {
                key: "photo",
                text: "Photo",
                sortable:true,
                align: "left",
                
                cell: record => {
                    return (
                        <Fragment>
                            <img src={`http://localhost:5000/api/posts/post/photo/${record._id}`} height="50" width="50" />{/**pour avoir l'image binary de la data base ${record._id} pour avoir l'id `} /post/photo/ c'est une fonction qui est dans le backend pour afficher l'image */}
                        </Fragment>
                    );
                }

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

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            filename: "Posts",
            no_data_text: 'No Posts Found',
           
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
                id: '',
                title: '',
                photo: '',
                body: '',

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
            .get("/api/posts/post-data")
            .then(res => {
               // console.log('res ==>', res.data)
                this.setState({ records: res.data })
            })
            .catch()
    }


  
   
    
    deleteRecord(record) {/* pour supprimer story*/
        instance
            .post("/api/posts/post-delete/",{_id:record._id})
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
    
    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">

                <UserAddModal/>
                    <UserUpdateModal record={this.state.currentRecord}/>
                    <Sidebar />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                
                            <CardHeader>
                  <CardTitle tag="h4" className="mt-2 text-warning">Posts List</CardTitle>
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
Posts.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Posts);
