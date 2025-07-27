require("dotenv").config();
const app = require("./src/app.js");

const connectToDB = require("./src/config/db/db.js");
connectToDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`);
});