import type { Config } from "@imgly/background-removal";

export async function preload(config: Config) {
  const resourceUrl = new URL("resources.json", config.publicPath);
  const resourceResponse = await fetch(resourceUrl);
  if (!resourceResponse.ok) {
    throw new Error(
      `Resource metadata not found. Ensure that the config.publicPath is configured correctl: ${config.publicPath}`
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
