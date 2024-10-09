const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db");
const cors = require("cors");
const user = require("./api/routes/userRoute")

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser())

connectDB();
const PORT = process.env.PORT || 5000;
console.log("🚀 ~ PORT:", PORT);

app.use('/',user);

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
