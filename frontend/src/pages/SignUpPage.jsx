import React from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../features/apiSlices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../features/slices/authSlice";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Destructuring the register API Call
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== retryPassword) {
      toast.error("passwords do not match!");
    } else {
      try {
        const res = await registerUser({
          firstname: firstName,
          surname: lastName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Account created, Happy buying :)");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-3xl font-bold mb-4">Sign up</h1>
        <form class="flex flex-col items-center" onSubmit={onSubmitHandler}>
          <div class="mb-4 md:w-80">
            <label class="block text-gray-700 font-bold mb-2" for="name">
              First Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div class="mb-4 md:w-80">
            <label class="block text-gray-700 font-bold mb-2" for="surname">
              Last Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="surname"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div class="mb-4 md:w-80">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email address
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-4 md:w-80">
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
          <div class="mb-6 md:w-80">
            <label
              class="block text-gray-700 font-bold mb-2"
              for="retry-password"
            >
              Re-enter Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="retry-password"
              placeholder="Re-enter your password"
              value={retryPassword}
              onChange={(e) => setRetryPassword(e.target.value)}
            />
          </div>
          <div class="flex flex-col items-center">
            <button
              class="bg-navBg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
              <i class="ml-2 fas fa-sign-in-alt"></i>
            </button>
            <p class="text-gray-600 text-sm pt-2">
              Already have an account?
              <Link
                to="/login"
                class="text-blue-500 hover:text-blue-700 font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
