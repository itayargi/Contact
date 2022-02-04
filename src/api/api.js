import urls from "./urls";


const fetchApi = async (url, method, body) => {
    console.log(`url request ${method}:`, url);
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: method
    };
    if (body) {
        params.body = JSON.stringify(body);
        console.log('body: ', params.body);
    }
    return await fetch(url, params);
};


export const getContacts = async () => {
    return fetchApi(urls.getContacts, 'GET', null);
};







