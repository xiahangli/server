import React from 'react';

import styles from './haveRead.scss';
export default class HaveRead extends React.Component{

    constructor (props) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
        document.addEventListener('deviceready', function() {
            document.title = '已读';
            window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', ['已读']);
            window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showShadowView', [{'content': true}]);
            window.LeTalkCorePlugin.customBack('custom');
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'customClose', ['custom']);
        }, false);

        window.clickBack = () => {
            document.addEventListener('deviceready', function() {
                window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'close', [null]);
            }, false);
        };

        window.clickClose = () => {
            document.addEventListener('deviceready', function() {
                window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'close', [null]);
            }, false);
        };
        let teachers = localStorage.getItem('teachers');
        teachers = JSON.parse(teachers);
        this.setState({teachers});
    }

    render() {
        const {teachers} = this.state;
        return (
            <div className={styles.hasRead}>
                {teachers && teachers.map((item) =><div key={item.teacherId} className={`${styles.lineItem} cf`}>
                    <div className={styles.photo}><img src={item.img} /></div>
                    <div className={styles.userInfo}>
                        <span className={styles.name}>{item.teacherName}</span>
                        {item.headTeacherType === 1 && <span className={styles.jobTitle}>班主任</span>}
                        <span className={styles.time}>{item.readTime}</span>
                    </div>
                </div> )}
            </div>
        );
    }
}