export const removeTest = async (id: string) => {
    try {
        return await fetch(`http://localhost:3000/tests/${id}`,
            {
                method: 'DELETE'
            }
        )
    } catch(error) {}
}

interface ChangeStatusTest {
    id: string
    status: number
}

export const changeStatusTest = async ({ id, status }: ChangeStatusTest) => {
    try {
        return await fetch(`http://localhost:3000/tests/${id}/status`,
            {
                method: 'PATCH',
                body: JSON.stringify(status)
            }
        )
    } catch(error) {}
}
