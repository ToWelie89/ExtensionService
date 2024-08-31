# Example usage

Currently deployed on Heroku with the URL https://extensionhelperservice-bfb10576355d.herokuapp.com

## Fetch image text content by URL

Make a GET request to https://extensionhelperservice-bfb10576355d.herokuapp.com/read_pic_by_url with the pictures URL as a form variable called url.

Example:

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("url", "https://i.sstatic.net/IvV2y.png"); // example image URL

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://extensionhelperservice-bfb10576355d.herokuapp.com/read_pic_by_url", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

The example above will return the text in the image, if one was found.

## Fetch PDF content as text by pdf-URL

Make a GET request to https://extensionhelperservice-bfb10576355d.herokuapp.com/read_pdf_by_url with the pdf-files URL as a form variable called url.

Example:

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("url", "https://martinsonesson.se/testpdf.pdf"); // example PDF url

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://extensionhelperservice-bfb10576355d.herokuapp.com/read_pdf_by_url", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

The example above will return the text content of the PDF as a string.

## Upload PDF or image files

You may also try to upload a PDF or image file directly using a web interface. Simply go to https://extensionhelperservice-bfb10576355d.herokuapp.com