import React from "react";
import SidebaRrow from "./SidebarRow";
import {
  BellIcon,
  BookOpenIcon,
  CollectionIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center col-span-2 px-4 border-r md:items-start">
      <div className="relative w-10 h-10 m-3">
        <Image src="https://links.papareact.com/drq" alt="" layout="fill" />
      </div>
      <SidebaRrow Icon={HomeIcon} title="Home" />
      <SidebaRrow Icon={HashtagIcon} title="Explore" />
      <SidebaRrow Icon={BellIcon} title="Notifications" />
      <SidebaRrow Icon={MailIcon} title="Messages" />
      <SidebaRrow Icon={BookOpenIcon} title="Bookmarks" />
      <SidebaRrow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "Sign Out" : "Sign In"}
      />

      <SidebaRrow Icon={DotsHorizontalIcon} title="More" />
    </div>
  );
};

export default Sidebar;
