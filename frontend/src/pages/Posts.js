import React, { useEffect, useState } from "react";
import { getPosts, createPost, deletePost, likePost, getProfile } from "../api";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [editingPost, setEditingPost] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
        const profileData = await getProfile();
        if (profileData && profileData.email) {
          setUserEmail(profileData.email);
          const userLikes = postsData
            .filter((post) => post.likes.includes(profileData.email))
            .map((post) => post.id);
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
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8081/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.ok) {
      alert("Post wurde gelöscht");
      setPosts(posts.filter((post) => post.id !== postId));
    } else {
      alert("Fehler: Du kannst nur deine eigenen Posts löschen!");
    }
  };

  const handleEdit = (post) => {
    console.log("Post-Daten:", post); // Debugging
    console.log("Eingeloggter User:", userEmail); // Debugging

    if (!post.createdBy) {
      alert("Fehler: Post-Daten sind unvollständig.");
      return;
    }

    if (post.createdBy !== userEmail) {
      alert("Fehler: Du kannst nur deine eigenen Beiträge bearbeiten!");
      return;
    }

    setEditingPost(post);
    setTitle(post.title);
    setText(post.text);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/posts/${editingPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ title, text }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          )
        );
        setEditingPost(null);
        setTitle("");
        setText("");
      } else {
        console.error("Fehler beim Aktualisieren des Beitrags.");
      }
    } catch (err) {
      console.error("Fehler beim Bearbeiten des Beitrags:", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const hasLiked = likedPosts.has(postId);
      const response = await fetch(
        `http://localhost:8081/posts/${postId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Liken");
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id
            ? { ...post, likes: updatedPost.likes }
            : post
        )
      );

      setLikedPosts((prevLikedPosts) => {
        const newLikes = new Set(prevLikedPosts);
        if (hasLiked) {
          newLikes.delete(postId);
        } else {
          newLikes.add(postId);
        }
        return newLikes;
      });
    } catch (err) {
      console.error("Fehler beim Liken/Entliken:", err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Falls du eine Login-Seite hast
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/auth/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ newEmail, newPassword }),
      });
  
      if (response.ok) {
        alert("Profil aktualisiert! Bitte neu einloggen.");
        localStorage.removeItem("token");  // Token entfernen
        window.location.href = "/login";  // Zum Login umleiten
      } else {
        alert("Fehler beim Aktualisieren des Profils.");
      }
    } catch (err) {
      console.error("Fehler beim Bearbeiten des Profils:", err);
    }
  };
  

  return (
    <div className="container">
    <button onClick={() => setEditingProfile(!editingProfile)}>
      Profil bearbeiten
    </button>
    <button onClick={handleLogout}>Logout</button>
  
    {editingProfile && (
      <form onSubmit={handleUpdateProfile} className="profile-edit">
        <input
          type="email"
          placeholder="Neue E-Mail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Neues Passwort"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Speichern</button>
      </form>
    )}
  
    <h2>Beiträge</h2>
    <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost}>
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
      <button type="submit">
        {editingPost ? "Änderungen speichern" : "Beitrag erstellen"}
      </button>
      {editingPost && (
        <button onClick={() => setEditingPost(null)}>Abbrechen</button>
      )}
    </form>
  
    {posts.map((post) => (
      <div key={post.id} className="post">
        <h3>{post.title}</h3>
        <p>{post.text}</p>
        <p>Erstellt von: {post.createdBy}</p>
        <button className="like-button" onClick={() => handleLike(post.id)}>
          {likedPosts.has(post.id) ? "❤️ Unlike" : "🤍 Like"} ({post.likes.length})
        </button>
        {post.createdBy === userEmail && (
          <div>
            <button onClick={() => handleEdit(post)}>Bearbeiten</button>
            <button onClick={() => handleDelete(post.id)}>Löschen</button>
          </div>
        )}
      </div>
    ))}
  </div>
  
  );
};

export default Posts;
