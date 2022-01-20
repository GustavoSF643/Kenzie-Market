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

    let userId = "";
    let userToken = "";
    let admToken = "";

    it("Should be able to make purchase if user cart created", async () => {
        await request(app).post("/user").send({
            name: "teste",
            email: "testUser@teste.com",
            password: "123456",
            isAdm: false,
        });

        const loginResponse = await request(app).post("/login").send({
            email: "testUser@teste.com",
            password: "123456"
        });

        userToken = loginResponse.body.token;

        const productResponse = await request(app).get("/product");

        const cartResponse = await request(app).post("/cart").send({
            productId: productResponse.body[0].id,
        }).set({ Authorization: `Bearer ${userToken}` });   

        userId = cartResponse.body.userId;

        const response = await request(app).post("/buy").set({
            Authorization: `Bearer ${userToken}`
        });

        expect(response.status).toBe(200);
    });

    it("Should be able to get the purchases informations if owner", async () => {
        const response = await request(app).get(`/buy/${userId}`).set({
            Authorization: `Bearer ${userToken}`
        });

        expect(response.status).toBe(200);
    });

    it("Should be able to see the purchases list if admin", async () => {
        await request(app).post("/user").send({
            name: "teste",
            email: "teste@teste.com",
            password: "123456",
            isAdm: true,
        });

        const loginResponse = await request(app).post("/login").send({
            email: "teste@teste.com",
            password: "123456"
        });

        admToken = loginResponse.body.token;

        const response = await request(app).get(`/buy`).set({
            Authorization: `Bearer ${admToken}`
        });

        expect(response.status).toBe(200);
    });

});