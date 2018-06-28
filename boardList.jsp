<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"></meta>
<title>게시판 목록</title>
<link rel="stylesheet" href="css/bootstrap.css">
<style type="text/css">
	* {font-size: 9pt;}
	p {width: 600px; text-align: right;}
	table thead tr th {background-color: gray;}
</style>
<script type="text/javascript">
	function goUrl(url) {
		location.href=url;
	}
</script>
</head>
<%
	request.setCharacterEncoding("euc-kr");
	int idx =1;
	String title2 = request.getParameter("title2");
	String writer2 = request.getParameter("writer2");
	int count = 10000;
	String content2 = request.getParameter("content2");
	String today = request.getParameter("today");
%>
<body>
	<table border="1" summary="게시판 목록">
		<caption>게시판 목록</caption>
		<colgroup>
			<col width="50" />
			<col width="300" />
			<col width="80" />
			<col width="100" />
			<col width="70" />
		</colgroup>
		<thead>
			<tr>
				<th>번호</th>
				<th>제목</th>
				<th>작성자</th>
				<th>등록일시</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td align="center"><%= idx %></td>
				<td><a href="boardView.jsp" onclick="goUrl('boardView.jsp');"><%= title %></td>
				<td align="center"><%= writer %></td>
				<td align="center">datecheck</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td align="center" colspan="5">1</td>
			</tr>
		</tfoot>
	</table>
	<p>
		<a data-role="button" onclick="goUrl('boardWriteForm.html');">글쓰기</a>
		<input type="button" value="타이머" onclick="goUrl('timer.html');">
	</p>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/jquery-3.1.1.js"></script>
<script src="js/bootstrap.js"></script>


</body>
</html>



