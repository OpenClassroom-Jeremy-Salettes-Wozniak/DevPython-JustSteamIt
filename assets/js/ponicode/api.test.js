const rewire = require("rewire")
const api = rewire("../api")
const LesMeuilleursFilms = api.__get__("LesMeuilleursFilms")
// @ponicode
describe("LesMeuilleursFilms", () => {
    test("0", async () => {
        await LesMeuilleursFilms()
    })
})
