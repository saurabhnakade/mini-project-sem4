const express = require("express");
const upload = require("express-fileupload");
const fs = require("fs");

const decompress = require("decompress");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(upload());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  if (req.files) {
    var files = req.files.file;
    
    var filename = files.name;
    files.mv("./uploads/temp/"+filename, function (err) {
      if (err) {
        res.send(err);
      }
    });

    decompress("./uploads/temp/"+ filename, "./uploads/").then((files) => {
      console.log("Done Decompressing");
    });

    // fs.unlink("./uploads/temp/"+filename, function (err) {
    //   if (err) throw err;
    //   console.log("File deleted!");
    // });

    res.send("File Uploaded");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
