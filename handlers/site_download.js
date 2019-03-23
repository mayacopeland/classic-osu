
async function handle(req, res) {
    res.render("base", {
        page: "Download",
        downloadUrl: require("../config.json").site.clientDownload
    })
}

module.exports = handle;