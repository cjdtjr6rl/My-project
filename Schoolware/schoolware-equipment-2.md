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
  
  학생이 기자재를 대여를 하고 싶으면 대여를 진행하게 됩니다.<br/>
  
  예약을 하게 된다면 아래 예약 목록에 학생 정보와 기자재에 대한 정보들과 시작, 종료일이 출력이 됩니다. 여기서 조교는 물품을 가져갔으면 대여관리 란에서 대여중이라고 변경 후 수정을 할 수 있습니다.
  
  ![rent2](https://user-images.githubusercontent.com/43205396/73181227-2ad9cb80-415a-11ea-9125-edec90b07800.png)
  
  대여관리에서 selectbox는 아래와 같은 코드를 작성하였습니다.
  
  ```html
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
  ```
  
  기자재를 수정을 다 했다면 수정을 누르는데 아래의 servlet으로 진행됩니다.
  
  ### equipment.controller 중 equipment_rentOkay부분
  
  ```controller
  // 대여를 해갔는지 변경하는 controller
  @RequestMapping(value = "/equipment_rentOkay.do")
  public ModelAndView equipment_rentOkay(CommandMap commandMap, HttpServletRequest req) throws Exception {
  	ModelAndView mv = new ModelAndView("redirect:equipment_management.do");
  	
  	String[] seri_code = req.getParameterValues("seri_code");
  	String[] rent_code = req.getParameterValues("rent_code");
  	String[] rentManagement = req.getParameterValues("rentManagement");
  	String[] rent_management = req.getParameterValues("rent_management");
  	String[] rent = req.getParameterValues("rent");
  	String[] seri_enroll_num = req.getParameterValues("seri_enroll_num");
  	
  	for (int i = 0; i < seri_code.length; i++) {
  		commandMap.put("seri_code", seri_code[i]);
  		commandMap.put("rent_code", rent_code[i+1]);
  		commandMap.put("rentManagement", rentManagement[i]);
  		commandMap.put("rent_management", rent_management[i]);
  		commandMap.put("rent", rent[i]);
  		commandMap.put("seri_enroll_num", seri_enroll_num[i]);
  		if(commandMap.get("rent_management").equals("대여중")) {
  			if(!commandMap.get("rentManagement").equals(commandMap.get("rent_management"))) {
  				equipmentService.equipment_rentOkay(commandMap.getMap(), req); // 기자재 정보 업데이트
  				equipmentService.equipment_rentUp(commandMap.getMap(), req); // 기자재 다시 빌릴 수 있게 rent -> 0으로 수정
  				equipmentService.equipment_remainUp(commandMap.getMap(), req); // seri_remain_num + 1
  			}
  		} else {
  			if(!commandMap.get("rentManagement").equals(commandMap.get("rent_management"))) {
  				equipmentService.equipment_rentOkay(commandMap.getMap(), req); // 기자재 정보 업데이트
  				equipmentService.equipment_remainDown(commandMap.getMap(), req); // seri_remain_num - 1
  				equipmentService.equipment_rentDown(commandMap.getMap(), req); // 기자재 다시 빌릴 수 없게 rent -> 1으로 수정
  			}
  		}
  	}
  	
  	return mv;
  }
  ```
  
  배열값으로 가져와 여러 기자재를 한번에 정보를 수정할 수 있게 구현을 하였습니다.
  
  ```sql
  <update id="equipment_rentOkay" parameterType="hashmap">
  	<![CDATA[
  		UPDATE
  			 equipment_rent
  		SET 
  			rent_management = #{rentManagement}
  		WHERE 
  			rent_code = #{rent_code}
  		AND
  			seri_enroll_num = #{seri_enroll_num}
  	]]>
  </update>
  ```
  
  <br/>
  
  조교가 대여를 하는 기자재가 잘못했다고 학생 측에서 특정한 경우(연락오는 등 여러한 사정이 있는 경우)에 예약을 취소를 진행할 수 있습니다.<br/>
  
  취소 버튼을 누른다면 script 코드를 돌려 id값으로 삭제를 진행합니다.
  
  ```html
  <button type="submit" class="btn btn-danger btn-xs" onclick="confirmDel();">취소</button>
  ```
  
  ```javascript
  <script type="text/javascript">
  	function confirmDel() {
  		if (confirm('선택한 항목을 취소 하겠습니까?') == true) {
  			/* $('#deleteForm').submit(); */
  			var del = document.getElementById(e.getAttribute('id')).getAttribute('id');
  			document.getElementById(del).setAttribute('type', 'submit');
  		} else {
  			return false;
  		}
  	}
  </script>
  ```
  
  <br/>
  
  ----
  
	- 기자재 대여목록<a id="rent"></a>
  
	대여목록으로 넘어간 기자재는 현재 대여 진행중이며, 아직 사용 종료일을 확인하여 반납이 되고 안되었고 연체가 되었는지 확인할 수 있습니다. 어떠한 학생이 어떤 기자재를 빌렸는지도 확인이 가능합니다.
  
	![rent3](https://user-images.githubusercontent.com/43205396/73181235-2f05e900-415a-11ea-8c3c-d927860d83a1.png)
  
	테이블에서 반납현황 칼럼에서 select하여 구분을 지을 수 있습니다. 아직 대여 중이라면 대여, 반납을 완료했다면 반납, 사용종료일이 지났을 때 연체를 선택하면 연체라는 형태로 출력이 됩니다.
  
	![rent4](https://user-images.githubusercontent.com/43205396/73181243-32997000-415a-11ea-8f0c-71339f4636f6.png)
  
  ```html
  <select name="return" class="form-control input-sm btn-xs">
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
  ```
  
  반납현황을 수정하고 수정을 누르면 아래의 servlet이 작동합니다.
  
  ```controller
  // 대여상황 변경하는 controller
  @RequestMapping(value = "/equipment_rentUpdate.do")
  public ModelAndView equipment_rentUpdate(CommandMap commandMap, HttpServletRequest req) throws Exception {
  	ModelAndView mv = new ModelAndView("redirect:equipment_management.do");		
  	SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd");
  	
  	Date time = new Date();
		
  	String time1 = format1.format(time);
  	String[] seri_code = req.getParameterValues("seri_code");
  	String[] rent_code = req.getParameterValues("rent_code");
  	String[] returnn = req.getParameterValues("return");
  	String[] status = req.getParameterValues("status");
  	String[] rent = req.getParameterValues("rent");
  	String[] seri_enroll_num = req.getParameterValues("seri_enroll_num");
  	String[] end_day = req.getParameterValues("end_day");
  	
  	for (int i = 0; i < seri_code.length; i++) {
  		commandMap.put("seri_code", seri_code[i]);
  		commandMap.put("rent_code", rent_code[i]);
  		commandMap.put("return", returnn[i]);
  		commandMap.put("status", status[i]);
  		commandMap.put("rent", rent[i]);
  		commandMap.put("seri_enroll_num", seri_enroll_num[i]);
  		commandMap.put("return_day", time1);
  		commandMap.put("end_day", end_day[i]);
  		if(commandMap.get("return").equals("반납")) {
  			if(!commandMap.get("status").equals(commandMap.get("return"))) {
  				equipmentService.equipment_rentUpdate(commandMap.getMap(), req); // 기자재 정보 업데이트
  				equipmentService.equipment_rentUp(commandMap.getMap(), req); // 기자재 다시 빌릴 수 있게 rent -> 0으로 수정
  				equipmentService.equipment_remainUp(commandMap.getMap(), req); // seri_remain_num + 1
  				equipmentService.equipment_returnDay(commandMap.getMap(), req); // 반납하는 날짜 db에 저장
  			}
  		} else {
  			if(!commandMap.get("status").equals(commandMap.get("return"))) {
  				equipmentService.equipment_rentUpdate(commandMap.getMap(), req); // 기자재 정보 업데이트
  			}
  			/*equipmentService.equipment_rentDown(commandMap.getMap(), req); // 기자재 다시 빌릴 수 없게 rent -> 1으로 수정
  			if(!commandMap.get("status").equals(commandMap.get("return"))) {
  				equipmentService.equipment_remainDown(commandMap.getMap(), req); // seri_remain_num - 1
  			}*/
  		}
  	}
  	
  	return mv;
  }
  ```
  
  배열로 값을 가져와 수정이 진행됩니다.
  
  ```sql
  <update id="equipment_rentUpdate" parameterType="hashmap">
  	<![CDATA[
  		UPDATE
  			 equipment_rent
  		SET 
  			returnStatus = #{return}
  		WHERE 
  			rent_code = #{rent_code}
  		AND
  			seri_enroll_num = #{seri_enroll_num}
  	]]>
  </update>
  ```
  
  <br/>
  
  ------
  
  - 기자재 반납목록<a id="return"></a>
  
  반납이 지났으면 반납일과 계산하여 연체가 되었으면 연체현황에 얼마가 연체가 되었다고 style을 color를 red로 주어 출력하게 하였습니다. 사용종료일 이전에 또는 제때 반납을 하였으면 연체현황에 blue로 날짜가 출력이 되어 연체가 되지 않았단 것을 시각적으로 구분할 수 있게 구현하였습니다. 또한 반납이 되었으면 학생 계정에서는 다시 기자재를 빌릴 수 있게 구현을 하였습니다.
  
  ![rent5](https://user-images.githubusercontent.com/43205396/73181250-362cf700-415a-11ea-85f4-468bfa36442c.png)
  
  ```html
  <td>
	<c:if test="${list.delay_day  > 0}">
  		<div style="color:red">${list.delay_day }일</div>
  	</c:if>
  	<c:if test="${list.delay_day <= 0}">
  		<div style="color:blue">${list.delay_day }일</div>
  	</c:if>
  </td>
  ```
  
  
  
  
