# My Schoolware Project

<br/>

## <Now Project -> 기자재 대여>

<br/>

### 목차

1. [기자재 대여현황 page](#1)
   - [기자재 예약목록](#reservation)
   - [기자재 대여목록](#rent)
   - [기자재 반납목록](#return)

----

- 기자재 대여현황 page<a id="1"></a>

  학생이 대여를 할 수 있는 기자재를 확인 후 예약을 진행을 하겠다고 예약을 신청하면 아래 페이지에서 현재 예약한 기자재를 확인 할 수 있으며 기자재를 대여를 한 것이 무엇이 있는지 확인할 수 있습니다. 관리를 하는 부분에서 반납을 했는지, 하지 않았는지, 연체가 되었는지, 얼마나 연체를 하였는지도 확인할 수 있습니다.

  ![rent1](https://user-images.githubusercontent.com/43205396/73181218-257c8100-415a-11ea-820a-bbf42becf30d.png)

  ```html
  <!-- target으로 누를 시 어떠한 상태로 출력이 될 지 구분을 하였습니다. -->
  <ul id="myTab" class="nav nav-pills nav-justified" role="tablist">
  	<li role="presentation" class="active"><a data-target="#home" id="home-tab" role="tab" data-toggle="tab" aria-controls="home" aria-expanded="true">예약 목록</a></li>
  	<li role="presentation" class=""><a data-target="#profile" id="profile-tab" role="tab" data-toggle="tab" aria-controls="profile" aria-expanded="false">대여 목록</a></li>
  	<li role="presentation" class=""><a data-target="#okay" id="profile-tab" role="tab" data-toggle="tab" aria-controls="profile" aria-expanded="false">반납 목록</a></li>
  </ul>
  ```
  
  위와 같은 소스로 인하여 예약 목록, 대여 목록, 반납 목록으로 tap하여 변경할 수 있습니다.
  
  <br/>
  
  - 기자재 예약목록<a id="reservation"></a>
  
  기자재 예약목록탭에서 테이블 안 대여관리 칼럼 안에 selectbox를 선택하여 예약중인지, 대여를 하여서 대여중인지를 판별하여 구분지을 수 있습니다. 수정을 누르게 된다면 사용시작일부터 사용종료일까지는 선택한 기자재가 대여 중이라고 대여 목록 란으로 넘어가게 됩니다.
  
  ![rent2](https://user-images.githubusercontent.com/43205396/73181227-2ad9cb80-415a-11ea-9125-edec90b07800.png)
  
  ```html
  <div role="tabpanel" class="tab-pane fade active in" id="home"
  	aria-labelledby="home-tab">
  	<form action="${pageContext.request.contextPath}/equipment_rentOkay.do" method="post">
  	<table class="table table-bordered table-hover">
  		<thead>
  			<tr>
  				<th><center>학번</center></th>
  				<th><center>이름</center></th>
  				<th><center>기자재명</center></th>
  				<th><center>모델명</center></th>
  				<th><center>자산등록번호</center></th>
  				<th><center>사용시작일</center></th>
  				<th><center>사용종료일</center></th>
  				<th><center>대여관리</center></th>
  				<th><center>예약취소</center></th>
  			</tr>
  		</thead>
  		<c:forEach items="${list }" var="list" varStatus="status">
  			<c:if test="${list.rent_management eq '예약중' }">
  				<tbody>
  					<tr>
  						<td><center>${list.id }</center></td>
  						<td><center>
  							<a class="tooltips" data-toggle="tooltip"
  							data-placement="top"
  							title="학과 : ${list.major_name } // 전화번호 : ${list.phone }"
  							data-original-title="학과 : ${list.major_name } // 전화번호 : ${list.phone }">${list.name }</a>
  						</center></td>
  						<td><center>${list.seri_name }</center></td>
  						<td><center>${list.seri_model }</center></td>
  						<td><center>${list.seri_enroll_num }</center></td>
  						<td><center>${list.start_day }</center></td>
  						<td><center>${list.end_day }</center></td>
  						<td>
  							<c:if test="${list.rent_management eq '예약중' }">
  								<select name="rentManagement" class="form-control input-sm btn-xs">
  									<option value="예약중" selected>예약중</option>
  									<option value="대여중">대여중</option>
  								</select>
  							</c:if>
  							<input type="hidden" name="seri_code" value="${list.seri_code }" />
  							<input type="hidden" name="rent_code" value="${list.rent_code }" />
  							<input type="hidden" name="seri_enroll_num" value="${list.seri_enroll_num }" />
  							<input type="hidden" name="rent_management" value="${list.rent_management }" />
  							<c:forEach items="${addEnroll }" var="addEnroll" varStatus="status">
  								<input type="hidden" name="rent" value="${addEnroll.rent }" />
  							</c:forEach>
  						</td>
  						<td>
  							<c:if test="${list.seri_name eq '예제' }">
  								<button type="button" class="btn btn-danger btn-xs" disabled="disabled">불가능</button>
  							</c:if>
  							<c:if test="${list.seri_name ne '예제' }">
  								<form action="${pageContext.request.contextPath}/equipment_cancel2.do" method="post">
  									<input type="hidden" name="rent_code" value="${list.rent_code }" />
  									<center><button type="submit" class="btn btn-danger btn-xs" onclick="confirmDel();">취소</button></center>
  								</form>
  							</c:if>
  						</td>
  					</tr>
  				</tbody>
  			</c:if>
  		</c:forEach>
  	</table>
  	<button class="btn btn-info" type="submit" style="float: right;"><i class="glyphicon glyphicon-repeat"></i> 수정</button>
  	</form>
  </div>
  ```
  
  <br/>
  
  ----
  
  - 기자재 대여목록<a id="rent"></a>
  
  대여목록으로 넘어간 기자재는 현재 대여 진행중이며, 아직 사용 종료일을 확인하여 반납이 되고 안되었고 연체가 되었는지 확인할 수 있습니다. 어떠한 학생이 어떤 기자재를 빌렸는지도 확인이 가능합니다.
  
  ![rent3](https://user-images.githubusercontent.com/43205396/73181235-2f05e900-415a-11ea-8c3c-d927860d83a1.png)
  
  테이블에서 반납현황 칼럼에서 select하여 구분을 지을 수 있습니다. 아직 대여 중이라면 대여, 반납을 완료했다면 반납, 사용종료일이 지났을 때 연체를 선택하면 연체라는 형태로 출력이 됩니다.
  
  ![rent4](https://user-images.githubusercontent.com/43205396/73181243-32997000-415a-11ea-8f0c-71339f4636f6.png)
  
  ```html
  <div role="tabpanel" class="tab-pane fade" id="profile"
  	aria-labelledby="profile-tab">
  	<form action="${pageContext.request.contextPath}/equipment_rentUpdate.do" method="post">
  		<table class="table table-bordered table-hover">
  			<thead>
  				<tr>
  					<th><center>학번</center></th>
  					<th><center>이름</center></th>
  					<th><center>기자재명</center></th>
  					<th><center>모델명</center></th>
  					<th><center>자산등록번호</center></th>
  					<th><center>사용시작일</center></th>
  					<th><center>사용종료일</center></th>
  					<th><center>반납현황</center></th>
  				</tr>
  			</thead>
  			
  			<c:forEach items="${list }" var="list" varStatus="status">
  				<c:if test="${list.rent_management eq '대여중' && list.return_day eq NULL}">
  					<tbody>
  						<tr>
  							<td><center>${list.id }</center></td>
  							<td><center>
  									<a class="tooltips" data-toggle="tooltip"
  										data-placement="top"
										title="학과 : ${list.major_name } // 전화번호 : ${list.phone }"
  										data-original-title="학과 : ${list.major_name } // 전화번호 : ${list.phone }">${list.name }</a>
								</center></td>
  							<td><center>${list.seri_name }</center></td>
							<td><center>${list.seri_model }</center></td>
  							<td><center>${list.seri_enroll_num }</center></td>
							<td><center>${list.start_day }</center></td>
  							<td><center>${list.end_day }</center></td>
								
  							<td><select name="return" class="form-control input-sm btn-xs">
  									<c:if test="${list.returnStatus eq '대여'}">
  										<option value="대여" selected>대여</option>
  										<option value="반납">반납</option>
  										<option value="연체">연체</option>
  									</c:if>
  									<c:if test="${list.returnStatus eq '반납'}">
  										<option value="반납" selected>반납</option>
  										<option value="대여">대여</option>
  										<option value="연체">연체</option>
  									</c:if>
  									<c:if test="${list.returnStatus eq '연체'}">
  										<option value="연체" selected>연체</option>
  										<option value="반납">반납</option>
  										<option value="대여">대여</option>
  									</c:if>
  							</select>
  							<input type="hidden" name="seri_code" value="${list.seri_code }" /></td>
  							<input type="hidden" name="rent_code" value="${list.rent_code }" /></td>
  							<input type="hidden" name="seri_enroll_num" value="${list.seri_enroll_num }" /></td>
  							<input type="hidden" name="status" value="${list.returnStatus }" /></td>
  							<input type="hidden" name="end_day" value="${list.end_day }" /></td>
  							<c:forEach items="${addEnroll }" var="addEnroll" varStatus="status">
  								<input type="hidden" name="rent" value="${addEnroll.rent }" /></td>
  							</c:forEach>
  						</tr>
  					</tbody>
  				</c:if>
  			</c:forEach>
  		</table>
  		<button class="btn btn-info" type="submit" style="float: right;"><i class="glyphicon glyphicon-repeat"></i> 수정</button>
	</form>
  </div>
  ```
  
  <br/>
  
  ------
  
  - 기자재 반납목록<a id="return"></a>
  
  반납이 지났으면 반납일과 계산하여 연체가 되었으면 연체현황에 얼마가 연체가 되었다고 style을 color를 red로 주어 출력하게 하였습니다. 사용종료일 이전에 또는 제때 반납을 하였으면 연체현황에 blue로 날짜가 출력이 되어 연체가 되지 않았단 것을 시각적으로 구분할 수 있게 구현하였습니다. 또한 반납이 되었으면 학생 계정에서는 다시 기자재를 빌릴 수 있게 구현을 하였습니다.
  
  ![rent5](https://user-images.githubusercontent.com/43205396/73181250-362cf700-415a-11ea-85f4-468bfa36442c.png)
  
  ```html
  <div role="tabpanel" class="tab-pane fade" id="okay"
  	aria-labelledby="profile-tab">
  	<form action="${pageContext.request.contextPath}/equipment_rentUpdate.do" method="post">
  		<table class="table table-bordered table-hover">
  			<thead>
  				<tr>
  					<th><center>학번</center></th>
  					<th><center>이름</center></th>
  					<th><center>기자재명</center></th>
  					<th><center>모델명</center></th>
  					<th><center>자산등록번호</center></th>
  					<th><center>사용시작일</center></th>
  					<th><center>사용종료일</center></th>
  					<th><center>반납일</center></th>
  					<th><center>반납현황</center></th>
  					<th><center>연체현황</center></th>
  				</tr>
  			</thead>
  			
  			<c:forEach items="${list }" var="list" varStatus="status">
  				<c:if test="${list.returnStatus eq '반납'}">
  					<tbody>
  						<tr>
  							<td><center>${list.id }</center></td>
  							<td><center>
  									<a class="tooltips" data-toggle="tooltip"
  										data-placement="top"
  										title="학과 : ${list.major_name } // 전화번호 : ${list.phone }"
  										data-original-title="학과 : ${list.major_name } // 전화번호 : ${list.phone }">${list.name }</a>
  								</center></td>
  							<td><center>${list.seri_name }</center></td>
  							<td><center>${list.seri_model }</center></td>
  							<td><center>${list.seri_enroll_num }</center></td>
  							<td><center>${list.start_day }</center></td>
  							<td><center>${list.end_day }</center></td>
  							<td><center>${list.return_day }</center></td>
  							<td><center>${list.returnStatus }</center></td>
  							<td><center>
  								<c:if test="${list.delay_day  > 0}">
  									<div style="color:red">${list.delay_day }일</div>
  								</c:if>
  								<c:if test="${list.delay_day <= 0}">
  									<div style="color:blue">${list.delay_day }일</div>
  								</c:if>
  							</center></td>
  						</tr>
  					</tbody>
  				</c:if>
  			</c:forEach>
  		</table>
  	</form>
  </div>
  ```
  
  

  
