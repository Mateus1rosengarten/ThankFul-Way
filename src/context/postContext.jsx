import { useState, createContext } from "react";

export const postContext = createContext();

function PostContext({ children }) {
  const [item, setItem] = useState([]);
  const [tweetPost, setTweetPost] = useState({
    postName: "",
    postDate: "",
    postText: {
      firstPost: "",
      secondPost: "",
      thirdPost: "",
    },
  });
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  return (
    <postContext.Provider
      value={{
        item,
        setItem,
        tweetPost,
        setTweetPost,
        buttonIsDisabled,
        setButtonIsDisabled,
      }}
    >
      {children}
    </postContext.Provider>
  );
}

export default PostContext;
