import { svgPaths } from "@/lib/svgPaths";

export default function SVGIcon({
  variant,
  width,
  height,
  label,
  color = "currentColor",
}) {
  return (
    <svg
      viewBox={svgPaths[variant].viewbox}
      width={width}
      height={height}
      fill={color}
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={label}>{variant}</title>
      <path d={svgPaths[variant].path} />
    </svg>
  );
}
