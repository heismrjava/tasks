//import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Task from "./components/Task";
//import SignIn from "./components/SignIn";
//import SignUp from "./components/SignUp";
function App() {
  //const [token, setToken] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="*" element={<Task />} />
          <Route index path="/" exact element={<Task />} />
          {/* // <>
          //   <Route path="*" element={<SignIn token={token} />} />
          //   <Route path="/sign-in" element={<SignIn setToken={setToken} />} />
          //   <Route path="/sign-up" element={<SignUp />} />
          // </> */}
          {/* <Redirect from="/not-found" to="/404" /> */}
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
