import { BASE_URL } from "../services/constants";
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    if (response.status === 204)
        return {};
    try {
        return await response.json();
    }
    catch (error) { }
    return {};
};
const fetchData = async (endpoint, method = "GET", body) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    };
    try {
        return await fetch(`${BASE_URL}${endpoint}`, options)
            .then(response => {
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            return response;
        })
            .then(response => handleResponse(response))
            .then(data => ({ ok: true, data }))
            .catch(error => {
            throw new Error(error.message);
        });
    }
    catch (error) {
        throw new Error("Not Found");
    }
};
export { fetchData };
