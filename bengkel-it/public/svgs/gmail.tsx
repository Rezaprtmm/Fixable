import { ComponentProps } from "react";

export default function Gmail(props: ComponentProps<"svg">) {
  return (
    <svg
      width="33"
      height="24"
      viewBox="0 0 33 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.1874 20.9407V11.6703L7.31235 9.04006L4.73422 7.58047V19.3047C4.73422 20.2099 5.46763 20.9407 6.37021 20.9407H10.1874Z"
        fill="#4285F4"
      />
      <path
        d="M23.2749 20.9407H27.0921C27.9974 20.9407 28.7281 20.2072 28.7281 19.3047V7.58057L25.808 9.25235L23.2749 11.6703V20.9407Z"
        fill="#34A853"
      />
      <path
        d="M10.1874 11.6703L9.79619 8.04807L10.1874 4.58125L16.7312 9.4891L23.2749 4.58125L23.7125 7.8609L23.2749 11.6703L16.7312 16.5781L10.1874 11.6703Z"
        fill="#EA4335"
      />
      <path
        d="M23.2749 4.58126V11.6703L28.7281 7.58048V5.39921C28.7281 3.37614 26.4187 2.22285 24.8019 3.43612L23.2749 4.58126Z"
        fill="#FBBC04"
      />
      <path
        d="M4.73418 7.58048L7.2422 9.46156L10.1874 11.6703V4.58126L8.66037 3.43612C7.04078 2.22275 4.73418 3.37614 4.73418 5.39911V7.58039V7.58048Z"
        fill="#C5221F"
      />
    </svg>
  );
}
