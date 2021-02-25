import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  it("Should be able to create a user with exists email", async () => {
    const response = await request(app).post("/users")
      .send({
        name: "User example",
        email: "User@example.com"
      });
    
    expect(response.status).toBe(400);
  });
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users")
      .send({
        name: "User example",
        email: "User@example.com"
      });
  });

});