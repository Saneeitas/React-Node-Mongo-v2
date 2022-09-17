const express = require("express");
const app = express();

app.use(express.json());
app.use("/todo", require("./routes/todo"));
// app.use("/", require("./routes/home"));
// app.use("/login", require("./routes/login"));
// app.use("/register", require("./routes/register"));



app.listen(3000, () => {
  console.log(`App is running on port 3000`);
});
