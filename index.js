const server = require('./server.js');

server.listen(process.env.PORT || 4000, () => {
    console.log('\n Server running on http://localhost:4000');
});