import useAuthStore from "../store/useAuthStore";
import { useState, useEffect } from "react";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [toast, setToast] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (toast) {
      const timerId = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [toast]);

  const [formData, setFormData] = useState({
    Username: user?.Username || "",
    ProfileImg: user?.ProfileImg || "",
    Bio: user?.Bio || "",
    Gender: user?.Gender || "",
  });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      updateUser(formData);

      setToast({ message: "Profile updated successfully", type: "success" });
    } catch (error) {
      setToast({ message: error.message || "Something went wrong", type: "error" });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card bg-base-100 shadow-xl w-[95vw] min-h-[90vh]">
        <div className="grid grid-cols-2 grid-rows-[35%_65%] h-full">
          <div className="flex items-center justify-center">
            <div className="avatar">
              <div className="w-44 rounded-full">
                <img src={formData.ProfileImg} alt="Profile" />
              </div>
            </div>
            {isEditing && (
              <input
                type="text"
                className="input input-bordered w-72"
                placeholder="Profile Image URL"
                value={formData.ProfileImg}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ProfileImg: e.target.value,
                  })
                }
              />
            )}
          </div>

          <div className="p-8 space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.Username}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Username: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={user?.Email || ""}
                disabled
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Gender</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.Gender || ""}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Gender: e.target.value,
                  })
                }
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="col-span-2 p-8 overflow-y-auto">
            <div className="mb-6">
              <label className="label">
                <span className="label-text font-semibold">Bio</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-20"
                value={formData.Bio}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Bio: e.target.value,
                  })
                }
              />
            </div>

            <div className="card-actions justify-end mt-6">
              {isEditing ? (
                <button className="btn btn-success" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-end">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;