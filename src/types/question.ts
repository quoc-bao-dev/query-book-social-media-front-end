export type QuestionResponse = {
    code: Code;
    hashtags: Hashtag[];
    _id: string;
    userId: string;
    topic: string;
    title: string;
    question: string;
    vote: any[];
    __v: number;
    createdAt?: string;
    updatedAt?: string;
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