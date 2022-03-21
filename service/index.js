const SERVER_FETCHER = process.env.SERVER_FETCHER;
const axios = require("axios");

const getHeader = (token) => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: token,
  };
};

exports.getPageService = (pageId, token) => {
  return axios
    .get(SERVER_FETCHER + "/page/" + pageId, {
      headers: getHeader(token),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.getPagePostsService = (pageId, token) => {
  return axios
    .get(SERVER_FETCHER + "/page/" + pageId + "/posts/", {
      headers: getHeader(token),
    })
    .then(async (response) => {
      let paging = response.data.posts.paging;
      while (!!paging && !!paging.next) {
        await axios
          .get(paging.next)
          .then((res) => {
            res.data.data.forEach((e) => response.data.posts.data.push(e));
            paging = res.data.paging;
          })
          .catch((err) => console.log("Error fetching data posts"));
      }

      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.getPagePostCommentsService = (postId, token) => {
  return axios
    .get(SERVER_FETCHER + "/post/" + postId + "/comments/", {
      headers: getHeader(token),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.getPostReactionsService = (postId, token) => {
  return axios
    .get(SERVER_FETCHER + "/post/" + postId + "/reactions/", {
      headers: getHeader(token),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.getCommentReactionsService = (commentId, token) => {
  return axios
    .get(SERVER_FETCHER + "/comment/" + commentId + "/reactions/", {
      headers: getHeader(token),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.getUserProfileService = (userId, token) => {
  return axios
    .get(SERVER_FETCHER + "/user/" + userId + "/profile/", {
      headers: getHeader(token),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.getPageInsightsService = (pageId, token) => {
  return axios
    .get(SERVER_FETCHER + "/page/" + pageId + "/insights/", {
      headers: getHeader(token),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.getPostInsightsService = (postId, token) => {
  return axios
    .get(SERVER_FETCHER + "/post/" + postId + "/insights/", {
      headers: getHeader(token),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
