import express from 'express'
import {
  deletePost,
  findPostBiId,
  listPosts,
  storeManyPosts,
  storePost,
  updatePost,
} from '../controllers/post.controller'

const router = express.Router()

router.get('/', listPosts)

router.get('/:id', findPostBiId)

router.post('/', storePost)

router.post('/many', storeManyPosts)

router.put('/:id', updatePost)

router.delete('/:id', deletePost)

export default router
