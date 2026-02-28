import presetWind3 from "@unocss/preset-wind3";
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [presetWind3()],

  theme: {
    colors: {
      bg: "#0f0d17",
      header: "#161326",
      section: "#1b1830",
      border: "rgba(155,144,230,0.25)",

      text: "#f4f2ff",
      muted: "#c7c3e6",
      subtle: "#6f6a8f",

      selected: "#221e3d",
      input: "#1b1830",

      accent: "#9b90e6",
      accent2: "#7c6dd6",
      accent3: "#6d5bbd",
      soft: "rgba(155,144,230,0.18)",

      success: "#0ea57a",
      warn: "#d97706",
      error: "#dc2626",
      important: "#9b90e6",
    },
  },

  preflights: [
    {
      getCSS: () => `
        :host { all: initial; display: block; font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif; }
        * { box-sizing: border-box; }

        input::placeholder { color: #6f6a8f; }
        input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(155,144,230,0.3);
        }

        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: rgba(155,144,230,0.2);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(155,144,230,0.4);
        }
      `,
    },
  ],
});
