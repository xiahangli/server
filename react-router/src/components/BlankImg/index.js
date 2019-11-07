import React from 'react';
import blaImg from '../../assets/images/blankImg.png';
import styles from './sass/index.scss';

function BlankImg({content}){
    return (
        <div className={styles.imgContainer}> 
            <img className={styles.imgStyle} src={blaImg} alt=""/>
            <div className={styles.imgTxt}>{content || '暂无查询结果'}</div>
        </div>      
    );
}

export default BlankImg;