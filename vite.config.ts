import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Muat semua variabel lingkungan
    const env = loadEnv(mode, '.', '');

    return {
        // --- Bagian yang Diperbaiki untuk GitHub Pages ---
        // 1. Tambahkan 'base' untuk menentukan subpath deployment.
        //    Gantilah 'nama-repositori' dengan 'bunpou' sesuai kasus Anda.
        base: "/bunpou/", 

        // 2. Tambahkan 'build' untuk memastikan output file ada di folder 'docs'.
        build: {
            outDir: 'docs',
        },
        // --------------------------------------------------

        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});