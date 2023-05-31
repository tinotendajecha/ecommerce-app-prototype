import React from "react";
import { useState } from "react";
import { FaSync } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../features/slices/authSlice";
import { useUpdateUserProfileMutation } from "../features/apiSlices/userApiSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setFirstName(userInfo.firstname);
    setLastName(userInfo.surname);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setPhoneNumber(userInfo.phone);
    setCountry(userInfo.country);
  }, [setFirstName, setLastName]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== retryPassword) {
      toast.error("passwords do not match!");
    } else {
      try {
        const res = await updateUserProfile({
          firstname: firstName,
          surname: lastName,
          email,
          address,
          phoneNumber,
          country,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("User succesfully updated!");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <div class="navBg py-4">
        <h1 class="text-navBg text-xl md:text-3xl text-center">User Profile</h1>
      </div>

      <form class="max-w-md mx-auto mt-8" onSubmit={onSubmitHandler}>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            First Name
          </label>
          <input
            class="border rounded-lg py-2 px-3 w-full sm:text-sm focus:outline-none"
            type="text"
            id="name"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="surname">
            Last Name
          </label>
          <input
            class="border rounded-lg py-2 px-3 w-full sm:text-sm focus:outline-none"
            type="text"
            id="surname"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            Email address
          </label>
          <input
            class="border rounded-lg py-2 px-3 w-full sm:text-sm focus:outline-none"
            type="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="address">
            Address
          </label>
          <input
            class="border rounded-lg py-2 px-3 w-full sm:text-sm focus:outline-none"
            type="text"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="phonenumber">
            Phone number
          </label>
          <input
            class="border rounded-lg py-2 px-3 w-full sm:text-sm focus:outline-none"
            type="text"
            id="phone"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="country">
            Country
          </label>
          <input
            class="border rounded-lg py-2 px-3 w-full sm:text-sm focus:outline-none"
            type="text"
            id="country"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="border rounded-lg py-2 px-3 w-full sm:text-sm focus:outline-none"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 font-bold mb-2"
            for="retry-password"
          >
            Re-enter Password
          </label>
          <input
            class="border rounded-lg py-2 px-3 w-full sm:text-sm focus:outline-none"
            type="password"
            id="retry-password"
            placeholder="Re-enter your password"
            value={retryPassword}
            onChange={(e) => setRetryPassword(e.target.value)}
          />
        </div>
        <div className="flex p-2">
          <button
            class="bg-navBg mx-auto flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update <span className="ml-2 mt-1"><FaSync /></span>
          </button>
        </div>
      </form>
    </>
  );
};

export default UserProfilePage;
