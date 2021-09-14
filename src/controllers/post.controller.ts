import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const listPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          surname: true,
          otherNames: true,
          email: true,
        },
      },
    },
  })
  return res.status(200).json(posts)
}

export const findPostBiId = async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: { author: true },
  })
  return res.status(200).json(post)
}

export const storePost = async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = req.body
    const post = await prisma.post.create({
      data: {
        title: title,
        body: body,
        userId: userId,
      },
    })
    return res.status(201).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const storeManyPosts = async (req: Request, res: Response) => {
  try {
    const { postList } = req.body

    const posts = await prisma.post.createMany({
      data: postList,
    })
    return res.status(201).json({ message: 'users created', posts: posts })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, body } = req.body
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        body: body,
      },
    })
    return res.status(200).json(updatedPost)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    })
    return res.status(200).json(deletedPost)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
