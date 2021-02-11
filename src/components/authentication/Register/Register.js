import React, { useState, useEffect, useContext } from "react";
import NotificationComponent from "../../notifications/Notification";
import Loader from "../../shared/Loader";
// import Axios from "../../../helpers/Axios";
import { ParseContext } from "../../../contexts/RealtimeContext";

const Register = (props) => {
  const Parse = useContext(ParseContext);
  // const initialState = { status: "", data: "", dataError: {} };

  const [registrationData, setRegistrationData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showError, setShowError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "REGISTRATION_SUCCESS":
  //       return {
  //         status: "success",
  //         data: action.payload,
  //       };
  //     case "REGISTRATION_ERROR":
  //       console.log(action.payload);
  //       return {
  //         status: "error",
  //         dataError: action.payload,
  //       };
  //     case "RESET":
  //       return {
  //         status: "reset",
  //         dataError: "",
  //         data: "",
  //       };
  //     default:
  //       return {
  //         status: "",
  //         data: "",
  //         dataError: null,
  //       };
  //   }
  // };

  // const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   if (state.status === "error") {
  //     setShowError(true);
  //     setIsLoading(false);
  //     processErrors(state.dataError.errors);
  //   }
  //   if (state.status === "success") {
  //     setShowSuccess(true);
  //     setIsLoading(false);
  //   }
  //   if (state.status === "") {
  //     setShowSuccess(false);
  //     setShowError(false);
  //   }
  // }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  // const clearErrors = () => {
  //   setShowSuccess(false);
  //   setShowError(false);
  //   setEmailError("");
  //   setFirstNameError("");
  //   setLastNameError("");
  //   setUsernameError("");
  //   setPasswordError("");
  // };
  // const processErrors = (errors) => {
  //   if (errors.hasOwnProperty("email")) {
  //     setEmailError(errors.email[0]);
  //   }
  //   if (errors.hasOwnProperty("first_name")) {
  //     setFirstNameError(errors.first_name[0]);
  //   }
  //   if (errors.hasOwnProperty("last_name")) {
  //     setLastNameError(errors.last_name[0]);
  //   }
  //   if (errors.hasOwnProperty("username")) {
  //     setUsernameError(errors.username[0]);
  //   }
  //   if (errors.hasOwnProperty("password")) {
  //     setPasswordError(errors.password[0]);
  //   }
  // };

  const attemptRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = new Parse.User();
    user.set("email", registrationData.email);
    user.set("username", registrationData.username);
    user.set("password", registrationData.password);
    user.set("first_name", registrationData.first_name);
    user.set("last_name", registrationData.last_name);
    try {
      await user.signUp();
      setSuccess("Successfully Signed Up. Proceed to Login");
    } catch (error) {
      console.info("Error ", error);
      setError(error);
    }
  };

  return (
    <div className="tab-content">
      <div
        className={`tab-pane ${props.isActive ? "active" : ""}`}
        id=" "
        role="tabpanel"
        data-mh="log-tab"
      >
        <div className="title h6">Register to the iDove Communications Hub</div>
        <form
          className="content"
          onSubmit={(e) => attemptRegistration(e)}
          data-test="form"
        >
          {error ? (
            <NotificationComponent
              alertType="alert-danger"
              message={error}
              data-test="error"
            />
          ) : (
            ""
          )}
          {success ? (
            <NotificationComponent
              alertType="alert-success"
              message={success}
              data-test="success"
            />
          ) : (
            ""
          )}
          <div className="row">
            <div className="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="form-group label-floating is-empty">
                <label className="control-label">First Name</label>
                <input
                  className={`form-control ${
                    firstNameError ? "is-invalid" : ""
                  }`}
                  name="first_name"
                  data-test="first_name"
                  placeholder=""
                  type="text"
                  onChange={(e) => handleChange(e)}
                  required
                />
                <div className="invalid-feedback">{firstNameError}</div>
              </div>
            </div>
            <div className="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="form-group label-floating is-empty">
                <label className="control-label">Last Name</label>
                <input
                  className={`form-control ${
                    lastNameError ? "is-invalid" : ""
                  }`}
                  name="last_name"
                  data-test="last_name"
                  placeholder=""
                  type="text"
                  onChange={(e) => handleChange(e)}
                  required
                />
                <div className="invalid-feedback">{lastNameError}</div>
              </div>
            </div>
            <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="form-group label-floating is-empty">
                <label className="control-label">Your Email</label>
                <input
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  placeholder=""
                  name="email"
                  data-test="email"
                  type="email"
                  onChange={(e) => handleChange(e)}
                  required
                />
                <div className="invalid-feedback">{emailError}</div>
              </div>
              <div className="form-group label-floating is-empty">
                <label className="control-label">Username</label>
                <input
                  className={`form-control ${
                    usernameError ? "is-invalid" : ""
                  }`}
                  placeholder=""
                  name="username"
                  data-test="username"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  required
                />
                <div className="invalid-feedback">{usernameError}</div>
              </div>
              <div className="form-group label-floating is-empty">
                <label className="control-label">Password</label>
                <input
                  className={`form-control ${
                    passwordError ? "is-invalid" : ""
                  }`}
                  placeholder=""
                  name="password"
                  data-test="password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  required
                />
                <div className="invalid-feedback">{passwordError}</div>
              </div>

              <div className="form-group label-floating is-empty">
                <label className="control-label">Confirm Password</label>
                <input
                  className="form-control"
                  placeholder=""
                  name="password_confirmation"
                  data-test="password_confirmation"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              <div className="remember">
                <div className="checkbox">
                  <label>
                    <input name="optionsCheckboxes" type="checkbox" />I accept
                    the <a href="/">Terms and Conditions</a> of the website
                  </label>
                </div>
              </div>
              <button
                href="/"
                className="btn btn-purple btn-lg full-width"
                type="submit"
                data-test="submitButton"
              >
                Complete Registration
              </button>
              {isLoading ? <Loader color="#7C5AC2" /> : ""}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
