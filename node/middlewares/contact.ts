
export async function getContacts(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
        },
        clients: { contact },
    } = ctx
    const data = await contact.getContactDetails()
    ctx.body=data
    await next()
}

