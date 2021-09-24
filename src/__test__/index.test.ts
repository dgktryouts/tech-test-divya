import { server } from '..';
import request from 'supertest';
import { expect } from 'chai';

describe('express', function() {
  after(() => {
      server.close()
  })

  it('should respond with 200 for /status', async () => {
      const res = await request(server)
          .get('/status')
      expect(res.statusCode).to.equal(200)
  });

  it('should respond with 404 with non-existant routes', function testPath(done) {
      request(server)
          .get('/non-existant-path')
          .expect(404, done);
  });

  describe('basic auth', async () => {
      it('should respond with 200 when called with valid Authorization header value', async () => {
          const res = await request(server)
              .get('/basic-auth')
              .set('authorization', 'Basic bWF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQ==');
          expect(res.statusCode).to.equal(200);
      });

      it('should respond with 401 when called with wrong credentials', async () => {
          const res = await request(server)
              .get('/basic-auth')
              .set('authorization', 'Basic dGVzdEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQ==');
          expect(res.statusCode).to.equal(401);
      });

      it('should respond with 401 when called without Basic in Authorization header value', async () => {
          const res = await request(server)
              .get('/basic-auth')
              .set('authorization', 'bWF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQ==');
          expect(res.statusCode).to.equal(401);
      });

      it('should respond with 401 when called with invalid Authorization header value', async () => {
          const res = await request(server)
              .get('/basic-auth')
              .set('authorization', 'Basic bWF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQQ==');
          expect(res.statusCode).to.equal(401);
      });

      it('should respond with 401 when called with invalid Authorization header value', async () => {
          const res = await request(server)
              .get('/basic-auth')
              .set('authorization', 'Basic bWF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQQ==');
          expect(res.statusCode).to.equal(401);
      });

      it('should respond with 401 when called with invalid Authorization header value with only Basic and empty string', async () => {
          const res = await request(server)
              .get('/basic-auth')
              .set('authorization', 'Basic    ');
          expect(res.statusCode).to.equal(401);
      });

      it('should respond with 401 when called without Authorization header value', async () => {
          const res = await request(server)
              .get('/basic-auth');
          expect(res.statusCode).to.equal(401);
      });

      it('should respond with 401 when called with empty Authorization header value', async () => {
          const res = await request(server)
              .get('/basic-auth')
              .set('authorization', '');
          expect(res.statusCode).to.equal(401);
      });
  })
});