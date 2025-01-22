export type UserResponse = {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    handle: string;
    avatar: Avatar;
    coverPage: Avatar;
    socials: Social[];
    links: Link[];
    skills: Skill[];
    projects: Project[];
    friendCount: number;
    followerCount: number;
    followingCount: number;
    friends: Friend[];
    followers: any[];
    followings: any[];
    interests: any[];
    address: any[];
    createdAt: string;
};

type Friend = {
    fullName: string;
    handle: string;
    followerCount: number;
    followingCount: number;
};

type Project = {
    projectName: string;
    description: string;
    startDate: string;
    endDate: string;
};

type Skill = {
    name: string;
    display: string;
};

type Link = {
    title: string;
    url: string;
};

type Social = {
    type: string;
    url: string;
};

type Avatar = {
    type: string;
    sourceType: string;
    file: string;
};
