import React, { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import TweetBox from "./TweetBox";
import { Tweet } from "../typings";
import TweetComponent from "./Tweet";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

const Feed = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState(tweetsProp);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    const tweets: Tweet[] = await fetchTweets();
    setTweets(tweets);

    toast.success("Feed Updated!", {
      id: refreshToast,
    });
  };

  return (
    <div className="max-h-screen col-span-7 overflow-scroll lg:col-span-5 border-x scrollbar-hide">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="w-8 h-8 mt-5 mr-5 transition-all duration-500 ease-out cursor-pointer text-twitter hover:rotate-180 active:scale-125"
        />
      </div>
      <div>
        <TweetBox setTweets={setTweets} />
      </div>

      {/* Feed */}

      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
