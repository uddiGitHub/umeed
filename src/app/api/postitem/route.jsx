import connectDB from "../../../../config/db.jsx";
import PostItem from "../../../../models/postItem.jsx";

connectDB();

export async function GET(request) {
    try {
        // Extract query parameters
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        // Get total count of posts
        const totalCount = await PostItem.countDocuments();

        // Get paginated posts
        const posts = await PostItem.find()
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        return Response.json({
            posts,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            limit
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

export async function POST(request) {
    const data = await request.json();

    try {
        const savedPost = await PostItem({...data}).save();
        return new Response(JSON.stringify(savedPost), { 
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
         });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
         });
    }
}