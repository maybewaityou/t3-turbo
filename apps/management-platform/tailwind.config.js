import { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  corePlugins: {
    // 禁用 Tailwind 的全局基本样式，
    preflight: false,
    // 而不影响那些依靠添加自己的基本样式来正常工作的 utilities。
  },
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
};
