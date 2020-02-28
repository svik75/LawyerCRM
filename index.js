const app = require('./app')
const port = process.env.PORT || 3000
app.listen(port, () => console.log('Web server started on port 3000'))