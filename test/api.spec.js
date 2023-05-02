import { expect } from "chai"
import request from "supertest"
import app from "../src/server" // Import the compiled server code

describe("GET /", function () {
    it('return "404 not found"', async function () {
        const res = await request(app).get("/")
        expect(res.status).to.equal(404)
        expect(res.text).to.equal("404 not found")
    })
})

describe("register", function () {
    it("register fail", async function () {
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

describe("login", function () {
    it("login success", async function () {
        const res = await request(app).post("/login").send({
            username: "q",
            password: "1",
        })

        expect(res.status).to.equal(302)
        expect(res.body).have.property("EM", "ok!")
        expect(res.body).have.property("EC", 0)
        expect(res.body).have.property("DT")
        expect(res.body.DT).have.property("username", "q")
        expect(res.body.DT).have.property("access_token")
    })
    it("login fail", async function () {
        const res = await request(app).post("/login").send({
            username: "q",
            password: "11",
        })

        expect(res.status).to.equal(401)
        expect(res.body).deep.equal({
            EM: "your username or password is not correct",
            EC: 1,
        })
    })
})