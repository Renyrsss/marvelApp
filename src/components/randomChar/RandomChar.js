import './randomChar.scss';
import MarvelService from '../../services/MarvelService';

import mjolnir from '../../resources/img/mjolnir.png';
import { Component, useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';



const  RandomChar = () =>  {


    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(false)
    const [char , setChar] = useState({})
    const marvelService = new MarvelService()

    // componentDidMount() {
    //     // this.timerId = setInterval(this.updateChar,3000)
    //     // console.log('mounted');
    //     this.updateChar()
    // }
    // componentWillUnmount(){
    //     // console.log('unmount');
    //     clearInterval(this.timerId)
    // }
    // componentDidUpdate() {

    //     // console.log('update');
    // }
    useEffect(()=>{
        updateChar()
    },[])
    const oneCharLoaded = (char) =>{
        setChar(char);
        setLoading(false);
        setError(false )
    }
    const onCharLoading = () => {
        setLoading(loading => true);
    }

    const onError = () => {

        setLoading(loading => false);
        setError(error =>true )
    }

    const updateChar = () => {
        onCharLoading();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        marvelService
            .getCharWithID(id)
            .then(oneCharLoaded)
            .catch(onError)
    }




        const errorMassage = error ? <ErrorMassage/> : null;
        const spinnder = loading ? <Spinner /> : null;
        const content = !(loading || error)? <View char={char} />: null;

        return (
        
        <div className="randomchar">
        
            {errorMassage}
            {spinnder}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}


const View = ({char}) => {

    const {name,description,thumbnail,homePage,wiki} = char
    console.log(name);
    let objectFitPos = thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover';

    return (
            <div className="randomchar__block">
                <img src={thumbnail} style={{objectFit : objectFitPos}} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description }
                    </p>
                    <div className="randomchar__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;