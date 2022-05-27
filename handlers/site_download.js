'use strict';

async function handle(req, res) {
    res.render("base", {
        page: "Download"
    })
}

module.exports = handle;