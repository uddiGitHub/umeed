import connectDB from "../../../../config/db.jsx";
import Subscribe from "../../../../models/Subscribes.jsx";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email || !/.+\@.+\..+/.test(email)) {
      return new Response(JSON.stringify({ message: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existing = await Subscribe.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ message: "Already subscribed" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    await Subscribe.create({ email });

    return new Response(JSON.stringify({ message: "Subscribed successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}