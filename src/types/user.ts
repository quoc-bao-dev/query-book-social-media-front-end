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
  createdAt?: string;
};

export type UserProfileResponse = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  handle: string;
  email: string;
  avatar: Avatar;
  avatarUrl: string;
  coverPage: string;
  bio: string;
  coverPageUrl: string;
  professional: string;
  jobTitle: JobTitle;
  socials: Social[];
  links: Link[];
  skills: Skill[];
  projects: Project[];
  friendCount: number;
  followerCount: number;
  followingCount: number;
  friends: Friend[];
  followers: Follower[];
  followings: Following[];
  interests: string[];
  address: Address[];
  createdAt: string;
};

type Address = {
  province: string;
  district: string;
  ward: string;
  address: string;
  country: string;
};

type Friend = {
  id: string;
  fullName: string;
  handle: string;
  avatar?: Avatar;
  avatarUrl?: string;
  followerCount: number;
  followingCount: number;
};

type Following = Friend;
type Follower = Friend;

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

type JobTitle = {
  id: string;
  title: string;
  description: string;
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

export type UserRequestResponse = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string;
  handle: string;
  createdAt: string;
};
