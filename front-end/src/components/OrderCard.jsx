import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import url from "../config/api";
import { toast } from "react-toastify";
import orderService from "../services/orderService";
const OrderCard = ({ order, selectOrder, rerender }) => {
    const { accessToken } = useSelector((state) => state.user);

    const handleRateOrder = async (rating) => {
        try {
            const responseData = await orderService.rateOrder(
                order.id,
                rating,
                accessToken
            );
            toast.success(responseData.msg);
            rerender();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className=" h-60 flex border drop-shadow-md">
            <div className="imgContainer flex-1 bg-slate-300">
                <img
                    src={order.restaurant.logo_url}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-[3] bg-primaryOpposite  flex  px-4 py-7">
                <div className="flex flex-col gap-2">
                    <p className="text-2xl">{order.restaurant.name}</p>
                    <p className=" text-sm mt-auto">
                        {order.date.slice(0, 10)}
                    </p>
                    <p className="text-sm">{order.address}</p>
                    <p className="">${order.price}</p>
                    <div className="flex items-center">
                        <p className="text-sm">Rate the order</p>
                        <div className="ml-3">
                            {Array.from(Array(5).keys()).map((val) =>
                                val + 1 <= order.rating ? (
                                    <StarIcon
                                        key={val}
                                        onClick={() => handleRateOrder(val + 1)}
                                    />
                                ) : (
                                    <StarBorderIcon
                                        key={val}
                                        onClick={() => handleRateOrder(val + 1)}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="ml-auto flex items-end">
                    <button onClick={selectOrder}>View details</button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
