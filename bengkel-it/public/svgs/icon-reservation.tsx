import { ComponentProps } from "react";

export default function IconReservation(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M19.898 16H7.898C6.968 16 6.503 16 6.121 16.102C5.61231 16.2384 5.14849 16.5063 4.77618 16.8788C4.40386 17.2513 4.13616 17.7152 4 18.224"
        stroke="currentColor"
      />
      <path
        d="M8 7H16M8 10.5H13M10 22C7.172 22 5.757 22 4.879 21.121C4 20.243 4 18.828 4 16V8C4 5.172 4 3.757 4.879 2.879C5.757 2 7.172 2 10 2H14C16.828 2 18.243 2 19.121 2.879C20 3.757 20 5.172 20 8M14 22C16.828 22 18.243 22 19.121 21.121C20 20.243 20 18.828 20 16V12"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
