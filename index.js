const app = require('./server/app');

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at  ${PORT}`);