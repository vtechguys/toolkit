import type { Config } from "@imgly/background-removal";

export type IConfig = Omit<Config, "progress"> & {
  progress: (props: {
    key: string;
    current: number;
    total: number;
    type: string;
    subtype: string;
    percent: number;
    phase: "assets" | "process";
  }) => void;
};

export const getConfig = (overrides?: IConfig): Config => {
  const publicPath = new URL(window.location.href);
  publicPath.pathname = "/js/bg-remove/";
  return {
    debug: overrides?.debug || false,
    publicPath: overrides?.publicPath || publicPath.href,
    proxyToWorker: overrides?.proxyToWorker || true,
    model: overrides?.model || "medium",
    progress: (key, current, total) => {
      const [type, subtype] = key.split(":");
      if (overrides?.progress) {
        const arg = {
          key,
          current,
          total,
          type,
          subtype,
          percent: (current / total) * 100,
          phase: type === "compute" ? "process" : "assets",
        };
        overrides?.progress?.(arg);
      }
    },
    output: {
      quality: 0.8,
      format: "image/png",
      ...overrides?.output,
    },
  };
};
