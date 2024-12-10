export type Note = {
    id: number,
    title: string,
    created_by: number,
    content: string,
    cover_image: string,
    icon: string,
    children: Note[],
    active: boolean,
    expanded: boolean,
}

export type data = {
    data: Note[]
}
