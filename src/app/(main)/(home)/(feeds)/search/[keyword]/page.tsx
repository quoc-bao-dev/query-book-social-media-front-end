type PageProps = {
  params: { keyword: string };
};
const Page = async ({ params }: PageProps) => {
  const { keyword } = await params;
  return <div>Page search {keyword}</div>;
};

export default Page;
