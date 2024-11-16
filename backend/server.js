const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],  
  credentials: false,
}));
app.use(express.json());
app.get("/", (req, res)=>{
  res.json({
    "message" : "deployment working perfectly, yaaayyyy"
  })
})
 
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

