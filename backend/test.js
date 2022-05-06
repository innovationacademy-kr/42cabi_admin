const express = require("express");
const app = express();

app.get("/:id/:cabinet_id", (req, res) => {
  const { a } = req.params;
  console.log(req.params);
  const { b, c } = req.params;
  console.log(b, c);
  res.send("Hello World!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
