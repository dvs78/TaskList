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
import path from "path";

export default ({ mode }) => {
  // 👇 Carrega variáveis do .env conforme o modo (development ou production)
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    base: "./",
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL), // 👈 força embutir
    },
    build: {
      target: "esnext",
    },
  });
};
