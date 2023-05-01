import { expect } from "chai"
import request from "supertest"
import app from "../src/server" // Import the compiled server code

describe("GET /", function () {
    it('should return "404 not found"', async function () {
        const res = await request(app).get("/")
        expect(res.status).to.equal(200)
        expect(res.text).to.equal("404 not found")
    })
})
