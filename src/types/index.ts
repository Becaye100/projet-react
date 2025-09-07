export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  isPublic: boolean;
  allowComments: boolean;
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  articleId: string;
  createdAt: Date;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  sender: User;
  receiverId: string;
  receiver: User;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}