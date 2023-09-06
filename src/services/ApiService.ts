const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUserDataFromApi = async () => {
  const response = await fetch(`${BASE_URL}/users/1`);
  const data = await response.json();
  return data;
};

  
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: number;
}

export const fetchUserPostsFromApi = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=1`);
    const postsData = await response.json();

    // Add a random number of comments to each post
    const postsWithRandomComments: Post[] = postsData.map((post: Post) => ({
      ...post,
      comments: Math.floor(Math.random() * 100) + 1,
    }));

    return postsWithRandomComments;
  } catch (error) {
    throw new Error('Error fetching user posts: ' + error);
  }
};
