const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");
const fs = require("fs");
const sharp = require('sharp');

const PDFExtract = require("pdf.js-extract").PDFExtract;

const Tesseract = require("tesseract.js");

const PORT = process.env.PORT || 4000;

const readTextFromImage = async (source) => {
  const resp = await Tesseract.recognize(source, "eng", {
    logger: (m) => {
      if (m.status === "recognizing text") {
        console.log(m.progress);
      }
    },
  });
  
  const text = resp.data.text;
  console.log('text')
  console.log(text)
  return text;
}

const readTextFromPdf = async (pdfBuffer) => new Promise(resolve => {
  const pdfExtract = new PDFExtract();
  const options = {};

  pdfExtract.extractBuffer(pdfBuffer, options, async (err, data) => {
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
    resolve(all);
  });
})

app.get("/ping", async (req, res) => {
  res.send("pinged!!");
});

app.post("/upload_pdf", async (req, res) => {
  console.log("req.body", req.body);

  const fileData = req.files.mypdf.data;

  const text = await readTextFromPdf(fileData);
  res.send(text);
});

app.post("/upload_pic", async (req, res) => {
  console.log("req.body", req.body);

  let fileData = req.files.mypic.data;
  console.log("total", fileData);

  const text = await readTextFromImage(fileData);
  res.send(text);
});

app.get("/read_pic_by_url", async (req, res) => {
  console.log("req.body", req.body);

  let url = req.body.url;

  const text = await readTextFromImage(url);
  res.send(text);
});

app.get("/read_pdf_by_url", async (req, res) => {
  console.log("req.body", req.body);

  let url = req.body.url;

  const pdfRespone = await fetch(url);
  const pdfBuffer = await pdfRespone.arrayBuffer();

  const text = await readTextFromPdf(pdfBuffer);
  res.send(text);
});

app.get("/", (req, res) => {
  const p = path.join(__dirname, "./index.html");
  res.sendFile(p);
});

app.listen(PORT, () => {
  console.log("Listening on http://127.0.0.1:" + PORT);
});
