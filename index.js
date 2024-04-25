// Import necessary modules
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// Create an instance of express
const app = express();
const port = process.env.PORT || 3000;

// Temporary storage for posts
let posts = [];

// Derive the directory name from the module URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set the view engine to ejs and the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing URL-encoded bodies (Express built-in parser)
app.use(express.urlencoded({ extended: true }));

// Route to display all posts
app.get("/", (req, res) => {
    console.log("Serving home page.");
    res.render("index", { posts: posts }); // Ensure that the view file is named index.ejs
});

// Route to handle post creation
app.post("/create-post", (req, res) => {
    console.log("Attempting to create a post.");
    const post = req.body.post; // Assuming 'post' is the name of your form field
    if (post) { // Ensuring that an empty post cannot be added
        posts.push(post); // Add the new post to the array
        console.log("Post added successfully.");
    }
    res.redirect("/"); // Redirect back to the homepage to display all posts
});

// Route to handle post deletion
app.get("/delete-post", (req, res) => {
    console.log("Attempting to delete a post.");
    const postIndex = parseInt(req.query.postIndex);
    if (postIndex >= 0 && postIndex < posts.length) {
        posts.splice(postIndex, 1); // Remove the post at the specified index
        console.log("Post deleted successfully.");
    }
    res.redirect("/");
});

// Catch-all route to handle all other requests not covered above
app.get('*', (req, res) => {
    console.log(`404 - Page not found for ${req.originalUrl}`);
    res.status(404).send('404 Page Not Found'); // Handling undefined routes
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`Internal server error: ${err}`);
    res.status(500).send('Internal Server Error');
});

// Start the server on the specified port
app.listen(port, () => {
    console.log(`App is up at port ${port}`);
});
