import dynamic from "next/dynamic";
import StatTiles from "./StatTiles";

const Stats = dynamic(() => import("./Stats"), {
  ssr: true,
  loading: StatTiles,
});

export function EditorFooter() {
  return (
    <div className="border-t border-slate-200 py-2 px-6 flex flex-row justify-between">
      <Stats />
    </div>
  );
}
