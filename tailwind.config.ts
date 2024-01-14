import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  theme: {
    colors: {
      dust: {
        "50": "#f7f7f7",
        "100": "#ededed",
        "200": "#dfdfdf",
        "300": "#c8c8c8",
        "400": "#adadad",
        "500": "#a1a1a1",
        "600": "#888888",
        "700": "#7b7b7b",
        "800": "#676767",
        "900": "#545454",
        "950": "#363636",
      },
    },
    fontFamily: {
      sans: ["Inter", "Inter fallback", ...fontFamily.sans],
      roborto: ["Roboto", "Roboto fallback", ...fontFamily.sans],
    },
  },
};
