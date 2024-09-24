import supertest from "supertest";
import { expect } from "chai";
import app from "../src/index.js";
import { response } from "express";

const request = supertest(app);
let tokenValue;

describe('Auth API', function() {
    let userId; // Variable to store the ID of a created user
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    let token;

    // Test POST /api/auth/registerUser
    it('should register a new user', function(done) {
        const user = {
            name: 'Test Registered User',
            email: uniqueEmail,
            password: 'password123',
            confirmPassword: 'password123',
            roles: 'publisher'
        };
        request
            .post('/api/auth/registerUser')
            .send(user)
            .expect('Content-Type', /application\/json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                userId = res.body.data.id;
                done();
            });
    });

    // Test POST /api/auth/userLogin
    it('should login a user', function(done) {
        const credentials = {
            email: uniqueEmail,
            password: 'password123'
        };
        request
            .post('/api/auth/userLogin')
            .send(credentials)
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                userId = res.body.data.id;
                token = res.body.data.token;
                console.log(token);
                done();
            })
    });

        

    // Test POST /api/auth/profile
    it('should get user profile', function(done) {
        request
            .get(`/api/auth/profile/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    console.error('Error:', err);
                }
                done(err);
            })
    });

    after((done) => {
        console.log('Token in auth: ', token);
        done(); 
        tokenValue = token;
    });
})

export { tokenValue };
