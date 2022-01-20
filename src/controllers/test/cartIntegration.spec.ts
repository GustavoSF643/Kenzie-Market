import { getConnection } from "typeorm";
import connection from "../../database";
import request from "supertest";
import app from "../../app";

describe("Testing the cart routes", () => {
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

    it("Should be able to add product in the cart if authenticated", async () => {
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

        const response = await request(app).post("/cart").send({
            productId: productResponse.body[0].id,
        }).set({ Authorization: `Bearer ${userToken}` });

        userId = response.body.userId;

        expect(response.status).toBe(200);
    });

    it("Should be able to get the cart informations if owner", async () => {
        const response = await request(app).get(`/cart/${userId}`).set({
            Authorization: `Bearer ${userToken}`
        });

        expect(response.status).toBe(200);
    });

    it("Should be able to see the cart list if admin", async () => {
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

        const response = await request(app).get(`/cart`).set({
            Authorization: `Bearer ${admToken}`
        });

        expect(response.status).toBe(200);
    });

    it("Should be able to remove product of cart if owner", async () => {
        const productResponse = await request(app).get("/product");

        const response = await request(app).delete(`/cart/${productResponse.body[0].id}`).set({
            Authorization: `Bearer ${userToken}`
        });

        expect(response.status).toBe(204);
    });
});