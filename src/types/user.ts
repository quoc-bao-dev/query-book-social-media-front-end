export type UserResponse = {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    username: string;
    email: string;
    avatar?: Avatar;
    avatarUrl?: string;
    handle: string;
    friendCount: number;
    followerCount: number;
    followingCount: number;
    role: string;
    isBlock: boolean;
    createdAt: string;
};

export type UserProfileResponse = {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    handle: string;
    email: string;
    avatar?: Avatar;
    avatarUrl?: string;
    coverPage?: Avatar;
    coverPageUrl?: string;
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
    id?: string;
    type: 'image' | 'video';
    sourceType: 'url' | 'file';
    file?: string;
    url?: string;
};

export type UserSearchResponse = UserResponse;

export type UserSuggestResponse = {
    id: string;
    fullName: string;
    username: string;
    avatarUrl?: string;
    professional?: string;
    email: string;
    handle: string;
};
