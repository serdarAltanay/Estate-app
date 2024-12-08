import prisma from "../lib/prisma.js"
import { uploadPostImages } from "../lib/multer.js"


export const getPost = async(req,res) =>{
    const id = req.params.id
    try {
        const post = await prisma.post.findUnique(
            {
                where:{id},
                include:{
                    postDetail:true,
                    user:{
                        select:{
                            username:true,
                            avatar:true
                        }     // we need only username and avatar
                    }
                }
            }
        )
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json()
    }

}

export const getPosts = async (req,res) =>{
    const query  = req.query
    try {
        const posts = await prisma.post.findMany({
            where:{
                city: query.city || undefined ,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price:{
                    gte: parseInt(query.minPrice) || undefined,
                    lte: parseInt(query.maxPrice) || undefined,
                }
            }
        })
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Failed to get posts"})
    }
    
}

export const addPost = async (req, res) => {
    console.log("Files received:", req.files); 
    console.log("Body:", req.body); 

    const { postData, postDetail } = req.body;
    const tokenUserId = req.userId;

    if (!req.body.postData || !req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const imageUrls = req.files.map(file => `/uploads/postimages/${file.filename}`); 

    try {
        const newPost = await prisma.post.create({
            data: {
                userId: tokenUserId,
                title: postData.title,
                price: parseInt(postData.price),
                address: postData.address,
                city: postData.city,
                bedroom: parseInt(postData.bedroom),
                bathroom: parseInt(postData.bathroom),
                latitude:postData.latitude,
                longitude:postData.longitude,
                type:postData.type,
                property:postData.property,
                images: imageUrls,
                postDetail: {
                    create: {
                        desc: postDetail.desc,
                        utilities: postDetail.utilities,
                        pet: postDetail.pet,
                        income: postDetail.income,
                        size: parseInt(postDetail.size),
                        school: parseInt(postDetail.school),
                        bus: parseInt(postDetail.bus),
                        restourant: parseInt(postDetail.restaurant),
                    },
                },
            },
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Failed to create post' });
    }
};

  




export const updatePost = async (req,res) =>{
    try {
        res.status(200).json()
    } catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

export const deletePost = async (req,res) =>{
    const tokenUserId = req.userId
    const id= req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
}