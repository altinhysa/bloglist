const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    //   })
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {
    // const blog = new Blog(request.body)
  
    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
   
  })

  module.exports = blogRouter