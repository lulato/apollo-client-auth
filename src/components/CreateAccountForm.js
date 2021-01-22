import React from "react";
// import { CREATE_ACCOUNT_MUTATION } from "../utils/queries";

// import { AuthContext } from "../utils/auth";
import { Formik } from "formik";

export default function CreateAccoutForm() {
  const handleSubmit = (values) => {
    console.log("Taping Resgister");
    console.log(values);
  };
  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <>
          Register
          <input placeholder="email" onChange={props.handleChange("email")} />
          <input
            placeholder="username"
            onChange={props.handleChange("username")}
          />
          <input
            placeholder="password"
            onChange={props.handleChange("password")}
            type="password"
          />
          <button type="submit" onClick={props.handleSubmit}>
            Create an Account
          </button>
        </>
      )}
    </Formik>
  );
}
