"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import ProfileButton from "./partials/ProfileButton";
import PostButton from "./partials/PostButton";
import { sCurUserProfileSignal } from "../signal/curUserProfileSignal";
import { useAuth } from "@/store/authSignal";

const layout = ({ children }: PropsWithChildren) => {
  const { user } = sCurUserProfileSignal.use();
  const { user: userMe } = useAuth();

  const isMe = user?.id === userMe?.id;
  const profileLink = isMe ? "/me/profile" : `/${user?.id || ""}/profile`;
  const targetLink = isMe ? "/me" : `/${user?.id || ""}`;

  return <div className="">{children}</div>;
};

export default layout;
