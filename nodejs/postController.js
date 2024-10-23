const posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'}
];

const getPosts = () => posts;
export const getPostsLength = () => {
    return posts.length;
}
export default getPosts;