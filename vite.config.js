import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/user-service": {
        target: "http://localhost:8080",
        changeOrigin: true, // 다른 도메인으로의 요청 허용
      },
      '/study-group-service/api': {
        target: 'http://localhost:8080',  // 백엔드 서버 주소
        changeOrigin: true,               // 다른 도메인으로의 요청 허용
      },    // pathRewrite 설정 없이 '/api' 경로를 그대로 전달
      "/recruitment-service/api": {
        target: "http://localhost:8080", // 백엔드 서버 주소
        changeOrigin: true, // 다른 도메인으로의 요청 허용
      },
      "/schedule-service/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

