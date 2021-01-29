# My Schoolware Project

<br/>

## <Now Project -> 기자재 대여>

<br/>

### 목차

1. [기자재 목록 확인 page](#check)
   - [기자재 예약신청](#reservation)
     - [예약 날짜 현황 보기](#see)
     - [기자재 예약하기](#want)
2. [자신이 대여한 기자재 현황 확인 page](#selfcheck)

----

- 기자재 목록 확인 page<a id="check"></a>

  이 페이지는 학생 계정에서 조교가 등록한 기자재를 확인하며 대여할 수 있는 페이지 입니다.<br/>현재 기자재가 어떤 것이 있으며, 그 기자재의 모델명도 확인할 수 있으며 남아있는 기자재가 몇개가 있는지도 확인할 수 있습니다.

  ![equipment_stu_rent](https://user-images.githubusercontent.com/43205396/73514781-500a5a80-4436-11ea-9088-5ab77f5cf96a.png)

  해당 학과의 조교가 기자재를 최대 며칠동안 대여를 할 수 있는지 제한을 두었기 때문에 기자재를 최대 일수로 지정하고 제한이 됩니다.<br/>학생은 자신의 학과의 기자재의 대여일수를 확인하며 대여합니다.
  
  ```html
  <h2>기자재를 대여할 수 있습니다.</h2>
  <%int i=0; %>
  <c:forEach items="${list}" var="list" varStatus="status">
  	<c:if test="${list.major_code eq user_info.col_code }">
  		<p>기자재를 대여 시 최대 ${list.rentNumber }일 동안 대여가 가능합니다.</p>
  	</c:if>
  	<%
  		if(i >= 0){
  			break;
  		}
  	%>
  </c:forEach>
  <p>동일한 기자재를 2개 이상 대여할 수 없습니다.</p>
  ```
  
  제한된 날짜를 불러와 페이지에 출력하게 하였습니다.<br/>
  
  ### equipment.controller 중 management_st부분
  
  ```java
  // 기자재 관리 현황_학생
  // 기자재 관리 현황 페이지 들어가기
  @RequestMapping(value = "/equipment_management_st.do")
  public ModelAndView equipment_management_st(CommandMap commandMap, HttpServletRequest req) throws Exception {
  	ModelAndView mv = new ModelAndView("/equipment/equipment_management_st");
  	
  	List<Map<String, Object>> list = equipmentService.equipment_management_st(commandMap.getMap(), req);
  	List<Map<String, Object>> adding = equipmentService.equipment_management_st_deatil(commandMap.getMap(), req);
  	List<Map<String, Object>> multi_info = equipmentService.subject(commandMap.getMap(), req);
  	List<Map<String, Object>> rTable = equipmentService.equipment_rTable(commandMap.getMap(), req);
  	Map<String, Object> rentCount = equipmentService.equipment_rent_count(commandMap.getMap());
  
  	mv.addObject("list", list);
  	mv.addObject("adding", adding);
  	mv.addObject("multi_info", multi_info);
  	mv.addObject("rTable", rTable);
  	mv.addObject("rentCount", rentCount);
  	
  	return mv;
  }
  ```
  
  이 중에서 기자재 정보를 출력하는 것은 list입니다.
  
  ```sql
  <!-- 기자재관리(학생) -->
  <select id="equipment_management_st" parameterType="hashmap" resultType="hashmap">
  <![CDATA[
  	SELECT
  		e.*, sum(d.rent) status
  	FROM
  		equipment_list e
  	RIGHT JOIN
  		equipment_list_detail d
  	ON
      	e.seri_code = d.seri_code
  	GROUP BY
      	d.seri_code
  ]]>
  </select>
  ```
  
  <code>seri_code</code> 를 기준으로 JOIN하여 <code>equipment_list</code> 와 <code>equipment_list_detail</code> 의 데이터를 출력합니다.<br/>
  
  - 기자재 예약신청<a id="reservation"></a>
  
    학생이 기자재를 예약하고 싶다면 예약 버튼을 누릅니다.<br/>그리하면 아래와 같은 팝업이 출력하게 됩니다.
  
    ![equipment_stu_rent2](https://user-images.githubusercontent.com/43205396/73514945-de7edc00-4436-11ea-9fbb-c9ff4034650c.png)
  
    ```html
    <table id="calendar" class="table table-bordered table-hover">
    	<thead>
    		<tr>
    			<td class="text-center">
    				모델명
    			</td>
    			<td class="text-center">
    				<center>${list.seri_model }</center>
    			</td>
    			<td class="text-center">
    			<form action="" method="post" name="s_c">
    				<input type="hidden" name="seri_model" value="${list.seri_model}">
    				<input type="hidden" name="seri_code" value="${list.seri_code}">
    				<button type="submit" name="student_check" class="btn btn-info btn-xs">예약 날짜 현황 보기</button>
    			</form>
    			</td>
    		</tr>
    	</thead>
    	
    	
    	<c:forEach items="${adding }" var="adding" varStatus="status">
    		<c:if test="${list.seri_code eq adding.seri_code}">
    			<tbody>
    				<tr>
    					<td class="text-center" colspan="2">
    						<center>${adding.seri_enroll_num }</center>
    					</td>
    					<td class="text-center">
    						<center><a data-toggle="modal" class="btn btn-warning btn-xs" data-target="#${status.count }rentGo" href="#rentGo" class="btn btn-primary"><b>예약하기</b></a></center>
    					</td>
    				</tr>
    			</tbody>
    		</c:if>
    	</c:forEach>
    </table>
    ```
  
    팝업 중 예약 날짜 현황 보기를 누르면 조교가 보는 달력이 학생에게도 똑같이 출력됩니다.<br/>어떤 기자재가 몇일까지 대여를 하고 있는지 확인할 수 있으며, 학생은 그것을 기준으로 조교에게 대여여부를 전송합니다.<br/>해당 기자재의 남아있는 기자재를 보여주고 예약을 진행할 수 있으며, 해당 기자재의 다른 학생이 예약한 날짜 현황도 확인할 수 있습니다. 
  
    - 예약 날짜 현황 보기<a id="see"></a>
  
      현재 그 기자재가 어떤 날짜에 대여가 되어있는지 확인할 수 있게 관리자가 보는 달력과 똑같이 출력이 됩니다.
  
      ```javascript
      <!-- 기자재 대여현황 달력출력 -->
      <script type="text/javascript">
      	$(document).ready(function () {
      		$("button[name=student_check]").click(function(){
      			$("form[name=s_c]").attr("action","calandarForm.do");
      			$("form[name=s_c]").attr("method","post");
      			$("form[name=s_c]").attr("target","student");
      			window.open("", "student", "width=1100, height=900");
      			$("form[name=s_c]").submit();  
      		});
      	});	
	    </script>
      ```
	
      <br/>
	
    - 기자재 예약하기<a id="want"></a>
	
      예약하기를 누르면 아래와 같은 모달창이 하나 더 뜨게 됩니다.
	
      ![equipment_stu_rent3](https://user-images.githubusercontent.com/43205396/73514951-e3439000-4436-11ea-8fd4-79aa324b6f32.png)
  
      얼마나 대여를 할지 기간을 지정할 수 있습니다
  
      ![equipment_stu_rent4](https://user-images.githubusercontent.com/43205396/73514954-e8084400-4436-11ea-933b-38721aa40ea6.png)
  
      기자재를 대여를 하는데 현재의 날짜부터 대여를 시작할 수 있습니다. 그러나 종료하는 일이 해당 학과의 종료일이 제한되어 있기 때문에 제한되는 날짜를 범위 하에 날짜를 지정할 수 있습니다.<br/>여기서 힘들었던 부분은 datepicker라는 라이브러리로 가져온 달력에 저의 제한된 날짜를 출력하는 것이 힘들었습니다.<br/>현재의 날짜 이전으로 버튼이 비활성화 되도록 하며, 특정 학과의 제한된 일수만 열리도록 하는 것이 시행착오가 많았습니다.<br/>그러나 수많은 시행착오 끝에 구현하였습니다 ! 😭
  
      ```javascript
      <!-- datepicker 달력 폼 start -->
      <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"/>
      <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
      <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
      <!-- datepicker 한국어로 -->
      <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/i18n/datepicker-ko.js"></script>
      <script>
      	$(function() {
      		//datepicker 한국어로 사용하기 위한 언어설정
      
      		// 지정일로부터 n일 후의 날짜계산
      		function dateAddDays(fromDate, days) {
      			const toDate = new Date(fromDate);
      			toDate.setDate(toDate.getDate() + Number(days));
      
      			return [ toDate.getFullYear(), pad(toDate.getMonth() + 1, 2),
      					pad(toDate.getDate(), 2) ].join('-');
      		}
      
      		// 최대 자릿수에 맞춰 숫자 앞에 0 추가
      		// pad(1, 3) --> 001
      		function pad(num, maxLength) {
	    			num = num + '';
      			return (num.length < maxLength) ? pad('0' + num, maxLength) : num;
      		}
      
      		// 시작일(fromDate)은 종료일(toDate) 이후 날짜 선택 불가
      		// 종료일(toDate)은 시작일(fromDate) 이전 날짜 선택 불가
      
      		//시작일.
      		
      		$('.from-date').datepicker({
      			showOn : "button", // 달력을 표시할 타이밍 (both: focus or button) 
      			buttonText : "시작일 선택", // 버튼의 대체 텍스트 
      			monthNames : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            dayNames : [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
            dayNamesShort : [ "일", "월", "화", "수", "목", "금", "토" ],
            dayNamesMin : [ "일", "월", "화", "수", "목", "금", "토" ],
            weekHeader : "주",
      			dateFormat : "yy-mm-dd", // 날짜의 형식 
      			minDate : 0, // 선택할수있는 최소날짜, ( 0 : 오늘 이전 날짜 선택 불가)
      			onSelect : function(selectedDate) {
      				const idx = $('.from-date').index(this);
      				// 시작일(fromDate) datepicker가 닫힐때 
      				// 종료일(toDate)의 선택할수있는 최소 날짜(minDate)를 선택한 시작일로 지정 
      				$(".to-date").eq(idx).datepicker("option", "minDate",
      						selectedDate);
      				// 종료일의 최대 날짜 계산(시작일 +5일)
      				<%int j=0; %>
      				<c:forEach items="${list}" var="list">
      					<c:if test="${list.major_code eq user_info.col_code }">
      						const toDate = dateAddDays(selectedDate, ${list.rentNumber });
      					</c:if>
      					<%
      						if(j >= 0){
      							break;
      						}
      					%>
      				</c:forEach>
      				$(".to-date").eq(idx).datepicker("option", "maxDate", toDate);
      			}
      		});
      
      		//종료일
      		$('.to-date').datepicker({ 
      		    showOn : "button", 
      		    buttonText : "종료일 선택",
      		    monthNames : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            dayNames : [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
            dayNamesShort : [ "일", "월", "화", "수", "목", "금", "토" ],
            dayNamesMin : [ "일", "월", "화", "수", "목", "금", "토" ],
            weekHeader : "주",
            dateFormat : "yy-mm-dd",
            minDate : 0, // 오늘 이전 날짜 선택 불가
            onSelect : function(selectedDate) { 
              // 종료일(toDate) datepicker가 닫힐때 
              // 시작일(fromDate)의 선택할수있는 최대 날짜(maxDate)를 선택한 종료일로 지정 
              const idx = $('.to-date').index(this);
              $(".from-date").eq(idx).datepicker("option", "maxDate", selectedDate);
            }
      		});
      	});
      </script>
      
      <style>
      	.ui-datepicker { z-index:9999999999 !important; }
    		.ui-front { z-index:9999996 !important; }
      	.ui-dialog { z-index:9999997 !important; }
      </style>
      <!-- datepicker 달력 폼 end -->
      ```
  
      날짜를 전부 지정 후 요청을 보내면 예약이 됩니다.<br/>
  
      ### equipment.controller 중 equipment_sending부분
  
      ```java
      // 기자재 요청 보내기
      @RequestMapping(value = "/equipment_sending.do")
      public ModelAndView equipment_sending(CommandMap commandMap, HttpServletRequest req) throws Exception {
      	ModelAndView mv = new ModelAndView("redirect:equipment_waitlist_st.do");
      	SimpleDateFormat format1 = new SimpleDateFormat("yyyyMMddHHmmss");
      
      	Date time = new Date();
      	String time1 = format1.format(time);
      	String tempSeriCode = "R_" + time1;
      	log.debug(tempSeriCode);
      	commandMap.put("rent_code", tempSeriCode);
      	
      	equipmentService.equipment_sending(commandMap.getMap(), req);
      	
      	return mv;
      }
      ```
      
  날짜의 data Format이 <code>yy-mm-dd</code> 였지만 <code>yyyyMMddHHmmss</code>로 수정하여 DB에 저장되도록 수정하였습니다. 그렇게 해야 계산을 하기에 더 편리하기 때문입니다. 그리고 기자재의 <code>rent_code</code> 도 각기 다르게 지정해줄 수 있기 때문입니다.<br/><code>new Date</code>를 통해 불러와도 되지만 코드를 한번 더 작성하는 것이기 때문에 비효율적입니다.
      
      ```sql
      <!-- 기자재대여(학생) -->
      <insert id="equipment_sending" parameterType="hashmap">
      	<![CDATA[
      		INSERT INTO equipment_rent
      		(
      			seri_name,
      			seri_model,
      			seri_enroll_num,
      			name,
      			major_name,
      			phone,
      			start_day,
      			end_day,
      			use_reason,
      			rent_code,
      			id,
      			seri_code
      		)
      		VALUES
      		(
      			#{seri_name},
      			#{seri_model},
      			#{seri_enroll_num},
      			#{name},
      			#{major_name},
      			#{phone},
      			#{start_day},
      			#{end_day},
      			#{use_reason},
      			#{rent_code},
      			#{id},
      			#{seri_code}
      		)
      	]]>
      </insert>
    ```
    
  위와 같은 데이터들을 저장합니다.<br/>
    
  -----
    
  - 자신이 대여한 기자재 현황 확인 page <a id="selfcheck"></a>
    
    기자재를 대여를 했을 때 대여만 하고 끝이 아닌 자신이 어떤 기자재를 대여를 했는지, 언제 빌리고 반납해야 하는지 확인할 수 있어야 합니다. 그리하여 아래와 같은 자신이 대여한 기자재의 정보를 확인할 수 있습니다.
    
    ![equipment_stu_rent5](https://user-images.githubusercontent.com/43205396/73514957-ecccf800-4436-11ea-8004-757b72a25580.png)
    
    자신이 대여를 한 기자재가 잘못되었다면 취소를 통하여 취소를 할 수 있습니다.<br/>그러나 이미 기자재를 반납했으면 취소불가하여 이전에 빌렸던 현황만 출력되게 됩니다.
    
    ### equipment.controller 중 equipment_sending부분
    
      ```java
      // 기자재 신청 취소(학생)
      @RequestMapping(value = "/equipment_cancel.do")
      ModelAndView equipment_cancel(CommandMap commandMap, HttpServletRequest req) throws Exception {
      	ModelAndView mv = new ModelAndView("redirect:equipment_waitlist_st.do");
      	
      	log.debug(commandMap.get("seri_code"));
      	log.debug(commandMap.get("rent_code"));
      	
      	equipmentService.equipment_rentDelete(commandMap.getMap(), req);
      	equipmentService.equipment_changeTotal2(commandMap.getMap(), req);
      	
      	return mv;
      }
    ```
    
      ```sql
      <!-- 기자재번호 삭제 시 기자재 개수 수정 -->
      <delete id="equipment_rentDelete" parameterType="hashmap">
      	<![CDATA[
      		DELETE 
      	
      		FROM 
      			equipment_rent
      		WHERE
      			rent_code = #{rent_code}
      	]]> 
      </delete>
      
      <update id="equipment_changeTotal2" parameterType="hashmap">
      	<![CDATA[
      		UPDATE 
      			equipment_list l INNER JOIN equipment_list_detail d
      		ON 
      			l.seri_code = d.seri_code
      		SET 
      			l.seri_status_num = l.seri_status_num - 1
      		WHERE 
      			d.seri_code = #{seri_code}
      	]]>
      </update>
    ```
    
    
    
    
