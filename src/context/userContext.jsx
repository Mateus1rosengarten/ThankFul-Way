import { createContext, useEffect, useState } from "react";
export const userContext = createContext();

function UserContext({ children }) {
  const [profileNameValue, setProfileNameValue] = useState("");
  const [userLoggedObject, setUserLoggedObject] = useState(false);
  const [userHasPosted, setUserHasPosted] = useState(false);
  const [dateLastPost, setDateLastPost] = useState(undefined);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [profileNameIsChanged, setProfileNameIsChanged] = useState(false);
  const [profileNameSaved, setProfileNameSaved] = useState(
    localStorage.getItem("PROFILE_NAME")
  );

  useEffect(() => {
    console.log("profileNamesAVED", profileNameSaved);
  }, []);

  return (
    <userContext.Provider
      value={{
        profileNameValue,
        setProfileNameValue,
        userLoggedObject,
        setUserLoggedObject,
        userHasPosted,
        setUserHasPosted,
        photoURL,
        setPhotoURL,
        profileNameIsChanged,
        setProfileNameIsChanged,
        profileNameSaved,
        setProfileNameSaved,
        dateLastPost,
        setDateLastPost,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserContext;
