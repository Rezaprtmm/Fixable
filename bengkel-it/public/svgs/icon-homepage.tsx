import { ComponentProps } from "react";

export default function IconHomepage(props: ComponentProps<"svg">) {
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
        d="M12 14.7V17.4M21 12.1836V13.5525C21 17.0625 21 18.8184 19.9452 19.9092C18.8913 21 17.1939 21 13.8 21H10.2C6.8061 21 5.1087 21 4.0548 19.9092C3 18.8184 3 17.0634 3 13.5525V12.1836C3 10.1235 3 9.0939 3.468 8.2407C3.9342 7.3866 4.7883 6.8574 6.4956 5.7972L8.2956 4.6803C10.1001 3.5598 11.0028 3 12 3C12.9972 3 13.899 3.5598 15.7044 4.6803L17.5044 5.7972C19.2117 6.8574 20.0658 7.3866 20.5329 8.2407"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}
