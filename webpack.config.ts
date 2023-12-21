import path from "path";
import { TEnvVariables } from "./config/build/types";
import { buildWebpack } from "./config/build/build-webpack";

export default (env: TEnvVariables) => {
  return buildWebpack({
    port: env.port ?? 3000,
    paths: {
      entry: path.resolve(__dirname, "src", "index.tsx"),
      html: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, "public", "favicon.svg"),
      output: path.resolve(__dirname, "build"),
      src: path.resolve(__dirname, "src"),
    },
    mode: env.mode ?? "development",
    analyzer: env.analyzer ?? false,
  });
};
