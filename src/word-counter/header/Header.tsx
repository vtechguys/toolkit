"use client";
import { EditorEventsSub } from "@/ink-editor/EditorEventsSub";
import { InkEditor } from "@/ink-editor/Factory";
import { useEffect, useState } from "react";

export function EditorHeader() {
  const [{ word, char }, setWordChar] = useState({ word: 0, char: 0 });
  useEffect(() => {
    const unsubscribe = EditorEventsSub.change(() => {
      const counts = InkEditor.getInstance().getWordAndCharCount();
      setWordChar(counts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const FACEBOOK_LIMIT = 250;
  const leftFBCount = FACEBOOK_LIMIT - char;

  const TWITTER_LIMIT = 280;
  const leftTwitterCount = TWITTER_LIMIT - char;

  return (
    <div className="border-b border-slate-200 py-2 px-6">
      <div className="flex flex-row justify-between">
        <section>
          <span className="text-md font-semibold mr-5">
            {word} {word == 1 ? "word" : "words"}
          </span>
          <span className="text-md font-semibold">
            {char} {char == 1 ? "character" : "characters"}
          </span>
        </section>
        <section>
          <span className="mr-5">
            <span className="text-md font-semibold">{leftFBCount}</span>/
            {FACEBOOK_LIMIT}
          </span>
          <span className="mr-5">
            <span className="text-md font-semibold">{leftTwitterCount}</span>/
            {TWITTER_LIMIT}
          </span>
        </section>
      </div>
    </div>
  );
}
