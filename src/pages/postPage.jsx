
import { addDoc,collection,getDocs,limit,orderBy, query,startAfter,Timestamp, where} from "firebase/firestore";
import { onAuthStateChanged} from "firebase/auth";
import { db,authentication} from "../firebaseConfig";
import { useState,useRef,useContext, useEffect } from "react";
import RedWarningAlert from "../components/RedWarningAlertPost";
import PostContainer from "../components/PostContainer";
import { postContext } from "../context/postContext";
import { userContext } from "../context/userContext";
import './postPage.css';
import LoaderComponent from "../components/Loader";



function PostPage() {
  
  

  const [lastVisiblePost,setLastVisiblePost] = useState(true);
  const [getNewPost, setGetNewPost] = useState(false);
  const [isPostIncomplete,setIsPostIncomplete] = useState(false);
  const [postIsTooLong,setPostIsTooLong] = useState({
    firstPost: false,
    secondPost: false,
    thirdPost: false
  });
  const [tweetsFromFirebase, setTweetsFromFirebase] = useState([]);
  const [triggerToShowWarning,setTriggerToShowWarning] = useState(false);
  const { tweetPost, setTweetPost } = useContext(postContext);
  const { userLoggedObject, setUserLoggedObject,profileNameValue,userHasPosted,setUserHasPosted,dateLastPost,setDateLastPost} = useContext(userContext);
  const inputPostValueRefFirst = useRef(null);
  const inputPostValueRefSecond = useRef(null);
  const inputPostValueRefThird = useRef(null);
  



  const dataBasecollectionRef = collection(db, "posts");
  const newDate = new Date();
  const readableDate = newDate.toLocaleDateString();
  const isAnyPostTooLong = Object.keys(postIsTooLong).some(key => postIsTooLong[key]);
  let dataWithPosts;


  useEffect(() => {
    getTweetsFromFirebaseDb();
    checkUserAlreadyPostedToday();
    handleTrigger();
    console.log('userLoggedObject',userLoggedObject);
  }, []);


  useEffect(() => {
    getTweetsFromFirebaseDb();
  }, [getNewPost]);


  useEffect(() => {
    checkUserAlreadyPostedToday();
  },[tweetPost])


  onAuthStateChanged(authentication, (user) => {
    setUserLoggedObject(user);
  });

  const checkUserAlreadyPostedToday = () => {
    const userLastPostDate = localStorage.getItem('USER_LAST_POST_DATE')
    if (readableDate !== userLastPostDate && readableDate !== dateLastPost) {
      console.log('readableDate',readableDate);
      console.log('dateLastTweet',userLastPostDate);
      setDateLastPost('')
      setUserHasPosted(false);
    }
      else {
        console.log('readableDate',readableDate);
      console.log('dateLastTweet',userLastPostDate);
      setUserHasPosted(true);
    }

  }

  const getTweetsFromFirebaseDb = async () => {
    try {
    let searchFromDB = query(dataBasecollectionRef,where("date","==",readableDate),orderBy("timestamp", "desc"), limit(5));
    dataWithPosts = await getDocs(searchFromDB);
    console.log('dataWithPosts',dataWithPosts);
    const lastVisible = dataWithPosts.docs[dataWithPosts.docs.length - 1];
    const newData = dataWithPosts.docs.map((post) => (
      { ...post.data(),
         id: post.id }
      ))
    setTweetsFromFirebase(newData);
   
      }
  catch(error) {
    console.log('Error in getTweetFromFB function',error);

  }
    

  };

  const fetchMoreData = async () => {
    console.log('last visible',lastVisiblePost);
    try {
    let searchFromDB = query(dataBasecollectionRef , where("date","==",readableDate),orderBy("timestamp","desc"),startAfter(lastVisiblePost), limit(5))
    let dataWithMorePosts = await getDocs(searchFromDB);
    console.log('dataWithMorePosts',dataWithMorePosts);
    const moreTweets = dataWithMorePosts.docs.map((post) => (
      { ...post.data(),
        id: post.id
      }
    ))
    setTweetsFromFirebase(prevTweets => [...prevTweets,...moreTweets]);
    const newLastVisible = dataWithMorePosts.docs[dataWithMorePosts.docs.length - 1]
    setLastVisiblePost(newLastVisible);
    console.log('tweetFromFB',tweetsFromFirebase);
  }
  catch(error) {
    setLastVisiblePost('NoMorePosts')
    console.log('ERROR',error)
  }}



  const sendTweetsToFirebase = async () => {
   if(isAnyPostTooLong){
   return;
   }
   else if (
      tweetPost.postText.firstPost.length < 4 ||
      tweetPost.postText.secondPost.length < 4 ||
      tweetPost.postText.thirdPost.length < 4
    ) {
      setIsPostIncomplete(true);
      return
    }
    else if (userHasPosted) {
      setIsPostIncomplete(false);
      return
    }

    
   
      const userPost = await addDoc(dataBasecollectionRef , {
      userName: profileNameValue
        ? profileNameValue
        : "Announymus User",
      content: tweetPost.postText,
      date: readableDate,
      timestamp : Timestamp.fromDate(new Date())
    });
  
    setDateLastPost(readableDate);
    localStorage.setItem('USER_LAST_POST_DATE',readableDate);
    setGetNewPost(!getNewPost);
    inputPostValueRefFirst.current.value = '';
    inputPostValueRefSecond.current.value = '';
    inputPostValueRefThird.current.value = '';
    setTweetPost({
      ...tweetPost,
      postText: {
        ...tweetPost.postText,
        firstPost: '',
        secondPost: '',
        thirdPost: ''
      }
    });
    setUserHasPosted(true);
    return userPost;
  };

  const handleTrigger = () => {
    setTimeout(() => {
      setTriggerToShowWarning(true)
      setLastVisiblePost('')
      
    }, 450);
  }

  const setWarningToFalse = () => {
    isPostIncomplete(false);
  }
  


  return (
    <>
    <div className="div-postPage">
    <span className="post-textArea-mobile" >For What You are Greatful Today?</span>
      {tweetsFromFirebase ? (
      <div className="post-box">
        <div
          className="post-textArea"
          type="text"
        >
          <span className="post-textArea" >For What You are Greatful Today?</span>
        </div>
        <div className="div-three-posts">
          <div className="first-post">
        <label className="label-firstPost" htmlFor="firstPost">1:</label>
        <input onChange={(event) => {
           if (event.target.value.length > 75) {
            setPostIsTooLong({
              ...postIsTooLong,firstPost: true
            });
            return;
           };
           setPostIsTooLong({
            ...postIsTooLong,firstPost: false
          });
           setIsPostIncomplete(false);
           
           setTweetPost({...tweetPost,postText:{...tweetPost.postText,firstPost:event.target.value}})} } ref={inputPostValueRefFirst} className="input-firstPost" id="firstPost"/>
        </div>
        <div className="second-post">
        <label className="label-secondPost" htmlFor="secondPost">2:</label>
        <input onChange={(event) => {
           if (event.target.value.length > 75) {
            setPostIsTooLong({
              ...postIsTooLong,secondPost: true
            });
            return;
           };

           setPostIsTooLong({
            ...postIsTooLong,secondPost: false
          });
           setIsPostIncomplete(false);
           
           setTweetPost({...tweetPost,postText:{...tweetPost.postText,secondPost:event.target.value}})} }
            ref={inputPostValueRefSecond} className="input-secondPost" id="secondPost"/> 
        </div>
        <div className="third-post">
        <label className="label-thirdPost" htmlFor="thirdPost">3:</label>
        <input onChange={(event) => {
          if (event.target.value.length > 75) {
            setPostIsTooLong({
              ...postIsTooLong,thirdPost: true
            });
            return;
           };

           setPostIsTooLong({
            ...postIsTooLong,thirdPost: false
          });
           setIsPostIncomplete(false);
          
           setTweetPost({...tweetPost,postText:{...tweetPost.postText,thirdPost:event.target.value}})} }ref={inputPostValueRefThird} className="input-thirdPost" id="thirdPost"/>
        </div>
        
        </div>

        <button
          id="button"        
          onClick={sendTweetsToFirebase}
          className="button-post"
          style={{ opacity: userHasPosted || isAnyPostTooLong ? 0.5 : 1  }}
        >
          Post
        </button>      
      </div>) :<LoaderComponent /> }

      {isAnyPostTooLong && !userHasPosted
         && !isPostIncomplete && <RedWarningAlert
         textProps={
         'Oops! Each thing youre grateful for should be kept under 50 characters. Remember, its often the small, simple things that bring us the most happiness'}
         divStyleProps={'alert-div-post-error'}
         spanStyleProps={'alert-text-post-error'}
         
          />  }
         {!isAnyPostTooLong && isPostIncomplete && !userHasPosted &&  <RedWarningAlert 
         textProps={
          'Oops! It seems youve entered less than three things youre grateful for, or the entries are too short'
         }
         divStyleProps={'alert-div-post-error'}
         spanStyleProps={'alert-text-post-error'}
         /> }
         { userHasPosted && <RedWarningAlert 
         textProps={
          "Thanks for sharing your gratitude today! Just hold off until tomorrow for post again.In the meantime,take the opportunity to read other people's gratitudes "
         }
         divStyleProps={'alert-div-post-warning'}
         spanStyleProps={'alert-text-post-warning'}
         />
         }
         {isAnyPostTooLong || isPostIncomplete || tweetsFromFirebase?.length === 0 && triggerToShowWarning && <RedWarningAlert 
         textProps={"It seems there are no posts yet today. Be the first one to share what you're grateful for! 😊"}
         divStyleProps={'alert-div-post-warning'}
         spanStyleProps={'alert-text-post-warning'}
          
          />

         }

         {tweetsFromFirebase?.length === 0 && !triggerToShowWarning && <LoaderComponent
         loaderStyle={'spinner-style'}/>}
        <div className="div-with-posts"> 

        
        {tweetsFromFirebase.map((i, index) => (
          <PostContainer
            key={index}
            postName={i.userName}
            postDate={i.date}
            postContentFirst={i.content.firstPost}
            postContentSecond={i.content.secondPost}
            postContentThird={i.content.thirdPost}

          />
        ))}

        <div className="button-loadMore-div"> 
          {lastVisiblePost === 'NoMorePosts' ? (
      
    <RedWarningAlert
      textProps="Oops, it seems that we don't have more posts from today..."
      divStyleProps="alert-div-noMorePosts-warning"
      spanStyleProps="alert-text-noMorePosts-warning"
    />
     
) : (
  tweetsFromFirebase.length >=5 &&
  <button onClick={fetchMoreData} className="button-loadMore">
    Load More
  </button>
)}
</div>
        </div>
  
      </div>
    </>
  );
}

export default PostPage;
