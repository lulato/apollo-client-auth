import React from "react";
import { AuthContext } from "../utils/auth";

export default function MenuBar() {
  const { user, logout } = React.useContext(AuthContext);
  //
  const menuBar = user ? <button onClick={logout}>Logout </button> : <>Login</>;
  return <div className="menu">{menuBar}</div>;
}
