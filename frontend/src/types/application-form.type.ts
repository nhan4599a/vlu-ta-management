export type Attachment = {
    savedFileName: string,
    originalFileName: string
}

export type MinimalApplicationForm = {
    _id: string;
    stage1Approval: boolean;
    stage2Approval: boolean
}

export type ApplicationForm = MinimalApplicationForm & {
    name: string,
    code: string,
    class: string,
    phoneNumber: string,
    termScore: number,
    avgScore: number,
    description: string,
    attachments: Attachment[],
    scheduleId: string
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