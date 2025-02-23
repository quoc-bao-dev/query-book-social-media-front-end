export type SaveQuestionResponse = {
    _id: string;
    userId: UserId;
    __v: number;
    questionId: QuestionId;
  }
  
  export type QuestionId = {
    userId: UserId2;
    code?: Code;
    hashtags?: Hashtag[];
    _id?: string;
    topic?: string;
    title?: string;
    question?: string;
    vote?: any[];
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export type Hashtag = {
    _id: string;
    name: string;
    usageCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export type Code = {
    fileType: string;
    code?: string;
  }
  
  export type UserId2 = {
    avatarUrl: null | string;
    _id?: string;
    email?: string;
    avatar?: Avatar;
    firstName?: string;
    lastName?: string;
  }
  
  export type UserId = {
    _id: string;
    email: string;
    avatar: Avatar;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  }
  
  export type Avatar = {
    _id: string;
    file: string;
    sourceType: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }