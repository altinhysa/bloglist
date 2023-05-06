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

    blogRouter.delete('/:id', async ( req, res ) => {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    })

    blogRouter.put('/:id', async ( req, res ) => {
      const body = req.body

      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      }

      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new:  true} )
      res.status(200).json(updatedBlog)
    })

  module.exports = blogRouter