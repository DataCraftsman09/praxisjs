import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Verbose",
  description: "Signal-driven frontend framework",
  srcDir: "src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [],

    socialLinks: [
      { icon: "github", link: "https://github.com/MateusGX/verbose" },
    ],
  },
});
