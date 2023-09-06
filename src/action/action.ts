import { Dispatch } from 'redux';
import { fetchUserDataFromApi, fetchUserPostsFromApi } from '../services/ApiService.js';

export const sortPosts = (sortedPosts: any[]) => ({
  type: 'SORT_POSTS',
  payload: sortedPosts,
});

export const fetchUserData = () => async (dispatch: Dispatch) => {
  try {
    const userData = await fetchUserDataFromApi();
    dispatch({ type: 'FETCH_USER_DATA', payload: userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const fetchUserPosts = () => async (dispatch: Dispatch) => {
  try {
    const userPosts = await fetchUserPostsFromApi();
    dispatch({ type: 'FETCH_USER_POSTS', payload: userPosts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};

export const toggleSort = () => (dispatch: Dispatch, getState: any) => {
  const { postsData, sortByComments } = getState();
  const sortedPosts = [...postsData];

  if (sortByComments) {
    sortedPosts.sort((a, b) => a.comments - b.comments);
  } else {
    sortedPosts.sort((a, b) => b.comments - a.comments);
  }

  dispatch(sortPosts(sortedPosts));
};
