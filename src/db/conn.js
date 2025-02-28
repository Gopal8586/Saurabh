const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://gopalharsh8586:Gopal%4099190@vegbitedb.d3mwr.mongodb.net/vegbitedb?retryWrites=true&w=majority", {

})
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;
db.once("open", async () => {
    console.log("🔗 Connected to the database!");
});
