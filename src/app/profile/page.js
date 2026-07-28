"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhoneAlt, FaBirthdayCake } from "react-icons/fa";
import { BsGenderAmbiguous, BsBoxArrowRight } from "react-icons/bs";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();

  // User from Redux (DummyJSON Login)
  const reduxUser = useSelector((state) => state.user.currentUser);

  // User from localStorage (Signup)
  let localUser = null;

  if (typeof window !== "undefined") {
    localUser = JSON.parse(localStorage.getItem("signupUser"));
  }

  // Use Redux user first, otherwise localStorage user
  const user = reduxUser || localUser;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("signupUser");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">
          Please Login First
        </h1>

        <button
          onClick={() => router.push("/loginpage")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">

        {/* Cover */}
        <div className="h-40 bg-[#803f14]" />

        {/* Profile */}
        <div className="px-8 pb-10">

          <div className="-mt-16 flex flex-col md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-5xl text-gray-600" />
                </div>
              )}

              <div>
                <h1 className="text-3xl font-bold">
                  {user.firstName
                    ? `${user.firstName} ${user.lastName}`
                    : user.fullName}
                </h1>

                <p className="text-gray-500">
                  Welcome to Veloura
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 md:mt-0 flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
            >
              <BsBoxArrowRight />
              Logout
            </button>

          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <FaEnvelope />
                <span className="font-medium">Email</span>
              </div>

              <p>{user.email}</p>
            </div>

            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <FaPhoneAlt />
                <span className="font-medium">Phone</span>
              </div>

              <p>{user.phone || "Not Available"}</p>
            </div>

            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <BsGenderAmbiguous />
                <span className="font-medium">Gender</span>
              </div>

              <p>{user.gender || "Not Available"}</p>
            </div>

            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <FaBirthdayCake />
                <span className="font-medium">Date of Birth</span>
              </div>

              <p>{user.birthDate || user.dob || "Not Available"}</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}