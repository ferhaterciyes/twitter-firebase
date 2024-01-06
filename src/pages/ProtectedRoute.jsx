import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/confic";

const ProtectedRoute = () => {
  // kullanıcının yetkisi varmı state i
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    // anlık olarak kullanıcının oturumunu izler
    // verdiğmiz fonk her oturum değiştiğinde çalışır
    //ve parametre olarak aktif kullanıcıyı alır
   const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    return ()=> unsub
  }, []);
  // kullanıcının yetkisi yoksa Login  eyöndlendir

  if (isAuth === false) {
    return <Navigate to={"/"} replace />;
  }
  // kullanıcının yetkisi varsa alt roota geçmesine izin ver

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
