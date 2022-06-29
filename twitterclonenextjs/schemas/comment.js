export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "comment",
      title: "Comment",
      type: "string",
    },
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "profileImg",
      title: "Profile Image",
      type: "string",
    },
    {
      name: "tweet",
      title: "Tweet",
      description: "Reference of the tweet the comment is associated with",
      type: "reference",
      to: {
        type: "tweet",
      },
    },
  ],
};
