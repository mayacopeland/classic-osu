
async function handle(req, res) {
    res.render("base", {
        page: "FAQ"
    })
}

module.exports = handle;