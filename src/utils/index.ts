export function getPostFileName(post: any): string {
    return post.file.pathname.split('/').pop().split('.').shift();
}

export function sortPostByDate(post1, post2) {
    return post1.date < post2.date ? 1 : -1;
}
export function formatDate(date) {
    const options = { year: "numeric", month: 'short', day: "numeric", } as const;
    const dt = new Date(date)
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(dt);
}
