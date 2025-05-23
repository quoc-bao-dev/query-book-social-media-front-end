"use client";

import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarUI,
} from "@/components/ui/avatar";
import { sAuth } from "@/store/authSignal";

const Avatar = () => {
  const user = sAuth.use();
  const name =
    user.user?.firstName
      ?.split(" ")
      .map((name) => name[0])
      .join("") || "";
  return (
    <div>
      <AvatarUI>
        <AvatarImage src={user.user?.avatarUrl} />
        <AvatarFallback>{name}</AvatarFallback>
      </AvatarUI>
    </div>
  );
};

export default Avatar;
