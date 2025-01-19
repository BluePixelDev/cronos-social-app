import prisma from "@lib/prisma"

/**
 * Logs an action into the audit_log table.
 * @param {number | null} userId - The ID of the user performing the action (can be null for system actions).
 * @param {string} action - Description of the action performed.
 * @param {Date} [timestamp] - Optional timestamp for the action (default is now).
 * @returns {Promise<void>} - Resolves when the log is written.
 */
export const writeAuditLog = async (userId: number | null, action: string, timestamp?: Date): Promise<void> => {
    try {
        await prisma.auditLog.create({
            data: {
                userId,
                action,
                createdAt: timestamp || new Date(),
            },
        });
    } catch (error) {
        console.error('Error writing to audit log:', error);
        throw new Error('Failed to write audit log entry');
    }
}