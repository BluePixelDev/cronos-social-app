import { redirect } from '@sveltejs/kit';
import { writeAuditLog } from '@src/lib/util/auditLogUtil.js';

export function load({locals}) {
    console.log(locals.user?.role)
    if (!locals.user || locals.user.role != "ADMIN"){
        redirect(301, "/")
    }

    writeAuditLog(locals.user.id, "Accessing the admin page.")
}