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

    it("Anyone should be able to request recovery password token", async () => {
        const userData = {
            name: "teste",
            email: "testUser@teste.com",
            password: "123456",
            isAdm: false,
        };

        await request(app).post("/user").send(userData);

        const response = await request(app).post(`/recuperar`).send({
            email: userData.email
        });

        expect(response.status).toBe(200);
    });
});