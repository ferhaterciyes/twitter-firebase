import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment/moment";
import "moment/locale/tr";
import { auth } from "../firebase/confic";
import DropDown from "./DropDown";
const Post = ({ tweet }) => {
  // tweet in atılma tarihini hesaplama
  const date = moment(tweet?.createdAt?.toDate()).fromNow();
  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="user-img"
      />
      <div className="w-full">
        {/* ÜST KISIM KULLANICI BİLGİLERİ */}
        <div className="flex justify-between ">
          <div className="flex items-center gap-3 ">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet.user.name.toLowerCase().replace(" ", "_")}
            </p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && <DropDown />}
        </div>

        {/* ORTA KISIM TWEET İÇERİĞİ */}
        <div>
          {tweet.textContent && <p className="my-2">{tweet.textContent}</p>}

          {tweet.imgContent && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px] "
              src={tweet.imgContent}
            />
          )}
        </div>
        {/* ETKİLEŞİM BUTONLARI */}
        <div className="flex justify-between ">
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#89aef1c9] ">
            <BiMessageRounded />
          </div>
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69] ">
            <FaRetweet />
          </div>{" "}
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#aa439069] ">
            <AiOutlineHeart />
          </div>
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#5a5e5f69] ">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
