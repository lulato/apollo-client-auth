import React from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";

import { LOGIN_MUTATION } from "../utils/queries";

export default function LoginForm() {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  React.useEffect(() => {
    console.log(
      "1. This loads when the Form load regardless if you press sumbbit"
    );
  });

  // Handle Sumbit
  const handleSubmit = (values) => {
    console.log(values);
    const email = values.email;
    const password = values.password;

    login({ variables: { email, password } })
      .then((res) => {
        console.log("2. This load when the response is sucess");
        localStorage.setItem("@token", res.data.login.jwt);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      {(props) => (
        <>
          Login
          {error && <p>{JSON.stringify(error)}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* <p>Not Loading any more {JSON.stringify(data)} </p> */}
              <input
                placeholder="email"
                onChange={props.handleChange("email")}
              />
              <input
                placeholder="password"
                type="password"
                onChange={props.handleChange("password")}
              />
              <button type="submit" onClick={props.handleSubmit}>
                Login
              </button>
            </>
          )}
        </>
      )}
    </Formik>
  );
}
