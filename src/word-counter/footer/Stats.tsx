"use client";
import { EditorEventsSub } from "@/ink-editor/EditorEventsSub";
import { InkEditor } from "@/ink-editor/Factory";
import { Statistics } from "@/utils/statistics";
import { debounce } from "lodash-es";
import { useEffect, useState } from "react";
import StatTiles from "./StatTiles";

const Stats = () => {
  const [state, setState] = useState<any>({
    sentiment: "Neutral",
    sentences: 0,
    paragraphs: 0,
    score: 0,
    readTime: "0m 0s",
    gradeLevel: "school",
  });

  useEffect(() => {
    const debouncedStat = debounce(() => {
      const text = InkEditor.getInstance().getEditorText();
      const sentiment = Statistics.getInstance().analyzeSentiment(text);
      const sentences = Statistics.getInstance().countSentences(text);
      const paragraphs = Statistics.getInstance().countParagraphs(text);
      const score = Statistics.getInstance().fleschScore(text);
      const readTime = Statistics.getInstance().readingTime(
        InkEditor.getInstance().getWordAndCharCount().word
      );
      const gradeLevel = Statistics.getInstance().getGradeLevel(text);

      setState({
        sentiment,
        sentences,
        paragraphs,
        score,
        gradeLevel,
        readTime,
      });
    }, 200);

    const unsubscribe = EditorEventsSub.change(() => {
      debouncedStat();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <StatTiles {...state} />;
};

export default Stats;
