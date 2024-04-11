import { split } from "sentence-splitter";

import Sentiment from "sentiment";
import Readability from "text-readability";

const WORD_REGEX = /\s/;

const SPECIAL_CHARACTERS_REGEX = /^[^\p{L}\p{N}]+$/u;

export const getWordCount = (text: string) => {
  const wordIndexes: number[] = [];
  const matches = text.split(WORD_REGEX);
  const words = matches ? matches : [];
  let wordCount = 0;

  words.forEach((word) => {
    if (word !== "" && !SPECIAL_CHARACTERS_REGEX.test(word)) {
      wordCount++;
    }
  });

  return wordCount;
};

export class Statistics {
  static instance: Statistics;

  static getInstance() {
    if (!Statistics.instance) Statistics.instance = new Statistics();
    return Statistics.instance;
  }

  analyzeSentiment = (text: string) => {
    const sentiment = new Sentiment();
    const sentimentObj = sentiment.analyze(text);

    let sentimentText: "Neutral" | "Positive" | "Negative" = "Neutral";

    if (sentimentObj.score > 0) {
      sentimentText = "Positive";
    } else if (sentimentObj.score < 0) {
      sentimentText = "Negative";
    }

    return sentimentText;
  };

  countParagraphs = (text: string) => {
    const paras = text.split("\n").filter((para) => para.trim().length > 0);
    return paras.length;
  };

  fleschScore = (text: string) => {
    const score = Readability.fleschReadingEase(text);
    const grad = Readability.fleschReadingEaseToGrade(score);
    return [score, grad];
  };

  consensus = (text: string) => {
    const consensusScore = Readability.textStandard(text);
    const gradLevel = consensusScore.split("and");
    return gradLevel[1].trim() || gradLevel[0];
  };

  readingTime = (
    wordCount: number,
    wordsPerMinute = 230,
    extendedText = false
  ) => {
    const readTime = wordCount / wordsPerMinute;
    const minutes = Math.floor(readTime);
    const seconds = ((readTime - minutes) * 60).toFixed();
    if (extendedText) {
      return `${minutes} mins ${seconds} secs`;
    }
    return `${minutes}m ${seconds}s`;
  };

  private _splitIntoSentences = (para: string) => {
    const sentencesSplit = split(para);
    const newSentenceSplit: { type: string; raw: string }[] = [];
    sentencesSplit.forEach((s) => {
      if (s.type === "Sentence") {
        const sentenceText = s.raw;
        const subSentences = sentenceText.split("\n");
        let linespace = "";

        subSentences.forEach((subSent) => {
          if (subSent.trim() === "") {
            linespace += "\n";
          } else {
            if (linespace !== "") {
              newSentenceSplit.push({ type: "WhiteSpace", raw: linespace });
              linespace = "";
            }
            newSentenceSplit.push({ type: "Sentence", raw: subSent });
            linespace += "\n";
          }
        });
      } else {
        newSentenceSplit.push(s);
      }
    });
    return newSentenceSplit;
  };

  countSentences(text: string) {
    return this._splitIntoSentences(text).filter(
      (sentence) => sentence.type === "Sentence"
    ).length;
  }
  getGradeLevel(text: string) {
    let gradLevel: "school" | "high_school" | "college" | "graduate" | "pro";

    if (text.trim().length === 0) {
      gradLevel = "school";
    } else {
      const score = this.fleschScore(text)[0];
      if (score >= 80) {
        gradLevel = "school";
      } else if (score < 80 && score >= 60) {
        gradLevel = "high_school";
      } else if (score < 60 && score >= 40) {
        gradLevel = "college";
      } else if (score < 40 && score >= 20) {
        gradLevel = "graduate";
      } else {
        gradLevel = "pro";
      }
    }

    return gradLevel;
  }
}
