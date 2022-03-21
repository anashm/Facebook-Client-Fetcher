const Facebook_service = require("../service");
const {
  Pages,
  Posts,
  Comments,
  ReactionPosts,
  Profiles,
} = require("../models");
const res = require("express/lib/response");
const Functions = require("../utils");

exports.getPage = () => {
  Functions.getPagesFromModel().then((pages) => {
    pages.forEach((page_obj) => {
      return Facebook_service.getPageService(page_obj.id, page_obj.token)
        .then((page) => {
          var query = {
              id: page.id,
            },
            update = {
              category: page.category,
              category_list: page.category_list,
              followers_count: page.followers_count,
              has_whatsapp_number: page.has_whatsapp_number,
              is_owned: page.is_owned,
              name: page.name,
              serverToken: page.serverToken,
            },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };
          Pages.findOneAndUpdate(
            query,
            update,
            options,
            function (error, result) {
              if (error) {
                return console.log("An error occured : ", error);
              }
              console.log(result);
            }
          );
        })
        .catch((error) => console.log("Errooor : ", error));
    });
  });
};

exports.getPagePosts = () => {
  var post_ids = [];

  Functions.getPagesFromModel().then((pages) => {
    pages.forEach((page_obj) => {
      return Facebook_service.getPagePostsService(
        page_obj.id,
        page_obj.token
      ).then((posts) => {
        let promess = new Promise((resolve, reject) => {
          posts.posts.data.forEach((element) => {
            post_ids.push(element.id);
            Posts.findOneAndUpdate(
              { id: element.id },
              {
                created_time: element.created_time,
                message: element.message,
                name: element.name,
                page_id: page_obj.id,
              },
              { upsert: true, new: true, setDefaultsOnInsert: true },
              function (error, result) {
                if (error) {
                  console.log("Error : ", error);
                }
                if (!result) {
                  element.page_id = page_obj.id;
                  Posts.create(element);
                }
              }
            );
          });
          resolve(post_ids);
        });

        promess.then((posts_ids) => {
          var query = {
              id: page_obj.id,
            },
            update = {
              posts: posts_ids,
            },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };
          Pages.findOneAndUpdate(query, update, options).then(() => {
            console.log("succes");
          });
        });
      });
    });
  });
};

exports.getPagePostComments = () => {
  Functions.getPagesFromModel().then((pages) => {
    pages.forEach((page_obj) => {
      const post_ids = page_obj.posts;

      post_ids.forEach((element) => {
        return Facebook_service.getPagePostCommentsService(
          element,

          page_obj.token
        ).then((comments) => {
          var comments_ids = [];
          let promess = new Promise((resolve, reject) => {
            if (comments.comments.data) {
              comments.comments.data.forEach((comment_object) => {
                comments_ids.push(comment_object.id);
                Comments.findOneAndUpdate(
                  { id: comment_object.id },
                  {
                    can_comment: comment_object.can_comment,
                    comment_count: comment_object.comment_count,
                    can_reply_privately: comment_object.can_reply_privately,
                    created_time: comment_object.created_time,
                    from: comment_object.from,
                    like_count: comment_object.like_count,
                    message: comment_object.message,
                    page_id: page_obj.id,
                    post_id: element,
                  },
                  { upsert: true, new: true, setDefaultsOnInsert: true },
                  (error, result) => {
                    console.log(result);
                    if (error) {
                      console.log("Error : ", error);
                    }
                    // if (!result) {
                    //   (comment_object.page_id = page_obj.id),
                    //     (comment_object.post_id = element);
                    //   Comments.create(comment_object);
                    // }
                    // comments_ids.push(comment_object.id);
                  }
                );
              });
              resolve(comments_ids);
            }
          });
          promess.then((comments_ids) => {
            Posts.findOneAndUpdate(
              { id: element },
              {
                comments: comments_ids,
              },
              { upsert: true, new: true, setDefaultsOnInsert: true },
              (error, result) => {
                if (error) {
                  console.log("Error : ", error);
                }
                Functions.DeleteComments(element, comments_ids);
              }
            );
          });
        });
      });
    });
  });
};

