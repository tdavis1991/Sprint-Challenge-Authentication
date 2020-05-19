const supertest = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('register', () => {
    it("register success", async () => {
        const res = await supertest(server).post('/api/auth/register')
        .send({
            username: 'john',
            password: 'test'
        })
        expect(res.status).toBe(201)
    })

    it('register fail', async () => {
        const res = await supertest(server).post('/api/auth/register')
        .send({
            username: 'blake',
        })
        expect(res.status).toBe(500) 
    })
})

describe('get users', () => {
    it('get sucess', async () => {
        const res = await supertest(server).get('/api/auth/users')
        expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body).toHaveLength(4)
    })
})

describe('login', () => {
    it('login success', async () => {
        const res = await supertest(server).post('/api/auth/login')
        .send({
            username: 'james',
            password: 'abc123'
        })
        expect(res.body.username).toBe('james')
    })
})