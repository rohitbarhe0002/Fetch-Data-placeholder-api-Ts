import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, fetchUserPosts, toggleSort } from '../../action/action.ts';
import './userPosts.css';

interface RootState {
  loading: boolean;
  userData: {
    name: string;
    email: string;
    address?: {
      city: string;
    };
  };
  postsData: Array<{
    id: number;
    title: string;
    body: string;
    comments?: number;
  }>;
  sortByComments: boolean;
  sortByTitles: boolean;
}
interface Postdata {
    id: number;
    title: string;
    body: string;
    comments?: number;
  }

const UserPosts: React.FC = () => {
  const dispatch = useDispatch();
  const {
    loading,
    userData,
    postsData,
    sortByComments,
    sortByTitles,
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchUserPosts());
  }, [dispatch]);

  const sortPostsByComments = () => {
    dispatch(toggleSort());
    const sortedPosts = [...postsData];

    if (sortByComments) {
      // Sort posts in ascending order based on comments
      sortedPosts.sort((a, b) => (a.comments || 0) - (b.comments || 0));
    } else {
      // Sort posts in descending order based on comments
      sortedPosts.sort((a, b) => (b.comments || 0) - (a.comments || 0));
    }

    dispatch({ type: 'SORT_POSTS', payload: sortedPosts });
  };

  const sortPostsBytitle = () => {
    dispatch({ type: 'TOGGLE_SORT_BY_TITLE' });
    const sortedPosts = [...postsData];

    if (sortByTitles) {
      // Sort posts in ascending order based on titles
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Sort posts in descending order based on titles
      sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Dispatch an action to update the sorted posts in the Redux store
    dispatch({ type: 'SORT_POSTS', payload: sortedPosts });
  };

  return (
    <div className="user-posts-container">
      {loading ? (: any
        <div: any className="loader">Loading...: any[]: any</div>
      ) : (
        <>
          <div className="user-details">
            <h2>name: {userData.name}</h2>
            <p>Email: {userData.email}</p>
            <p>City: {userData.address?.city}</p>
          </div>
          <button onClick={sortPostsByComments} className="sort-button">
            Sort by Comments {sortByComments ? '▲' : ' ▼'}
          </button>
          <button onClick={sortPostsBytitle} className="sort-button">
            Sort by Title {sortByTitles ? '▲' : ' ▼'}
          </button>
          <div className="user-posts-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {postsData.map((post:Postdata) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>{post?.comments || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPosts;
