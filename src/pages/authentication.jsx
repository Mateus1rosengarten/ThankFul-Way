import { useState, useRef, useContext } from "react";
import { authentication, storage, provider } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faHamsa,
  faHeart,
  faUserSecret,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./authentication.css";
import { userContext } from "../context/userContext";
import RedWarningAlert from "../components/RedWarningAlertPost";
import LoaderComponent from "../components/Loader";

function Authetication() {
  const [registerName, setRegisterName] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [authError, setAuthError] = useState({
    registerNameError: "",
    registerPassError: "",
    loginError: "",
  });
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  // const [image, setImage] = useState(null);
  // const [uploadPhoto, setUploadPhoto] = useState(false);
  // const { setPhotoURL } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const {
    userLoggedObject,
    setUserLoggedObject,
    setUserHasPosted,
    setProfileNameSaved,
    setProfileNameValue,
  } = useContext(userContext);
  const inputAuthRef = useRef(null);
  const inputAuthPassRef = useRef(null);
  const inputSignRef = useRef(null);
  const inputSignPassRef = useRef(null);
  const navigate = useNavigate(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      setUserLoggedObject(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUserLoggedObject]);


  useEffect(() => {
    const profileNamePost = localStorage.getItem("PROFILE_NAME");
    setProfileNameSaved(profileNamePost);
    setProfileNameValue(profileNamePost);
  }, []);

  // useEffect(() => {
  //   if (userLoggedObject?.photoURL) {
  //     setPhotoURL(userLoggedObject.photoURL);
  //   } else {
  //     setPhotoURL(
  //       "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  //     );
  //   }
  // }, [userLoggedObject]);

  const register = async () => {
    try {
      if (!registerName) {
        settingRegisterNameError();
        return;
      }
      if (!registerPass || registerPass.length < 6) {
        settingRegisterPasswordError();
        return;
      }
      await createUserWithEmailAndPassword(
        authentication,
        registerName,
        registerPass
      );
      settingAllErrorsFalse();
      setUserHasPosted(false);
      inputSignRef.current.value = "";
      inputSignPassRef.current.value = "";

      navigate("/profile");
    } catch (error) {
      settingRegisterNameError();
      console.log("error in register function ", error);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(authentication, loginName, loginPass);
      inputAuthRef.current.value = "";
      inputAuthPassRef.current.value = "";
      settingAllErrorsFalse();
      navigate("/profile");
    } catch (error) {
      settingLoginError();
      console.log("error in login function", error);
      inputAuthRef.current.value = "";
      inputAuthPassRef.current.value = "";
    }
  };

  const signInGoogle = () => {
    signInWithPopup(authentication, provider)
      .then(() => {
        navigate("/profile");
      })

      .catch((err) => {
        alert("Error trying to loging by Google");
        console.log(err);
      });
  };

  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  // const handleUpload = () => {
  //   console.log("uploadPhoto:", uploadPhoto);
  //   setUploadPhoto(!uploadPhoto);
  //   uploadPictureToFirebaseDB();
  // };

  // const uploadPictureToFirebaseDB = async () => {
  //   const imageRef = ref(storage, `images/${image.name}`);
  //   const snapShot = await uploadBytes(imageRef, image);
  //   console.log("snapShot:", snapShot);
  //   const photoURL = await getDownloadURL(imageRef);
  //   console.log("photoURL", photoURL);
  //   updateProfile(userLoggedObject, { photoURL });
  //   setPhotoURL(photoURL);
  // };

  const settingRegisterNameError = () => {
    setAuthError((prevState) => ({
      ...prevState,
      loginError: false,
      registerPassError: false,
      registerNameError: true,
    }));
  };

  const settingRegisterPasswordError = () => {
    setAuthError((prevState) => ({
      ...prevState,
      loginError: false,
      registerNameError: false,
      registerPassError: true,
    }));
  };

  const settingLoginError = () => {
    setAuthError((prevState) => ({
      ...prevState,
      registerNameError: false,
      registerPassError: false,
      loginError: true,
    }));
  };

  const settingAllErrorsFalse = () => {
    setAuthError((prevState) => ({
      ...prevState,
      registerNameError: false,
      registerPassError: false,
      loginError: false,
    }));
  };

  return (
    <div>
      {loading ? (
        <div className="div-loader-logged-page">
        <LoaderComponent loaderStyle={"spinner-style"} />
        </div>
      ) : (
        <div className={!userLoggedObject ? "div-authPage" : "div-authPage-logged"}>
          {!userLoggedObject ? (
            <div className="div-authInputs">
              <div className="div-authLogin">
                <div className="div-login">
                  <h3 className="h3-auth">
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      style={{ color: "#87CEEB", marginRight: "0.5vw" }}
                    />{" "}
                    LOGIN
                  </h3>
                  <button className="button-google" onClick={signInGoogle}>
                    Login with Google
                  </button>
                </div>
                <div className="div-login-userName">
                  <label className="label-login-userName" htmlFor="auth">E-mail:</label>
                  <input
                    className="input-login-userName"
                    id="auth"
                    onChange={(e) => {
                      setAuthError((prev) => ({ ...prev, loginError: false }));
                      setLoginName(e.target.value);
                    }}
                  />
                </div>
                <div className="div-login-pass">
                  <label className="label-login-pass" htmlFor="authPass">Password:</label>
                  <input
                    className="input-login-pass"
                    id="authPass"
                    type="password"
                    onChange={(e) => {
                      setAuthError((prev) => ({ ...prev, loginError: false }));
                      setLoginPass(e.target.value);
                    }}
                  />
                </div>
                <div className="div-buttons-auth">
                  <button className="button-login" onClick={login}>LOGIN</button>
                </div>
              </div>
              {authError.loginError && (
                <div className="login-errors-mobile">
                  <RedWarningAlert
                    textProps="Uh-oh! Invalid username or password. Please try again."
                    divStyleProps="alert-div-login-error"
                    spanStyleProps="alert-text-post-error"
                  />
                </div>
              )}
              <div className="div-horizontal-divider">
                <div className="left-horizontal"></div>
                <span className="text-does-not-have-account">Does not have an account?</span>
                <div className="rigth-horizontal"></div>
              </div>
              <div className="div-authRegister">
                <div className="div-signUp">
                  <h3 className="h3-auth">
                    <FontAwesomeIcon icon={faUserPlus} style={{ color: "#87CEEB" }} /> SIGN UP
                  </h3>
                </div>
                <div className="div-login-userName">
                  <label className="label-login-userName" htmlFor="sign">E-mail:</label>
                  <input
                    className="input-login-userName"
                    id="sign"
                    onChange={(e) => {
                      setAuthError((prev) => ({
                        ...prev,
                        registerNameError: false,
                        registerPassError: false,
                      }));
                      setRegisterName(e.target.value);
                    }}
                  />
                </div>
                <div className="div-login-pass">
                  <label className="label-login-pass" htmlFor="signPass">Password:</label>
                  <input
                    className="input-login-pass"
                    id="signPass"
                    type="password"
                    onChange={(e) => {
                      setAuthError((prev) => ({
                        ...prev,
                        registerNameError: false,
                        registerPassError: false,
                      }));
                      setRegisterPass(e.target.value);
                    }}
                  />
                </div>
                <div className="div-buttons-auth">
                  <button className="button-register" onClick={register}>SIGN UP</button>
                </div>
              </div>
              {authError.registerNameError && (
                <div className="signup-errors-mobile">
                  <RedWarningAlert
                    textProps="Whoops! Email already in use or invalid. Please choose another one."
                    divStyleProps="alert-div-login-error"
                    spanStyleProps="alert-text-post-error"
                  />
                </div>
              )}
              {authError.registerPassError && (
                <div className="signup-errors-mobile">
                  <RedWarningAlert
                    textProps="Oops! Passwords need to be at least 6 characters long"
                    divStyleProps="alert-div-login-error"
                    spanStyleProps="alert-text-post-error"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="div-loggedText">
              <h3 className="h3-manualApp">
                <FontAwesomeIcon icon={faHeart} className="icon-heart" style={{ color: "#87CEEB",marginRight: "0.5vw"  }} /> 
                Take a moment each day to share three daily gratitudes, like enjoying a morning coffee or feeling the sun in your face. Cultivate positivity by acknowledging these blessings.
              </h3>
              <h3 className="h3-manualApp">
                <FontAwesomeIcon icon={faUserSecret} style={{ marginRight: "0.5vw" }} /> 
                Customize your privacy settings in your profile to post anonymously or not. Express yourself freely without worrying about judgment or recognition.
              </h3>
              <h3 className="h3-manualApp">
                <FontAwesomeIcon icon={faGift} style={{ color: "#87CEEB",marginRight: "0.5vw"  }} /> 
                By sharing your thoughts with the world, you release emotions and receive positivity. Seeing other users' gratitude can uplift you and remind you of life's abundance.
              </h3>
              <h3 className="h3-manualApp-last">
                <FontAwesomeIcon icon={faHamsa} style={{ marginRight: "0.5vw" }} />
                Explore fellow users' posts for diverse gratitude:
                <h3 className="h3-manualApp-colored-text">
                  "Positivity breeds positivity, and by surrounding yourself with grateful hearts, you can enhance your own well-being."
                </h3>
              </h3>
            </div>
          )}
          {!userLoggedObject && (
            <div className="div-authTexts">
              <div className="div-horizontal-divider-site-title">
                <div className="left-horizontal"></div>
                <h2 className="site-title-mobile">ThankFulWay</h2>
                <div className="rigth-horizontal"></div>
              </div>
              <h3 className="h3-welcomeUnLogged">
                <FontAwesomeIcon icon={faHeart} style={{ color: "#87CEEB",marginRight:'0.5vw' }} /> 
                Welcome to ThankfulWay, where gratitude meets daily practice.
              </h3>
              <h3 className="h3-welcomeUnLogged">
                <FontAwesomeIcon icon={faGift} style={{marginRight:'0.5vw' }} /> 
                Share three things you're grateful for each day and join a community of positivity. Start your journey of appreciation.
              </h3>
              <h3 className="h3-welcomeUnLogged">
                <FontAwesomeIcon icon={faHamsa} style={{ color: "#87CEEB",marginRight:'0.5vw' }} /> 
                In our busy world, it's easy to forget life's little joys. We've made practicing gratitude simple.
              </h3>
            </div>
          )}

          {/* {!userLoggedObject && <hr className="divider-home-mobile-screen" />} */}
          {/* <div className="div-picture-label">
        {userLoggedObject && photoURL && (
          <div className="circle-container">
            <img className="picture-login" src={photoURL} alt="Profile" />
          </div>
        )}
        {userLoggedObject && (
          <PictureLogin
            functionChange={handleImageChange}
            functionUpload={handleUpload}
          />
        )}
      </div> */}
        </div>
      )}
    </div>
  
  );
}

export default Authetication;



    

