const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");
const fs = require("fs");
const sharp = require('sharp');

const PDFExtract = require("pdf.js-extract").PDFExtract;

const Tesseract = require("tesseract.js");

/* Tesseract.recognize('./pic.webp', "eng", {
  logger: (m) => {
    if (m.status === "recognizing text") {
      console.log(m.progress);
    }
  },
}).then(({ data: { text } }) => {
  console.log('text')
  console.log(text)
}); */

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

app.post("/upload_pic", async (req, res) => {
  console.log("req.body", req.body);

  let data = [];
  req.on("data", (chunk) => {
    data.push(chunk);
  });

  req.on("end", async () => {
    let fileData = Buffer.concat(data);
    console.log("total", fileData);

    const buffer = await sharp(fileData)

    console.log(buffer)

    buffer.toFile('lol.png')

    Tesseract.recognize('lol.png', "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          console.log(m.progress);
        }
      },
    }).then(({ data: { text } }) => {
      console.log('text')
      console.log(text)
      res.send(text)
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
