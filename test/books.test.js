import supertest from 'supertest';
import { expect } from 'chai';
import app from '../src/index.js'; 

const request = supertest(app);

describe('Books API', function() {
  let bookId; // Variable to store the ID of a created book

  // Test GET /api/books
  it('should get all books', function(done) {
    request
      .get('/api/books/getBooks')
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
  });

  // Test POST /api/books
  it('should create a new book', function(done) {
    const book = {
      title: 'Test Book',
      description: 'Test Description',
      published_date: '2022-01-01'
    };
    request
      .post('/api/books/createBook')
      .send(book)
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        bookId = res.body.id;
        done();
      });
  });

  // Test GET /api/books/:id
  it('should get a book by ID', function(done) {
    request
      .get(`/api/books/getBookById/${bookId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
  });

  // Test PUT /api/books/:id
  it('should update a book by ID', function(done) {
    const updatedBook = {
      title: 'Updated Test Book',
      description: 'Updated Test Description',
      published_date: '2022-01-01'
    };
    request
      .put(`/api/books/updateBook/${bookId}`)
      .send(updatedBook)
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
  });

  // Test SOFT DELETE /api/books/softDeleteBook/:id
  it('should soft delete a book by ID', function(done) {
    request
      .delete(`/api/books/softDeleteBook/${bookId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
  });

  // Test PUT /api/books/restoreBook/:id
  it('should restore a soft deleted book by ID', function(done) {
    request
      .put(`/api/books/restoreBook/${bookId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
  });

  // Test DELETE /api/books/deleteBook/:id
  it('should delete a book by ID', function(done) {
    request
      .delete(`/api/books/deleteBook/${bookId}`)
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
  });

});
