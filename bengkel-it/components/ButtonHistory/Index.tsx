import ButtonService from "../ButtonService/Index";

interface ButtonHistoryProps {
  activeMenu: "service history" | "review history" | "payment history";
}

export default function ButtonHistory(props: ButtonHistoryProps) {
  const { activeMenu } = props;
  return (
    <div className="mt-[24px] grid grid-cols-3 gap-[20px]">
      <ButtonService
        title="Service History"
        href={"/history/service-history"}
        active={activeMenu === "service history"}
      />
      <ButtonService
        title="Review History"
        href={"/history/review-history"}
        active={activeMenu === "review history"}
      />
      <ButtonService
        title="Payment History"
        href={"/history/payment-history"}
        active={activeMenu === "payment history"}
      />
    </div>
  );
}
