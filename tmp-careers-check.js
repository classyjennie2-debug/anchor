const fs = require('fs');
const http = require('http');
const boundary = '----careers-boundary';
const payload = [
  `--${boundary}\r\n`,
  'Content-Disposition: form-data; name="name"\r\n\r\n',
  'Test User\r\n',
  `--${boundary}\r\n`,
  'Content-Disposition: form-data; name="email"\r\n\r\n',
  'test@example.com\r\n',
  `--${boundary}\r\n`,
  'Content-Disposition: form-data; name="phone"\r\n\r\n',
  '1234567890\r\n',
  `--${boundary}\r\n`,
  'Content-Disposition: form-data; name="position"\r\n\r\n',
  'Remote Administrative Assistant\r\n',
  `--${boundary}\r\n`,
  'Content-Disposition: form-data; name="resumeLink"\r\n\r\n',
  'https://example.com\r\n',
  `--${boundary}\r\n`,
  'Content-Disposition: form-data; name="coverLetter"\r\n\r\n',
  'Hello from test\r\n',
  `--${boundary}\r\n`,
  'Content-Disposition: form-data; name="cv"; filename="README.md"\r\n',
  'Content-Type: text/markdown\r\n\r\n',
  fs.readFileSync('README.md', 'utf8'),
  '\r\n',
  `--${boundary}--\r\n`,
].join('');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/careers',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': Buffer.byteLength(payload),
  },
}, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`status=${res.statusCode}`);
    console.log(data);
    process.exit(0);
  });
});
req.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
req.write(payload);
req.end();
