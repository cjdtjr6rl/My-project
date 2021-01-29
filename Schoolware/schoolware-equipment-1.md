# My Schoolware Project

<br/>

## <Now Project -> 기자재 대여>

<br/>

### 목차

1. [기자재 관리 page](#mana)
   - [기자재 추가](#add)
   - [기자재 삭제](#del)
   - [대여일수 변경](#day)
   - [예약 달력 보기](#cal)

----

- 기자재 관리 page<a id="mana"></a>

  관리자가 등록이 되어 있는 기자재를 관리하는데 사용합니다. 기자재를 추가하며, 대여할 수 있는 대여날짜를 제한을 둘 수 있으며, 기자재를 삭제할 수 있습니다. 게다가 기자재의 지금 현재 대여 현황도 볼 수 있습니다.

  ![equipment_main](https://user-images.githubusercontent.com/43205396/73130511-e573ac00-403c-11ea-826f-28b98aa9bd6a.png)

  조교 계정에서 소유하고 있는 기자재를 등록하여 학생들이 대여할 수 있게 리스트를 만들어 놓습니다.<br/>
  
  page를 불러오는 servlet은 아래와 같습니다.<br/>
  
  ### equipment.controller 중 waitlist부분
  
  ```java
  /* 기자재 관리_조교 */
  // 기자재 관리 페이지 들어가기
  @RequestMapping(value = "/equipment_waitlist.do")
  public ModelAndView equipment_waitlist(CommandMap commandMap, HttpServletRequest req) throws Exception {
  	ModelAndView mv = new ModelAndView("/equipment/equipment_waitlist");
  
  	List<Map<String, Object>> list = equipmentService.equipment_waitlist(commandMap.getMap(), req);
  	List<Map<String, Object>> adding = equipmentService.equipment_waitlist_detail(commandMap.getMap(), req);
  	List<Map<String, Object>> rental = equipmentService.equipment_rental(commandMap.getMap(), req);
  	Map<String, Object> totalCount = equipmentService.equipment_total_count(commandMap.getMap());
  	
  	mv.addObject("list", list);
  	mv.addObject("adding", adding);
  	mv.addObject("rental", rental);
  	mv.addObject("totalCount", totalCount);
  
  	return mv;
  }
  ```
  
  이 중에서 기자재 정보를 출력하는 것은 list, adding, rental입니다.<br/>객체 형태로 불러오지 않고 List로 배열을 작성하여 기자재의 목록들과 추가하는 부분, 대여하는 부분을 작성하였습니다.
  
  ```sql
  <!-- 기자재관리 -->
  <select id="equipment_list" parameterType="hashmap" resultType="hashmap">
    <![CDATA[
      SELECT
        *
      FROM
      	equipment_list
    ]]>
  </select>
  
  <!-- 기자재관리2 -->
  <select id="equipment_list_detail" parameterType="hashmap" resultType="hashmap">
    <![CDATA[
      SELECT
        *
      FROM
        equipment_list_detail
    ]]>
  </select>
  
  <!-- 기자재관리3 -->
  <select id="equipment_rental" parameterType="hashmap" resultType="hashmap">
    <![CDATA[
      SELECT
        *
      FROM
        equipment_rent
    ]]>
  </select>
  ```
  
  SQL문에서 기자재의 목록을 출력하는 <code>equipment_list</code>와 기자재의 목록의 정보들을 출력하는 <code>equipment_list_detail</code>을 출력하며 대여할 수 있는 기자재들을 출력하는 <code>equipment_rental</code>로 구분하여 출력하도록 하였습니다.<br/>기자재에 관한 데이터들이 많아 하나의 쿼리로 불러오려 하였으나 기자재가 대여가 되었을 때, 되지 않았을 때 등을 고려하여 구분을 하였습니다.
  
  - 기자재 추가<a id="add"></a>
  
  기자재가 없을 때 조교가 제품 추가 버튼을 클릭하여 기자재를 추가할 수 있습니다. 제품 추가 버튼을 클릭한다면 아래와 같은 slide가 생성됩니다. 
  
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
  
  제품이 같은 기자재가 있을 수 있기 때문에 기자재명, 모델명, 자산등록번호로 구분을 두어 기자재를 등록할 수 있도록 하였습니다.<br/>
  
  기자재 추가라는 버튼을 누르면 show2가 실행되고 menu2와 3가 slide되는 형식입니다.
  
  ```javascript
  <script type="text/javascript">
  	$(document).ready(function() {
  		$("#show2").click(function() {
  			$("#menu2").slideToggle("fast");
  			$("#menu3").slideToggle("fast");
  		});
  	});
  </script>
  ```
  
  기자재명과 모델명, 자산등록번호를 입력하여 추가를 하면 기자재가 추가됩니다.
  
  ### equipment.controller 중 equipment_adding부분
  
  ```java
  @RequestMapping(value = "/equipment_adding.do")
  public ModelAndView equipment_adding(CommandMap commandMap, HttpServletRequest req) throws Exception {
  	ModelAndView mv = new ModelAndView("redirect:equipment_waitlist.do");
  	SimpleDateFormat format1 = new SimpleDateFormat ( "yyyyMMddHHmmss");
  	
  	Date time = new Date();
  	String time1 = format1.format(time);
  	String tempSeriCode = "E_" + time1;
		
  	commandMap.put("seri_code", tempSeriCode);
		
  
		equipmentService.equipment_adding(commandMap.getMap(), req);
  	equipmentService.equipment_adding2(commandMap.getMap(), req);
		
  	return mv;
	}
  ```
  
  기자재가 하나하나 자산등록번호를 붙여서 구분을 하기에는 한계가 있을 것 같고 규칙성이 없다고 생각을 하였습니다. 그리하여 기자재에게 <code>seri_code</code> 를 붙여 <code>private key</code>를 생성하였습니다. 그리하여 기자재 생성 버튼을 누른 시간을 가져와 "E_"이후에 붙여 <code>seri_code</code> 를 생성하게 하였습니다.
  
  ```sql
  <!-- 기자재추가 -->
  <insert id="equipment_add" parameterType="hashmap">
  	<![CDATA[
  		INSERT INTO equipment_list
  		(
  			seri_code,
  			seri_name,
  			seri_model,
  			seri_total_num,
  			seri_remain_num,
  			seri_status_num,
  			major_code
  		)
  		VALUES
  		(
  			#{seri_code},
  			#{seri_name},
  			#{seri_model},
  			'1',
  			'1',
  			'0',
  			#{major_code}
  		)
  	]]>
  </insert>
  
	<insert id="equipment_add2" parameterType="hashmap">
    <![CDATA[
    INSERT INTO equipment_list_detail
      (
	      seri_code,
        seri_enroll_num,
	      rent
      )
	    VALUES
      (
	      #{seri_code},
        #{seri_enroll_num},
        '0'
      )
  	]]>
  </insert>
  ```
  
  처음 기자재를 만들었을 때 총기자재의 갯수인 <code>seri_total_num</code> 의 갯수는 1, 남아있는 기자재의 갯수인 <code>seri_remain_num</code> 을 1, 기자재를 대여를 몇개 했는지 보여주는 <code>seri_status_num</code> 을 0으로 설정하여 저장하게 하였습니다. 기자재를 등록을 하였을 때 자세한 정보를 등록하는 부분에서는 대여를 했는지 안했는지에 대한 정보를 출력하는 <code>rent</code> 는 빌리지 않았다는 0으로 구분하게 하였습니다. ~~후에 보아하니 true와 false로 작성하지 않았는지 의문..~~<br/>같은 기자재로 다른 모델명이 있을 때, 자산번호가 다른 여러 기자재를 아래의 사진에서처럼 모달을 사용하여 추가하고삭제를 하여 특정 기자재에 관한 정보를 수정할 수 있습니다.
  
  ![add3](https://user-images.githubusercontent.com/43205396/73130518-ffad8a00-403c-11ea-9b10-ae8267b5f8ec.png)
  
  위와 같이 특정 기자재가 대여되지 않고 대여가 가능하다면 대여가 가능하다, 삭제할 수 있도록 구현을 해 놓았습니다.<br/>물론 조교의 계정이기 때문에 학생들은 기자재 대여만 가능하지 삭제는 못합니다.
  
  ![add4](https://user-images.githubusercontent.com/43205396/73130621-308ebe80-403f-11ea-8453-567d8d57d089.png)
  
  그리고 기자재가 특정 학생에 의해 대여가 되었다면 대여중이라는 목록과 함께 대여를 했기 때문에 삭제를 할 수 없도록 button을 비활성화 했습니다. 그리하여 조교는 지금 기자재가 무엇이 대여가 됐으며, 되지 않았음을 시각적으로 한눈에 확인할 수 있습니다.
  
  ```html
  <c:if test="${adding.rent eq '0' }">
  	<button type="button" class="btn btn-info btn-xs">대여가능</button>
  </c:if>
  <c:if test="${adding.rent eq '1' }">
  	<button type="button" class="btn btn-info btn-xs">대여중</button>
  </c:if>
  ```
  
  <code>equipment_list_detail</code> 에서 rent가 0으로 출력이 된다면 대여를 하지 않은 상태기 때문에 대여가능, 1로 출력이 된다면 대여를 했기 때문에ㅐ 대여중이라고 출력이 됩니다.<br/>
  
  - 기자재 삭제<a id="del"></a>
  
  삭제 버튼을 누른다면 기자재 전체를 삭제할 수 있을 뿐더러 기자재 안의 자산을 하나하나 삭제도 할 수 있습니다.
  
  > 기자재 삭제
  
  자산등록된 모든 내용이 담긴 특정 기자재를 삭제하고 싶을 때 이 삭제 버튼을 사용합니다.
  
  ```html
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
  ```
  
  ### equipment.controller 중 equipment_delete부분
  
  ```java
  // 진짜 삭제하는 controller
  @RequestMapping(value = "/equipment_delete.do")
  public ModelAndView equipment_delete(CommandMap commandMap, HttpServletRequest req) throws Exception {
  	ModelAndView mv = new ModelAndView("redirect:equipment_waitlist.do");
  	
  	equipmentService.equipment_delete(commandMap.getMap(), req);
  	equipmentService.equipment_delete2(commandMap.getMap(), req);
  	equipmentService.equipment_delete3(commandMap.getMap(), req);
  	
  	List<Map<String, Object>> list = equipmentService.equipment_waitlist(commandMap.getMap(), req);
  	List<Map<String, Object>> adding = equipmentService.equipment_waitlist_detail(commandMap.getMap(), req);
  	
  	mv.addObject("list", list);
  	mv.addObject("adding", adding);
  	
  	return mv;
  }
  ```
  
  기자재를 삭제를 하였을 때 고민을 많이 한 부분입니다. 왜냐하면 이 기자재에 대한 정보가 하나라도 있으면 안되기에 자산 등록된 기자재, 대여한 학생에 대한 정보, 예약을 했으면 예약을 진행했던 날짜 등을 삭제했기 때문입니다.<br/>이 부분에서 delete, delete2, delete3에 관한 sql문을 돌려 기자재의 정보가 전체 삭제가 됩니다.
  
```sql
  <!-- 기자재삭제 -->
<delete id="equipment_delete" parameterType="hashmap">
  <![CDATA[
		DELETE 
  
			FROM 
  		equipment_list
			WHERE
  		seri_name = #{seri_name}
			AND
  		seri_code = #{seri_code}
		]]>
  </delete>
	
  <delete id="equipment_delete2" parameterType="hashmap">
  <![CDATA[
      DELETE 
      FROM 
        equipment_list_detail
      WHERE
        seri_code = #{seri_code}
    ]]>
  </delete>
  
  <delete id="equipment_delete3" parameterType="hashmap">
  	<![CDATA[
      DELETE 
      FROM 
  			equipment_rent
      WHERE
  			seri_code = #{seri_code}
    ]]> 
  </delete>
  ```
  
  <br/>
  
  특정 기자재의 모든 자산들을 삭제하고 싶은 것이 아닌 특정 자산들만 삭제를 하고 싶을 때는 모달 안에서 삭제버튼을 사용하여 삭제를 할 수 있습니다.
  
  ```html
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
  ```
  
    ### equipment.controller 중 equipment_deleteEnroll부분
  
  ```java
  // 자산등록번호만 삭제하는 controller
  @RequestMapping(value = "/equipment_deleteEnroll.do")
  public ModelAndView equipment_deleteEnroll(CommandMap commandMap, HttpServletRequest req) throws Exception {
    ModelAndView mv = new ModelAndView("redirect:equipment_waitlist.do");
  
    equipmentService.equipment_delete4(commandMap.getMap(), req);
    equipmentService.equipment_numUpdate(commandMap.getMap(), req);
  
    List<Map<String, Object>> list = equipmentService.equipment_waitlist(commandMap.getMap(), req);
    List<Map<String, Object>> adding = equipmentService.equipment_waitlist_detail(commandMap.getMap(), req);
  
    mv.addObject("list", list);
    mv.addObject("adding", adding);
  
    return mv;
  }
  ```
  
  여기서 delete4는 특정 자산등록번호의 기자재를 삭제를 하는 것이며 numUpdate는 기자재의 갯수를 update하여 남아있는 기자재의 갯수가 변동이 되었다는 것을 나타냅니다.
  
  ```sql
  <!-- 기자재번호 삭제 시 기자재 개수 수정 -->
  <delete id="equipment_delete4" parameterType="hashmap">
  	<![CDATA[
      DELETE 
      FROM 
      	equipment_list_detail
      WHERE
      	seri_code = #{seri_code1}
      AND
      	seri_enroll_num = #{seri_enroll_num1}
    ]]>
  </delete>
  ```
  
    <br/>
  
    - 대여일수 변경<a id="day"></a>
  
  학과마다 기자재를 대여해 줄 수 있는 기준이 다르다는 문제점이 있었습니다. 그리하여 학과에 따라 대여일수를 변경할 수 있는 기능을 구현하는것이 옳다고 생각이 되어 구현하였습니다.<br/>기자재 관리 부분에서 대여일수 변경이라는 버튼을 누르면 slide 형식으로 실 대여일을 변경할 수 있는 form이 나오게 됩니다<br/>거기에 대여일을 작성하고 변경을 누르게 되면 대여를 할 수 있는 날짜가 제한이 되어 대여할 수 있게 됩니다.<br/>아래는 slide로 나온 모습입니다.
  
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
  
  대여일수 변경을 누르게 된다면 아래의 script가 작동이 하게 되어 slide형식으로 나오게 됩니다.
  
  ```javascript
  <script type="text/javascript">
    $(document).ready(function() {
    	$("#show3").click(function() {
        $("#menu4").slideToggle("fast");
      });
  	});
  </script>
  ```
  
  특정 조교의 특정 학과의 major_code를 hidden값으로 가져옵니다. 그리하여 특정 학과의 대여일을 수정할 수 있도록 하였습니다. 그리하여 그 학과의 학생들은 지정한 날짜를 넘어서는 대여를 할 수 없습니다.
  
    ### equipment.controller 중 equipment_rentEdit부분
  
  ```java
  @RequestMapping(value = "/equipment_rentEdit.do")
  public ModelAndView equipment_rentEdit(CommandMap commandMap, HttpServletRequest req) throws Exception
  {
    ModelAndView mv = new ModelAndView("redirect:equipment_waitlist.do");
    equipmentService.equipment_rentEdit(commandMap.getMap(), req);
    return mv;
  }
  ```
  
  ```sql
  <!-- 기자재 대여일 변경 -->
  <update id="equipment_rentEdit" parameterType="hashmap">
  	<![CDATA[
      UPDATE
      	equipment_list
      SET
      	rentNumber = #{rentNumber}
      WHERE
      	major_code = #{major_code}
    ]]>
  </update>
  ```
  
  SQL을 update하여 <code>major_code</code> 를 기준으로 <code>rentNumber</code> 를 변경합니다.<br/>
  
    - 예약 달력 보기<a id="cal"></a>
  
  학생들이 대여를 하였을 때 조교는 모든 학생들을 시각적으로 어떻게 하면 한눈에 확인할 수 있을지 고민을 하였습니다. 그리하여 예약 달력 보기라는 버튼을 눌러 그 기자재의 대여현황을 달력으로 볼 수 있게 하면 좋겠다고 생각하여 구현하였습니다.<br/>hidden값을 가지고 calandar_form이라는 page를 생성하여 그 page 안에 예약 현황에 맞는 칼럼을 출력하여 나타냅니다.
  
  ```html
  <form action="" method="post" name="s_c">
    <input type="hidden" name="seri_model" value="${list.seri_model}">
    <input type="hidden" name="seri_code" value="${list.seri_code}">
    <button type="submit" name="student_check" class="btn btn-info btn-xs">예약 달력 보기</button>
  </form>
  ```
  
  hidden값을 가져와 버튼을 누르면 function이 돌아가도록 구현을 하였습니다. 새로운 창으로 calandarForm 페이지를 출력하게 됩니다.
  
  ```javascript
  <!-- 기자재 대여현황 달력출력 -->
  <script type="text/javascript">
    $(document).ready(function() {
    	$("button[name=student_check]").click(function() {
        $("form[name=s_c]").attr("action","calandarForm.do");
        $("form[name=s_c]").attr("method","post");
        $("form[name=s_c]").attr("target","student");
        window.open("", "student", "width=1100, height=900");
        	$("form[name=s_c]").submit();  
      	});
  	});
  </script>
  ```
  
  아래와 같은 화면으로 달력이 출력이 됩니다.
  
  ![cal](https://user-images.githubusercontent.com/43205396/73136617-c9025e80-4092-11ea-9c22-df02d99fbbd1.png)
  
  기자재가 며칠부터 며칠까지 대여가 진행되고 있는지 시각적으로 확인하여 자신이 언제 대여를 할 수 있는지 확인할 수 있습니다.
  
  ```html
  <div id="calendar"></div>
  ```
  
  calendar라는 아이디를 통하여 javascript를 돌려 db값도 가져와 달력이 출력되게 하였습니다.<br/>달력은 라이브러리를 사용하였기 때문에 나의 DB에 있는 값을 연동시키는데에 문제점이 많이 있었습니다. 그러나 출력하는 부분을 forEach문을 통해 불러 날짜를 잘라 출력할 수 있도록 구현을 해서 완성시켰습니다.
  
  ```javascript
  <script type='text/javascript'>
    $(document).ready(function() {
    
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    
    const startDay = new Array();
    const endDay = new Array();
    
    const events = [];
    const strArray = [];
    const endArray = [];
    
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
  ```
  
  ```css
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
  ```
  
  이에 맞도록 CSS도 수정하였습니다.