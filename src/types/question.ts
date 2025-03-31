export type QuestionResponse = {
  code: Code;
  hashtags: Hashtag[];
  _id: string;
  userId: UserId;
  topic: Topic;
  title: string;
  question: string;
  vote: any[];
  __v: number;
  createdAt?: string;
  updatedAt?: string;
  images: string[]
};

interface UserId {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: Avatar;
  avatarUrl?: string;
}

interface Topic {
  name: string
}
interface Avatar {
  _id: string;
  file: string;
  sourceType: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Hashtag {
  _id: string;
  name: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Code {
  fileType: string;
  code?: string;
}

export interface SaveQuestionResponse {
  _id: string;
  userId: UserId;
  __v: number;
  questionId: QuestionId;
}

interface QuestionId {
  userId: UserId;
  code?: Code;
  hashtags?: Hashtag[];
  _id?: string;
  topic?: string;
  title?: string;
  question?: string;
  vote?: any[];
  __v?: number;
  createdAt?: string;
}
