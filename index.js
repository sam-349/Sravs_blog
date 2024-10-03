const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Article = require("./models/articles.model");

app.use(express.json());

const port = 3001;

// const dbUrl =
//   "mongodb+srv://admin:admin123@backend-blog.8iu3f.mongodb.net/backend-blog";

// mongoose
//   .connect(dbUrl)
//   .then(() => {
//     console.log("DataBase connected!");
//     app.listen(port, () =>
//       console.log(`Example app listening on port ${port}!`)
//     );
//   })
//   .catch((err) => {
//     console.log("error occured", err);
//   });
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//  get
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Article.find();
    console.log(express.json(posts));
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts", error });
  }
});

// Get specific post

app.get("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const post = await Article.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).json({ message: "Error retrieving post", error });
  }
});

// post
app.post("/api/posts", async (req, res) => {
  try {
    const newPost = new Article(req.body);
    await newPost.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

// update  a post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updatedData = {
      ...req.body,
      updated: Date.now(),
    };
    const updatedPost = await Article.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server not Found", error });
  }
});

// del by id
app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Article.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});
