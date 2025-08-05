import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
  arrowDirection: string;
  btnText: string;
}

function Button({ onClick, btnText, arrowDirection }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        mb-[4rem] w-[11.85rem] md:mb-[6.4rem] md:w-[14.6rem] lg:mb-0 mr-40
        rounded-[2.8rem] bg-[var(--color-white)] font-bold
        pl-[1.7rem] pr-[.4rem] py-[.4rem] md:pl-[2.1rem] md:pr-[.8rem] md:py-[.8rem] lg:pr-[.9rem]
        flex justify-between items-center
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-8 focus:ring-offset-black
        group
      "
    >
      <p className="uppercase text-[var(--color-black)] text-[18px] leading-[150%] tracking-[7px] font-extrabold ml-3">
        {btnText}
      </p>
      <div className="w-[3.2rem] h-[3.2rem] md:w-[4rem] md:h-[4rem] bg-[var(--color-grey-dark)] group-hover:bg-[var(--color-grey-light)] rounded-full flex justify-center items-center">
        <Image
          src={`/images/desktop/icon-arrow-${arrowDirection}.svg`}
          alt="Arrow"
          width={24}
          height={24}
          className="w-auto h-auto"
        />
      </div>
    </button>
  );
}

export default Button;