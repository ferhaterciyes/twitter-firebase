import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../firebase/confic";
import { BsTrashFill } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";
const EditMode = ({ close, tweet }) => {
  const [isPictureDeleting, setIsPictureDeleting] = useState(false);
  const inpRef = useRef();

  // kaydet butonun tıklayınca çalışır
  const handleSave = () => {
    // input verisine eriş
    const newText = inpRef.current.value;

    //güncellenecek dökümanın referansını al

    const tweetRef = doc(db, "tweets", tweet.id);
    // dökümanı textContent ini güncelle
    // eğerki resim silinecekse imageContenti null yap

    if (isPictureDeleting) {
      updateDoc(tweetRef, {
        textContent: newText,
        imgContent: null,
      });
    } else {
      updateDoc(tweetRef, {
        textContent: newText,
      });
    }
    // düzenleme modundan çıkma
    close();
  };
  return (
    <>
      <input
        ref={inpRef}
        defaultValue={tweet.textContent}
        className="rounded py-1 px-2 text-black outline-none"
        type="text"
      />

      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-500 rounded-full shadow hover:shadow-green-500 "
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className="mx-5 p-2 text-red-500 rounded-full shadow hover:shadow-red-500 "
      >
        <ImCancelCircle />
      </button>

      {tweet.imgContent && (
        <div className="relative">
          <img
            className={`${
              isPictureDeleting ? "blur" : ""
            } my-2 rounded-lg w-full object-cover max-h-[400px] `}
            src={tweet.imgContent}
          />
          <button
            onClick={() => setIsPictureDeleting(!isPictureDeleting)}
            className="absolute bg-white text-red-600 rounded-full hover:scale-90 top-0 right-0 text-xl p-2 "
          >
            {isPictureDeleting ? <IoMdReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;
