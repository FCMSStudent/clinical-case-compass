import React from "react";
import { motion } from "framer-motion";
import type { ViewType, BodyPartId } from "./InteractiveBodyDiagram";

export interface BodySvgViewProps {
  viewType: ViewType;
  svgRef?: React.Ref<SVGSVGElement>;
  renderBodyShape: (part: BodyPartId, shape: JSX.Element) => React.ReactNode;
}

const BodySvgView: React.FC<BodySvgViewProps> = ({
  viewType,
  svgRef,
  renderBodyShape,
}) => {
  const AnimatedSVG = motion.svg;

  return (
    <AnimatedSVG
      ref={svgRef}
      key={viewType}
      initial={{ opacity: 0, rotateY: viewType === "posterior" ? 180 : 0 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: viewType === "anterior" ? -180 : 180 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      {viewType === "anterior" ? (
        <>
          {/* ----- ANTERIOR VIEW ----- */}
          {renderBodyShape("head", <ellipse cx={140} cy={60} rx={45} ry={50} />)}
          {renderBodyShape("neck", <rect x={125} y={105} width={30} height={25} rx={15} />)}
          {renderBodyShape("shoulders", <ellipse cx={140} cy={140} rx={80} ry={20} />)}
          {renderBodyShape(
            "chest",
            <path d="M85 130 L195 130 L190 220 L165 250 L115 250 L90 220 Z" />
          )}
          {renderBodyShape(
            "abdomen",
            <path d="M115 250 L165 250 L160 320 L120 320 Z" />
          )}
          {renderBodyShape(
            "pelvis",
            <path d="M120 320 L160 320 L170 370 L110 370 Z" />
          )}
          {renderBodyShape(
            "leftArm",
            <path d="M85 140 L60 145 L45 200 L50 280 L70 285 L85 220" />
          )}
          {renderBodyShape(
            "rightArm",
            <path d="M195 140 L220 145 L235 200 L230 280 L210 285 L195 220" />
          )}
          {renderBodyShape(
            "leftLeg",
            <path d="M120 370 L110 370 L100 485 L130 485 L135 370" />
          )}
          {renderBodyShape(
            "rightLeg",
            <path d="M145 370 L145 485 L175 485 L170 370 Z" />
          )}
        </>
      ) : viewType === "posterior" ? (
        <>
          {/* ----- POSTERIOR VIEW ----- */}
          {renderBodyShape("head", <ellipse cx={140} cy={60} rx={45} ry={50} />)}
          {renderBodyShape("neck", <rect x={125} y={105} width={30} height={25} rx={15} />)}
          {renderBodyShape(
            "back",
            <path d="M85 130 L195 130 L190 320 L90 320 Z" />
          )}
          {renderBodyShape("spine", <rect x={135} y={130} width={10} height={190} rx={5} />)}
          {renderBodyShape(
            "pelvis",
            <path d="M90 320 L190 320 L170 370 L110 370 Z" />
          )}
          {renderBodyShape(
            "leftArm",
            <path d="M85 140 L60 145 L45 200 L50 280 L70 285 L85 220" />
          )}
          {renderBodyShape(
            "rightArm",
            <path d="M195 140 L220 145 L235 200 L230 280 L210 285 L195 220" />
          )}
          {renderBodyShape(
            "leftLeg",
            <path d="M120 370 L110 370 L100 485 L130 485 L135 370" />
          )}
          {renderBodyShape(
            "rightLeg",
            <path d="M145 370 L145 485 L175 485 L170 370 Z" />
          )}
        </>
      ) : (
        <>
          {/* ----- LATERAL VIEW ----- */}
          {renderBodyShape("head", <ellipse cx={140} cy={60} rx={35} ry={50} />)}
          {renderBodyShape("neck", <rect x={135} y={105} width={20} height={25} rx={10} />)}
          {renderBodyShape(
            "shoulders",
            <path d="M140 130 L200 150 L140 150 Z" />
          )}
          {renderBodyShape(
            "chest",
            <path d="M140 150 L190 170 L180 240 L140 240 Z" />
          )}
          {renderBodyShape(
            "abdomen",
            <path d="M140 240 L180 240 L175 300 L140 300 Z" />
          )}
          {renderBodyShape(
            "pelvis",
            <path d="M140 300 L175 300 L180 350 L140 350 Z" />
          )}
          {renderBodyShape(
            "rightArm",
            <path d="M190 170 L215 175 L225 230 L220 285 L200 290 L190 240" />
          )}
          {renderBodyShape(
            "rightLeg",
            <path d="M140 350 L165 355 L175 485 L145 485 Z" />
          )}
        </>
      )}
    </AnimatedSVG>
  );
};

export default BodySvgView;
