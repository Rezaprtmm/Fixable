"use client";
import FooterTable from "../FooterTable/Index";
import OutputTablePay from "./OutputTablePay/Index";
import { useState, useEffect } from "react";
import axios from "axios";

interface HistoryDataItem {
	invoice: string;
	paymentId: string;
	_id: number;
	billprice: string;
	datesolved: string;
	totalprice: number;
}

export default function TableHistoryPay({ getUsername }: any) {
	const [username, setUsername] = useState("");
	const [historyData, setHistoryData] = useState<HistoryDataItem[]>([]);
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	useEffect(() => {
		const getPaymentHistory = async function () {
			const getData = await axios.post("http://localhost:3001/getuser", { getUsername });
			if (getData.data) {
				setUsername(getData.data);
				const getForm = await axios.post("http://localhost:3001/paymenthistory", { getUsername });
				if (getForm.data) {
					setHistoryData(getForm.data);
				}
			}
		};
		getPaymentHistory();
	}, [getUsername]);
	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-7 bg-blue-subtle rounded-[10px] mt-[24px]">
				<p className="text-blue-main col-span-2 font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Payment Invoice</p>
				<p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Payment ID</p>
				<p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Reservation ID</p>
				<p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Amount</p>
				<p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Date</p>
				<p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Status</p>
			</div>
			<div className="flex flex-col mt-[16px] gap-[8px]">
				{historyData.map((item, index) => (
					<OutputTablePay
						key={`${index}-${item}`}
						inv={`Payment Invoice#00${index + 1} - ${monthNames[parseInt(item.datesolved.split("/")[1]) - 1]} ${item.datesolved.split("/")[2]}`}
						id={item.paymentId}
						resId={item._id}
						amount={`Rp. ${item.totalprice.toLocaleString("id-ID")}`}
						date={item.datesolved}
						status="Done"
					/>
				))}
			</div>
			<FooterTable />
		</div>
	);
}
