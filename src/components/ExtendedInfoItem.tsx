interface ExtendedInfoItemProps {
  info: string;
  infoType: string;
  className: string;
}

function ExtendedInfoItem({
  info,
  infoType,
  className,
}: ExtendedInfoItemProps) {
  return (
    <div
      className={`flex justify-between items-center md:flex-col md:items-start ${className} lg:gap-[0.9rem]`}
    >
      <p className="uppercase ps-0 lg:ps-0 mr-2">
        {infoType}
      </p>
      <div className="ps-2 md:ps-2 lg:ps-2 ">
        {info}
      </div>
    </div>
  );
};

export default ExtendedInfoItem;
