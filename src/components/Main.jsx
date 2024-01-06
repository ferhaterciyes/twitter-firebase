import { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/confic";
import Spinner from "./Spinner";
import Post from "./Post";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  // kolleksiyonun ref alma
  const tweetCol = collection(db, "tweets");

  // filtreleme ayarları tanımla

  const options = query(tweetCol , orderBy("createdAt" , "desc"))



  useEffect(() => {
    // tweetler kolleksiyonuna abone ol
    const unsub = onSnapshot(options, (snapshot) => {
      // geçici dizi
      const tempTweets = [];
      //bütün dökümanların dönen veri ve id lerini diziye aktar
      snapshot.forEach((doc) => tempTweets.push({ id: doc.id, ...doc.data() }));
      // geçici dizideki verileri state e aktar
      setTweets(tempTweets);
    });
    return () => unsub();
  }, []);

  return (
    <main className="border border-gray-700 overflow-y-auto ">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Anasayfa
      </header>
      <Form user={user} />

      {/* twittleri listele */}
      {!tweets ? <Spinner /> : tweets.map((tweet)=>(
        <Post  key={tweet.id} tweet={tweet}/>
      ))}
    </main>
  );
};

export default Main;
