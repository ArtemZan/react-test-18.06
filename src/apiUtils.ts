export const chromeyeUrl = "http://apis.chromeye.com:9191"

const urls = {
    people: chromeyeUrl + "/people"
}

export async function fetchPeople()
{
    const resp = await fetch(urls.people, {
        headers: {
            "content-type":"application/json"
        }
    })

    return resp.json()
}
