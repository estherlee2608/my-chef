<%@ page language="java" contentType="text/html; charset=EUC-KR"    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"></meta>
<title>게시판 등록</title>
<style type="text/css">
	* {font-size: 9pt;}
	p {width: 600px; text-align: right;}
	table tbody tr th {background-color: gray;}
</style>
<script type="text/javascript">
	function goUrl(url) {
		location.href=url;
	}
	function boardWriteCheck() {
		var form = document.boardWriteForm;
		return true;
	}

</script>
</head>
<body>
	<form name="boardWriteForm" action="boardView.jsp" method="post" onsubmit="return formCheck();">
	<input type="hidden" name="mode" value="W" />
	<table border="1" summary="게시판 등록">
		<caption>게시판 등록</caption>
		<colgroup>
			<col width="100" />
			<col width="500" />
		</colgroup>
		<tbody>
			<tr>
				<th align="center">제목</th>
				<td><input type="text" name="title"/></td>
			</tr>
			<tr>
				<th align="center">작성자</th>
				<td><input type="text" name="writer"/></td>
			</tr>
			<tr>
				<th aligh="center">글내용</th>
				<td colspan="2"><textarea rows="" cols="" name = "content"></textarea></td>
			</tr>
		</tbody>
	</table>
	<p>
		<input type="button" value="목록" id="list_Btn" onclick="goUrl('boardList.jsp');" onsubmit="return datecheck" />
		<input type="submit" value="등록" id="register_Btn" onclick="goUrl('boardView.jsp');"/>
	</p>
	</form>
<script>
	function formCheck(){
		var title = document.forms[0].title.value;
		var writer = document.forms[0].writer.value;
		var content = document.forms[0].content.value;

		if (title==null || title ==""){
			alert('제목을 입력하세요');
			document.forms[0].title.focus();
			return false;
		}
		if (writer==null || writer ==""){
			alert('작성자를 입력하세요');
			document.forms[0].writer.focus();
			return false;
		}

		if (content==null || content ==""){
			alert('내용을 입력하세요');
			document.forms[0].content.focus();
			return false;
		}
	}
</script>
<script type="text/javascript">

	    var today_date = new Date();
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
</script>
<script>
    $('#register_Btn').click( function() {
        MainActivity.setDB('title');
        MainActivity.setDB('writer');
        MainActivity.setDB('content');
        MainActivity.setDB('today_date');
    });
    $('#list_Btn').click( function() {
        MainActivity.showToast("go to the list");
        var test = MainActivity.getValue();
    });
</script>
</body>
</html>


