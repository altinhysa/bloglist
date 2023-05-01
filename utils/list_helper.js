const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => 
        sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })

    return {
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes
    }
}

const mostBlogs = (blogs) => {
    const authorWithMostBlogs = Object.entries(blogs.reduce((prev, current) => {
        prev[current.author] = (prev[current.author] || 0) + 1;
        return prev;
      }, {})).sort((a, b) => b[1] - a[1])[0]
      
      const result = {
        author: authorWithMostBlogs[0],
        blogs: authorWithMostBlogs[1]
      }

      return result
}

const mostLikes = (blogs) => {
    const likesByAuthor = blogs.reduce((prev, current) => {
        prev[current.author] = (prev[current.author] || 0) + current.likes;
        return prev;
      }, {});
    
      const [author, likes] = Object.entries(likesByAuthor).reduce((prev, current) => {
        return current[1] > prev[1] ? current : prev;
      }, ['', 0]);
    
      return { author, likes };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs, 
    mostLikes
}