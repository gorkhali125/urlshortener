export class UrlShortenerService {
	static async shorten(urlData) {
        // @TODO: static URL is used, use environment variables
		const response = await fetch('http://localhost:8091/shorten', {
            method: "POST",
            body: JSON.stringify(urlData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const jsonData = await response.json();
        return jsonData;
    }
    
    static async resolveUrl(urlHash){
        // @TODO: static URL is used, use environment variables
        const response = await fetch(`http://localhost:8091/${urlHash}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const jsonData = await response.json();
        return jsonData;
    }
}