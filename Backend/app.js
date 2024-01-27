const express = require("express");
// const port = 3200
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");
var session = require("express-session");

const dotenv = require("dotenv");
const connectdb = require("./db/connectdb");
const web = require("./routes/web");
const cookieParser = require("cookie-parser");

// app.use(cookieParser())
app.use(express.json());
app.use(cors());

// image
app.use(fileUpload({ useTempFiles: true }));


// =================bodyparser setup=====================
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: false }));

//===================link public folder===============
app.use(express.static("public"));

dotenv.config({
  path: ".env",
});

connectdb();
app.use("/api", web);

app.listen(process.env.PORT, () => {
  console.log(`server started on localhost ${process.env.PORT}`);
});
