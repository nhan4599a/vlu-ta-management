export type Attachment = {
    savedFileName: string,
    originalFileName: string
}

export type ApplicationForm = {
    _id: string,
    name: string,
    code: string,
    class: string,
    phoneNumber: string,
    termScore: number,
    avgScore: number,
    description: string,
    attachments: Attachment[],
    stage1Approval: boolean,
    stage2Approval: boolean,
    scheduleId: string
}

export type OverviewApplicationFormResponse = {
    name: string,
    day: string,
    lesson: string,
    scheduleId: string,
    applications: ApplicationForm[],
    hasMore: boolean
}