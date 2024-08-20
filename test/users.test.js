import supertest from 'supertest';
import { expect } from 'chai';
import app from '../src/index.js';

const request = supertest(app);

describe('Users API', function() {
    let userId; // Variable to store the ID of a created user
    const uniqueEmail = `testuser_${Date.now()}@example.com`;


    // Test GET /api/users
    it('should get all users', function(done) {
        request
            .get('/api/users/getUsers')
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test POST /api/users
    it('should create a new user', function(done) {
        const user = {
            name: 'Test User',
            email: uniqueEmail,
            password: 'password123',
            roles: 'user'
        };
        request
            .post('/api/users/createUser')
            .send(user)
            .expect('Content-Type', /application\/json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                userId = res.body.id;
                done();
            })
    });

    // Test GET /api/users/getUserById/:id
    it('should get a user by ID', function(done) {
        request
            .get(`/api/users/getUserById/${userId}`)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test PUT /api/users/updateUser/:id
    it('should update a user by ID', function(done) {
        const user = {
            name: 'Updated User',
            email: uniqueEmail,
            password: 'password123',
            roles: 'user'
        };
        request
            .put(`/api/users/updateUser/${userId}`)
            .send(user)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test DELETE /api/users/softDeleteUser/:id
    it('should soft delete a user by ID', function(done) {
        request
            .delete(`/api/users/softDeleteUser/${userId}`)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test PUT /api/users/restoreUser/:id
    it('should restore a soft deleted user by ID', function(done) {
        request
            .put(`/api/users/restoreUser/${userId}`)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test DELETE /api/users/deleteUser/:id
    it('should delete a user by ID', function(done) {
        request
            .delete(`/api/users/deleteUser/${userId}`)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

});