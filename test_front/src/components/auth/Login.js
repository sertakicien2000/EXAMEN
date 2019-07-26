import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './login.css';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    localStorage.setItem('rememberMe', userData.email);
    console.log("zan n email zanu"+userData.email)
  };

  render() {
    const { errors } = this.state;

    return (
      
      <div class="container h-100 log bg bg-muted">
      
      
        <div class="d-flex justify-content-center h-100">
          <div class="user_card">
            <div class="d-flex justify-content-center">
              <h2>
              <strong>L'atelier vous attends la!connectez-vous!</strong>
              </h2>
              
            </div>
            <div class="d-flex justify-content-center form_container">
              <form onSubmit={this.handleSubmit}>
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fa fa-envelope" />
                    </span>
                  </div>
                  <input
                    class="fa fa-envelope"
                    type="email"
                    placeholder="Email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    name="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                  />
                </div>
                <div class="input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fa fa-lock" />
                    </span>
                  </div>
                  <input
                    class="form-control input_pass"
                    type="password"
                    placeholder="Mot de passe"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </div>
               
                <div class="d-flex justify-content-center mt-3 login_container">
                  <button type="submit" name="button" class="btn login_btn">
                   <span><storng> se connecter</storng></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
