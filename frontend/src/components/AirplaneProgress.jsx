// import { useEffect, useRef, useState } from "react";

// const AirplaneProgress = ({ progress }) => {
//   const pathRef = useRef(null);
//   const [planePos, setPlanePos] = useState({ x: 0, y: 0, angle: 0 });
//   const [pathLength, setPathLength] = useState(0);

//   const PATH_D = "M 20,100 C 150,20 300,180 450,60 S 700,20 780,100";

//   useEffect(() => {
//     if (pathRef.current) {
//       setPathLength(pathRef.current.getTotalLength());
//     }
//   }, []);

//   useEffect(() => {
//     if (!pathRef.current || pathLength === 0) return;

//     const point = pathRef.current.getPointAtLength(progress * pathLength);
//     const nextPoint = pathRef.current.getPointAtLength(
//       Math.min(progress * pathLength + 1, pathLength)
//     );
//     const angle =
//       (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

//     setPlanePos({ x: point.x, y: point.y, angle });
//   }, [progress, pathLength]);

//   return (
//     <svg viewBox="0 0 800 200" className="w-full h-40">
//       <path
//         d={PATH_D}
//         fill="none"
//         stroke="currentColor"
//         strokeOpacity="0.15"
//         strokeWidth="2"
//         strokeDasharray="6 6"
//       />

//       <path
//         ref={pathRef}
//         d={PATH_D}
//         fill="none"
//         stroke="currentColor"
//         className="text-primary"
//         strokeWidth="2"
//         strokeDasharray="6 6"
//         strokeDashoffset={pathLength - progress * pathLength}
//         style={{ transition: "stroke-dashoffset 0.6s ease" }}
//       />

//       <g
//         transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planePos.angle})`}
//         style={{ transition: "transform 0.6s ease" }}
//       >
//         <path d="M0,-6 L14,0 L0,6 L3,0 Z" className="fill-primary" />
//       </g>
//     </svg>
//   );
// };

// export default AirplaneProgress;