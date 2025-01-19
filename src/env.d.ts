/// <reference types="vite/client" />

// Server-side environment variables
declare namespace NodeJS {
    interface ProcessEnv {
        PRIVATE_DB_PORT: number
        PRIVATE_DB_USER: string
        PRIVATE_DB_PASS: string
        PRIVATE_DB_HOST: string
    }
}

// Public environment variables
declare namespace ImportMetaEnv {
    interface ImportMetaEnv {
        PUBLIC_API_URL: string;
    }
}