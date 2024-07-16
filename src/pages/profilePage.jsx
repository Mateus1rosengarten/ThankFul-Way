import { useRef, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../firebaseConfig";
import { userContext } from "../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserEdit,faUserSecret,faHandsHelping, faCheck} from "@fortawesome/free-solid-svg-icons";
import './profilePage.css'
import { useEffect } from "react";
import LoaderComponent from "../components/Loader";
import RedWarningAlert from "../components/RedWarningAlertPost";
import { useState } from "react";

function ProfilePage() {
  const [profileNameTooLong,setProfileNameTooLong] = useState(false);
  const { profileNameValue, setProfileNameValue,profileNameSaved,setProfileNameSaved,profileNameIsChanged, setProfileNameIsChanged ,setUserLoggedObject} = useContext(userContext);
  const profileNameRef = useRef();

  onAuthStateChanged(authentication, (user) => {
    setUserLoggedObject(user);
  });

  useEffect(() => {
    setProfileNameIsChanged(true)
   console.log('profileNamesAVED',profileNameSaved)
   
  },[])

  const changingNameHandle = (event) => {
    if(profileNameRef.current.value.length >= 30) {
      setProfileNameTooLong(true);
    }
    else {
    setProfileNameTooLong(false);
    setProfileNameValue(event.target.value);
    setProfileNameIsChanged(false);
    }
  };

  const saveHandle = () => {
    if(profileNameTooLong) {
      return
    }
    setProfileNameValue(profileNameRef.current.value);
    setProfileNameSaved(profileNameRef.current.value);
    setProfileNameIsChanged(true);
    localStorage.setItem('PROFILE_NAME',profileNameRef.current.value)
  };

  return (
    <>
     
    <div className="div-profilePage">

    
      <div className="div-profileName-changes">
      <h3 className="h3-profileName-label">Profile Name<FontAwesomeIcon className="profileName-icon" icon={faUserEdit} style={{marginLeft:'1vw',color:'#87CEEB'}} />
      </h3>
      <div className="div-input-button">

      <input
        onChange={changingNameHandle}
        type="text"
        className="input-profileName"
        id="login"
        ref={profileNameRef}
        
       
      />
      <button onClick={saveHandle} 
       className="button-save-profileName"
       style={{ opacity: profileNameTooLong ? 0.5 : 1 }}>
        Save
      </button>
      </div> 
     
  

      {profileNameIsChanged ? (
        <> 
        
         <h3 className="h3-profileName-text"><FontAwesomeIcon  icon={faCheck} style={{marginRight:'0.5vw',color:'#87CEEB'}} /> Profile Name set to:</h3>
        <h3 className="h3-profileName-textValue">{profileNameValue || 'Anonymous User'}</h3>
        </>
      ) : (
        <></>
      )}
       </div>
      {profileNameIsChanged &&  <hr className="divider-mobile-screen"></hr> }
   



       <div className="div-profilePage-text">
      {profileNameTooLong && 
        <RedWarningAlert
        textProps={'Oops! Your username should be kept under 30 characters'}
        divStyleProps={'alert-div-post-profile-error'}
        spanStyleProps={'alert-text-post-profile-error'}
        />
      }

        <h3 className="h3-profilePage-text">
          <FontAwesomeIcon icon={faUserSecret} style={{marginRight:'1vw',color:'#87CEEB'}} />
       Customize your identity to reflect your preference. Whether you choose to use your name or to be anonymous.<br />Feel free to change your username.
        </h3>
        <h3 className="h3-profilePage-text-last">
        <FontAwesomeIcon icon={faHandsHelping} style={{marginRight:'1vw',color:'#87CEEB'}} />
        Respectful usernames and posts aligned with the app's purpose enhance the positive atmosphere of our community.

        </h3>
       </div>
       </div>
    </>
  );
}

export default ProfilePage;
