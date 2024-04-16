
export default class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '03bbc55bf628c0ddbcf62710a9b1cb09';
    _baseOffset = 210;
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`could not fetch ${url} , status : ${res.status}`);
        }

        return await res.json();
    }

    getAllChars = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }
    getCharWithID = async (id) => {
        const res =  await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }


    _transformCharacter = (char) => {

        return { 
            id:char.id,
            name : char.name,
            description : char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character' ,
            thumbnail : char.thumbnail.path + '.' + char.thumbnail.extension ,
            homePage : char.urls[0].url,
            wiki : char.urls[1].url,
            comics : char.comics.items
        }
    }
}
