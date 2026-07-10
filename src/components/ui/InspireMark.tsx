export function InspireMark({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0 bg-ink"
      style={{
        width: size,
        height: size,
        clipPath: "polygon(0% 8%, 92% 0%, 100% 88%, 10% 100%, 0% 55%)",
      }}
    >
      <span
        className="absolute bg-cobalt"
        style={{
          width: size * 0.34,
          height: size * 0.34,
          right: size * 0.14,
          top: size * 0.14,
          clipPath: "polygon(0% 10%, 90% 0%, 100% 85%, 12% 100%)",
        }}
      />
    </div>
  );
}