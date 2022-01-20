import { getConnection } from "typeorm";
import connection from "../../database";
import request from "supertest";
import app from "../../app";

describe("Testing the purchases routes", () => {
    beforeAll(async () => {
        await connection();
    });

    afterAll(async () => {
        const defaultConnection = getConnection("default");
        await defaultConnection.close();
    });

    let admToken = "";

    it("Should be able to send message if admin", async () => {
        const admData = {
            name: "teste",
            email: "teste@teste.com",
            password: "123456",
            isAdm: true,
        };

        const userData = {
            name: "teste",
            email: "testUser@teste.com",
            password: "123456",
            isAdm: false,
        };

        await request(app).post("/user").send(admData);

        await request(app).post("/user").send(userData);

        const loginResponse = await request(app).post("/login").send({
            email: "teste@teste.com",
            password: "123456"
        });

        admToken = loginResponse.body.token;

        const response = await request(app).post(`/email`).send({
            userEmail: userData.email,
            message: "test message",
        }).set({
            Authorization: `Bearer ${admToken}`
        });

        expect(response.status).toBe(200);
    });

});