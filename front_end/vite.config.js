// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     target: "esnext", // para onde os arquivos serão exportados
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   base: "./", // 👈 adiciona isso aqui
//   build: {
//     target: "esnext",
//   },
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Carrega variáveis do .env baseado no modo (development ou production)
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react()],
    base: "./",
    build: {
      target: "esnext",
    },
  };
});
