const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleRequest(req, res) {
  const { method, url } = req;

  
  if (method === "POST" && url === "/register") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { email, password } = JSON.parse(body);

        
        if (!email || !password) {
          return send(res, 400, { message: "Email and password are required." });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return send(res, 409, { message: "User already exists." });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        send(res, 201, { message: "User registered successfully!" });
      } catch (err) {
        console.error(err);
        send(res, 500, { message: "Something went wrong." });
      }
    });
  }


  else {
    send(res, 404, { message: "Route not found" });
  }
}

// Reusable response function
function send(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

module.exports = { handleRequest };
