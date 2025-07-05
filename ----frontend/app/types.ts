export type CaseMutation = {
    id?: number;
    title: string;
    case_description: string | null;
    source_file_url: string | null;
    creator_id: number | null;
};

export type CaseRecord = CaseMutation & {
    id: string;
    createdAt: string;
    likes: number;
    views: number;
    creator: CreatorRecord | null;
    tag: string;
    source_file_url: string;
};

export type CreatorRecord = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    creator_description: string;
    avatar?: string;
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type Tag = 'Motion' | 'Graphic' | 'Web'

export type LoginCredentialsErrors = Partial<LoginCredentials>

export type SignUpCredentials = LoginCredentials & {
    confirmPassword: string;
}

export type SignUpCredentialsErrors = Partial<SignUpCredentials>

export type Filter = Partial<{
    byCreator: CreatorRecord["id"],
    byTag: Tag
}> | undefined;
