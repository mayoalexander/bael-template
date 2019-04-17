import axios from 'axios'

const travisLocationsAPI = axios.create({
  baseURL: process.env.TRAVIS_LOCATION_API,
  timeout: 15000
})

const travisHowlerAPI = axios.create({
  baseURL: process.env.TRAVIS_HOWLER_API,
  headers: {
    'Authorization': process.env.TRAVIS_HOWLER_API_TOKEN
  },
  timeout: 15000
})

export default {
  getLocations: () => {
    return travisLocationsAPI.get('branches/')
  },
  getAllPosts: async () => {
    const posts = await travisHowlerAPI.get('/post/')
    return posts
  },
  getPost: async (postId) => {
    const post = await travisHowlerAPI.get('/post/' + postId)
    return post
  },
  getPostTypes: async (postId) => {
    const post = await travisHowlerAPI.get('/posttype/')
    return post.data
  },
  getPostStatuses: async (postId) => {
    const post = await travisHowlerAPI.get('/poststatus/')
    return post.data
  },
  getPostBySlug: async (slug) => {
    const post = await travisHowlerAPI.get('/post/' + slug + '/')
    console.log(post)
    return post.data
  },
  getAnnouncements: async (postId) => {
    var content = []
    const allPosts = await travisHowlerAPI.get('/post/')
    allPosts.data.forEach((post) => {
      if (post.type === 'announcement') {
        content.push(post)
      }
    })
    return content
  },
  getNews: async (postId) => {
    const allPosts = await travisHowlerAPI.get('/post/')
    return allPosts.data
  },
  getEvents: async (postId) => {
    const allPosts = await travisHowlerAPI.get('/post/')
    return allPosts.data
  },
  createNew: (data) => {
    travisHowlerAPI.post('/posts', data)
    console.log(data)
  }
}
