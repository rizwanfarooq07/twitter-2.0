import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet as TweetType } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
  tweet: TweetType;
}

const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxIsVisible, setCommentBoxIsVisible] =
    useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const postComment = async () => {
    const commentToast = toast.loading("Posting Comment...");

    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
    };

    const result = await fetch(`/api/addComments`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    console.log("WOOHOO we made it", result);
    toast.success("Comment Posted!", {
      id: commentToast,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postComment();
    setInput("");
    setCommentBoxIsVisible(false);
    refreshComments();
  };

  return (
    <div className="flex flex-col p-5 space-x-3 border-gray-100 border-y">
      <div className="flex space-x-3">
        <img
          src={tweet.profileImg}
          alt="dp"
          className="object-cover w-10 h-10 rounded-full"
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s/g, "").toLowerCase()}
            </p>
            <TimeAgo
              date={tweet._createdAt}
              className="text-sm text-gray-500"
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              className="object-cover m-5 mb-1 ml-0 rounded-lg shadow-sm max-h-60"
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div
          onClick={() =>
            session && setCommentBoxIsVisible(!commentBoxIsVisible)
          }
          className="flex items-center space-x-3 text-gray-400 cursor-pointer"
        >
          <ChatAlt2Icon className="w-5 h-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex items-center space-x-3 text-gray-400 cursor-pointer">
          <SwitchHorizontalIcon className="w-5 h-5" />
        </div>
        <div className="flex items-center space-x-3 text-gray-400 cursor-pointer">
          <HeartIcon className="w-5 h-5" />
        </div>
        <div className="flex items-center space-x-3 text-gray-400 cursor-pointer">
          <UploadIcon className="w-5 h-5" />
        </div>
      </div>
      {/* comment box logic */}
      {commentBoxIsVisible && (
        <form className="flex mt-3 space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Write a comment..."
            className="flex-1 p-2 bg-gray-100 rounded-lg outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={!input}
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="p-5 my-2 mt-5 overflow-y-scroll border-t border-gray-100 max-h-44">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex mb-3 space-x-2">
              <hr className="absolute h-8 left-5 top-10 border-x border-twitter-30" />
              <img
                src={comment.profileImg}
                alt=""
                className="object-cover mt-2 rounded-full h-7 w-7"
              />
              <div className="">
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    {" "}
                    @{comment.username.replace(/\s/g, "").toLowerCase()}
                  </p>
                  <TimeAgo
                    date={comment._createdAt}
                    className="text-sm text-gray-500"
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
