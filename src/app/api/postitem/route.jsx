import connectDB  from "../../../../config/db.jsx"
import PostItem from "../../../../models/postItem.jsx";

connectDB();

export async function GET() {
    const posts = await PostItem.find().sort({ date: -1 });
    return Response.json(posts);
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