interface TextPaymentProps {
  title: string;
  price: string;
  className1?: string;
  plus?: string;
}
export default function TextPayment(props: TextPaymentProps) {
  const { title, price, className1, plus } = props;
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="text-dark-2 font-poppins text-[14px] font-normal leading-[170%]">
        {title}
      </p>
      <p
        className={`font-poppins text-[14px] font-normal leading-[170%] ${className1}`}
      >
        <span>{plus}</span>Rp {price}
      </p>
    </div>
  );
}
