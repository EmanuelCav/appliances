import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex justify-start items-center w-4/12">
        <Image width={60} height={60} src={'/oven.png'} alt="icon"/>
        <h1 className="text-white text-4xl select-none">Appliance</h1>
    </div>
  )
}

export default Logo