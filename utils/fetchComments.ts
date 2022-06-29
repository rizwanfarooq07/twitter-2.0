import { Comment } from "../typings";

export const fetchComments = async (TweetId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/getComments?tweetId=${TweetId}`
  );

  const comments: Comment[] = await res.json();
  return comments;
};
