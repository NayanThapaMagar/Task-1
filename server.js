const express = require("express");
const app = express();
app.use(express.json());

const register = require("./register");
const login = require("./login");

app.post("/register", register);

app.post("/login", login);

const PORT = 3002;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));