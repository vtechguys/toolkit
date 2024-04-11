import { removeBackground } from "@imgly/background-removal";
import { useEffect } from "react";
import { useLatest } from "react-use";
import { ImagePreview } from "./components";
import { IConfig, getConfig } from "./config";
import { AsyncStatus } from "./types";

interface BgRemovedOutputProps {
  onSuccess: (url: string) => void;
  onFailure: (error: Error) => void;
  onProgress: IConfig["progress"];
  inputSrc: string | null;
  outputSrc: string | null;
  alt: string;
  minimize: boolean;
  status: AsyncStatus;
}

function BgRemovedOutput(props: BgRemovedOutputProps) {
  const {
    inputSrc,
    onSuccess,
    onFailure,
    onProgress,
    outputSrc,
    status,
    alt,
    minimize,
  } = props;

  const onSuccessRef = useLatest(onSuccess);
  const onFailureRef = useLatest(onFailure);
  const onProgressRef = useLatest(onProgress);

  useEffect(() => {
    let ignore = false;

    if (inputSrc) {
      removeBackground(inputSrc, getConfig({ progress: onProgressRef.current }))
        .then((blob) => {
          if (!ignore) {
            const url = URL.createObjectURL(blob);
            onSuccessRef.current(url);
          }
        })
        .catch((e) => {
          if (!ignore) {
            onFailureRef.current(e);
          }
        });
    }

    return () => {
      ignore = true;
    };
  }, [onFailureRef, onSuccessRef, inputSrc, onProgressRef]);

  if (status === "idle") {
    return null;
  }

  return (
    <ImagePreview
      src={outputSrc}
      status={status}
      alt={alt}
      minimize={minimize}
    />
  );
}

export default BgRemovedOutput;
