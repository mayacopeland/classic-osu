'use strict';
async function handle(req, res) {
    res.render("base", {
        page: "Register"
    })
}

module.exports = handle;