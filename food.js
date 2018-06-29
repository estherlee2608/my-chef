/********************
    food.js
*********************/

// 선택한 재료 배열로 만들기
   $('#submit_btn').click(function(e){

       var result = new Array();

    $('input:checkbox[name="type1"]').each(function() {

      this.checked == true; //checked 처리
      if(this.checked){//checked 처리된 항목의 값
//            result.add(this.id);
            result.push(this.id);
      }
   });
   $('input:checkbox[name="type2"]').each(function() {

      this.checked == true; //checked 처리
      if(this.checked){//checked 처리된 항목의 값
            result.push(this.id);

      }
   });
    $('input:checkbox[name="type3"]').each(function() {

        this.checked == true; //checked 처리
        if(this.checked){//checked 처리된 항목의 값
            result.push(this.id);
         }

    });

    var selectStr = result.join( ', ' );

    cordova.exec(
        function(result){
            MainActivity.showToast("call sub-title");
            var ingre = result.split('`');
            for(var i =0 ; i< ingre.length-1; i++) {
                if(ingre[i] == selectStr){
                    break;
                }
                else{
                }
            }
                cordova.exec(
                    function(result){
                        MainActivity.showToast("call sub-title");
                        var recipe = result.split('`');
                        var content_url="";
                        for(var i = 0; i < recipe.length-1; i++)
                             content_url += "<img src='" + recipe[i] + "'>";

                        e.preventDefault();
                            var self = $(this);
                            var content = $('.popupContent_food');

                            $('#pop_food').bPopup({
                              onOpen:function(){
                                  content.html("<div>" + content_url + "</div>");
                              },
                              onClose:function(){
                                  content.empty();
                              }
                              , follow: [false, false]
                              , position: [10,10]

                            });
                    }
                    , function(error){ alert(error); }
                    , "FirebaseDatabasePlugin", "getValue2", ["recipe",i, "value"]);
        }
        , function(error){ alert(error); }
        , "FirebaseDatabasePlugin", "getValue", ["food", "value"]);


});

$('#submit_btn1').click(function(){

    var result = new Array();
    var resultShoppingList = new Array();
    var today_date = new Date();
    var todaydate ;
    var dd = today_date.getDate();
    var mm = today_date.getMonth()+1; //January is 0!
    var yyyy = today_date.getFullYear();

    if(dd<10) {
    dd='0'+dd
    }

    if(mm<10) {
    mm='0'+mm
    }
    todaydate = mm+'/'+dd+'/'+yyyy;

    if(dd<10) {
    dd='0'+dd
    }

    if(mm<10) {
    mm='0'+mm
    }
    todaydate = mm+'/'+dd+'/'+yyyy;

    $('input:checkbox[name="type11"]').each(function() {

      this.checked == true; //checked 처리
      if(this.checked){//checked 처리된 항목의 값
            result.push(this.id);
            MainActivity.setUsersDB(this.value);
            MainActivity.setDateDB(todaydate);
      }
   });
   $('input:checkbox[name="type22"]').each(function() {

      this.checked == true; //checked 처리
      if(this.checked){//checked 처리된 항목의 값

            result.push(this.id);
            MainActivity.setUsersDB(this.value);
            MainActivity.setDateDB(todaydate);

      }
   });
    $('input:checkbox[name="type33"]').each(function() {

        this.checked == true; //checked 처리
        if(this.checked){//checked 처리된 항목의 값
            result.push(this.id);
            MainActivity.setUsersDB(this.value);
            MainActivity.setDateDB(todaydate);

         }
    });
$("#submit_list").click(function(){
    var new_list="";
    new_list = $("#list_name").val();
    MainActivity.setUsersShopDB($("#list_name").val());
});

    $('input:checkbox[name="type111"]').each(function() {

      this.checked == true; //checked 처리
      if(this.checked){//checked 처리된 항목의 값
            resultShoppingList.push(this.id);
            MainActivity.setUsersShopDB(this.value);
      }
   });

   $('input:checkbox[name="type222"]').each(function() {

      this.checked == true; //checked 처리
      if(this.checked){//checked 처리된 항목의 값

            resultShoppingList.push(this.id);
            MainActivity.setUsersShopDB(this.value);

      }
   });

    $('input:checkbox[name="type333"]').each(function() {

        this.checked == true; //checked 처리
        if(this.checked){//checked 처리된 항목의 값
            resultShoppingList.push(this.id);
            MainActivity.setUsersShopDB(this.value);

         }
    });
});

$('#show_btn').click(function(e){

    var result = new Array();
    cordova.exec(
        function(result){
            MainActivity.showToast("call sub-title");
            var refri = result.split('`');
            var refriDate = "";

        cordova.exec(
            function(result){
                MainActivity.showToast("call sub-title");
                var date = result.split('`');

                for(var i =0 ; i< date.length-1; i++) {
                    refriDate += "<p>" + refri[i] +" 냉장고에 들어온 날짜: "+ date[i] + "</p>";
                }

                cordova.exec(
                    function(result){
                        var shopping = result.split('`');
                        var list = "";
                        for(var i=0; i<shopping.length -1 ; i++){
                            list += "<p>" + shopping[i] + "</p>";
                        }
                e.preventDefault();
                    var self = $(this);
                    var content = $('.popupContent_list');

                    $('#pop_list').bPopup({
                      onOpen:function(){
                          content.html("<h1>냉장고 관리</h1>" + "<div>" + refriDate + "</div>" + "<h1>shopping list</h1>"+ "<div>"+list+"</div>");

                      },
                      onClose:function(){
                          content.empty();
                          result.clear();
                      }
                      , follow: [false, false]
//                      , position: [10,10]

                    });
                }

            , function(error){ alert(error); }
            , "FirebaseDatabasePlugin", "getValue2", ["users", "shopping list", "value"] );
        }
            , function(error){ alert(error); }
            , "FirebaseDatabasePlugin", "getValue2", ["users", "date", "value"] );
        }
        , function(error){ alert(error); }
        , "FirebaseDatabasePlugin", "getValue2", ["users", "refrigerator", "value"] );

});

$("#submit_list").click(function(){
    var new_list="";
    new_list = $("#list_name").val();
    MainActivity.setUsersShopDB($("#list_name").val());
});

$("#submit_ingre").click(function(){
    var today_date = new Date();
    var todaydate ;
    var dd = today_date.getDate();
    var mm = today_date.getMonth()+1; //January is 0!
    var yyyy = today_date.getFullYear();

    if(dd<10) {
    dd='0'+dd
    }

    if(mm<10) {
    mm='0'+mm
    }
    todaydate = mm+'/'+dd+'/'+yyyy;

    if(dd<10) {
    dd='0'+dd
    }

    if(mm<10) {
    mm='0'+mm
    }
    todaydate = mm+'/'+dd+'/'+yyyy;

    MainActivity.setUsersDB($("#ingre_name").val());
    MainActivity.setDateDB(todaydate);
});
