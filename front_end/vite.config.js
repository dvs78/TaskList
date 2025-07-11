import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     target: "esnext", // para onde os arquivos serão exportados
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 adiciona isso aqui
  build: {
    target: "esnext",
  },
});
