//    按钮操作集合
function left() {
    var currentPage = $("#magazine").turn("page");//当前页
    if(currentPage >= 2){
        $('#magazine').turn('previous');
    }else{
        showDialog('这已经是第一页了')
    }
}

function right() {
    var pageCount = $("#magazine").turn("pages");//总页数
    var currentPage = $("#magazine").turn("page");//当前页
    if(currentPage< pageCount){
        $('#magazine').turn('next');
    }else{
        showDialog('这已经是最后一页了')
    }
}

function turnLeft () {
    var currentPage = $("#magazine").turn("page");//当前页
    if(currentPage >= 2){
        $('#magazine').turn('page',1);
    }else{
        showDialog('这已经是第一页了')
    }
}

function turnRight () {
    var pageCount = $("#magazine").turn("pages");//总页数
    var currentPage = $("#magazine").turn("page");//当前页
    if(currentPage < pageCount){
        $('#magazine').turn('page',pageCount);
    }else{
        showDialog('这已经是最后一页了')
    }
}

function checkThumbnail() {
    $('.list-wraper').hide();
    $('.shadow-wraper').toggle();
}

function checkList() {
    $('.shadow-wraper').hide();
    $('.list-wraper').toggle();
    
};
function loadTo() {

}
/**
 * 设置页码
 * **/
function setPageNumber(c,p) {
    var pageHtml = '';
    $('.pageListInput')[0].value = p +'/' +c;
}
/**
 * 设置列表
 * **/
/**
 * 左右按钮的显示
 * */
function disableControls(page) {
    if (page==1)
        $('.arrow-left').hide();
    else
        $('.arrow-left').show();

    if (page==$('#magazine').turn('pages'))
        $('.arrow-right').hide();
    else
        $('.arrow-right').show();
}

function zoomIn() {
    $('#magazine-viewport').zoom('zoomIn');
}
function zoomOut() {
    $('#magazine-viewport').zoom('zoomOut');
}
function resize() {
    $('#magazine-viewport').zoom('resize');
}
//使用键盘左右键切换
$(window).bind('keydown', function(e){
    if (e.keyCode==37)
        $('#magazine').turn('previous');
    else if (e.keyCode==39)
        $('#magazine').turn('next');

});
// 输入框校验以及跳转
function keydownInput(e) {
    if (e.keyCode==13){
       var pagelist = $('.pageListInput')[0].value
        // strs=str.split(",");
        // \d : 数字
        var re2  = /^[/0-9]+\/[/0-9]/i ;
        if(re2.test(pagelist)){
            var arr = pagelist.split('/');
            if(arr[0]>=$('#magazine').turn('pages')){
                showDialog('跳转数字大于总页数')
            }else{
                $('#magazine').turn('page',arr[0]);
            }
        }else{
            showDialog('请检查输入格式')
        }
    }
}
// 加载PC端
function loadingPC() {
    var flipbook = $('#magazine');

    if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(loadingPC, 10);
        return;
    }

    loadingImage();//加载图片

    $('.shadow-wraper').css('height',$('.aem_magazine').height());

    //初始化turn
    $('#magazine').turn({
        autoCenter: true,//居中
        acceleration: true,
        duration: 1000,//翻页速度
        gradients: true,
        elevation:50,//翻页高度
        when: {//翻页动画

            turning: function (e,page) {
                //总页数
                var book = $(this),
                    pageCount = book.turn('pages');

                setPageNumber(pageCount,page);
                disableControls(page);
            },
            turned: function(e, page) {
            },
            end: function (e,pageObject) {
            },
            missing:function (page,pages) {
            }
        }
    });

    setPageNumber($('#magazine').turn('pages'),1);
    // zoom
    $('#magazine-viewport').zoom({
        flipbook: $('#magazine'),
        max:3,
        when:{
            swipeLeft: function() {
               right();
            },
            swipeRight: function() {
                left();
            },
            zoomIn:function () {
            },
            zoomOut:function () {
            }
        }
    });
// zoom events
    if ($.isTouch)
        $('#magazine-viewport').bind('zoom.doubleTap', zoomTo);
    else
        $('#magazine-viewport').bind('zoom.tap', zoomTo);


    $('.thumbnailImage').bind('click',function (e) {
        $('.shadow-wraper').toggle();
        $('#magazine').turn('page',Number($(this).attr('page'))+1);
        e.stopPropagation()
    })
    $('.list-wraper-p').bind('click',function (e) {
        $('.list-wraper').toggle();
        $('#magazine').turn('page',Number($(this).attr('page'))+1);
        e.stopPropagation()
    })
}

function zoomTo(event) {
    setTimeout(function() {
        if ($('#magazine-viewport').data().regionClicked) {
            $('#magazine-viewport').data().regionClicked = false;
        } else {
            if ($('#magazine-viewport').zoom('value')==1) {
                $('#magazine-viewport').zoom('zoomIn', event);
            } else {
                $('#magazine-viewport').zoom('zoomOut');
            }
        }
    }, 1);
}

function loadingApp() {
    var flipbook = $('#magazine');
    loadingImage();

    flipbook.width($(window).width());
    flipbook.height($(window).height());
    //初始化turn
    flipbook.turn({
        display: 'single',
        autoCenter: true,//居中
        acceleration: true,
        duration: 1000,//翻页速度
        gradients: true,
        elevation:50,//翻页高度
        when: {//翻页动画

            turning: function (e,page) {
            },
            turned: function(e, page) {
            },
            end: function (e,pageObject) {
            },
            missing:function (page,pages) {
            }
        }
    });
    setPageNumber($('#magazine').turn('pages'),1);
    $('#magazine-viewport').zoom({
        flipbook: $('#magazine'),
        max:3,
        when:{
            swipeLeft: function() {
                right();
            },
            swipeRight: function() {
                left();
            },
            zoomIn:function () {
            },
            zoomOut:function () {
            }
        }
    });
}
function loadingApp2() {
    // $('#magazine').css('width',$(window).width());
    // var mySwiper = new Swiper ('#magazine', {
    //     // direction: 'vertical',
    //     loop: true,
    //
    //     // 如果需要分页器
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },
    //
    //     // 如果需要前进后退按钮
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    //
    //     // // 如果需要滚动条
    //     // scrollbar: {
    //     //     el: '.swiper-scrollbar',
    //     // },
    // })
}

//加载图片以及缩略图，以及列表
function loadingImage() {
    var length = AEM_MAGAZINE_IAMGE.length;
    var mHtml = '';//拼接html
    var shadowHtml = '';
    var listHtml = '';
    for(var i in AEM_MAGAZINE_IAMGE){
        mHtml += ' <img src="'+ AEM_MAGAZINE_IAMGE[i].img+'" alt="'+AEM_MAGAZINE_IAMGE[i].title+'" class="magazine-image"/>';
        shadowHtml += ' <li><div style="background-image:url('+ AEM_MAGAZINE_IAMGE[i].img+');" class="thumbnailImage" page="'+i+'"></div></li>';
        listHtml += '<p class="list-wraper-p" page="'+i+'">'+AEM_MAGAZINE_IAMGE[i].title+'</p>'
    }
    $('#magazine').append(mHtml);
    $('.shadow-wraper .thumbnail ul').append(shadowHtml);
    $('.list-wraper').append(listHtml)
}



