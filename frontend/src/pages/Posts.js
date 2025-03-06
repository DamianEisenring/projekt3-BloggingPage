import React, { useEffect, useState } from "react";
import { getPosts, createPost, deletePost, likePost, getProfile } from "../api";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
        const profileData = await getProfile();
        if (profileData && profileData.email) {
          setUserEmail(profileData.email);
          const userLikes = postsData.filter((post) => post.likes.includes(profileData.email)).map((post) => post.id);
          setLikedPosts(new Set(userLikes));
        }
      } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
      }
    };

    fetchData();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const newPost = await createPost(title, text);
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setTitle("");
      setText("");
    } catch (err) {
      console.error("Fehler beim Erstellen des Beitrags:", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Fehler beim Löschen des Beitrags:", err);
    }
  };

  const handleLike = async (postId) => {
    if (likedPosts.has(postId)) return;
    try {
      const updatedPost = await likePost(postId);
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
      setLikedPosts((prevLikedPosts) => new Set([...prevLikedPosts, postId]));
    } catch (err) {
      console.error("Fehler beim Liken des Beitrags:", err);
    }
  };

  return (
    <div>
      <h2>Beiträge</h2>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button type="submit">Beitrag erstellen</button>
      </form>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.text}</p>
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post.id)} disabled={likedPosts.has(post.id)}>Like</button>
          {post.user?.email === userEmail && (
            <>
              <button onClick={() => handleDelete(post.id)}>Löschen</button>
              <button>Bearbeiten</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
