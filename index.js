const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:"1a",
        username: "Sourabh",
        content: "Consistency is the Key!",
    },
    {
        id:"2b",
        username: "Sankeerth",
        content: "Hard Work is important to achieve Success...",
    },
    {
        id:"3c",
        username: "Rohith",
        content: "I got selected for my 1st internship!",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// app.post("/posts", (req, res) => {
//     const { username, content } = req.body;
//     posts.push({ username, content });
//     res.redirect("/posts");
// });

// app.post("/posts", (req, res) => {
//     const { username, content } = req.body;
//     const newPost = {
//         id: (posts.length + 1).toString(), // Generate unique ID
//         username,
//         content
//     };
//     posts.push(newPost);
//     res.redirect("/posts");
// });

// app.get("/posts/:id", (req, res) => {
//     let {id}=req.params;
//     let post = posts.find((p)=>id==p.id);
//     res.render("show.ejs", { post });
// });

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const newPost = {
        id: (posts.length + 1).toString(), // Generate unique ID
        username,
        content
    };
    posts.push(newPost);
    console.log("New post added:", newPost);
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    console.log("Fetching post with ID:", id);
    const post = posts.find((p) => p.id === id);
    if (post) {
        console.log("Post found:", post);
        res.render("show.ejs", { post });
    } else {
        console.log("Post not found");
        res.status(404).send("Post not found");
    }
});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
