import { svgPaths } from "@/lib/svgPaths";

export default function SVGIcon({ variant, width, color = "currentColor" }) {
  return (
    <svg
      viewBox={svgPaths[variant].viewbox}
      width={width}
      fill={color}
      aria-labelledby="title"
    >
      <title id="title">{variant}</title>
      <path d={svgPaths[variant].path} />
    </svg>
  );
}
