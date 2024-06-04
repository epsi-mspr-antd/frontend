export interface CreateTip {
  description: string;
  plantId: number;
}

export interface UpdateTip {
  description: string;
}

interface User {
  id: number;
  email: string;
  roles: string[];
  pseudo: string;
}

export interface Tip {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface TipsList {
  data: Tip[];
}
