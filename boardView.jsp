<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"></meta>
<title>게시판 상세조회</title>
<link rel="stylesheet" href="css/bootstrap.css">
<style type="text/css">
	* {font-size: 9pt;}
	p {width: 600px; text-align: right;}
	table tbody tr th {background-color: gray;}
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
	String title = request.getParameter("title");
	String writer = request.getParameter("writer");
	int count = 10000;
	String content = request.getParameter("content");
%>
<body>
<div class="container">
<form name="boardView" action="boardlist.jsp" method="post">
	<table border="1" summary="게시판 상세조회" class="table table-striped">
		<caption>게시판 상세조회</caption>
		<colgroup>
			<col width="100" />
			<col width="500" />
		</colgroup>
		<tbody>
			<tr>
				<th align="center" >제목</th>
				<td ><a name = "title2"/><%= title %></td>
			</tr>
			<tr>
				<th align="center" >작성자</th>
				<td ><a name = "writer2"/><%= writer %> </td>
			</tr>
			<tr>
				<td colspan="2"><a name = "content2"/><%= content %></td>
			</tr>
		</tbody>
	</table>
	<p>
		<input type="button" value="목록" onclick="goUrl('boardList.jsp');" />
	</p>
</form>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/jquery-3.1.1.js"></script>
<script src="js/bootstrap.js"></script>

</body>
</html>