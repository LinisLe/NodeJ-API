const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require("cors")

const app = express();

app.use(cors({
  origin: '*'
}));


app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", async (req, res) => {
  if (!req.files?.pdfFile) {
    res.status(400);
    res.end();
  }

  pdfParse(req.files.pdfFile).then(result => {
    res.send(result.text);
  });
});


app.listen(5000);
