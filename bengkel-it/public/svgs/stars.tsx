import { ComponentProps } from "react";

export default function Stars(props: ComponentProps<"svg">) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="currentWidth" height="currentHeight" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#FFC700" />
		</svg>
	);
}
