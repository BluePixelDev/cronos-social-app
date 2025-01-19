import { getConnection } from "$lib/db";
import { json } from "@sveltejs/kit";

export async function GET() {
    try {
        const connection = await getConnection();

        // Example query
        const [rows] = await connection.execute("SELECT NOW() as currentTime");

        console.log(rows)
        // Close the connection after the query
        await connection.end();

        return json({
            message: "Database connected successfully",
            currentTime: rows[0]?.currentTime
        });
    } catch (error) {
        return json(
            {
                error: error || "An unexpected error occurred"
            },
            { status: 500 }
        );
    }
}
