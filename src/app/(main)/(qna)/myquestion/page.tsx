import React from 'react';
import MainContentMyQuestion from './partials/MainContentMyQuestion';

export const metadata = {
  title: 'My Question Page',
  description: 'Frequently asked questions about our products and services.',
  keywords: ['questions', 'faq', 'help'],
};
const page = () => {
  return <MainContentMyQuestion />;
};

export default page;
