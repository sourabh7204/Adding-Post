const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Sourabh",
        content: "Consistency is the Key!",
        likes: 0,
    },
    {
        id: uuidv4(),
        username: "Sankeerth",
        content: "Hard Work is important to achieve Success...",
        likes: 0,
    },
    {
        id: uuidv4(),
        username: "Rohith",
        content: "I got selected for my 1st internship!",
        likes: 0,
    },
];

// Display all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// Create a new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content, likes: 0 });
    res.redirect("/posts");
});

// Search posts
app.get("/posts/search", (req, res) => {
    let { query } = req.query;
    let filteredPosts = posts.filter((p) =>
        p.content.toLowerCase().includes(query.toLowerCase())
    );
    res.render("search.ejs", { posts: filteredPosts });
});


// Like a post
app.patch("/posts/:id/like", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    if (post) {
        post.likes++;
    }
    res.redirect("/posts");
});

// View a single post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });
});

// Update post content
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    if (post) {
        post.content = newContent;
    }
    res.redirect("/posts");
});

// Edit post
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
