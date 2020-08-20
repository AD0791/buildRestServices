const express = require("express");
const app = express();




app.get('/', (req, res) => {
    res.send("let's get busy");
});





// env variables
// terminal: $export PORT=5000
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Port is open ${port}`);
})