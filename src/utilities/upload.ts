type FormData = {
    title: string
    type: string
    testSegments: number[],
    referenceSegments: number[],
    file: File | null,
    activateOnUpload: boolean
}

interface Upload {
    data: FormData
}

type Response = {
    status: number
    message?: string
}

const upload = async ({ data }: Upload): Promise<Response> => {
    const formData = {
        title: data.title,
        type: data.type,
        testSegments: data.testSegments,
        referenceSegments: data.referenceSegments,
        activateOnUpload: data.activateOnUpload,
    }

    try {
        const response = await fetch('http://localhost:3000/tests/', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        return { status: response.status };
    } catch(error) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
            return { status: error.response.status }
        }

        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the
        // browser and an instance of
        // http.ClientRequest in node.js
        if (error.request) {
            return { status: 0, message: error.request }
        }

        // Something happened in setting up the request that triggered an Error
        return { status: 0, message: error }
    }
};

export default upload;
