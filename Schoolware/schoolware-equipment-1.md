# My Schoolware Project

<br/>

## <Now Project -> 기자재 대여>

<br/>

### 목차

1. [기자재 관리 page](#1)
   - [기자재 추가](#add)
   - [기자재 삭제](#del)
   - [대여일수 변경](#day)
   - [예약 달력 보기](#cal)

----

- 기자재 관리 page<a id="1"></a>

  관리자가 등록이 되어 있는 기자재를 관리하는데 사용합니다. 기자재를 추가하며, 대여할 수 있는 대여날짜를 제한을 둘 수 있으며, 기자재를 삭제할 수 있습니다. 게다가 기자재의 지금 현재 대여 현황도 볼 수 있습니다.

  ![equipment_main](https://user-images.githubusercontent.com/43205396/73130511-e573ac00-403c-11ea-826f-28b98aa9bd6a.png)

  ```html
  <div class="profile-body">
  	<div class="shadow-wrapper">
  		<div class="tag-box tag-box-v1 box-shadow shadow-effect-2">
  			<h2>해당 품명을 클릭하면 자세한 기자재를 확인할 수 있습니다.</h2>
  			<p>기자재를 삭제, 수정, 추가할 수 있습니다.</p>
  		</div>
  	</div>
  </div>
  
  <!-- 기자재 검색 -->
  <div class="">
  	<div class="panel panel-grey">
  		<div class="panel-heading text-center">
  			<h3 class="panel-title">
  				<i class="glyphicon glyphicon-tasks"></i>기자재 관리
  			</h3>
  		</div>
  		<form action="${pageContext.request.contextPath}/equipment_search2.do" method="post">
  			<div class="panel-body">
  				<div class="form-inline margin-bottom-5">
  
  					<div class="input-group">
  						<div class="input-group-addon">검색조건</div>
  						<select name="search_option" class="form-control">
  							<option value="all"
  								<c:if test="${search_option eq 'all' }"> 
  									selected
  								</c:if> 
  								>
  								모든명단
  								</option>
  							<option value="seri_name"
  								<c:if test="${search_option eq 'seri_name' }"> 
  									selected
  								</c:if>
  							>기자재명</option>
  							<option value="seri_model"
  								<c:if test="${search_option eq 'seri_model' }"> 
  									selected
  								</c:if>
  							>모델명</option>
  						</select>
  					</div>
  
  				</div>
  				<div class="input-group">
  					<input type="text" name="search_value" class="form-control"
  						placeholder="검색" value="${search_value}" /> <span
  						class="input-group-btn">
  						<button class="btn btn-primary" type="submit">검색</button>
  					</span>
  				</div>
  			</div>
  		</form>
  	</div>
  </div>
  <!-- end row -->
  
  <div class="table-responsive">
  	<table class="table table-bordered table-hover">
  		<thead>
  			<tr>
  				<th><center>번호</center></th>
  				<th><center>기자재명</center></th>
  				<th><center>모델명</center></th>
  				<th><center>총개수</center></th>
  				<th><center>남은개수</center></th>
  				<th><center>대여개수</center></th>
  				<th colspan="3"><center>비고</center></th>
  			</tr>
  		</thead>
  		<tbody>
  			<c:forEach items="${list }" var="list" varStatus="status">
  				<tr>
  					<td><center>${status.count }</center></td>
  					<td><center>${list.seri_name }</center></td>
  					<td><center>${list.seri_model }</center></td>
  					<td><center>${list.seri_total_num }</center></td>
  					<td><center>${list.seri_remain_num }</center></td>
  					<td><center>${list.seri_total_num - list.seri_remain_num }</center></td>
  					<td>
  						<center>
  							<c:if test="${list.seri_code eq 'E_1' }">
  									<button type="button" class="btn btn-success btn-xs" disabled="disabled">수정불가</button>
  							</c:if>
  							<c:if test="${list.seri_code ne 'E_1' }">
  								<button data-toggle="modal" data-target="#${status.count }enadd" class="btn btn-success btn-xs" href="#">자산추가 및 삭제</button>
  							</c:if>
  						</center>
  					</td>
  					<td>
  						<center>
  							<form action="equipment_delete.do" method="post" id="deleteForm">
  								<input type="hidden" name="seri_name" value="${list.seri_name}" />
  								<input type="hidden" name="seri_model" value="${list.seri_model}" />
  								<input type="hidden" name="seri_code" value="${list.seri_code }" />
  								<c:forEach items="${rental }" var="rental" varStatus="status">
  									<input type="hidden" name="rent_code" value="${rental.rent_code }" />
  								</c:forEach>
  								<c:if test="${list.seri_code eq 'E_1' }">
  									<button type="button" class="btn btn-danger btn-xs" disabled="disabled">삭제불가</button>
  								</c:if>
  								<c:if test="${list.seri_code ne 'E_1' }">
  									<button type="submit" class="btn btn-danger btn-xs" onclick="confirmDel();">삭제</button>
  								</c:if>
  							</form>
  						</center>
  					</td>
  					<td>
  						<center>
  							<c:if test="${list.seri_code eq 'E_1' }">
  									<button type="button" class="btn btn-info btn-xs" disabled="disabled">비활성화</button>
  							</c:if>
  							<c:if test="${list.seri_code ne 'E_1' }">
  								<form action="" method="post" name="s_c">
  									<input type="hidden" name="seri_model" value="${list.seri_model}">
  									<input type="hidden" name="seri_code" value="${list.seri_code}">
  									<button type="submit" name="student_check" class="btn btn-info btn-xs">예약 달력 보기</button>
  								</form>
  							</c:if>
  						</center>
  					</td>
  				</tr>
  			</c:forEach>
  		</tbody>
  	</table>
  </div>
  ```

  <br/>

  - 기자재 추가<a id="add"></a>

  기자재가 없을 때 조교가 제품 추가 버튼을 클릭하여 기자재를 추가할 수 있습니다. 제품 추가 버튼을 클릭한다면 아래와 같은 slide가 생성되고 기자재명과 모델명, 자산등록번호를 입력하여 추가를 하면 기자재가 추가됩니다.

  ![equipment_add](https://user-images.githubusercontent.com/43205396/73130514-ee647d80-403c-11ea-8c65-3972e3ed85e4.png)

  ```html
  <form action="${pageContext.request.contextPath}/equipment_adding.do" method="post">
  	<div class="panel panel-grey" id="menu3" style="display: none;">
  		<div class="panel-heading text-center">
  			<h3 class="panel-title">
  				<i class="glyphicon glyphicon-plus"></i>기자재 추가
  			</h3>
  		</div>
  		<div class="panel-body" id="table_form" style="overflow: auto;">
  			<table class="table table-bordered table-border-grey" id="hiddenTable">
  				<tbody>
  					<tr>
  						<th class="bg-color-grey">기자재명</th>
  						<th><label class="input"> <input type="text" name="seri_name">
  						</label></th>
  						<th class="bg-color-grey">모델명</th>
  						<th><label class="input"> <input type="text" name="seri_model">
  						</label></th>
  						<th class="bg-color-grey">자산등록번호</th>
  						<th><label class="input"> <input type="text" name="seri_enroll_num">
  						</label></th>
  						<input type="hidden" name="totalCount" value="${totalCount.total }">
  						<input type="hidden" name="major_code" value="${user_info.major_code }">
  					</tr>
  				</tbody>
  			</table>
  		</div>
  		<input type="submit" name="submit" value="추가 " class="btn-u btn-u-default ladda-button btn-block" data-style="zoom-in">
  	</div>
  </form>
  ```

  추가 버튼을 클릭한다면 새로운 기자재가 등록이 되며 list에 추가가 되는 것을 확인할 수 있습니다.

  ![equipment_add2](https://user-images.githubusercontent.com/43205396/73130516-f7554f00-403c-11ea-9c8c-ee2b12443053.png)

  <br/>

  기자재가 추가가 되었을 때 똑같은 기자재와 모델명일 때, 자산번호가 다른 여러 기자재를 추가하고 싶으면 자산추가 및 삭제에서 기자재에 관한 내용을 수정할 수 있습니다. 

  ![add3](https://user-images.githubusercontent.com/43205396/73130518-ffad8a00-403c-11ea-9b10-ae8267b5f8ec.png)

  ```html
  <c:forEach items="${list }" var="list" varStatus="status">
  	<div class="modal fade bs-example-modal-sm" id="${status.count }enadd" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" data-backdrop='false'>
  		<div class="modal-dialog modal-sm" style="height: 65%;">
  			<div class="modal-content" style="width: 183%; height: 100%;">
  				<div class="modal-header" align="center">
  					자산추가 및 삭제
  					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
  						<span aria-hidden="true">&times;</span>
  					</button>
  				</div>
  				<div class="modal-body">
  					<div class="media">
  						<div class="media-body">
  							<h4 class="media-heading">기자재명 : ${list.seri_name }</h4>
  							<h4 class="media-heading">모델명 : ${list.seri_model }</h4>
  						</div>
  					</div>
  					<hr>
  					<div class="table-responsive">
  						<table class="table table-bordered table-hover">
  						<tr>
  							<h4><i class="glyphicon glyphicon-pushpin"></i>자산추가</h4>
  						</tr>
  							<div class="input-group">
  							<form action="${pageContext.request.contextPath}/equipment_adding_detail.do" method="post">
  								<div class="input-group-addon">자산등록번호</div>
  								<input type="text" class="form-control" name="seri_enroll_num" placeholder="입력" />
  								<input type="hidden" name="seri_code" value="${list.seri_code }" />
  								<span class="input-group-btn">
  									<button class="btn btn-primary" type="submit">추가</button>
  								</span>
  							</form>
  							</div>
  						</table>
  						<table class="table table-bordered table-hover" style="width: 99%;">
  							<tr>
  								<h4><i class="glyphicon glyphicon-pushpin"></i>자산현황</h4>
  							</tr>
  							<c:forEach items="${adding }" var="adding" varStatus="status">
  								<c:if test="${list.seri_code eq adding.seri_code }">
  									<form action="${pageContext.request.contextPath}/equipment_deleteEnroll.do" method="post">
  										<tr>
  											<td>
  												${adding.seri_enroll_num}
  											</td>
  											<td style="width: 10%;">
  												<c:if test="${adding.rent eq '0' }">
  													<button type="button" class="btn btn-info btn-xs">대여가능</button>
  												</c:if>
  												<c:if test="${adding.rent eq '1' }">
  													<button type="button" class="btn btn-info btn-xs">대여중</button>
  												</c:if>
  											</td>
  											<td style="width: 10%;">
  												<input type="hidden" name="seri_code1" value="${list.seri_code }" />
  												<input type="hidden" name="seri_enroll_num1" value="${adding.seri_enroll_num }" />
  												<c:if test="${adding.rent eq '0' }">
  													<button type="submit" class="btn btn-danger btn-xs" onclick="confirmDel();">삭제</button>
  												</c:if>
  										
  												<c:if test="${adding.rent eq '1' }">
  													<button type="button" class="btn btn-danger btn-xs" disabled="disabled">삭제</button>
  												</c:if>
  											</td>
  										</tr>
  									</form>
  								</c:if>
  							</c:forEach>
  						</table>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </c:forEach>
  ```

  만약에 기자재가 대여 중이라면 대여중, 삭제가 불가하도록 막아놓게 구현을 하였습니다.

  ![add4](https://user-images.githubusercontent.com/43205396/73130621-308ebe80-403f-11ea-8453-567d8d57d089.png)

  <br/>

  - 기자재 삭제<a id="del"></a>

  삭제 버튼을 누른다면 기자재 전체를 삭제할 수 있을 뿐더러 기자재 안의 자산을 하나하나 삭제도 할 수 있습니다.

  <br/>

  - 대여일수 변경<a id="day"></a>

  학과마다 기자재를 대여할 수 있는 대여일수가 각각 다르기 때문에 자신의 학과에 따라 대여일수를 변경할 수 있게 기능을 구현하였습니다. 기자재 관리 부분에서 대여일수 변경이라는 버튼을 누르면 slide 형식으로 실 대여일을 변경할 수 있는 form이 나오게 됩니다. 거기에 대여일을 작성하고 변경을 누르게 되면 대여를 할 수 있는 날짜가 제한이 되어 대여할 수 있게 됩니다.<br/>

  아래는 slide로 나온 모습입니다.

  ![add5](https://user-images.githubusercontent.com/43205396/73136304-868b5280-408f-11ea-9e0f-5a3fb56ebf43.png)

  ```html
  <form action="${pageContext.request.contextPath}/equipment_rentEdit.do" method="post">
  	<div class="panel panel-grey" id="menu4" style="display: none;">
  		<div class="panel-heading text-center">
  			<h3 class="panel-title">
  				<i class="glyphicon glyphicon-pencil"></i>대여일수 변경
  			</h3>
  		</div>
  		<div class="panel-body" id="table_form" style="overflow: auto;">
  			<table class="table table-bordered table-border-grey" id="hiddenTable">
  				<tbody>
  					<tr>
  						<th class="bg-color-grey">실 대여일</th>
  						<th><label class="input"> <input type="text" name="rentNumber">
  						</label></th>
  						<input type="hidden" name="totalCount" value="${totalCount.total }">
  						<input type="hidden" name="major_code" value="${user_info.major_code }">
  					</tr>
  				</tbody>
  			</table>
  		</div>
  		<input type="submit" name="submit" value="변경 " class="btn-u btn-u-default ladda-button btn-block" data-style="zoom-in">
  	</div>
  </form>
  ```

  <br/>

  - 예약 달력 보기<a id="cal"></a>

  확인하고 싶은 기자재의 예약 달력 보기라는 버튼을 누른다면 그 기자재의 예약 현황에 따라 달력에 나타나도록 ui를 구성하였습니다.<br/>

  hidden값을 가지고 calandar_form이라는 page를 생성하여 그 page 안에 예약 현황에 맞는 db를 출력하여 나하냅니다.

  ![cal](https://user-images.githubusercontent.com/43205396/73136617-c9025e80-4092-11ea-9c22-df02d99fbbd1.png)

  ```jsp
  <%@ page language="java" contentType="text/html; charset=utf-8"
  	pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html>
  <head>
  <link rel='stylesheet' type='text/css' href='http://www.blueb.co.kr/data/201010/IJ12872423858253/fullcalendar.css' />
  <script type='text/javascript' src='http://www.blueb.co.kr/data/201010/IJ12872423858253/jquery.js'></script>
  <script type='text/javascript' src='http://www.blueb.co.kr/data/201010/IJ12872423858253/jquery-ui-custom.js'></script>
  <script type='text/javascript' src='http://www.blueb.co.kr/data/201010/IJ12872423858253/fullcalendar.min.js'></script>
  <script type='text/javascript'>
  
  	$(document).ready(function() {
  	
  		var date = new Date();
  		var d = date.getDate();
  		var m = date.getMonth();
  		var y = date.getFullYear();
  		
  		var startDay = new Array();
  		var endDay = new Array();
  		
  		var events = [];
  		var strArray = [];
  		var endArray = [];
  		
  		<c:forEach items="${dTable}" var="dTable">
  		<c:if test="${dTable.returnStatus ne '반납' }">
  			strArray = "${dTable.start_day}".split('-');
  			endArray = "${dTable.end_day}".split('-');
  			events.push({
  				title: '${dTable.seri_enroll_num}',
  				start: new Date(strArray[0], strArray[1]-1, strArray[2]),
  				end: new Date(endArray[0], endArray[1]-1, endArray[2])
  			});
  		</c:if>
  		</c:forEach>
  		
  		$('#calendar').fullCalendar({
  			monthNames : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
              monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
              dayNames : [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
              dayNamesShort : [ "일", "월", "화", "수", "목", "금", "토" ],
              dayNamesMin : [ "일", "월", "화", "수", "목", "금", "토" ],
              weekHeader : "주",
  			header: {
  				left: 'prev,next today',
  				center: 'title',
  				right: 'no use'
  			},
  			events: events
  		});		
  	});
  
  </script>
  <style type='text/css'>
  
  	body {
  		margin-top: 40px;
  		text-align: center;
  		font-size: 14px;
  		font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
  		}
  
  	#calendar {
  		width: 900px;
  		margin: 0 auto;
  		}
  
  </style>
  </head>
  <body>
  <div id='calendar'></div>
  </body>
  </html>
  ```
  
  
