const BASE_URL = "https://en.wikipedia.org/w/api.php";

export async function searchArticles(query, limit = 20) {
    try {
        const url =
            `${BASE_URL}?action=query` +
            `&generator=search` +
            `&gsrsearch=${encodeURIComponent(query)}` +
            `&gsrlimit=${limit}` +
            `&prop=pageimages|extracts` +
            `&exintro` +
            `&explaintext` +
            `&exlimit=max` +
            `&pithumbsize=300` +
            `&format=json` +
            `&origin=*`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch search results.");
        }

        const data = await response.json();

        if (!data.query) {
            return [];
        }

        return Object.values(data.query.pages);

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getArticle(title) {
    try {

        const url =
            `${BASE_URL}?action=query` +
            `&titles=${encodeURIComponent(title)}` +
            `&prop=extracts|pageimages|info` +
            `&pithumbsize=400` +
            `&inprop=url` +
            `&redirects` +
            `&format=json` +
            `&origin=*`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch article.");
        }

        const data = await response.json();

        const pages = Object.values(data.query.pages);

        return pages[0];

    } catch (error) {
        console.error(error);
        throw error;
    }
}