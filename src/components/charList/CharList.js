import React, {Component, useEffect, useRef, useState} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMassage/ErrorMassage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import PropTypes from 'prop-types';

const CharList = (props)=> {

    const [charList , setCharList] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error , seteError] = useState(false);
    const [newItemLoading , setNewItemLoading] = useState(false);
    const [offset , setOffset] = useState(210);
    const [charEnded , setCharEnded] = useState(false);
    const [refArr , setRefArr] = useState([]);

    
    const marvelService = new MarvelService();

    const setNewRef = useRef([])
    console.log(setNewRef.current);
    const setNewRefList = ()=>{
        setRefArr(({refArr}) => (
            {
                refArr:[...refArr,setNewRef]
            }
        ))
        
    }

    const addSelectedItem = (item) => {
        console.log( );
        refArr.map(elem =>{
            if(elem.children[1].textContent === item){
                console.log(item);
                elem.classList.toggle('char__item_selected');
                return ;
            }
            elem.classList.remove('char__item_selected');
        })

    }


    useEffect(()=>{
        onRequest(offset);
    },[])


    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllChars(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {

        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended)
    }

    const onError = () => {
        seteError(true);
        setLoading(false)
    }


    const renderItems = (arr) => {
        const items =  arr.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    ref={((el) => setNewRef.current[i] = el)}
                    onClick={() => {
                        addSelectedItem(item.name)
                        return props.onCharSelected(item.id)}}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

        
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button disabled={newItemLoading} style={{'display':charEnded == true ? 'none' : 'block'}} onClick={() => onRequest(offset)} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


CharList.proptype = {
    onCharSelected : PropTypes.string
}

export default CharList;