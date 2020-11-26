import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  console.log("about to fetch posts");
  await dispatch(fetchPosts()); //make sure we wait for API request is completed

  const userIds = _.uniq(_.map(getState().posts, "userId"));

  userIds.forEach((id) => dispatch(fetchUser(id)));

  console.log("fetched posts!");
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

//Totally fine to have normal actions w/o middlewartes as well

// export const selectPost = () =>{
//  return {
//    type: 'SELECT_POST'
//  }
// }

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

// non-working memoized
// export const fetchUser = function (id) { //notice 2 functions to memoize, outer and inner
//   return _.memoize(async function (dispatch) {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: "FETCH_USER", payload: response.data });
//   });
// };

//working memoized version
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
