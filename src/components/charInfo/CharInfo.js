import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component, useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Skeleton from '../skeleton/Skeleton'

const  CharInfo = (props) => {


    const [loading ,setLoading] = useState(false);
    const [error ,setError] = useState(false);
    const [char ,setChar] = useState(null);

    
    const marvelService = new MarvelService();


    useEffect(()=>{
        updateChar();
        
    },[props.charId])
    console.log('hello');

    const updateChar = () => {
        
        const {charId} = props;
        if(!charId){
            return;
        }
        onCharLoading();
        marvelService
            .getCharWithID(charId)
            .then(oneCharLoaded)
            .catch(onError)
    }

    const oneCharLoaded = (char) =>{
        setChar(char)
        setLoading(false);
        setError(false)
    }
    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {

        setLoading(false);
        setError(true)
    }





        const skelelot = char || loading || error ? null : <Skeleton />
        const errorMassage = error ? <ErrorMassage/> : null;
        const spinnder = loading ? <Spinner /> : null;
        const content = !(loading || error ||!char) ? <View char={char} />: null;



        return (
        <div className="char__info">
            {skelelot}
            {errorMassage}
            {spinnder}
            {content}
        </div>
    )
    }


const View = ({char}) => {
    const {name , thumbnail, homePage , wiki ,comics} = char
    let objectFitPos = thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover';
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit:objectFitPos}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length == 0 ? 'this character doesnt have comics' : comics.slice(0,10).map(item => (
                    <li key={item.name} className="char__comics-item">
                        {item.name}
                    </li>))}

            </ul>
        </>
    )
}
export default CharInfo;