export const getAllData = async(url) => {
    try {

        let response = await fetch(url);

        if (response.ok) {
            let responseToJson = await response.json();
            return responseToJson.data;
        }

    } catch(err) {
        console.log(err);
    }
}

export const getDataById = async(url) => {
    try {

        let response = await fetch(url);

        if (response.ok) {
            let responseToJson = await response.json();
            return responseToJson.data;
        }

    } catch(err) {
        console.log(err);
    }
}

export const updateClient = async(url, data) => {

    let formData = new FormData();
    for (const key in data) {

        formData.append(`${key}`, data[key]);
    }

    try {

        let response = await fetch(url, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            let responseToJson = await response.json();
            return responseToJson.data;
        }

    } catch(err) {
        console.log(err);
    }
}

export const addClient = async(url, data) => {

    let formData = new FormData();
    for (const key in data) {

        formData.append(`${key}`, data[key]);
    }

    try {

        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseToJson = await response.json();

            return responseToJson.data;
        }

    } catch(err) {
        console.log(err);
    }
}

export const deleteRecord = async(url) => {
    try {

        await fetch(url, {
            method: 'DELETE'
        });

    } catch(err) {
        console.log(err);
    }
}

export const sendEmail = async(data) => {
    try {

        let response = await fetch('http://localhost:3000/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return await response.json();
        }

    } catch(err) {
        console.log(err);
    }
}