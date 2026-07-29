"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { useRouter } from "next/navigation";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/loginpage");
  };

  return (
  
    !user ? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Please Login First
          </h1>

          <Link
            href="/loginpage"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Back to Login
          </Link>
        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-gray-100 py-10 px-5">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg">

          {/* Top Banner */}
          <div className="h-20 bg-black"></div>

          {/* Profile */}
          <div className="px-8 pb-10">

            <div className="-mt-20">
              <h1 className="text-xl font-bold text-white p-4">
                {user.firstName} {user.lastName}
              </h1>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold">91+ 9669188169</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-semibold">{user.gender}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-semibold">21</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Birth Date</p>
                <p className="font-semibold">12-02-2006</p>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={handleLogout}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    )
);
}