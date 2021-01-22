import React, { useContext } from "react";

import { gql, useQuery } from "@apollo/client";

import "./App.css";
import LoginForm from "./components/LoginForm";
import { AuthProvider, AuthContext } from "./utils/auth";
import MenuBar from "./components/MenuBar";

//
export const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      recipeName
    }
  }
`;

function RecipeList() {
  const { data, loading, error } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.recipes.map(({ recipeName }) => (
    <div key={recipeName}>
      <p style={{ background: "papayawhip", padding: 8 }}>{recipeName}</p>
    </div>
  ));
}

//

// const GET_MY_PROFILE = gql`
//   query GetMyProfile {
//     me {
//       id
//       username
//     }
//   }
// `;

function Profile() {
  const { user } = useContext(AuthContext);
  // const { loading, error, data, client } = useQuery(GET_MY_PROFILE);
  // if (loading) return <p>Loading..</p>;
  // if (error) return <p>Error :( {error.message} </p>;

  return (
    <>
      {user && <>Hi</>}
      {/* <button
        onClick={() => {
          client.resetStore();
        }}
      >
        Signout
      </button>
      {data.username ? <button>Logout</button> : <LoginForm />} */}
    </>
  );
}

function App() {
  const [token, setToken] = React.useState(null);

  const logout = () => {
    setToken(null);
  };
  //
  React.useEffect(() => {
    console.log("1. UseEffect");
    const token = localStorage.getItem("@token");
    setToken(token);
    console.log(`The Token is ${token}`);
  }, [token]);
  return (
    <AuthProvider>
      <MenuBar />
      <div className="App">
        <h1>App</h1>
        <RecipeList />
        <LoginForm />
        <button onClick={logout}>Logout</button>
        <br />
        <Profile />
      </div>
    </AuthProvider>
  );
}

export default App;
