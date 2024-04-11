import { useTooltip } from "@/hooks/useTooltip";
import "./Stats.css";

interface ITileProps {
  label: string;
  value: string;
  tooltip?: string;
}

function Tile(props: ITileProps) {
  return (
    <span className="inline-flex min-w-14 stats-tooltip">{props.label}</span>
  );
}

const StatTiles = (props: any) => {
  const {
    sentences = 0,
    paragraphs = 0,
    readTime = "0m 0s",
    gradeLevel = "school",
    sentiment = "Neutral",
  } = props;

  const emoji: Record<typeof sentiment, "😊" | "😢" | "😐"> = {
    Positive: "😊",
    Negative: "😢",
    Neutral: "😐",
  };

  const gradeEmoji: Record<typeof gradeLevel, any> = {
    school: {
      label: (
        <span
          className="text-md font-normal"
          title={`Text appears to be SCHOOL grade`}
        >
          <span role="img" title="School">
            ✏️
          </span>{" "}
          School
        </span>
      ),
      value: "school",
      tooltip: "Text appears to be SCHOOL grade",
      id: "gradeLevel",
    },
    high_school: {
      label: (
        <span
          className="text-md font-normal"
          title={`Text appears to be HIGH SCHOOL grade`}
        >
          <span role="img" title="High School">
            📚
          </span>{" "}
          High School
        </span>
      ),
      value: "high_school",
      tooltip: "Text appears to be HIGH SCHOOL grade",
      id: "gradeLevel",
    },
    college: {
      label: (
        <span
          className="text-md font-normal"
          title={`Text appears to be COLLEGE grade`}
        >
          <span role="img" title="College">
            🏫
          </span>{" "}
          College
        </span>
      ),
      value: "college",
      tooltip: "Text appears to be COLLEGE grade",
      id: "gradeLevel",
    },
    graduate: {
      label: (
        <span
          className="text-md font-normal"
          title={`Text appears to be GRADUATE grade`}
        >
          <span role="img" title="Graduate">
            🎓
          </span>{" "}
          Graduate
        </span>
      ),
      value: "graduate",
      tooltip: "Text appears to be GRADUATE grade",
      id: "gradeLevel",
    },
    pro: {
      label: (
        <span
          className="text-md font-normal"
          title={`Text appears to be PRO grade`}
        >
          <span role="img" title="Pro">
            👑
          </span>{" "}
          Pro
        </span>
      ),
      value: "pro",
      tooltip: "Text appears to be PRO grade",
      id: "gradeLevel",
    },
  };

  const stats = [
    {
      label: (
        <span className="text-md font-normal">Sentences: {sentences}</span>
      ),
      tooltip: "",
      id: "sentences",
    },
    {
      label: (
        <span className="text-md font-normal">Paragraphs: {paragraphs}</span>
      ),
      tooltip: "",
      id: "paragraphs",
    },

    {
      label: (
        <span
          className="text-md font-normal"
          title={`Read time of ${readTime}, ref ~230 WPM.`}
        >
          Read time: {readTime}
        </span>
      ),
      tooltip: `Read time ${readTime}.`,
      id: "readTime",
    },
    gradeEmoji[gradeLevel],
    {
      label: (
        <span
          className="text-md font-normal"
          title={`Text appears to have ${sentiment} sentiments.`}
        >
          <span>Emotions: </span>
          <span role="img" title={sentiment}>
            {emoji[sentiment]}
          </span>
        </span>
      ),
      tooltip: `Text appears to have ${sentiment} sentiments.`,
      id: "sentiment",
    },
  ];

  return (
    <>
      {stats.map((tile) => (
        <Tile key={tile.id} {...tile} />
      ))}
    </>
  );
};

export default StatTiles;
