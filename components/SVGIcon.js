import { svgPaths } from "@/lib/svgPaths";

export default function SVGIcon({
  variant,
  width,
  label,
  color = "currentColor",
}) {
  return (
    <svg
      viewBox={svgPaths[variant].viewbox}
      width={width}
      fill={color}
      aria-label={label}
    >
      <title id={label}>{variant}</title>
      <path d={svgPaths[variant].path} />
    </svg>
  );
}
