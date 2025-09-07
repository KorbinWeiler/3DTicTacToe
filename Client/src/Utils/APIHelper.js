async function processGetRequest(url){
    try{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`Respone status: ${res.status}`);
        }
        return res;
    }
    catch(error){
        console.error(error)
    }
}

async function processPostRequest(url, reqBody){
    try{
        const res = await fetch(url, {
        method: 'POST',
        body: reqBody,
        headers: {
            'Content-Type': 'application/json',
        }});
        if(!res.ok){
            throw new Error(`Respone status: ${res.status}`);
        }
        return res;
    }
    catch(error){
        console.error(error)
    }
}

export {processGetRequest, processPostRequest}