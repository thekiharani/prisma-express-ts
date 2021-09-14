import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../helpers/auth'

const prisma = new PrismaClient()

export const listUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      password: true
    }
  })
  return res.status(200).json(users)
}

export const findUserBiId = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: { posts: true },
  })
  return res.status(200).json(user)
}

export const storeUser = async (req: Request, res: Response) => {
  try {
    const { surname, otherNames, email, password } = req.body
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        surname: surname,
        otherNames: otherNames,
        email: email,
        password: hashedPassword,
      },
    })
    return res.status(201).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const storeManyUsers = async (req: Request, res: Response) => {
  try {
    const { userList } = req.body

    userList.map(async (user: any) => {
      const hashedPassword = await hashPassword(user.password)
      await prisma.user.create({
        data: {
          surname: user.surname,
          otherNames: user.otherNames,
          email: user.email,
          password: hashedPassword,
        },
      })
    })
    return res.status(201).json({ message: 'users created' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { surname, otherNames } = req.body
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        surname: surname,
        otherNames: otherNames,
      },
    })
    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    })
    return res.status(200).json(deletedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
