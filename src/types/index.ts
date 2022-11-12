interface User {
  userName: string;
  id: string;
}

interface ChatData {
  message: string;
  user: User;
}

export type { User, ChatData };
