import Image from 'next/image';
const Avatar = () => {
    return (
        <div>
            <Image
                src={'/images/git.png'}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
            />
        </div>
    );
};

export default Avatar;
