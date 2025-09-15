const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')



dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));



const authRoutes=require('./routes/authRoutes')
const placementRoutes=require('./routes/placementRoutes')
const experienceRoutes = require("./routes/experienceRoutes");
const questionRoutes = require("./routes/questionRoutes");
const tipRoutes = require("./routes/tipRoutes");




app.use('/api/auth',authRoutes)
app.use('/api/placements',placementRoutes)
app.use("/api/experiences", experienceRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tips", tipRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));
