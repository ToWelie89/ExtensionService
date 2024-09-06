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

## Read canvas text data

By taking a HTML canvas, converting it to an image buffer, that image buffer can be passed to the endpoint `/upload_pic_buffer` which will then use Tesseract to extract the text rom that buffer as an image.

Here's an example how you use it in your browser.

1. Open a Google docs document in your browser
2. Open the web tools console (F12)
3. Run the following script

```javascript
const runscript = async () => {
  const endpointRoot = 'https://extensionhelperservice-bfb10576355d.herokuapp.com';

  const c = document.querySelectorAll('canvas')[0]; // On Google docs the page in view is a canvas element, this will get the canvas element
  const c_as_img = c.toDataURL('image/png'); // Convert to image buffer
  let formData = new FormData();
  formData.append("mypic", c_as_img);

  // Send image buffer to the upload_pic_buffer endpoint
  const response = await fetch(`${endpointRoot}/upload_pic_buffer`, {
      method: "POST",
      body: formData
  });
  const text = await response.text();
  // This should print the text output returned from the service
  console.log(text);
}

runscript();
```

## Upload PDF or image files

You may also try to upload a PDF or image file directly using a web interface. Simply go to https://extensionhelperservice-bfb10576355d.herokuapp.com