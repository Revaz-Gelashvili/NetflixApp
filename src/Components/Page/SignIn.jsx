import React, { useState, useEffect } from "react";
import { auth } from "../../DataBase/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Новое: состояние загрузки
  const [isVisible, setIsVisible] = useState(false); // Новое: для анимации появления
  const navigate = useNavigate();

  // Анимация плавного появления формы при загрузке страницы
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Включаем загрузку

    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence);

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      navigate("/");
    } catch (err) {
      console.error(err.code);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Invalid email or password.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans">
      {/* Декоративный фоновый свет (Ambient Glow) */}
      {/* First Light - Red Glow */}
      <div className="absolute w-150 h-150 bg-red-600/10 rounded-full blur-[120px] animate-slow-spin"></div>

      {/* Second Light - Darker Red Glow */}
      <div className="absolute w-170 h-170 bg-red-900/10 rounded-full blur-[100px] animate-slow-spin-reverse"></div>

      {/* Основная карточка с анимацией появления */}
      <div
        className={`relative z-10 bg-[#111111]/80 backdrop-blur-xl p-10 sm:p-14 rounded-2xl w-full max-w-112.5 border border-white/5 shadow-2xl transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-white text-3xl font-bold mb-8 tracking-wide">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        {/* Блок ошибки с плавной анимацией */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${error ? "max-h-20 mb-6 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Поле Email с плавающим лейблом (Floating Label) */}
          <div className="relative group">
            <input
              type="email"
              id="email"
              className="peer block px-4 pb-2 pt-6 w-full text-base text-white bg-white/5 rounded-xl border border-transparent appearance-none focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all duration-300"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-500 cursor-text select-none"
            >
              Email address
            </label>
          </div>

          {/* Поле Пароль с плавающим лейблом */}
          <div className="relative group">
            <input
              type="password"
              id="password"
              className="peer block px-4 pb-2 pt-6 w-full text-base text-white bg-white/5 rounded-xl border border-transparent appearance-none focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all duration-300"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <label
              htmlFor="password"
              className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-500 cursor-text select-none"
            >
              Password
            </label>
          </div>

          {/* Чекбокс */}
          <div className="flex items-center gap-3 mt-1">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="peer w-4 h-4 appearance-none border border-gray-600 rounded-sm bg-transparent checked:bg-red-600 checked:border-red-600 cursor-pointer transition-colors"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              {/* Кастомная галочка */}
              <svg
                className="absolute w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity duration-200 p-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <label
              htmlFor="remember"
              className="text-gray-400 text-sm font-medium cursor-pointer select-none hover:text-gray-300 transition-colors"
            >
              Remember me
            </label>
          </div>

          {/* Кнопка с анимацией загрузки */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full bg-red-600 text-white h-12 rounded-xl font-bold mt-4 hover:bg-red-700 active:scale-[0.98] transition-all duration-200 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-10 text-gray-400 text-base">
          {isLogin ? "New to Wishlist.tv?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-white hover:text-red-500 font-semibold transition-colors duration-300 outline-none"
            onClick={toggleMode}
          >
            {isLogin ? "Sign up now." : "Sign in here."}
          </button>
        </div>
      </div>
    </div>
  );
}
