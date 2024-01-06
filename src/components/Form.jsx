import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { db, storage } from "../firebase/confic";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  // kolleksiyonunn  ref alma
  const tweetCol = collection(db, "tweets");
  //fotoğrafı storage a kaydet url i döndür
  const uploadImage = async (file) => {
    if (!file || !file.type.startsWith("image")) return null // dosyayı yükleyeceğimiz yerin ref alma
    const fileRef = ref(storage, file.name.concat(v4()));

    // ayırttığımız yere dosyayı yükleme
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  // tweet i gönder
  const handleSubmit = async (e) => {
    e.preventDefault();

    // formdaki verilere erişme
    const textContent = e.target[0].value;
    const imgContent = e.target[1].files[0];

    // doğrulama
    if (!textContent && !imgContent) return toast.info("Lütfen içerik ekleyiniz")
    // yükleniyormu true a çekilir
    setIsLoading(true);

    //fotoğrafı storage a kaydet url i döndür
    const url = await uploadImage(imgContent);

    // kolleksiyona yeni döküman ekleme
    await addDoc(tweetCol, {
      textContent,
      imgContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    }); // yükleniyormu false a cekilir
    setIsLoading(false);

    // inputları sıfırla
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
      />

      <div className="w-full ">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="Neler oluyor ?"
          type="text"
        />
        <div className="flex justify-between items-center ">
          <input className="hidden" type="file" id="image" />
          <label
            className="cursor-pointer hover:bg-gray-800 transition text-lg p-4 rounded-full"
            htmlFor="image"
          >
            <BsCardImage />
          </label>
          <button className="bg-blue-600 flex items-center justify-center py-2 px-4 min-w-[85px] min-h-[40px] rounded transition hover:bg-blue-400 ">
            {isLoading ? <Spinner /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
