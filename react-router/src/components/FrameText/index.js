import React, {Component} from 'react';
import './index.scss';
export default class FrameText extends Component {
    render () {
        let {text, bgColor, borderColor, textColor, customClassName} = this.props;
        text = text ? text : '默认文字'; 
        bgColor = bgColor ? bgColor : '#f5f7f8'; 
        borderColor = borderColor || 'transparent';
        textColor = textColor ? textColor : '#999';
       
        return (
            <span style={{backgroundColor: bgColor, border: `1px solid ${borderColor}`, color: textColor}} 
                className={`frameText ${customClassName}`}>{text}</span>
        );
    }
}