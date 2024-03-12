export interface Data<T> {
    status: number
    data: T
    msg: string
    error: string
}

export interface User {
    id: number;
    username: string;
    status: string;
    create_at: number;
}

export interface Token {
    user: User;
    token: string;
}
export interface ListItemType {
    iD: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    uid: number;
    username: string;
    mid: number;
    title: string;
    content: string;
    likeNum: number;
    commentNum: number;
    collectNum: number;
}
