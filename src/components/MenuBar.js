import React from "react";
import { AuthContext } from "../utils/auth";
import CreateAccoutForm from "./CreateAccountForm";
import LoginForm from "./LoginForm";

export default function MenuBar() {
  const { user, logout } = React.useContext(AuthContext);
  //
  const menuBar = user ? (
    <button onClick={logout}>Logout </button>
  ) : (
    <>
      <LoginForm /> <p>or</p>
      <CreateAccoutForm />
    </>
  );
  return <div className="menu">{menuBar} </div>;
}
