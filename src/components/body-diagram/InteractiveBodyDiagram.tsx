
import React from "react";

interface InteractiveBodyDiagramProps {
  onBodyPartSelected: (part: string) => void;
  highlightedSystems?: string[];
}

export const InteractiveBodyDiagram: React.FC<InteractiveBodyDiagramProps> = ({
  onBodyPartSelected,
  highlightedSystems = []
}) => {
  const bodyParts = [
    "Head", "Neck", "Chest", "Abdomen", "Arms", "Legs"
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Body Diagram</h3>
      <div className="grid grid-cols-2 gap-2">
        {bodyParts.map((part) => (
          <button
            key={part}
            onClick={() => onBodyPartSelected(part)}
            className={`p-3 border rounded hover:bg-primary/10 transition-colors ${
              highlightedSystems.includes(part) ? "bg-primary/20 border-primary" : ""
            }`}
          >
            {part}
          </button>
        ))}
      </div>
    </div>
  );
};
