/// <reference types="vite/client" />

// Server-side environment variables
declare namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: string
        DATABASE_URL: "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE"
    }
}