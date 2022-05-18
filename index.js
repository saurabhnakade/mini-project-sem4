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
    var files = req.files.file;
    var folderName = "uploads/" + req.body.folder + "/";
    console.log(folderName);
    try {
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
      }
    } catch (err) {
      console.error(err);
    }
    if(files.length){
      files.forEach((file) => {
        var filename = file.name;
        file.mv("./" + folderName + filename, function (err) {
          if (err) {
            res.send(err);
          }
        });
      });
    }else{
      var filename = files.name;
      files.mv("./" + folderName + filename, function (err) {
        if (err) {
          res.send(err);
        } 
      });
    }
    
    res.send("File Uploaded");
  }
});

app.listen(3000);
