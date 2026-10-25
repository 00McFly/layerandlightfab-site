/** The vector mark split into its steel and lit layers (from design-system/assets/logo-mark-duotone.svg). */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 533.667 548.374" aria-hidden="true">
      <path
        className="steel"
        fill="#a4a4a2"
        d="M171.58,464.01V0L0,126.2v312.1l160.888,110.074h108.51l-202.497-136.564h-.54l1.65-329.47,17.72-13.01v336.97l85.85,57.71Z"
      />
      <path
        className="lit-layer"
        fill="#ffefcc"
        d="M269.583,426.516h-73.224V82.924l73.224,66.096v277.496ZM197.316,438.32h250.594l85.757,77.834h-239.56l-96.79-77.834Z"
      />
    </svg>
  );
}
