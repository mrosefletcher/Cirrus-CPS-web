import {
    S3Client,
    PutObjectCommand,
  } from "@aws-sdk/client-s3";
import express from "express";
import bodyParser from "body-parser"
import { format} from "date-fns";


const PORT = 8099;
const BUCKET = "cps-web-server-target";

const app = express();
app.use(bodyParser.text({type:"*/*"}));

// A region and credentials can be declared explicitly. For example
  // `new S3Client({ region: 'us-east-1', credentials: {...} })` would
  // initialize the client with those settings. However, the SDK will
  // use your local configuration and credentials if those properties
  // are not defined here.
const s3Client = new S3Client({ region: 'us-west-2' });

app.get('/', (req, res) => {
  console.log("GET request recieved");
  res.status(200).send("Hello, your S3 POST listener is still alive!");
});

app.listen(PORT, () => {console.log (`App now listening on ${PORT}\n`);});

app.post('/', async (req, res) => {
  let today = new Date();
  let uploadName = `${format(today, "yyyyMMdd_HHmmssSSS")}`;
  let timestamp = `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`;
  
  console.log(`${timestamp}: Recieved POST from ${req.socket.remoteAddress}`);

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: `${uploadName}.txt`,
        Body: `${req.body}`,
      }));

    res.end("POST successful");
    console.log("No errors encountered\n");

  } catch (e) {
    res.status(500).send(`Server encountered an error: ${e.name}.`);
    console.error(`ERROR: ${e.toString()}
      Request size: ${req.socket.bytesRead} bytes
      Source IP: ${req.socket.remoteAddress}
      Content type: ${req.header('Content-type')}
      User-agent: ${req.header('user-agent')}\n`);
  }
 });