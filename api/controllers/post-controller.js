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

export const getPosts = async (req, res) => {
    const query = req.query;
    console.log("Query parameters received:", query);
  
    try {
      const posts = await prisma.post.findMany({
        where: {
          city: query.city || undefined,
          type: query.type || undefined,
          property: query.property || undefined,
          bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
          price: {
            gte: query.minPrice ? parseInt(query.minPrice) : undefined,
            lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
          },
        },
      });
  
      console.log("Posts retrieved:", posts);
  
      res.status(200).json(posts);
    } catch (err) {
      console.error("Error retrieving posts:", err);
      res.status(500).json({ message: "Failed to get posts" });
    }
  };
  

  export const addPost = async (req, res) => {
    console.log("Files received:", req.files); 
    console.log("Body:", req.body); 

    const { 
        title, 
        price, 
        address, 
        city, 
        bedroom, 
        bathroom, 
        latitude, 
        longitude, 
        type, 
        property, 
        size, 
        school, 
        bus, 
        restaurant, 
        utilities, 
        pet, 
        income, 
        desc 
    } = req.body;

    const tokenUserId = req.userId;

    // Validate required fields
    if (!title || !price || !address || !city || !bedroom || !bathroom || !type || !property) {
        console.log("Missing required fields");
        return res.status(400).json({ message: "Missing required fields." });
    }

    // Parse and validate numeric fields
    const parsedPrice = parseInt(price, 10);
    const parsedBedroom = parseInt(bedroom, 10);
    const parsedBathroom = parseInt(bathroom, 10);
    const parsedLatitude = latitude ? parseFloat(latitude) : null;
    const parsedLongitude = longitude ? parseFloat(longitude) : null;
    const parsedSize = size ? parseInt(size, 10) : null;
    const parsedSchool = school ? parseInt(school, 10) : null;
    const parsedBus = bus ? parseInt(bus, 10) : null;
    const parsedRestaurant = restaurant ? parseInt(restaurant, 10) : null;

    // Check if required numeric fields are valid
    if (isNaN(parsedPrice) || isNaN(parsedBedroom) || isNaN(parsedBathroom)) {
        console.log("Invalid numeric values");
        return res.status(400).json({ message: "Invalid numeric values for required fields." });
    }

    // Validate optional fields
    if (latitude && isNaN(parsedLatitude)) {
        console.log("Invalid latitude value");
        return res.status(400).json({ message: "Invalid latitude value." });
    }

    if (longitude && isNaN(parsedLongitude)) {
        console.log("Invalid longitude value");
        return res.status(400).json({ message: "Invalid longitude value." });
    }

    // Handle file uploads
    const imageUrls = req.files ? req.files.map(file => `/uploads/postimages/${file.filename}`) : [];

    try {
        // Create a new post
        const newPost = await prisma.post.create({
            data: {
                userId: tokenUserId,
                title,
                price: parsedPrice,
                address,
                city,
                bedroom: parsedBedroom,
                bathroom: parsedBathroom,
                latitude: parsedLatitude,
                longitude: parsedLongitude,
                type,
                property,
                images: imageUrls,
                postDetail: {
                    create: {
                        desc: desc || null,
                        utilities: utilities || null,
                        pet: pet || null,
                        income: income || null,
                        size: parsedSize,
                        school: parsedSchool,
                        bus: parsedBus,
                        restourant: parsedRestaurant, // Fix typo if needed
                    },
                },
            },
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.error("Error creating post:", err); // Log the error details
        res.status(500).json({ message: "Failed to create post", error: err.message });
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