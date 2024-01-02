import { FiShoppingCart } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";

const ActionsHeader = () => {
  return (
    <div className="flex justify-evenly align-center w-4/12">
        <FaRegStar size={32} className="cursor-pointer text-white hover:text-indigo-100" />
        <FiShoppingCart size={32} className="cursor-pointer text-white hover:text-indigo-100" />
        <IoPersonOutline size={32} className="cursor-pointer text-white hover:text-indigo-100" />
    </div>
  )
}

export default ActionsHeader