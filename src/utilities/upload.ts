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

const upload = async ({ data }: Upload) => {
    const formData = {
        title: data.title,
        type: data.type,
        testSegments: data.testSegments,
        referenceSegments: data.referenceSegments,
        activateOnUpload: data.activateOnUpload,
    }

    try {
        return await fetch('http://localhost:3000/tests/', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
    } catch(error) {}
};

export default upload;
