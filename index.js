const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Welcome to the shift saver, remember, we just need a C'))

app.listen(port, () => console.log(`Shift Saver running on  ${port}, press ctl-C to stop the server.`))