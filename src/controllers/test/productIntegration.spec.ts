import { getConnection } from "typeorm";
import connection from "../../database";
import request from "supertest";
import app from "../../app";

describe("Testing the product routes", () => {
    beforeAll(async () => {
        await connection();
    });

    afterAll(async () => {
        const defaultConnection = getConnection("default");
        await defaultConnection.close();
    });

    let productId = "";

    it("Should be able to create a new product if admin", async () => {
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

        const response = await request(app).post("/product").send({
            name: "Refrigerante",
            description: "Refrigerante de laranja.",
            price: 6.5
        }).set({ Authorization: `Bearer ${loginResponse.body.token}` });

        productId = response.body.id;

        expect(response.status).toBe(201);
    });

    it("Anyone should be able to get the product informations", async () => {
        const response = await request(app).get(`/product/${productId}`);

        expect(response.status).toBe(200);
    });

    it("Anyone should be able to see the product list.", async () => {
        const response = await request(app).get(`/product`)

        expect(response.status).toBe(200);
    });
});