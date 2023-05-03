import { expect } from "chai"
import request from "supertest"
import app from "../src/server"

it("notfound", async function () {
    const res = await request(app).get("/")
    expect(res.status).to.equal(404)
    expect(res.text).to.equal("notfound")
})

describe("account", function () {
    const oldUser = { userId: "5", username: "wdqwe", password: "1" }
    describe("register", function () {
        // it("succes", async function () {
        // const newUser = {username:'er23e3e',password:'sx2eder'}
        //     const res = await request(app).post("/account/register").send({
        //         username: newUser.username,
        //         password: newUser.password,
        //     })

        //     expect(res.status).to.equal(302)
        //     expect(res.body).to.deep.equal({
        //         code: 0,
        //         message: "ok",
        //     })
        // })
        it("fail", async function () {
            const oldUser = { username: "q", password: "1" }
            const res = await request(app).post("/account/register").send({
                username: oldUser.username,
                password: oldUser.password,
            })

            expect(res.status).to.equal(400)
            expect(res.body).to.deep.equal({
                code: 1,
                message: "the username is already exist",
            })
        })
    })

    describe("login", function () {
        it("success", async function () {
            const user = { username: "q", password: "1" }
            const res = await request(app).post("/account/login").send({
                username: user.username,
                password: user.password,
            })

            expect(res.status).to.equal(200)
            expect(res.body).have.property("code", 0)
            expect(res.body).have.property("data")
            expect(res.body.data).have.property("token")
        })
    })

    describe("update password", function () {
        it("success", async function () {
            const newPassword = "1"
            const resLogin = await request(app).post("/account/login").send({
                username: oldUser.username,
                password: oldUser.password,
            })
            const token = resLogin.body.data.token
            const res = await request(app)
                .put("/account/update-password")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: oldUser.userId,
                    newPassword: newPassword,
                })

            expect(res.status).to.equal(200)
            expect(res.body).have.property("code", 0)
        })
    })
})
