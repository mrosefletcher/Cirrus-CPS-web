import {
    S3Client,
    PutObjectCommand,
  } from "@aws-sdk/client-s3";
import express from "express";
import bodyParser from "body-parser"


const app = express();
app.use(bodyParser.text({type:"*/*"}));

 // A region and credentials can be declared explicitly. For example
  // `new S3Client({ region: 'us-east-1', credentials: {...} })` would
  // initialize the client with those settings. However, the SDK will
  // use your local configuration and credentials if those properties
  // are not defined here.


const s3Client = new S3Client({ region: 'us-west-2',   credentials: {
  accessKeyId: "AKIAUJ3VUV3RTK6INZP2", 
  secretAccessKey: "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",
},});

const port = 8099;
app.get('/', (req, res) => {
  console.log("GET request recieved");
  res.status(200).send("Hello, your S3 POST listener is still alive!");
});

app.listen(port, () => {console.log (`App now listening on ${port}\n`);});

app.post('/', async (req, res) => {
  console.log(`req.body: ${req.body}`);
  await s3Client.send(
    new PutObjectCommand({
      Bucket: "cps-web-server-target",
      Key: `${Date.now()}.txt`,
      Body: `${req.body}`,
    }));

  res.end("ended post");
});