exports.getPostReactions = () => {
  Functions.getPagesFromModel().then((pages) => {
    pages.forEach((page_obj) => {
      const post_ids = page_obj.posts;

      post_ids.forEach((element) => {
        var reaction_ids = [];

        return Facebook_service.getPostReactionsService(
          element,
          page_obj.token
        ).then((reactions) => {
          let promess = new Promise((resolve, reject) => {
            reactions.reactions.data.forEach((reaction) => {
              ReactionPosts.findOneAndUpdate(
                { id: reaction.id },
                {
                  name: reaction.name,
                  type: reaction.type,
                },
                { upsert: true, new: true, setDefaultsOnInsert: true },
                (error, result) => {
                  if (error) {
                    console.log("Error : ", error);
                  }
                  if (!result) {
                    ReactionPosts.create(reaction);
                  }
                }
              );

              if (reaction.type == "LIKE") {
                reaction_ids.push(reaction.id);
              }
            });

            resolve(reaction_ids);
          });

          promess.then((reaction_ids) => {
            Posts.findOneAndUpdate(
              { id: element },
              {
                like_count: reaction_ids.length,
                reaction_ids: reaction_ids,
              },
              { upsert: true, new: true, setDefaultsOnInsert: true },
              (error, result) => {
                if (error) {
                  console.log("Error : ", error);
                }
                console.log("Result : ", result);
              }
            );
          });
        });
      });
    });
  });
};

exports.getCommentReactions = () => {
  Functions.getPagesFromModel().then((pages) => {
    pages.forEach((page_obj) => {
      const post_ids = page_obj.posts;
      post_ids.forEach((post) => {
        Posts.findOne({ id: post }).then((comments) => {
          var commentaires = comments.comments;
          if (commentaires)
            commentaires.forEach((comment) => {
              var count_reactions = 0;
              return Facebook_service.getCommentReactionsService(
                comment,
                page_obj.token
              ).then((reactions) => {
                let promess = new Promise((resolve, reject) => {
                  if (reactions.reactions.data) {
                    reactions.reactions.data.forEach((reaction) => {
                      if (reaction.type == "LIKE") count_reactions++;
                    });
                    resolve(count_reactions);
                  }
                });
                promess.then((count_reactions) => {
                  Comments.findOneAndUpdate(
                    { id: comment },
                    {
                      like_count: count_reactions,
                    },
                    { upsert: true, new: true, setDefaultsOnInsert: true },
                    (error, result) => {
                      if (error) {
                        console.log("Error : ", error);
                      }
                      console.log("Result : ", result);
                    }
                  );
                });
              });
            });
        });
      });
    });
  });
};

exports.getUserProfile = () => {
  Functions.getProfilesFromModel().then((profiles) => {
    profiles.forEach((user) => {
      return Facebook_service.getUserProfileService(
        user.id,
        page_obj.token
      ).then((profile) => {
        Profiles.findOneAndUpdate(
          { id: profile.user.id },
          {
            first_name: profile.user.first_name,
            last_name: profile.user.last_name,
            name: profile.user.name,
            token_for_business: profile.user.token_for_business,
            installed: profile.user.installed,
            is_guest_user: profile.user.is_guest_user,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true },
          (error, result) => {
            if (error) {
              console.log("Error : ", error);
            }
            if (!result) Profiles.create(profile.user);
          }
        );
      });
    });
  });
};

exports.getPageInsights = () => {
  Functions.getPagesFromModel().then((pages) => {
    pages.forEach((page_obj) => {
      return Facebook_service.getPageInsightsService(
        page_obj.id,
        page_obj.token
      ).then((insights) => {
        var query = {
            id: page_obj.id,
          },
          update = {
            insights: insights.insights.data,
          },
          options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Pages.findOneAndUpdate(
          query,
          update,
          options,
          function (error, result) {
            if (error) {
              return console.log("An error occured : ", error);
            }
            console.log(result);
          }
        );
      });
    });
  });
};

exports.getPostInsights = () => {
  Functions.getPagesFromModel().then((pages) => {
    pages.forEach((page_obj) => {
      const post_ids = page_obj.posts;

      post_ids.forEach((element) => {
        return Facebook_service.getPostInsightsService(
          element,
          page_obj.token
        ).then((insights) => {
          Posts.findOneAndUpdate(
            { id: element },
            {
              insights: insights.insights.data,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
            (error, result) => {
              if (error) {
                console.log("Error : ", error);
              }
              console.log("Result : ", result);
            }
          );
        });
      });
    });
  });
};
