const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./routes/user");
const authRoute = require("./routes/auth");

const config = require("config");

mongoose
  .connect("mongodb://localhost/accenture_node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(`Mongoose error: ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 3000, async () => {
  try {
    console.log(
      `${process.env.PORT || 3000} ${config.get("jwtPrivateKey")} port is ready`
    );
  } catch (error) {
    console.log(`There is an error: ${error}`);
  }
});
