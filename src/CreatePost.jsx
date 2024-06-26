import { useContext } from "react";
import { useRef } from "react";
import { PostLister } from "./post-list-store";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { addPost } = useContext(PostLister);

  const userIdElement = useRef();
  const titleElement = useRef();
  const bodyElement = useRef();
  const tagsElement = useRef();
  const reactionElement = useRef();

  const navigate = useNavigate();

  let handleOnClick = (event) => {
    event.preventDefault();

    const userId = userIdElement.current.value;
    const postTitle = titleElement.current.value;
    const postBody = bodyElement.current.value;
    const tags = tagsElement.current.value.split(" ");
    const reaction = reactionElement.current.value;

    // addPost(userId, postTitle, postBody, reaction, tags);
    
    userIdElement.current.value = "";
    titleElement.current.value = "";
    bodyElement.current.value = "";
    tagsElement.current.value = "";
    reactionElement.current.value = "";


    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: userId,
        reactions: reaction,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post)=>addPost(post));
      navigate('/');
  };
  return (
    <>
      <form className="create-post" onSubmit={handleOnClick}>
        <div className="mb-3">

        <label htmlFor="userId" className="form-label">
            Enter your user Id here:
          </label>
          <input
            type="text"
            ref={userIdElement}
            className="form-control"
            id="userId"
            placeholder="User Id: "
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            ref={titleElement}
            placeholder="How are you feeling today"
            className="form-control"
            id="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            type="text"
            rows="4"
            ref={bodyElement}
            placeholder="Tell us more about it"
            className="form-control"
            id="body"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <input
            type="text"
            ref={tagsElement}
            placeholder="Please enter Tags using space"
            className="form-control"
            id="tags"
          />
        </div>
        <div className="mb-3">
        <label htmlFor="reaction" className="form-label">
          Reaction
        </label>
        <input
          type="number"
          ref={reactionElement}
          placeholder="Please enter Tags using space"
          className="form-control"
          id="reaction"
        />
      </div>
        <div className="mb-3">
      </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </>
  );
}
