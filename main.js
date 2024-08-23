const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");

const PDFExtract = require("pdf.js-extract").PDFExtract;

const PORT = process.env.PORT || 4000;

app.get("/ping", async (req, res) => {
  res.send("pinged!!");
});

app.post("/upload_files", async (req, res) => {
  console.log("req.body", req.body);

  let data = [];
  req.on("data", (chunk) => {
    data.push(chunk);
  });

  req.on("end", () => {
    let fileData = Buffer.concat(data);
    console.log("total", fileData);

    const pdfExtract = new PDFExtract();
    const options = {};
    pdfExtract.extractBuffer(fileData, options, (err, data) => {
      if (err) return console.log(err);
      console.log(data);

      let all = "";
      data.pages.forEach((page) => {
        page.content.forEach((c) => {
          if (c.str === "") {
            all += " ";
          } else {
            all += `${c.str} `;
          }
        });
      });
      console.log(all);
      res.send(all);
    });
  });
});

app.get("/", (req, res) => {
  const p = path.join(__dirname, "./index.html");
  res.sendFile(p);
});

app.listen(PORT, () => {
  console.log("Listening on http://127.0.0.1:" + PORT);
});
