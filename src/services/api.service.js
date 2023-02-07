const headers = { 'Authorization': 'Token token="44f4c124b74f0de745a71104df32d405"' };

export default class ApiService {

    static async getConfig() {
        try {
            let url = `http://teslamobileapp.com:3000/users/music`;
            let data = await fetch(url);
            return data.json();
        } catch (error) {
            return {};
        }
    }

    static async getCategoryImage(name = '') {
        try {
            let url = `https://api.unsplash.com/search/photos/?query=${name}&orientation=portrait&client_id=tBhGyQMcl5I3GhoQqMQWN7sEFaQMQmZDD9G3HIxcf6Q`;
            let data = await fetch(url);
            const json = await data.json();
            return json.results[0].urls.small;
        } catch (error) {
            return {};
        }
    }

    static async getRandomQuotes() {
        try {
            const url = `https://favqs.com/api/quotes`;
            const data = await fetch(url, { headers: headers });
            const response = await data.json();
            return response;
        } catch (error) {
            return {};
        }
    }

    static async getQuoteOfTheDay() {
        try {
            const url = `https://favqs.com/api/qotd`;
            const data = await fetch(url, { headers: headers });
            const response = await data.json();
            return response;
        } catch (error) {
            return {};
        }
    }

    static async getCategories() {
        try {
            const url = `https://favqs.com/api/typeahead`;
            const data = await fetch(url, { headers: headers });
            const response = await data.json();
            return response.tags.filter((tag) => tag.count > 10);
        } catch (error) {
            return {};
        }
    }

    static async getQuoteTag(tag, page = 1) {
        try {
            const url = `https://favqs.com/api/quotes/?filter=${tag}&type=tag&page=${page}`;
            const data = await fetch(url, { headers: headers });
            return data.json();
        } catch (error) {
            return {};
        }
    }

    static async search(query, page = 1) {
        try {
            const url = `https://favqs.com/api/quotes/?filter=${query}&page=${page}`;
            const data = await fetch(url, { headers: headers });
            return data.json();
        } catch (error) {
            return {};
        }
    }

}


