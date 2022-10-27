
import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SendMessage } from "../../actions/adminAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';


import 'react-toastify/dist/ReactToastify.css';

class RejectEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            nameEV: this.props.record.nameEV,
            emailEV: this.props.record.emailEV,
            message: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                Title: nextProps.record.Title,
                emailEV: nextProps.record.emailEV,
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
            this.setState({ Title: e.target.value });
        }
        if (e.target.id === 'user-update-email') {
            this.setState({ emailEV: e.target.value });
        }
        if (e.target.id === 'user-update-password') {
            this.setState({ message: e.target.value });
        }
    };

    onUserUpdate = e => {
        e.preventDefault();
        const newNotificationsUser = {
            _id: this.state.id,
            nameEV: this.state.Title,
            emailEV: this.state.emailEV,
            message: this.state.message
        };
        this.props.SendMessage(newNotificationsUser);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-user-modal">
                    <div className="modal-dialog modal-lg" >
                        <div className="modal-content" id="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Send Message</h4>
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
                                                value={this.state.Title}
                                                id="user-update-name"
                                                type="text"
                                                error={errors.nameEV}
                                                className={classnames("form-control", {
                                                    invalid: errors.nameEV
                                                })}/>
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.emailEV}
                                                error={errors.emailEV}
                                                id="user-update-email"
                                                type="email"
                                                className={classnames("form-control", {
                                                    invalid: errors.emailEV
                                                })}
                                            />
                                            <span className="text-danger">{errors.emailEV}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password">Message</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                //data-reset-input={true}
                                                //autoComplete={''}
                                                value={'your event is declined'}
                                                onChange={this.onChange}
                                                error={errors.message}
                                                id="user-update-password"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.message
                                                })}
                                            />
                                            <span className="text-danger">{errors.message}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-user"
                                    type="submit"
                                    className="btn btn-warning">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RejectEvent.propTypes = {
    SendMessage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { SendMessage }
)(withRouter(RejectEvent));