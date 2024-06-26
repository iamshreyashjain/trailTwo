import { useContext, } from "react";
import Post from "./Post";
import { PostLister } from "./post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingState from "./LoadingState";


const PostList = () => {
const {postList, fetching}  = useContext(PostLister)

  return (
    <>
    {fetching && <LoadingState/>}
    {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching && postList.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </>
  );
};

export default PostList;