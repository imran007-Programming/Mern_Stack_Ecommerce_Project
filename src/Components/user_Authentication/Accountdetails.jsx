import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../redux/Slice/Userauthslice/userAuthSlice";

const Accountdetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const { userLoggedInData } = useSelector((state) => state.user);

  const userverify = () => {
    dispatch(userLoggedIn());
  };

  useEffect(() => {
    if (userLoggedInData?.length > 0) {
      const data = userLoggedInData[0]; // assuming only one logged-in user
      setUserDetails(data);
      setFormValues(data);
    }
  }, [userLoggedInData]);

  useEffect(() => {
    userverify();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // ✅ Dispatch an update profile action here
    setUserDetails(formValues);
    setIsEditing(false);
  };

  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <p className="text-center py-10 text-gray-500">Loading user details...</p>;
  }

  return (
    <div className="pt-8 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            src={userDetails.userprofile}
            alt="User Profile"
          />
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-gray-600 font-medium">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstname"
                value={formValues.firstname || ""}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            ) : (
              <p className="text-xl font-semibold text-gray-800">
                {userDetails.firstname}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-600 font-medium">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastname"
                value={formValues.lastname || ""}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            ) : (
              <p className="text-xl font-semibold text-gray-800">
                {userDetails.lastname}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formValues.email || ""}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            ) : (
              <p className="text-xl font-semibold text-gray-800">
                {userDetails.email}
              </p>
            )}
          </div>
        </div>

        {/* Save & Cancel Buttons */}
        {isEditing && (
          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accountdetails;
