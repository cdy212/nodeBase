/**
 * custom_util - server util
 * 생성일 : 20170726
 * 수정일 :
 * 작업자 : cdy 
 * 수정사항 :
 * - 20170726 - getTodayAddDay_yyyy_mm_dd 버그 수정 by cdy
 */


/**
 * 파라미터 validation 용도
 * @param {*} data Type object, string, undefined empty check 
 * @return true, false
 */
exports.isEmpty = (data) => {
  if(typeof(data) === 'object'){
      if(JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]'){
          return true;
      }else if(!data){
          return true;
      }
      return false;
  }else if(typeof(data) === 'string'){
      if(!data.trim()){
          return true;
      }
      return false;
  }else if(typeof(data) === 'undefined'){
      return true;
  }else{
      return false;
  }
}

exports.lpad = function(s, padLength, padString) {
  while(s.length < padLength)
      s = padString + s;
  return s;
}

exports.rpad = function(s, padLength, padString) {
  while(s.length < padLength)
      s += padString;
  return s;
}


/** time util **/

//millis -> 0분49.927초
exports.millisToMinutesAndSeconds = function(millis) {
var minutes = Math.floor(millis / 60000);
var seconds = ((millis % 60000) / 1000).toFixed(3);
return minutes + "(Min)" + (seconds < 10 ? '0' : '') + seconds+"(Sec)";
}

//2017/12/08
exports.getTimeNowDay = () => {
  var d = new Date();
  var s =
      leadingZeros(d.getFullYear(), 4) + '/' +
      leadingZeros(d.getMonth() + 1, 2) + '/' +
      leadingZeros(d.getDate(), 2);
  return s;
}

//12:58:11
exports.getTimeNowTime = function(){
  var d = new Date();
  var s =
      leadingZeros(d.getHours(), 2) + ':' +
      leadingZeros(d.getMinutes(), 2) + ':' +
      leadingZeros(d.getSeconds(), 2);
  return s;
}

exports.leadingZeros = function(n, digits){
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}
/**(E) Valid Utils */


/**(S) File Utils */
/**
* CSV 파일 생성
* @param {HttpServletRequest} res 
* @param {CSV값} retVal
* @param {생성파일명} file_name 
* @return csv 파일 리턴
*/
exports.file_downloadCSV =  function(res, retVal,file_name){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/csv; charset=EUC-KR');		
      // res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-disposition', 'attachment;filename='+file_name+'.csv');
  res.write(retVal);  
  res.end();
};

/**(E) File Utils */


/**(S) DATE UTIL */


/**
* 랜덤 파일명 생성
* @return ex) 2017_07_26_12_30_20_random(4)
*/
exports.getFileNameTodayAddDay_yyyy_mm_dd_hh_mm_ss_random = function(){
  var date = new Date();
  date.setDate(date.getDate());

  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = (date.getDate()).toString();

  var hh = (date.getHours()).toString();
  var mm = (date.getMinutes()).toString();
  var ss = (date.getSeconds()).toString();
  var random = Math.floor(Math.random() * 1000) + 1;

  return yyyy +"_"+(mm[1] ? mm : '0'+mm[0])+"_"+(dd[1] ? dd : '0'+dd[0])+"_"+hh+"_"+mm+"_"+ss+"_"+random ;
};


/**
* 오늘일자 기준으로 추가된 일수 계산
* @param {num} addDay - Day 단위 추가 일
* @return ex) 2017-07-26
*/
exports.getTodayAddDay_yyyy_mm_dd = function(addDay){
  var date = new Date();
  date.setDate(date.getDate()+addDay);

  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = (date.getDate()).toString();

  return yyyy +"-"+(mm[1] ? mm : '0'+mm[0])+"-"+(dd[1] ? dd : '0'+dd[0]);
};

/** 
* 오늘날짜 리턴 
* @return ex) 2017-07-26
*/
exports.getToday_yyyy_mm_dd = function(){
  var date = new Date();
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();
  return yyyy +"-"+(mm[1] ? mm : '0'+mm[0])+"-"+(dd[1] ? dd : '0'+dd[0]);
};

/** 
* 오늘날짜 리턴 
* @return ex) 2017-07
*/
exports.getToday_yyyy_mm = function(){
  var date = new Date();
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();
  return yyyy +"-"+(mm[1] ? mm : '0'+mm[0]);
};


/**(E) DATE UTIL */


/**(S) String Utils**/

//
/**
* 전체 치환 작업
*
* @param {targetStr} targetStr
* @param {searchStr} searchStr
* @param {replaceStr} replaceStr 
* @return ex) 치환된 문자열
*/
exports.replaceAll = function(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}


/**(E) String Utils**/


exports.isNumber = function(s){
  s += ''; // 문자열로 변환
  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
  if (s == '' || isNaN(s)) return false;
  return true;
}


exports.getUserId = function(req){
  var _login_id = req.cookies.login_id;//입력된 젠데이터 seq 
  
  if(_login_id == null || _login_id == ""){
      _login_id = req.session.login_id;//입력된 젠데이터 seq 
  }

return _login_id;
}