import Image from "next/image";

export default function Crosshairs({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="bg-white p-2 absolute right-2.5 bottom-[113px] cursor-pointer border border-grey-1 rounded-[2px]"
      style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px" }}
      onClick={onClick}
    >
      <Image
        src="/icon/icon-crosshairs.svg"
        alt="icon-crosshairs"
        width={24}
        height={24}
      />
    </div>
  );
}
