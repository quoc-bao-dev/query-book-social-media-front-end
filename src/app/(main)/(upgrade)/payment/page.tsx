import MainCheckOut from './partials/MainCheckOut';

export const metadata = {
  title: 'Payment',
  description: 'Welcome to Query Book!',
};
const page = () => {
  return (
    <div>
      payment <MainCheckOut />
    </div>
  );
};

export default page;
