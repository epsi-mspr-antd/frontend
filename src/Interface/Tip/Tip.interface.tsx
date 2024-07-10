export interface CreateTip {
  description: string;
  plantId: number;
  pic: null | File;
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
  image: null | File;
  user: User;
}

export interface TipsList {
  data: Tip[];
}
