import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CreateCategory } from "../../actions/admin";
import { Link, withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

//import './approuveEvent.css';
import 'react-toastify/dist/ReactToastify.css';



class AddCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            cName: '',
            photo: null,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                cName: nextProps.record.cName,
                photo: nextProps.record.photo,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined
            && nextProps.auth.user.data.success) {
            $('#update-user-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'user-update-name') {
            this.setState({ cName: e.target.value });
        }
        if (e.target.id === 'user-update-image') {
            this.setState({ photo: URL.createObjectURL(e.target.files[0]) });
        }
        if (e.target.id === 'update-user') {
            this.setState({ cName: "" });
        }
    };

    onUserUpdate = e => {
        e.preventDefault();
        const newCategory = {
            cName: this.state.cName,
        };
        this.props.CreateCategory(newCategory);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-user-modal">
                    <div className="modal-dialog modal-lg" >
                        <div className="modal-content" id="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create Category</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUserUpdate} id="update-user">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="user-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2" >
                                        <div className="col-md-3">
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-md-9" >
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.cName}
                                                id="user-update-name"
                                                type="text"
                                                error={errors.cName}
                                                className={classnames("form-control", {
                                                    invalid: errors.cName
                                                })}/>
                                            <span className="text-danger">{errors.cName}</span>
                                        </div>
                                    </div>
                                   
                                    
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                             
                                <button
                                   id="update-user"
                                    form="update-user"
                                    type="submit"
                                    className="btn btn-warning"
                                
                                   
                                   >
                                    create
                                </button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddCategory.propTypes = {
    CreateCategory: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { CreateCategory }
)(withRouter(AddCategory));
