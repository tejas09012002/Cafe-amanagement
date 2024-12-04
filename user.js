// const express = require('express');
// const connection = require('../connection');
// const router = express.Router();

// router.post("/signup", (req, res) => {
//     let user = req.body;
//     query = "select email, password, role, status from user where email=?"
//     connection.query(query, [user, email], (err, results) => {
//         if (!err) {
//             if (results.length <= 0) {
//                 query = "insert into user(name, contactNumber, email, password, status ,role) values(?,?,?,?,'false','user')"
//                 connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
//                     if (!err) {
//                         return res.status(200).json({ message: "Successfully registerred" });
//                     }
//                     else {
//                         return res.status(500).json(err);
//                     }
//                 })
//             }
//             else {
//                 return res.status(400).json({ message: "Email ALready Exist" });
//             }
//         }
//         else {
//             return res.status(500).json(err)
//         }
//     })

// })
// module.exports = router;

const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post("/signup", (req, res) => {
    let user = req.body;

    // Check if email already exists
    const query = "SELECT email, password, role, status FROM user WHERE email=?";
    connection.query(query, [user.email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Insert new user into the database
        const insertQuery = `
            INSERT INTO user (name, contactNumber, email, password, status, role)
            VALUES (?, ?, ?, ?, 'false', 'user')
        `;
        connection.query(
            insertQuery,
            [user.name, user.contactNumber, user.email, user.password],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to register user", details: err });
                }
                return res.status(200).json({ message: "Successfully registered" });
            }
        );
    });
});

module.exports = router;
