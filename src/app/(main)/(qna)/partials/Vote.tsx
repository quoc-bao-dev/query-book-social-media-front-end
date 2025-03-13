import VoteDownIcon from '@/components/icons/VoteDownIcon';
import VoteUpIcon from '@/components/icons/VoteUpIcon';
import { useVoteAnswerMutation } from '@/queries/answer';
import { useAuth } from '@/store/authSignal';

type VoteProps = {
  votes: { user: { _id: string }; voteType: 'up' | 'down' }[];
  answerId: string;
  questionId: string;
};

const Vote = ({ votes, answerId, questionId }: VoteProps) => {
  const { user } = useAuth();

  const { mutateAsync } = useVoteAnswerMutation(questionId);

  const handleVote = (type: 'up' | 'down') => async () => {
    await mutateAsync({ answerId, type });
    // Gọi API cập nhật vote ở đây nếu có
  };

  // Kiểm tra xem user đã vote chưa
  const userVote = Array.isArray(votes)
    ? votes.find((vote) => vote.user._id === user?.id)
    : null;

  const upVoted = userVote?.voteType === 'up';
  const downVoted = userVote?.voteType === 'down';

  const totalVotes =
    votes?.filter((v) => v.voteType === 'up').length -
    votes?.filter((v) => v.voteType === 'down').length;

  return (
    <div className='flex flex-col items-center space-y-1 absolute left-[-50px] top-1/2 transform -translate-y-1/2'>
      <button
        onClick={handleVote('up')}
        className={`p-2 rounded-full ${
          upVoted ? 'bg-success-600' : 'bg-neutral-200'
        } hover:bg-success-600`}
      >
        <VoteUpIcon
          className={`w-6 h-6 ${upVoted ? 'text-white' : 'text-neutral-800'}`}
        />
      </button>
      <span className='text-lg font-semibold text-gray-700'>{totalVotes}</span>

      <button
        onClick={handleVote('down')}
        className={`p-2 rounded-full ${
          downVoted ? 'bg-error-500/70' : 'bg-neutral-200'
        } hover:bg-error-500/70`}
      >
        <VoteDownIcon
          className={`w-6 h-6 ${downVoted ? 'text-white' : 'text-neutral-800'}`}
        />
      </button>
    </div>
  );
};

export default Vote;
