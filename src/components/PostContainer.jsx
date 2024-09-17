
function PostContainer({
  postName,
  postContentFirst,
  postContentSecond,
  postContentThird,
  postDate,
}) {
  return (
    <>
      <div className="users-post-box">
        <div className="post-box-user-date">
          <span className="post-userName">
            {postName.charAt(0).toUpperCase() +
              postName.slice(1, postName.length)}
          </span>
          <p className="post-date">{postDate}</p>
        </div>
        <div className="post-content-texts">
          <p className="post-text-content-first">{postContentFirst}</p>
          <p className="post-text-content-second">{postContentSecond}</p>
          <p className="post-text-content-third">{postContentThird}</p>
        </div>
      </div>
    </>
  );
}

export default PostContainer;
