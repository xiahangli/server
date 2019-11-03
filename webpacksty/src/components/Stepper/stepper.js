import React from 'react';
import initReactFastclick from 'react-fastclick';
import PropTypes from 'prop-types';
import styles from './stepper.scss';
export default class Stepper extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            value: 0,
            min: -Infinity,
            max: Infinity
        };
    }

    static propTypes = {
        value: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        onChange: PropTypes.func.isRequired,
    }

    componentDidMount () {
        initReactFastclick();
        if (this.props.min || this.props.min === 0) {
            this.setState({min: this.props.min});
        }
        if (this.props.max || this.props.max === 0) {
            this.setState({max: this.props.max});
        }
        if (this.props.value || this.props.value === 0) {
            this.setState({value: this.props.value});
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.min !== this.props.min) {
            this.setState({min: this.props.min});
        }
        if (prevProps.max !== this.props.max) {
            this.setState({max: this.props.max});
        }
        if (prevProps.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
    }

    changeNumber = (e) => {
        const {min, max} = this.state;
        let value = e.target.value;
        if (value.indexOf('.') !== -1) {
            value = value && Number(value).toFixed(1);
            value = Number(value);
        } else {
            if (value) {
                value = Number(value);
            }
        }
        if (value < min) {
            value = Number(min.toFixed(1));
        }
        if (value > max) {
            value = Number(max.toFixed(1));
        }
        this.setState({value});
        this.props.onChange(value);
    }

    blurNumber = (e) => {
        let value = e.target.value;
        if (!value) {
            value = 0;
            this.setState({value});
            this.props.onChange(value);
        }
    }

    //  减1
    subtract = () => {
        let {min, value} = this.state;
        value = Number(value) - 1;
        if (value <= min) {
            this.setState({value: min});
            this.props.onChange(min);
            return;
        } 
        this.setState({value});
        this.props.onChange(value);
    }

    //  加1
    add = () => {
        let {max, value} = this.state;
        value = Number(value) + 1;
        if (value >= max) {
            this.setState({value: max});
            this.props.onChange(max);
            return;
        } 
        this.setState({value});
        this.props.onChange(value);
    }

    render() {
        let {min, max, operationSize, inputSize, inputFont, iconfontSize} = this.props;
        operationSize = operationSize || '.72rem';
        inputSize = inputSize || '1.45rem';
        inputFont = inputFont || '.44rem';
        iconfontSize = iconfontSize || '.28rem';
        let {value} = this.state;
        value = value && Number(value.toFixed(1));
        return (
            <div> 
                <span className={`${styles.operation} ${styles.subtract} ${value <= min ? styles.disabled : ''}`}
                    style={{width: operationSize, height: operationSize, lineHeight: operationSize}}
                    onClick={this.subtract}
                >
                    <span className={styles.bg}></span>
                    <i className="evaiconfont" style={{fontSize: iconfontSize}}>&#xe637;</i>
                </span>
                <input className={styles.value} type="number" value={value} 
                    onChange={this.changeNumber} onBlur={this.blurNumber}
                    style={{width: inputSize, height: operationSize, fontSize: inputFont, lineHeight: operationSize}}
                />
                <span className={`${styles.operation} ${styles.add} ${value >= max ? styles.disabled : ''}`}
                    style={{width: operationSize, height: operationSize, lineHeight: operationSize}}
                    onClick={this.add}
                >
                    <span className={styles.bg}></span>
                    <i className="evaiconfont" style={{fontSize: iconfontSize}}>&#xe638;</i>
                </span>
            </div>
        );
    }
}