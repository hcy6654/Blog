import { useState, useEffect } from "react";
import Router from "components/Router";
import { app, db } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";

function App() {
  const auth = getAuth(app);

  //auth를 체크하기 전에 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  //auth의 currentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </>
  );
}

export default App;
