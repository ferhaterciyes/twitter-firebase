import { useEffect, useState } from "react";
import Main from "../components/Main";
import Nav from "../components/Nav";
import Aside from "./../components/Aside";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/confic";

const FeedPage = () => {
  const [user, setUser] = useState(null);

  // kullanıcının bilgisine abone ol
  useEffect(() => {
    // anlık olarak aktif kullanıcının bilgisine abone olduk
    // kullanıcı değiştiği anda mevcut kullanıcının bilgisini state aktardık
    const unsub = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    //kullanıcı anasayfadan ayrılırsa aboneliği sonlandır
    return ()=> unsub;
  }, []);

  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user}/>
      <Main user={user}/>
      <Aside />
    </div>
  );
};

export default FeedPage;
