const express = require("express");
const upload = require("express-fileupload");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(upload());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;
    var folderName = 'uploads/'+req.body.folder + "/";
    console.log(folderName)
    try {
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
      }
    } catch (err) {
      console.error(err);
    }
    file.mv("./"+folderName + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("File Uploaded");
      }
    });
  }
});

app.listen(3000);
