const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema.js");
//Cross-origin resource sharing
//Enable server port (5000) response the request from other port
const cors = require("cors");
// a default module in nodes
const path = require("path");

const app = express();

// 1.Allow cross-origin
app.use(cors());

//2
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

//3.redirect the req to a static folder
app.use(express.static("public"));

//redirect the res to use html in public
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
