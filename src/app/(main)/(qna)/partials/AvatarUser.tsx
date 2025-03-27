import Avatar from '@/components/common/Avatar';

interface AvatarUserProps {
  src: string;
  firstName: string;
  lastName: string;
  className?: string;
}

const AvatarUser = ({
  src,
  firstName,
  lastName,
  className,
}: AvatarUserProps) => {
  return (
    <Avatar
      src={src}
      className={className || 'w-10 h-10 rounded-full'}
      fallBack={`${firstName} ${lastName}`}
    />
  );
};

export default AvatarUser;
