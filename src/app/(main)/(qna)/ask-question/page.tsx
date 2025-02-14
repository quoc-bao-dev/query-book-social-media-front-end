import React from "react";
import MainContentAskQuestion from "./partials/MainContentAskQuestion";

export const metadata = {
  title: "Ask Question Page ",
  description: "Frequently asked questions about our products and services.",
  keywords: ["questions", "faq", "help"],
};
const page = () => {
  return <MainContentAskQuestion />;
};

export default page;
