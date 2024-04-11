"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ImageUploader, ImageUploaderProps } from "./components";
import { IConfig, getConfig } from "./config";
import type { Config } from "@imgly/background-removal";
import { AsyncStatus } from "./types";

const Output = dynamic(() => import("./BgRemover"));

interface ImageArea {
  status: AsyncStatus;
  src: string;
  name: string;
}

type OutputImageState = Omit<ImageArea, "name"> & {
  progress: number;
  phase: "assets" | "process";
};

async function preload(config: Config) {
  const resourceUrl = new URL("resources.json", config.publicPath);
  const resourceResponse = await fetch(resourceUrl);
  if (!resourceResponse.ok) {
    throw new Error(
      `Resource metadata not found. Ensure that the config.publicPath is configured correct l: ${config.publicPath}`
    );
  }
  const resourceMap = await resourceResponse.json();
  const keys = Object.keys(resourceMap);
  await Promise.all(
    keys.map(async (key) => {
      return loadAsBlob(key, config);
    })
  );
}

async function loadAsBlob(key: string, config: Config) {
  const resourceUrl = new URL("resources.json", config.publicPath);
  const resourceResponse = await fetch(resourceUrl);
  if (!resourceResponse.ok) {
    throw new Error(
      `Resource metadata not found. Ensure that the config.publicPath is configured correctly.`
    );
  }
  const resourceMap = await resourceResponse.json();
  const entry = resourceMap[key];
  if (!entry) {
    throw new Error(
      `Resource ${key} not found. Ensure that the config.publicPath is configured correctly.`
    );
  }
  const chunks = entry.chunks;
  let downloadedSize = 0;
  const responses = chunks.map(async (chunk: any) => {
    const chunkSize = chunk.offsets[1] - chunk.offsets[0];
    const url = config.publicPath
      ? new URL(chunk.hash, config.publicPath).toString()
      : chunk.hash;
    const response = await fetch(url, config.fetchArgs);
    const blob = await response.blob();
    if (chunkSize !== blob.size) {
      throw new Error(
        `Failed to fetch ${key} with size ${chunkSize} but got ${blob.size}`
      );
    }
    if (config.progress) {
      downloadedSize += chunkSize;
      config.progress(`fetch:${key}`, downloadedSize, entry.size);
    }
    return blob;
  });
  const allChunkData = await Promise.all(responses);
  const data = new Blob(allChunkData, { type: entry.mime });
  if (data.size !== entry.size) {
    throw new Error(
      `Failed to fetch ${key} with size ${entry.size} but got ${data.size}`
    );
  }
  return data;
}

function getUserMessage(percent: number, phase: "assets" | "process") {
  let message = "";

  if (phase === "assets") {
    if (percent <= 10) {
      message = "Getting started...";
    } else if (percent <= 20) {
      message = "Downloading assets...";
    } else if (percent <= 50) {
      message = "Downloading AI model";
    } else if (percent <= 80) {
      message = "Almost downloaded...";
    } else {
      message = "Spinning up AI model";
    }
  } else {
    message = "Processing image...";
  }

  return message;
}

export function Tool() {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const [imageInput, setInputImage] = useState<ImageArea>({
    status: "idle",
    src: "",
    name: "",
  });

  const [imageOutput, setOutputImage] = useState<OutputImageState>({
    status: "idle",
    src: "",
    progress: 0,
    phase: "assets",
  });

  const [bundlePreloadStatus, setBundlePreloadStatus] = useState<number>(5);
  const loading = bundlePreloadStatus < 100;

  const { src: srcInput, status: statusInput, name } = imageInput;
  const {
    src: srcOutput,
    status: statusOutput,
    progress: outProgress,
    phase: outPhase,
  } = imageOutput;

  const isOutputSuccess = statusOutput === "resolve";
  const isOutputFailure = statusOutput === "reject";
  const isOutputPending = statusOutput === "pending";
  const isOutputSettled = isOutputSuccess || isOutputFailure;

  const shouldShowOutput = isOutputPending || isOutputSettled;

  const onUploadSuccess: ImageUploaderProps["onUploadSuccess"] = (
    name,
    src
  ) => {
    setInputImage({
      name,
      src,
      status: "resolve",
    });
    setOutputImage((state) => ({
      ...state,
      status: "pending",
      progress: 0,
    }));
  };

  const onUploadStart: ImageUploaderProps["onUploadStart"] = () => {
    setInputImage((state) => ({ ...state, status: "pending" }));
  };

  const onBGRemoveProgress: IConfig["progress"] = (props) => {
    console.log("progress", props);
    setOutputImage((state) => ({
      ...state,
      progress: props.percent,
      phase: props.phase,
    }));
  };

  const onBGRemoveSuccess = (url: string) => {
    setOutputImage((state) => {
      return {
        ...state,
        status: "resolve",
        src: url,
      };
    });
  };

  const onFailure = (e: Error) => {
    console.error(e);
    setOutputImage((state) => ({ ...state, status: "reject" }));
  };

  const onNew = () => {
    setOutputImage({
      status: "idle",
      src: "",
      progress: 0,
      phase: "assets",
    });
    setInputImage({
      status: "idle",
      src: "",
      name: "",
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        setBundlePreloadStatus((state) => {
          let nextState = state;

          if (state !== 100) {
            nextState = Math.min(90, state + 5);
          }

          return nextState;
        });
      }, 250);
    }

    return () => {
      if (!loading) {
        clearInterval(interval);
      }
    };
  }, [loading]);

  useEffect(() => {
    preload(getConfig()).then(() => {
      console.log("Assets for Conversion Loaded");
      setBundlePreloadStatus(100);
    });
  }, []);

  return (
    <div
      className={`w-full h-full flex flex-col min-h-96 ${
        loading ? "space-y-5" : ""
      }`}
    >
      {loading ? (
        <div className="w-full max-w-full basis-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{ width: `${bundlePreloadStatus}%` }}
          />
        </div>
      ) : null}
      <div className="w-full h-full grow flex flex-row space-x-10">
        <ImageUploader
          status={statusInput}
          imageBase64={srcInput}
          onUploadSuccess={onUploadSuccess}
          onUploadStart={onUploadStart}
        />
        <Output
          minimize={shouldShowOutput}
          alt="BG removed image"
          status={statusOutput}
          inputSrc={srcInput}
          outputSrc={isOutputPending ? srcInput : srcOutput}
          onSuccess={onBGRemoveSuccess}
          onProgress={onBGRemoveProgress}
          onFailure={onFailure}
        />
      </div>

      {isOutputPending && (
        <div className="w-full flex flex-row mt-5 justify-center items-center">
          <p className="text-base font-semibold italic animate-pulse">
            {getUserMessage(outProgress, outPhase)}
          </p>
        </div>
      )}

      {isOutputSettled && (
        <div className="w-full flex flex-row space-x-10 mt-10 justify-center items-center">
          {isOutputSuccess && (
            <a
              href={srcOutput}
              download
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg"
            >
              Download
            </a>
          )}
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg"
            onClick={onNew}
          >
            New
          </button>
        </div>
      )}
    </div>
  );
}
