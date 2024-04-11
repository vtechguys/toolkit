import { AsyncStatus } from "./types";

interface ImagePreviewProps {
  src: string | null;
  alt: string;
  minimize: boolean;
  status: AsyncStatus;
}

export function ImagePreview(props: ImagePreviewProps) {
  const { status, src, alt } = props;
  return (
    <div
      title={alt}
      style={{ backgroundImage: `url(${src})` }}
      className={
        "bg-origin-content grow flex flex-row justify-center items-center w-1/2 max-h-96 relative bg-cover bg-no-repeat"
      }
    >
      {status === "pending" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-12 h-12"
        >
          <circle
            fill="rgb(59 130 246)"
            stroke="rgb(59 130 246)"
            stroke-width="9"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2.2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="rgb(59 130 246)"
            stroke="rgb(59 130 246)"
            stroke-width="9"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2.2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="rgb(59 130 246)"
            stroke="rgb(59 130 246)"
            stroke-width="9"
            r="15"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2.2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
      )}
    </div>
  );
}
