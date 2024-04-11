"use client";
import { InkEditor } from "@/ink-editor/Factory";
import dynamic from "next/dynamic";
import "./editor.css";

const Fallback = () => {
  return (
    <div className="w-full flex flex-grow items-center justify-center">
      <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-600" />
    </div>
  );
};

const NativeEditor = dynamic(() => import("@/ink-editor/component"), {
  loading: Fallback,
  ssr: false,
});

const Editor = () => {
  return (
    <NativeEditor
      className="w-full outline-none py-4 px-6"
      wrapperClassName="w-full flex flex-grow"
      placeholder="Paste or write something..."
      onCreate={({ editor }) => {
        InkEditor.getInstance().$initEditor(editor);
      }}
      onDestroy={() => {
        InkEditor.getInstance().$destroyEditor();
      }}
    />
  );
};

export { Editor };
