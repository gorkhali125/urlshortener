// Read the host address and the port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbport = process.env.DB_PORT;

exports = module.exports = { hostname, port, dbname, dbuser, dbpass, dbport };
