export type Note = {
    id: number,
    title: string,
    created_by: number,
    content: string,
    converImage: string,
    icon: string,
    children: Note[],
    active: boolean,
    expanded: boolean,
}

export type data = {
    data: Note[]
}
