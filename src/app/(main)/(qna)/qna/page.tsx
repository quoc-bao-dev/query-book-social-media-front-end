import React from 'react';
import MainContentQnA from './partials/MainContentQnA';

export const metadata = {
  title: 'Q&A Page',
  description: 'Frequently asked questions about our products and services.',
  keywords: ['questions', 'faq', 'help'],
};
const page = () => {
  return <MainContentQnA />;
};

export default page;
