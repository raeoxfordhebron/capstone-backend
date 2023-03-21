const urlWhitelist = [""]

const methodWhitelist = ["GET", "PUT", "POST", "DELETE", "PATCH", "HEAD"]

const corsOptions = {
    origin: function(origin, callback) {
        if (urlWhitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    methods: methodWhitelist,
    credentials: true
}

module.exports = corsOptions