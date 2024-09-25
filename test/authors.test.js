import supertest from "supertest";
import app from "../src/index.js";
import dotenv from "dotenv";
dotenv.config();

const tokenValue = process.env.ADMIN_TOKEN;

const request = supertest(app);

describe("Authors API", function () {
    let authorId; // Variable to store the ID of a created user
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    it("should get all authors", function (done) {
        request
            .get("/api/authors/getAuthors")
            .set("Authorization", `Bearer ${tokenValue}`)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("should create a new author", function (done) {
        const author = {
            name: "Test Author",
            email: uniqueEmail,
            password: 'password123',
            roles: 'author'
        };
        request
            .post("/api/authors/createAuthor")
            .set("Authorization", `Bearer ${tokenValue}`)
            .send(author)
            .expect("Content-Type", /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                authorId = res.body.data.id;
                done();
            })
    });

    it("should get a author by ID", function (done) {
        request
            .get(`/api/authors/getAuthorById/${authorId}`)
            .set("Authorization", `Bearer ${tokenValue}`)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("should update a author by ID", function (done) {
        const author = {
            name: "Updated Author",
            email: uniqueEmail,
            password: 'password123',
            roles: 'author'
        };
        request
            .put(`/api/authors/updateAuthor/${authorId}`)
            .set("Authorization", `Bearer ${tokenValue}`)
            .send(author)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("should soft delete a author by ID", function (done) {
        request
            .delete(`/api/authors/softDeleteAuthor/${authorId}`)
            .set("Authorization", `Bearer ${tokenValue}`)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("should restore a soft deleted author by ID", function (done) {
        request
            .put(`/api/authors/restoreAuthor/${authorId}`)
            .set("Authorization", `Bearer ${tokenValue}`)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("should delete a author by ID", function (done) {
        request
            .delete(`/api/authors/deleteAuthor/${authorId}`)
            .set("Authorization", `Bearer ${tokenValue}`)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
    
})