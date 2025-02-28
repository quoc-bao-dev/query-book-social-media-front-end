import React from 'react';
import MainContentDetailQnA from './partials/MainContentDetailQnA';

export const metadata = {
  title: 'Detail Q&A Page',
  description: 'Frequently asked questions about our products and services.',
  keywords: ['questions', 'faq', 'help'],
};
const page = () => {
  return <MainContentDetailQnA />;
};

export default page;
