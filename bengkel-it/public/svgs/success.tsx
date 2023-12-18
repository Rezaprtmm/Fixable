import { ComponentProps } from "react";

export default function Success(props: ComponentProps<"svg">) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="100" cy="100" r="100" fill="#57EBA1" />
      <circle cx="100" cy="100" r="80" fill="#39D98A" />
      <circle cx="100" cy="100" r="60" fill="#06C270" />
      <path
        d="M118 89.9999L94 114L83 103L85.82 100.18L94 108.34L115.18 87.1799L118 89.9999Z"
        fill="white"
      />
    </svg>
  );
}
