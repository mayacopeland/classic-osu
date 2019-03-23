
async function handle(req, res) {
    res.render("base", {
        page: "About",
    })
}

module.exports = handle;