import { Request, Response } from "express";
import { Post } from "../types/post";

const dataPost: Post[] = [
  { id: 1, title: "Postingan 1", content: "Content 1" },
  { id: 2, title: "Postingan 2", content: "Content 2" },
  { id: 3, title: "Postingan 3", content: "Content 3" },
];

export class PostController {
  
  // READ posts
  getPosts = async (req: Request, res: Response) => {
    return res.status(200).json({
      status: true,
      message: "Get Data Posts Success",
      data: {
        posts: dataPost
      }
    });
  };

  // CREATE posts
  createPosts = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Create Data Posts Failed"
      });
    }

    const newId = dataPost.length > 0 ? Math.max(...dataPost.map(post => post.id)) + 1 : 1;

    const newPost: Post = {
      id: newId,
      title: title,
      content: content
    };

    dataPost.push(newPost);

    return res.status(201).json({
      status: true,
      message: "Create Post Success",
      data: {
        post: newPost
      }
    });
  };

  // UPDATE posts
  updatePosts = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    const post = dataPost.find(post => post.id === id);

    if (!Number.isInteger(id) || !post) {
      return res.status(404).json({
        status: false,
        message: "Post tidak ditemukan"
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        status: false,
        message: "Title dan content wajib diisi"
      });
    }

    post.title = title;
    post.content = content;

    return res.status(200).json({
      status: true,
      message: "Update Post Success",
      data: {
        post
      }
    });
  };

  // DELETE posts (Tambahan Terbaru)
  deletePosts = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = dataPost.findIndex(post => post.id === id);

    if (!Number.isInteger(id) || index === -1) {
      return res.status(404).json({
        status: false,
        message: "Post tidak ditemukan"
      });
    }

    const deletedPost = dataPost.splice(index, 1)[0];

    return res.status(200).json({
      status: true,
      message: "Delete Post Success",
      data: {
        post: deletedPost
      }
    });
  };

}

export default new PostController();
