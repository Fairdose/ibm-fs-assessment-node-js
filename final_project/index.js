const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const isValid = require("./router/auth_users.js").isValid;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",
    session({
        secret: "fingerprint_customer",
        resave: true,
        saveUninitialized: true
    })
)

app.use("/customer/auth/*", function auth(req, res, next) {
    const { username } = req.body

    if (isValid(username) || req.session.user) {
        req.session.user = username;

        next()
    } else {
        res.send('Authentication failed');
    }
});

const PORT = 5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
