import React, { useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);

  const togglePlatform = (platform) => {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSchedule = () => {
    if (!title || !content || !date || !time || platforms.length === 0) {
      alert("Please fill all required fields!");
      return;
    }

    const newPost = {
      title,
      content,
      image,
      date,
      time,
      platforms,
    };

    setScheduledPosts([...scheduledPosts, newPost]);

    // Clear fields
    setTitle("");
    setContent("");
    setImage(null);
    setDate("");
    setTime("");
    setPlatforms([]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Social Media Scheduler</h1>
      <p style={styles.subHeader}>
        Plan and schedule your social media content in one place
      </p>

      <div style={styles.mainGrid}>

        {/* Left Section — Create Post */}
        <div style={styles.card}>
          <h2>Create New Post</h2>

          {/* Title */}
          <label>Title</label>
          <input
            style={styles.input}
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Content */}
          <label>Content</label>
          <textarea
            style={styles.textarea}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Image Upload */}
          <label>Image (optional)</label>
          <div style={styles.imageBox}>
            {image ? (
              <img src={image} alt="preview" style={{ width: "100%" }} />
            ) : (
              "No image selected"
            )}
          </div>
          <input type="file" onChange={handleImageUpload} />

          {/* Platforms */}
          <label style={{ marginTop: 10 }}>Platforms</label>
          <div style={styles.platforms}>
            {["Twitter/X", "Facebook", "Instagram", "LinkedIn"].map((p) => (
              <button
                key={p}
                style={{
                  ...styles.platformBtn,
                  background: platforms.includes(p) ? "#0056D2" : "#fff",
                  color: platforms.includes(p) ? "#fff" : "#000",
                }}
                onClick={() => togglePlatform(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Date & Time */}
          <label>Date</label>
          <input
            type="date"
            style={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Time</label>
          <input
            type="time"
            style={styles.input}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          {/* Button */}
          <button style={styles.submitBtn} onClick={handleSchedule}>
            Schedule Post
          </button>
        </div>

        {/* Right Section — Scheduled Posts */}
        <div style={styles.card}>
          <h2>Scheduled Posts</h2>

          {scheduledPosts.length === 0 ? (
            <p>No posts scheduled. Create your first post!</p>
          ) : (
            scheduledPosts.map((post, index) => (
              <div key={index} style={styles.postCard}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.image && <img src={post.image} style={styles.postImage} />}
                <p>
                  <b>Platforms:</b> {post.platforms.join(", ")}
                </p>
                <p>
                  <b>Scheduled:</b> {post.date} at {post.time}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

/* ----------- STYLES ----------- */

const styles = {
  container: {
    padding: 30,
    fontFamily: "Arial",
  },
  header: {
    textAlign: "center",
    color: "#0047B3",
    marginBottom: 5,
  },
  subHeader: {
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 20,
    background: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: 100,
    padding: 10,
    margin: "8px 0",
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  imageBox: {
    width: "100%",
    height: 150,
    border: "1px dashed #aaa",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#666",
    marginBottom: 10,
  },
  platforms: {
    display: "flex",
    gap: 10,
    marginBottom: 15,
  },
  platformBtn: {
    padding: "8px 15px",
    borderRadius: 20,
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  submitBtn: {
    width: "100%",
    padding: 12,
    background: "#003DB3",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 15,
  },
  postCard: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    background: "#171414ff",
  },
  postImage: {
    width: "100%",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
};
