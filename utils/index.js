const { Pages, Posts, Comments, Profiles } = require("../models");

exports.getPagesFromModel = () => {
  return Pages.find().then((pages) => {
    return pages;
  });
};

exports.getProfilesFromModel = () => {
  return Profiles.find().then((profiles) => {
    return profiles;
  });
};

exports.DeleteComments = (post_id, comment_ids) => {
  return Comments.find({ post_id: post_id }).then((comments) => {
    comments.forEach((comment) => {
      if (!comment_ids.includes(comment.id)) {
        Comments.findOneAndUpdate(
          { id: comment.id },
          {
            is_deleted: true,
          },

          (error, result) => {
            if (error) {
              console.log("Error : ", error);
            }
          }
        );
      }
    });
  });
};
