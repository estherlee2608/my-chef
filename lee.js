
/*********************************
  201366232 이도경
  lee.js
*********************************/

//로그아웃 버튼에 메소드 연결
$('.signOutButton').click( function() {
    MainActivity.signOut();
});

//디바이스가 준비되면 처음에 바로 실행되야 할 기능들 실행
window.addEventListener('load', function() {
    if(window.Cordova) {
        document.addEventListener('deviceready', onDeviceReady, false);
    } else {
        onDeviceReady();
    }
}, false);

//deviceready 상태가 되면 함수 2개 호출
function onDeviceReady() {
    changeToday();
    setTIP();
}


// 오늘의 추천메뉴를 바꾸는 부분 현재 시간을 이용해서 DB의 n값을 설정하고 거기에 맞는 순서의 메뉴를 불러온다.
// 지금은 테스트를 위해 10초마다 바뀌게 되어있음.
function changeToday() {
    var firebaseThings = window.FirebaseDatabasePlugin.ref('today');

    var today_sec = "";

    cordova.exec(
        function (result){
            today_sec = result.split('`');
            var n = parseInt(new Date().getSeconds() / 10)%3;
            if(n != today_sec[0]) {
                today_sec = n;
                firebaseThings.child('time').setValue(n); //DB의 n 값을 바꾼다
            }
            //[2 start] //썸네일 이미지, 타이틀, 서브타이틀 가져오기
            cordova.exec(
                function(result){
                    var thumb = result.split('`');
                    $('#today_01').css('background-image', "url(" + thumb[today_sec*2] + ")");
                    $('#today_02').css('background-image', "url(" + thumb[today_sec*2+1] + ")");
                }
                , function(error){ alert(error); }
                , "FirebaseDatabasePlugin", "getValue2", ["today", "thumb", "value"]);

            cordova.exec(
                function(result){
                    var title = result.split('`');
                    $('#today_01 .today_title').html(title[today_sec*2]);
                    $('#today_02 .today_title').html(title[today_sec*2+1]);
                }
                , function(error){ alert(error); }
                , "FirebaseDatabasePlugin", "getValue2", ["today", "title", "value"]);

            cordova.exec(
                function(result){
                    var title = result.split('`');
                    $('#today_01 .today_text').html(title[today_sec*2]);
                    $('#today_02 .today_text').html(title[today_sec*2+1]);
                }
                , function(error){ alert(error); }
                , "FirebaseDatabasePlugin", "getValue2", ["today", "sub_title", "value"]);

             cordova.exec(
                 function(result){
                     var tmp = result.split('`');
                     var content_url = "";
                     for(var i = 0; i < tmp.length-1; i++)
                        content_url += "<img src='" + tmp[i] + "'>";
                     $('#today_01').bind('click', function(e) {
                         e.preventDefault();
                         var self = $(this);
                         var content = $('.popupContent1');

                         $('#pop_01').bPopup({
                             onOpen:function(){
                                 content.html("<div>" + content_url + "</div>");
                             },
                             onClose:function(){
                                 content.empty();
                             }
                             , follow: [false, false]
                         });
                     });
                 }
                 , function(error){ alert(error); }
                 , "FirebaseDatabasePlugin", "getValue3", ["today", "content", (String)(n*2), "value"]);

             cordova.exec(
                  function(result){
                      var tmp = result.split('`');
                      var content_url = "";
                      for(var i = 0; i < tmp.length-1; i++)
                         content_url += "<img src='" + tmp[i] + "'>";
                      $('#today_02').bind('click', function(e) {
                          e.preventDefault();
                          var self = $(this);
                          var content = $('.popupContent2');

                          $('#pop_02').bPopup({
                              onOpen:function(){
                                  content.html("<div>" + content_url + "</div>");
                              },
                              onClose:function(){
                                  content.empty();
                              }
                              , follow: [false, false]
                          });
                      });
                  }
                  , function(error){ alert(error); }
                  , "FirebaseDatabasePlugin", "getValue3", ["today", "content", (String)(n*2+1), "value"]);
            //[2 end]
        }
        , function(error){ alert(error); }
        , "FirebaseDatabasePlugin", "getValue", ["today", "time", "value"]);

}


