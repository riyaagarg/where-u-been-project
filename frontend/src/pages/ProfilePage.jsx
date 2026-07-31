// import useAuthStore from "../store/useAuthStore";
// import { useState, useEffect } from "react";

// const Profile = () => {
//   const user = useAuthStore((state) => state.user);
//   const updateUser = useAuthStore((state) => state.updateUser);
//   const [toast, setToast] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (toast) {
//       const timerId = setTimeout(() => {
//         setToast(null);
//       }, 3000);
//       return () => clearTimeout(timerId);
//     }
//   }, [toast]);

//   const [formData, setFormData] = useState({
//     Username: user?.Username || "",
//     ProfileImg: user?.ProfileImg || "",
//     Bio: user?.Bio || "",
//     Gender: user?.Gender || "",

//   });

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${VITE_API_URL}/auth/profile`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Update failed");
//       }

//       updateUser(formData);

//       setToast({ message: "Profile updated successfully", type: "success" });
//     } catch (error) {
//       setToast({ message: error.message || "Something went wrong", type: "error" });
//     } finally {
//       setIsEditing(false);
//     }
//   };
//   addPhotosToPin: async (id, files) => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append("photos", file));

//     const res = await fetch(`${API}/${id}/photos`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // no Content-Type — browser sets multipart boundary
//       body: formData,
//     });
//     if (!res.ok) throw new Error("Failed to upload photos");

//     const updatedPin = await res.json();

//     set((state) => ({
//       pins: state.pins.map((pin) =>
//         pin._id === id ? { ...pin, photos: updatedPin.photos } : pin
//       ),
//     }));

//     return updatedPin.photos;
//   },

//   handleSubmit = await ()=>{
//       setUploading(true);
//       try {
//       await addPhotosToPin(pin._id, files);}
//       catch (err) {
//       setError("Upload failed. Try again.");
//     } finally {
//       setUploading(false);
//   }}

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
//       <div className="card bg-base-100 shadow-xl w-[95vw] min-h-[90vh]">
//         <div className="grid grid-cols-2 grid-rows-[35%_65%] h-full">
//           <div className="flex items-center justify-center">
//             <div className="avatar">
//               <div className="w-44 rounded-full">
//                 <img src={formData.ProfileImg} alt="Profile" />
//               </div>
//             </div>
//             {isEditing && (
//               <input
//                 type="text"
//                 className="input input-bordered w-72"
//                 placeholder="Profile Image URL"
//                 value={formData.ProfileImg}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     ProfileImg: e.target.value,
//                   })
//                 }
//               />
//             )}
//           </div>

//           <div className="p-8 space-y-4">
//             <div>
//               <label className="label">
//                 <span className="label-text font-semibold">Name</span>
//               </label>
//               <input
//                 type="text"
//                 className="input input-bordered w-full"
//                 value={formData.Username}
//                 disabled={!isEditing}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     Username: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div>
//               <label className="label">
//                 <span className="label-text font-semibold">Email</span>
//               </label>
//               <input
//                 type="email"
//                 className="input input-bordered w-full"
//                 value={user?.Email || ""}
//                 disabled
//               />
//             </div>

//             <div>
//               <label className="label">
//                 <span className="label-text font-semibold">Gender</span>
//               </label>
//               <select
//                 className="select select-bordered w-full"
//                 value={formData.Gender || ""}
//                 disabled={!isEditing}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     Gender: e.target.value,
//                   })
//                 }
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Female">Female</option>
//                 <option value="Male">Male</option>
//                 <option value="Prefer not to say">Prefer not to say</option>
//               </select>
//             </div>
//           </div>

//           <div className="col-span-2 p-8 overflow-y-auto">
//             <div className="mb-6">
//               <label className="label">
//                 <span className="label-text font-semibold">Bio</span>
//               </label>
//               <textarea
//                 className="textarea textarea-bordered w-full h-20"
//                 value={formData.Bio}
//                 disabled={!isEditing}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     Bio: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="card-actions justify-end mt-6">
//               {isEditing ? (
//                 <button className="btn btn-success" onClick={handleSave}>
//                   Save
//                 </button>
//               ) : (
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit Profile
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {toast && (
//         <div className="toast toast-top toast-end">
//           <div
//             className={`alert ${
//               toast.type === "success" ? "alert-success" : "alert-error"
//             }`}
//           >
//             <span>{toast.message}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useState, useEffect } from "react";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [toast, setToast] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}auth/profile`, {
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
  //   const DEFAULT_AVATARS = [

  //   "https://i.pinimg.com/736x/59/be/ea/59beea802623a042e9456db8205b89ee.jpg",
  //   "https://i.pinimg.com/1200x/3c/32/ef/3c32eff46e84b58b0b8da6fd3263efb6.jpg",
  //   "https://i.pinimg.com/736x/5f/d6/bb/5fd6bb14a167dbe79a2a9e1594e9d354.jpg",
  //   "https://i.pinimg.com/736x/7b/87/f0/7b87f024c5c36c80db0d2de09ef67b20.jpg",

  //   // add more static URLs you host or upload ahead of time

  // ];
  const DEFAULT_AVATARS = [
    {
      name: "Paris",
      url: "https://i.pinimg.com/736x/89/3d/2f/893d2fa9c21b82468c8448cc99f15ee0.jpg",
      theme: "sunset",
    },
    {
      name: "Oslo",
      url: "https://i.pinimg.com/736x/5e/dc/7f/5edc7fd9b9de0d8c48cf9a7d60c004cf.jpg",
      theme: "nord",
    },
    {
      name: "Bali",
      url: "https://i.pinimg.com/736x/c1/5d/37/c15d37dec3c9e868953424b5b373025a.jpg",
      theme: "aqua",
    },
    {
      name: "Delhi",
      url: "https://i.pinimg.com/736x/bf/f6/77/bff6772a033f3f47deac151bb9463dbb.jpg",
      theme: "retro",
    },
    {
      name: "Zurich",
      url: "https://i.pinimg.com/1200x/7b/55/4f/7b554fa365ca179a182b1a27477386d0.jpg",
      theme: "emerald",
    },
    {
      name: "Out of this World",
      url: "https://i.pinimg.com/736x/c9/81/3f/c9813f465498429b8c5202ae9c44c4a0.jpg",
      theme: "black",
    },



    // add as many as you like
  ];
  const handleSelectDefaultAvatar = (avatar) => {
    console.log("Selected avatar, applying theme:", avatar.theme);
    setFormData({ ...formData, ProfileImg: avatar.url, Theme: avatar.theme });
    document.documentElement.setAttribute("data-theme", avatar.theme);
    localStorage.setItem("theme", avatar.theme);
    setShowAvatarMenu(false);
  };
 

  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [uploading, setUploading] = useState(false);

  // const handleSelectDefaultAvatar = (url) => {
  //   setFormData({ ...formData, ProfileImg: url });
  //   setShowAvatarMenu(false);
  // };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const uploadData = new FormData();
      uploadData.append("photo", file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}auth/profile/photo`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");

      setFormData({ ...formData, ProfileImg: data.ProfileImg });
      updateUser({ ...user, ProfileImg: data.ProfileImg });
      setToast({ message: "Photo uploaded", type: "success" });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setUploading(false);
      setShowAvatarMenu(false);
      e.target.value = ""; // allow re-selecting the same file later
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card bg-base-100 shadow-xl w-[95vw] min-h-[90vh]">
        <div className="grid grid-cols-2 grid-rows-[35%_65%] h-full">
          {/* <div className="flex items-center justify-center">
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
                value={formData.ProfileImage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ProfileImg: e.target.value,
                  })
                }
              />
            )}
          </div> */}
          <div className="flex flex-col items-center gap-2">
            <div className="avatar">
              <div className="w-44 rounded-full">
                <img src={formData.ProfileImg} alt="Profile" />
              </div>
            </div>

            {isEditing && (
              <div className="relative">
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() => setShowAvatarMenu((prev) => !prev)}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Change Photo"}
                </button>

                {showAvatarMenu && (
                  <div className="absolute z-10 mt-2 p-4 bg-base-100 shadow-xl rounded-box w-72">
                    <p className="font-semibold mb-2">Choose a default</p>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {DEFAULT_AVATARS.map((avatar) => (
                        <button
                          key={avatar.name}
                          type="button"
                          className="flex flex-col items-center gap-1"
                          onClick={() => handleSelectDefaultAvatar(avatar)}
                        >
                          <img
                            src={avatar.url}
                            className={`w-12 h-12 rounded-full cursor-pointer hover:ring-2 ring-primary ${formData.ProfileImg === avatar.url ? "ring-2 ring-primary" : ""
                              }`}
                          />
                          <span className="text-xs">{avatar.name}</span>
                        </button>
                      ))}
                    </div>

                    <p className="font-semibold mb-2">Or upload your own</p>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      className="file-input file-input-bordered file-input-sm w-full"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </div>
                )}
              </div>
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


          <div className="col-span-2 p-8 overflow-y-auto mt-5 ">
            <div className="mb-6">
              <label className="label">
                <span className="label-text font-semibold">Bio</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-20 resize-none"
                value={formData.Bio}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Bio: e.target.value,
                  })
                }
              />
              <div className="flex mt-5 items-center gap-10 ">
               <div className="flex flex-col">
                <label className="label">
                    <span className="label-text font-semibold">DOB</span>
                  </label>
                <input
                  type="date"
                  className="input input-bordered w-80"
                  value={formData.DOB ? formData.DOB.slice(0, 10) : ""}  // Mongo Date needs YYYY-MM-DD slice for <input type="date">
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
                />
                </div>
                
                
              </div>

            </div>

            <div>
              <div className="justify-start"><button className="btn bg-[#3d3939] text-white border-none hover:bg-[#282929] mb-4"onClick={() => navigate("/home")}>Go Back </button></div>
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
      </div>

      {toast && (
        <div className="toast toast-top toast-end">
          <div
            className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"
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