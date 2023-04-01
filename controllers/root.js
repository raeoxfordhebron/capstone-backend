const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.json({response: "get request to '/'"})
})

module.exports = router;