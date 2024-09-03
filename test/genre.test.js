import supertest from 'supertest';
import { expect } from 'chai';
import app from '../src/index.js'; 

const request = supertest(app);

describe('Genres API', function() {
    let genreId;
    // Test GET /api/genres
    it('should get all genres', function(done) {
        request
            .get('/api/genres/getGenres')
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

     // Test POST /api/genres/createGenre
    it('should create a new genre', function(done) {
        const genre = {
            name: 'Test Genre'
        };
        request
            .post('/api/genres/createGenre')
            .send(genre)
            .expect('Content-Type', /application\/json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                genreId = res.body.id;
                done();
            });
    });

    // Test GET /api/genres/getGenreById/:id
    it('should get a genre by ID', function(done) {
        request
            .get(`/api/genres/getGenreById/${genreId}`)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test PUT /api/genres/updateGenre/:id
    it('should update a genre by ID', function(done) {
        const genre = {
            name: 'Updated Genre'
        };
        request
            .put(`/api/genres/updateGenre/${genreId}`)
            .send(genre)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test SOFT DELETE /api/genres/softDeleteGenre/:id
    it('should soft delete a genre by ID', function(done) {
        request
            .put(`/api/genres/softDeleteGenre/${genreId}`)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test PUT /api/genres/restoreGenre/:id
    it('should restore a soft deleted genre by ID', function(done) {
        request
            .put(`/api/genres/restoreGenre/${genreId}`)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });

    // Test DELETE /api/genres/deleteGenre/:id
    it('should delete a genre by ID', function(done) {
        request
            .delete(`/api/genres/deleteGenre/${genreId}`)
            .expect('Content-Type', /application\/json/)
            .expect(200, done);
    });
})