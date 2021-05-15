export const removeTest = (id: string) => {
    fetch(`http://localhost:3000/tests/${id}`,
        {
            method: 'DELETE'
        }
    ).then(data => {
        console.log(data);
    });
}

interface ChangeStatusTest {
    id: string
    status: number
}

export const changeStatusTest = ({ id, status }: ChangeStatusTest) => {
    fetch(`http://localhost:3000/tests/${id}/status`,
        {
            method: 'PATCH',
            body: JSON.stringify(status)
        }
    )
}
