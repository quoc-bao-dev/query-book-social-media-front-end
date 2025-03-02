"use client";

import { useEffect } from "react";
import { sCurUserProfileSignal } from "../signal/curUserProfileSignal";

const SetCurUserProfileSignal = ({ user }: { user: any }) => {
  useEffect(() => {
    sCurUserProfileSignal.set({ user });
  });
  return <div></div>;
};

export default SetCurUserProfileSignal;