//실생활 TIP setting : 버튼에 링크를 걸어주는 작업
function setTIP() {
    var url;

    cordova.exec(
        function(result){
            var tip_url = result.split('`');
            $('#a2-1').bind('click', function(e) {
                e.preventDefault();
                var self = $(this);
                var content = $('.popupContent2-1');
                $('#pop_2-1').bPopup({
                    onOpen:function(){
                      content.html("<video width='100%' controls autoplay><source src='"+tip_url[0]+"' type='video/mp4'></video>");
                    },
                    onClose:function(){
                      content.empty();
                    }
                });
            });
            $('#a2-2').bind('click', function(e) {
                e.preventDefault();
                var self = $(this);
                var content = $('.popupContent2-2');
                $('#pop_2-2').bPopup({
                    onOpen:function(){
                      content.html("<video width='100%' controls autoplay><source src='"+tip_url[1]+"' type='video/mp4'></video>");
                    },
                    onClose:function(){
                      content.empty();
                    }
                });
            });
            $('#a2-3').bind('click', function(e) {
                e.preventDefault();
                var self = $(this);
                var content = $('.popupContent2-3');
                $('#pop_2-3').bPopup({
                    onOpen:function(){
                      content.html("<video width='100%' controls autoplay><source src='"+tip_url[2]+"' type='video/mp4'></video>");
                    },
                    onClose:function(){
                      content.empty();
                    }
                });
            });
            $('#a2-4').bind('click', function(e) {
                e.preventDefault();
                var self = $(this);
                var content = $('.popupContent2-4');
                $('#pop_2-4').bPopup({
                    onOpen:function(){
                      content.html("<video width='100%' controls autoplay><source src='"+tip_url[3]+"' type='video/mp4'></video>");
                    },
                    onClose:function(){
                      content.empty();
                    }
                });
            });
            $('#a2-5').bind('click', function(e) {
                e.preventDefault();
                var self = $(this);
                var content = $('.popupContent2-5');
                $('#pop_2-5').bPopup({
                    onOpen:function(){
                      content.html("<video width='100%' controls autoplay><source src='"+tip_url[4]+"' type='video/mp4'></video>");
                    },
                    onClose:function(){
                      content.empty();
                    }
                });
            });
            $('#a2-6').bind('click', function(e) {
                e.preventDefault();
                var self = $(this);
                var content = $('.popupContent2-6');
                $('#pop_2-6').bPopup({
                    onOpen:function(){
                      content.html("<video width='100%' controls autoplay><source src='"+tip_url[5]+"' type='video/mp4'></video>");
                    },
                    onClose:function(){
                      content.empty();
                    }
                });
            });
            $('#a2-7').bind('click', function(e) {
                e.preventDefault();
                var self = $(this);
                var content = $('.popupContent2-7');
                $('#pop_2-7').bPopup({
                    onOpen:function(){
                      content.html("<video width='100%' controls autoplay><source src='"+tip_url[6]+"' type='video/mp4'></video>");
                    },
                    onClose:function(){
                      content.empty();
                    }
                });
            });
            $('#a2-8').bind('click', function(e) {
                e.preventDefault();
                var self = $(this);
                var content = $('.popupContent2-8');
                $('#pop_2-8').bPopup({
                    onOpen:function(){
                      content.html("<video width='100%' controls autoplay><source src='"+tip_url[7]+"' type='video/mp4'></video>");
                    },
                    onClose:function(){
                      content.empty();
                    }
                });
            });
        }
        , function(error){ alert(error); }
        , "FirebaseDatabasePlugin", "getValue", ["tip-url", "value"]);



    //터치 스와이프시 페이지 이동 (부가기능)
    $('article[data-role="page"]').bind("swipeleft", function(e){
        e.preventDefault();
        var nextpage = $(this).next('article[data-role="page"]');
        if (nextpage.length > 0) {
            $.mobile.changePage(nextpage, "slide", false, true);
        }
    });
    $('article[data-role="page"]').bind("swiperight", function(e){
        e.preventDefault();
        var prevpage = $(this).prev('article[data-role="page"]');
        if (prevpage.length > 0) {
            $.mobile.changePage(prevpage, "slide", true, true);
        }
    });
}


