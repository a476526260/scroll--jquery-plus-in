/**
 * Created by dennyzhou on 2016/6/30.
 */
;(function($){
    $.fn.myScroll=function(options){
        var opts=$.extend($.fn.default,options,{});
        return this.each(function () {
            var _myScroll=$(this);
            var timer;
            function MyScroll() {}
            //插件初始化
            MyScroll.prototype.init=function(){
                if(opts.direction=="vertical"){
                    _myScroll.find(".item").css({"height":opts.rowH,"lineHeight":opts.rowH+'px'});
                }else if(opts.direction=="horizontal"){
                    _myScroll.find(".items").css({"overflow":"hidden","width":opts.listW*_myScroll.find(".item").length});
                    _myScroll.find(".item").css({"width":opts.listW,"float":"left"});
                }
                var _this=this;
                timer=setInterval(function(){
                    if(_myScroll.height()>_myScroll.find(".items").height()||_myScroll.width()>_myScroll.find(".items").width()){
                        clearInterval(timer);
                    }else{
                        _this.scroll();
                    }
                },opts.speed);
                if(opts.Hover){
                    _myScroll.hover(function () {
                        clearInterval(timer);
                    },function () {
                        timer=setInterval(function(){
                            if(_myScroll.height()>_myScroll.find(".items").height()||_myScroll.width()>_myScroll.find(".items").width()){
                                clearInterval(timer);
                            }else{
                                _this.scroll();
                            }
                        },opts.speed)
                    });
                }
            };

            MyScroll.prototype.scroll=function () {
                if(opts.direction=='vertical'){
                    _myScroll.find(".items").animate({'marginTop':"-=1"},0,function(){
                        var scrollTop=Math.abs(parseInt($(this).css("marginTop")));
                        if(scrollTop>opts.rowH){
                            $(this).find(".item").first().appendTo($(this));
                            $(this).css("marginTop",0);
                        }
                    })
                }else if(opts.direction=="horizontal"){
                    _myScroll.find(".items").animate({'marginLeft':"-=1"},0,function(){
                        var scrollLeft=Math.abs(parseInt($(this).css("marginLeft")));
                        if(scrollLeft>_myScroll.find(".item").width()){
                            $(this).find(".item").first().appendTo($(this));
                            $(this).css("marginLeft",0);
                        }
                    })
                }
            };
            var s=new MyScroll();
            if($(this).data("myscroll")=='undefined'){
                $(this).data("myscroll",s);
            }else{
                $(this).data("myscroll",s);
            }
            s.init();
        })
    };
    $.fn.default={
        speed:40,    //滚动速度
        rowH:30,     //每行行高
        Hover:true,   //悬停是否暂停
        direction:'vertical'   //方向   'horizontal'
    }
})(jQuery);
