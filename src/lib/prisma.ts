import { PrismaClient } from '@prisma/client'
import { DEFAULT_TRANSACTION_ISOLATION } from '$env/static/private';

let isolationLevel: string | null = DEFAULT_TRANSACTION_ISOLATION
const VALID_ISOLATION_LEVELS = [
    'READ UNCOMMITTED',
    'READ COMMITTED',
    'REPEATABLE READ',
    'SERIALIZABLE',
  ];

  
if(!VALID_ISOLATION_LEVELS.includes(isolationLevel)){
    console.log("Invalid transaction isolation setting, reverting to default")
    isolationLevel = null;
}

const prisma = new PrismaClient()
await prisma.$executeRawUnsafe(`SET SESSION TRANSACTION ISOLATION LEVEL ${isolationLevel || "REPEATABLE READ"};`);
export default prisma