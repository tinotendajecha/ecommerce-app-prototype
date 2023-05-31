import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../features/slices/authSlice";
import { useLoginMutation } from "../features/apiSlices/userApiSlice";
import { toast } from "react-toastify";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Destructuring the login api mutation
  const [login, { isLoading }] = useLoginMutation();
  //This step is to get the users information from redux state
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Happy Shopping :)");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-3xl font-bold mb-4">Login</h1>
        <p class="text-lg mb-6">Enter your credentials to login</p>
        <form class="flex flex-col items-center" onSubmit={onSubmitHandler}>
          <div class="mb-4 md:w-80">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email address
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-6 md:w-80">
            <label class="block text-gray-700 font-bold mb-2" for="password">
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="flex flex-col items-center">
            <button
              class="bg-navBg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
              <i class="ml-2 fas fa-sign-in-alt"></i>
            </button>
            <p class="text-gray-600 text-sm pt-2">
              Not registered?
              <a class="text-blue-500 hover:text-blue-700 font-bold" href="#">
                <Link to="/register">Sign Up</Link>
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
