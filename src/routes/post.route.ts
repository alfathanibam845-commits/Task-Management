import { Router } from "express"; 
import PostController from "../controllers/post.controller"; 

const router = Router(); 

// PASTIKAN menggunakan P besar: getPosts, bukan getposts
router.get('/', PostController.getPosts); 
router.post('/', PostController.createPosts); 
router.put('/:id', PostController.updatePosts); 
router.delete('/:id', PostController.deletePosts); 


export default router;
