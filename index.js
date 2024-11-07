import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Initializing array that will contain all user's posts
let postArray = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: postArray,
  });
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    const username = req.body["username"];
    let content = req.body["content"];

    let post = {
        username: username,
        content: content
    };
    
    postArray.push(post);

    res.render("index.ejs", {
        posts: postArray
    });
});

app.post("/delete", (req, res) => {
  const index = req.body["postIndex"];
  console.log(req.body);
  console.log(index);

  if (index >= 0 && index < postArray.length) {
    postArray.splice(index, 1);
  };

  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const index = req.params.id;
    const post = postArray[index];

    if (post) {
        res.render("edit.ejs", {
            post: post,
            index: index,
        });
    } else {
        res.redirect("/");
    }
});

app.post("/patch", (req, res) => {
    const index = req.body.index;
    const updatedContent = req.body.content;

    if (index >= 0 && index < postArray.length) {
        postArray[index].content = updatedContent;
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});