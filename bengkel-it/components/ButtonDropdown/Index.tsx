export default function ButtonDropdown({ title, type, onClick, className }: any) {
	return (
		<button
			className={`text-dark-2 font-poppins text-start text-[16px] font-normal leading-[170%] border-b-[1px] border-[#C3C3C3] py-[22px]
        ${className}`}
			onClick={() => onClick(title)}>
			{title}
		</button>
	);
}
