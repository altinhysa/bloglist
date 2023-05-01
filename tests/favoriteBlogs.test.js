const listHelper = require('../utils/list_helper')

describe('fav blog', () => {
    test('when theres only one blog, return the fav blog', () => {
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            }
        ]

        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        })
    })
})