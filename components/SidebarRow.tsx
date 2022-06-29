import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}

const SidebaRrow = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex items-center px-3 py-4 space-x-2 transition-all duration-200 rounded-full cursor-pointer hover:bg-gray-100 group max-w-fit"
    >
      <Icon className="w-6 h-6" />
      <p className="hidden text-base font-light group-hover:text-twitter md:inline-flex lg:text-xl">
        {title}
      </p>
    </div>
  );
};

export default SidebaRrow;
