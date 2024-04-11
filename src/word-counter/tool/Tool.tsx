import { Editor } from "../editor/Editor";
import { EditorFooter } from "../footer/Footer";
import { EditorHeader } from "../header/Header";

export const Tool = () => {
  return (
    <div className="flex flex-row w-full items-center justify-center bg-slate-50 py-10 px-3 sm:px-4 md:px-10 lg:px-10">
      <section className="rounded-2xl w-full min-h-screen bg-white lg:min-h-96 flex flex-col border border-slate-200 outline-none shadow-slate-400 lg:max-w-[1200px] ">
        {/* <EditorHeader /> */}
        <Editor />
        {/* <EditorFooter /> */}
      </section>
    </div>
  );
};
