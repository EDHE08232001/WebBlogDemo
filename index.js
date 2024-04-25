import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan'; // Logging middleware

// Create an instance of express
const app = express();
const port = process.env.PORT || 3000;

// Derive the directory name from the module URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set the view engine to ejs and the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to log HTTP requests
app.use(morgan('dev'));

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing URL-encoded bodies (Express built-in parser)
app.use(express.urlencoded({ extended: true }));

// Route handlers could be moved to separate modules
app.get("/", (req, res) => {
    console.log("Serving home page.");
    res.render("index", { posts: [] }); // Simplified for demonstration
});

app.post("/create-post", (req, res) => {
    console.log("Creating a post.");
    // Example of adding error handling
    try {
        // Imagine this is an async operation:
        // await createPost(req.body.post);
        console.log("Post created successfully.");
        res.redirect("/");
    } catch (error) {
        console.error("Failed to create post:", error);
        res.status(500).send("Failed to create post.");
    }
});

app.get("/delete-post", (req, res) => {
    console.log("Deleting a post.");
    try {
        // Simulate deleting a post:
        console.log("Post deleted successfully.");
        res.redirect("/");
    } catch (error) {
        console.error("Failed to delete post:", error);
        res.status(500).send("Failed to delete post.");
    }
});

// Catch-all for undefined routes
app.get('*', (req, res) => {
    console.log(`404 - Page not found for ${req.originalUrl}`);
    res.status(404).send('404 Page Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`Internal server error: ${err.stack}`);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
