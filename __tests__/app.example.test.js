const req = require('supertest')
const app = require('../api/app.example')

describe('Test the root path of test', () => {
  test('It should response the GET method', async () => {
    const res = await req(app).get('/')
    expect(res.statusCode).toBe(200)
  })
})
