import { useState } from "react";
import { auth, provider } from "../firebase/confic";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgetPass, setIsForgetPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, pass);
        toast.success("Hesabınız başarıyla oluşturuldu!");
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
        toast.success("Başarıyla giriş yaptınız!");
      }
      navigate("/feed"); // Başarılı kimlik doğrulama durumunda dashboard veya başka bir sayfaya yönlendirme
    } catch (err) {
      // eğerki hata kodu şifre yanlış yazılınca ortaya cıkan kod ise
      // o zaman şifremi unuttum yazısını göster
      if (err.code === "auth/invalid-credential") {
        setIsForgetPass(true);
      }

      toast.error(`Üzgünüz, bir hata oluştu: ${err.code}`);
    } finally {
      setLoading(false);
    }
  };
  // şifre sıfırlama epostası gönder
  const sendMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Epostanıza şifre sıfırlama bağlantısı gönderildi!");
      })
      .catch(() => {
        toast.error("Mail Gönderilemedi!");
      });
  };
  // google ile giriş yapma
  const loginWidthGoogle = () => {
    signInWithPopup(auth, provider).then(() => navigate("/feed"));
  };

  return (
    <section className="h-screen grid place-items-center ">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/* logo */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" />
        </div>
        <h1 className="text-center font-bold text-xl">Twitter`a giriş yap</h1>
        {/* google button */}
        <button
          onClick={loginWidthGoogle}
          className="flex items-center bg-white py-2 px-10 text-black cursor-pointer rounded-full gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" />
          <span className="whitespace-nowrap">Google ile giriş yap</span>
        </button>

        {/* giriş formu */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded m-1 p-2 outline-none shadow-md focus:shadow-gray-400 transition"
            type="email"
            required
          />

          <label className="mt-5">Şifre</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded m-1 p-2 outline-none shadow-md focus:shadow-gray-400 transition"
            type="password"
            required
          />
          <button
            type="submit"
            className="bg-white text-black mt-10 rounded-full p-1 font transition hover:bg-gray-300 "
          >
            <span className="font-bold">
              {loading ? "İşleniyor..." : isSignUp ? "Kaydol" : "Giriş Yap"}
            </span>
          </button>
          <p className="mt-4 flex gap-4 ">
            <span className="text-gray-500 ">Hesabınız yoksa</span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer font-bold select-none"
            >
              {isSignUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>
        {isForgetPass && (
          <p onClick={sendMail} className="text-center text-red-500">
            Şifrenizi mi unuttunuz ?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
