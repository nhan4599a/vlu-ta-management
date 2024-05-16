export type ApplicationForm = {
    name: string,
    code: string,
    class: string,
    phoneNumber: string,
    termScore: number,
    avgScore: number,
    description: string,
    attachments: string[],
    stage1Approval: boolean,
    stage2Approval: boolean
}

export type OverviewApplicationFormResponse = {
    name: string,
    lesson: string,
    scheduleId: string,
    applications: ApplicationForm[],
    hasMore: boolean
}