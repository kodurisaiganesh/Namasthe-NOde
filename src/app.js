const express = require('express');
const server = express();

const { auth, userauth } = require('./middlewears/auth');

// Admin middleware for all /admin routes
server.use("/admin", auth);

// User route
server.get("/user", userauth, (req, res) => {
    console.log("Hello User data");
    res.send("User data sent successfully");
});

// Admin route - get data
server.get("/admin/getdata", (req, res) => {
    res.send("All data sent");
});

// Admin route - delete data
server.get("/admin/deletedata", (req, res) => {
    console.log("Deleting the data");
    res.send("All user data deleted");
});

// Server listener
server.listen(4444, () => {
    console.log("Server Running");
});
