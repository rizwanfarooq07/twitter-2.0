import { Tweet } from "../typings";

export const fetchTweets = async () => {
  const res = await fetch(`https://twitter-2-0-seven.vercel.app/api/getTweets`);
  const data = await res.json();
  const Tweets: Tweet[] = data.tweets;
  return Tweets;
};
