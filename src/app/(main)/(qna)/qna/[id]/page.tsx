import { getQuestionById } from "@/services/http/question";
import QuestionDetails from "./QuestionDetails";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const question = await getQuestionById(id);

  return (
    <div>
      <QuestionDetails question={question} />
    </div>
  );
};

export default Page;
