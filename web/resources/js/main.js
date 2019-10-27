jQuery.fn.updateWithText = function(text, speed)
{
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed/2, function() {
				//done
			});
		});
	}
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function roundVal(temp)
{
	return Math.round(temp * 10) / 10;
}


var eventList = [];
var lastCompliment;
var compliment;
var timeOutEvent=0;
function gtouchstart(){
    timeOutEvent = setTimeout(longPress(),500);
    return false;
    //单击开始计时 500代表0.5秒
    //如果longPress()需要传参得写成下面注释中的代码
    //timeOutEvent = setTimeout(function(){ longPress(url);},500);
};
function gtouchend(){
    clearTimeout(timeOutEvent);
    if(timeOutEvent!=0){
        alert('单击执行代码区');
    }
    return false;
};
function gtouchmove(){
    clearTimeout(timeOutEvent);
    timeOutEvent = 0;
    alert('单击未松开直接滑动的执行代码区，默认取消任何操作');
};
function longPress(){
    timeOutEvent = 0;
    alert('长按执行代码区');
}


/**
 * 准备ok
 */
jQuery(document).ready(function($) {



    moment.locale(config.lang);
    
    config.init();

	time.init();

	calendar.init();

	compliments.init();

	weather.init();
    
    // aqi.init();
    
    ai.init();

	news.init();

});
