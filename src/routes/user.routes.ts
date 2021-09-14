import express from 'express'
import {
  deleteUser,
  findUserBiId,
  listUsers,
  storeManyUsers,
  storeUser,
  updateUser,
} from '../controllers/user.controller'

const router = express.Router()

router.get('/', listUsers)

router.get('/:id', findUserBiId)

router.post('/', storeUser)

router.post('/many', storeManyUsers)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

export default router
