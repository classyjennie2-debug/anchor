import fs from 'fs'
import path from 'path'

const url = 'http://127.0.0.1:3000/api/careers'
const cvPath = path.resolve(process.cwd(), 'README.md')
const cvData = fs.readFileSync(cvPath)
const formData = new FormData()
formData.append('name', 'Test User')
formData.append('email', 'test@example.com')
formData.append('phone', '1234567890')
formData.append('position', 'Remote Administrative Assistant')
formData.append('resumeLink', 'https://example.com')
formData.append('coverLetter', 'Hello from test')
formData.append('cv', new File([cvData], 'test-cv.txt', { type: 'text/plain' }))

const response = await fetch(url, {
  method: 'POST',
  body: formData,
  headers: formData.getHeaders?.() ?? {},
})

const body = await response.text()
console.log('status', response.status)
console.log('headers', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2))
console.log('body', body)

