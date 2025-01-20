import prisma from "@src/lib/prisma.js";
import { writeAuditLog } from "@src/lib/util/auditLogUtil";
import { json } from "@sveltejs/kit";

export async function PATCH({request, locals}) {
    const { newBio } = await request.json();

    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    if(!newBio) {
        return json({ success: false, error: "New Bio is required" }, { status: 400 });
    }

    try {
        await prisma.user.update({
            where: {id: locals.user.id},
            data: {
                bio: newBio
            }
        })
        writeAuditLog(locals.user.id, `User updated their bio to ${newBio}`)
        
        return json({ success: true });

    }catch {
        return json({ success: false, error: "Something went wrong" }, { status: 500 });
    }
}