import supertest from "supertest";
import { expect } from "chai";
import app from "../src/index.js";

const request = supertest(app);

describe('Auth API', function() {
    let userId; // Variable to store the ID of a created user
    let token;
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    // Test POST /api/auth/registerUser
    it('should register a new user', function(done) {
        const user = {
            name: 'Test Registered User',
            email: uniqueEmail,
            password: 'password123',
            confirmPassword: 'password123',
            roles: 'user'
        };
        request
            .post('/api/auth/registerUser')
            .send(user)
            .expect('Content-Type', /application\/json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                userId = res.body.id;
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
                userId = res.body.user.id;
                token = res.body.user.token;
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
                console.log('Toekn in profile',token);
                if (err) {
                    console.error('Error:', err);
                }
                console.log('Response:', res.body);
                done(err);
            })
    });
})