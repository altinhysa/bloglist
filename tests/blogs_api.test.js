const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


test('notes to be returned in json format', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('correct numbers of notes to be returned', async ()=> {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verify that unique identifier is named id and is defined', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(blog => blog.id)
    expect(ids).toBeDefined()
})

test('a valid blog can be added', async () => {
    const blog = {
        title: "test3",
        author: "test3",
        url: "test3.com",
        likes: 15
    }

    await api.post('/api/blogs').send(blog).expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
})

test('if likes property are missing to be 0', async () => {
    const blog = {
        title: "test4",
        author: "test4",
        url: "test4.com"
    }

    await api.post('/api/blogs').send(blog).expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
    const last = blogsAfter[2]
    expect(last).toHaveProperty('likes')
    expect(last.likes).toBe(0)
})

test('400 bad request code if title or url missing', async () => {
    const blog = {
        author: "altin"
    }

    await api.post('/api/blogs').send(blog).expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
  })