//react-router切换中间过渡动画组件
import React, {Component} from "react";
import loadImg from '../../assets/images/load.gif';
import styles from "./sass/index.scss";
export default class Loading extends Component {
    render() { 
        return (
            <div className={styles.loadContainer}>
                <img src={loadImg} />
            </div>
        );
    }
}
