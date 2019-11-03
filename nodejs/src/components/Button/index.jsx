import React,{Component} from 'react';
import styles from './sass/index.scss';
export default class Button extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        let {className,type}=this.props;
        let typeclass=type?styles[`${type}btn`]:null;
        return (
            <button {...this.props} className={`${styles.wbtn} ${className} ${typeclass}`}>{this.props.children}</button>
        )
    }
}
//props含义:
// type为按钮类型(可以不传) primary(主色调) gray(取消色调)
