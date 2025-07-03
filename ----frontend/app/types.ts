export type CaseMutation = {
    id?: number;
    title: string
    case_description: string | null
    source_file_url: string | null
    creator_id: number | null
};

export type CaseRecord = CaseMutation & {
    id: string;
    createdAt: string;
};
