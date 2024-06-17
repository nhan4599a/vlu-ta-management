export type Attachment = {
    savedFileName: string,
    originalFileName: string,
    owner?: string
}

export type MinimalApplicationForm = {
    _id: string;
    stage1Approval: boolean | null;
    stage2Approval: boolean | null;
    isTrainingPassed: boolean | null;
}

export type ApplicationForm = MinimalApplicationForm & {
    name: string,
    code: string,
    class: string,
    email: string,
    phoneNumber: string,
    termScore: number,
    avgScore: number,
    description: string,
    attachments: Attachment[],
    scheduleId: string;
    userId: string;
}

export type OverviewApplicationFormResponse = {
    _id: string,
    name: string,
    day: string,
    lesson: string,
    scheduleId: string,
    applications: ApplicationForm[],
    hasMore: boolean
}