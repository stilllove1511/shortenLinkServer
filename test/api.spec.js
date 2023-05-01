import { expect } from "chai"
import request from "supertest"
import app from "../src/server" // Import the compiled server code

describe("GET /", function () {
    it('should return "404 not found"', async function () {
        const res = await request(app).get("/")
        expect(res.status).to.equal(404)
        expect(res.text).to.equal("404 not found")
    })
})

describe("GET /register", function () {
    it("register should be fail", async function () {
        const res = await request(app).post("/register").send({
            username: "q",
            password: "1",
        })

        expect(res.status).to.equal(400)
        expect(res.body).to.deep.equal({
            EM: "the username is already exist",
            EC: 1,
        })
    })
})

describe("GET /register", function () {
    it("login should be success", async function () {
        const res = await request(app).post("/login").send({
            username: "q",
            password: "1",
        })

        expect(res.status).to.equal(302)
    })
})
