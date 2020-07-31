/**
 * validation.js - client util
 * 생성일 : 20170726
 * 수정일 :
 * 작업자 : cdy 
 * 수정사항 :
 * - 
 */


/**
 * ie console log 버그 수정
 */
if (window.console == undefined) {
    console = {
        log: function() {}
    };
}



/**
 * 입력 필드의 타입 형식 체크 및 필수 값 체크 - 필수값, 숫자형식, 이메일형식, 전화번호 형식 등 체크 후 true false 리턴
 * 
 * ex)  
 * 1. 필수 요소에 클레스와 메세지 추가 : $("#check_id").addClass('required').attr('msg','값이 없을 경우 발생되는 메세지');
 * 2. 폼전송 전 validate() 함수 호출
 * if(validate()){
 *	    var f = document.editForm;
 *		f.submit();				
 * }				
 * @return true, false
 */
function validate() {
    var vCheck = true;
    $('.required').each(function(i) {
        if ($(this).attr('type') == "checkbox" || $(this).attr('type') == "radio") {
            if ($("input[name='" + (this).name + "']:checked").length == 0) {

                if ($(this).attr("msg")) {
                    alert($(this).attr("msg"));
                } else {
                    alert('Please Enter mandatory value.');
                }

                $(this).focus();
                vCheck = false;
                return false;
            }
        } else {
            if (!$(this).attr('disabled')) {
                $(this).val(strip_tags($(this).val()));
                if ($(this).val().split(" ").join() == "") {
                    if ($(this).attr("msg")) {
                        alert($(this).attr("msg"));
                    } else {
                        alert('Please Enter mandatory value.');
                    }

                    $(this).focus();
                    vCheck = false;
                    return false;
                }
            }
        }
    });

    if (vCheck) {
        $(".isNum").each(function() {
            if (!/^[0-9]+$/.test(this.value)) {
                if ($(this).attr("msg")) {
                    alert($(this).attr("msg"));
                } else {
                    alert('숫자만 입력 하세요');
                }

                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }

    if (vCheck) {
        $(".isEngNum").each(function() {
            if (!/^[0-9a-zA-Z\-\.\_]+$/.test(this.value)) {
                if ($(this).attr("msg")) {
                    //alert($(this).attr("msg"));
                    alert("영어와 숫자만 입력가능합니다.");
                } else {
                    alert("Only English and Numbers");
                }
                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }

    if (vCheck) {
        $(".isEng").each(function() {
            if (!/^[a-zA-Z\-\_]+$/.test(this.value)) {
                if ($(this).attr("msg")) {
                    alert($(this).attr("msg"));
                } else {
                    alert('Only English.');
                }
                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }

    if (vCheck) {
        $(".isEngSpace").each(function() {
            if (!/^[\s,a-zA-Z\-\_]+$/.test(this.value)) {
                if ($(this).attr("msg")) {
                    alert($(this).attr("msg"));
                } else {
                    alert('Only English.');
                }
                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }

    if (vCheck) {
        $(".isEngEtc").each(function() {
            if (!/^[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\",\s,a-zA-Z\-\_]+$/.test(this.value)) {
                if ($(this).attr("msg")) {
                    alert($(this).attr("msg"));
                } else {
                    alert('Only English.');
                }
                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }

    if (vCheck) {
        $(".isEmail").each(function() {
            if (!$(this).attr('disabled') && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value)) {
                if ($(this).attr("msg")) {
                    alert($(this).attr("msg"));
                } else {
                    alert("이메일 형식이 잘못됬습니다.");
                }
                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }

    if (vCheck) {
        $(".isEmailDomain").each(function() {
            if (!$(this).attr('disabled') && !/.+\.[a-zA-Z]{2,4}$/.test(this.value)) {
                if ($(this).attr("msg")) {
                    //alert($(this).attr("msg"));
                    alert("이메일 형식이 잘못됬습니다.");
                } else {
                    alert("The email you entered is invalid. Please check this and try again");
                }
                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }

    if (vCheck) {
        $(".isTelNum").each(function() {
            if (!$(this).attr('disabled') && !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/.test(this.value)) {
                if ($(this).attr("msg")) {
                    alert($(this).attr("msg"));
                } else {
                    alert("전화번호 형식이 아닙니다.");
                }

                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }

    if (vCheck) {
        $(".minNum").each(function() {

            if (!$(this).attr('disabled') && this.value.length < $(this).attr("minlength")) {
                if ($(this).attr("msg")) {
                    //alert($(this).attr("msg"));
                    alert($(this).attr("minlength") + "자리 보다 길어야 합니다.");
                } else {
                    alert($(this).attr("minlength") + "자리 보다 길어야 합니다.");
                }

                $(this).focus();
                vCheck = false;
                return false;
            }
        });
    }


    return vCheck;
}



/* 폼 입력값 Check
설명  : 폼 입력값을 정규식패턴을 이용해서 체크함
사용법 : frmchk_char(문자열, 조건)
결과값 : true/false
조건  :
0 = 첫글자 영문, 영문, 숫자, _ 사용가능
1 = 영문만 사용가능
2 = 숫자만 사용가능
3 = 한글만 사용가능
4 = 영문, 숫자 사용가능
5 = 영문, 숫자, 한글 사용가능
6 = 한글, 숫자 사용가능
7 = 한글, 영문 사용가능
8 = 한글을 포함하는지 여부
9 = 한글, 숫자, 영어 _, ., 공백만 있는지 확인.
10 = 한글, 숫자, 영어, _, ., 공백, [], (), /, ,, ?, !, ※, -
**/
function regexp_check(str, condition) {
    var objPattern;
    switch (condition) {
        case (0):
            objPattern = /^[a-zA-Z]{1}[a-zA-Z0-9_]+$/;
            break;
        case (1):
            objPattern = /^[a-zA-Z]+$/;
            break;
        case (2):
            objPattern = /^[0-9]+$/;
            break;
        case (3):
            objPattern = /^[가-힣]+$/;
            break;
        case (4):
            objPattern = /^[a-zA-Z0-9]+$/;
            break;
        case (5):
            objPattern = /^[가-힣a-zA-Z0-9]+$/;
            break;
        case (6):
            objPattern = /^[가-힣0-9]+$/;
            break;
        case (7):
            objPattern = /^[가-힣a-zA-Z]+$/;
            break;
        case (8):
            objPattern = /[가-힣]/;
            break;
        case (9):
            objPattern = /^[가-힣a-zA-Z0-9_.\s]+$/;
            break;
        case (10):
            objPattern = /^[가-힣a-zA-Z0-9_.\s\[\]\{\}\(\)\/\,\?\!\※\-\+\*\@\#\%\'\"\~\`\:\;\<\>\=\&\^\_]+$/;
            break;
    }
    return objPattern.test(str);
}


$(window).load(function() {
    /**
     * 입력 필드에 숫자 혹은 한글 인지 체크 하여 입력 못하도록 함
     * ex)
     * <input format="num_only" />
     */
    $("*[format]").on("keypress cut copy paste", function(event) {
        if ($(this).val() != null && $(this).val() != '') {
            if ($(this).attr("format") == "num_comma_only") {
                $(this).val($(this).val().replace(/[^0-9,]/g, ''));
                $(this).val($(this).val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
            }
            if ($(this).attr("format") == "num_only") {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
                $(this).val($(this).val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
            }
            if ($(this).attr("format") == "han_no") {
                $(this).val($(this).val().replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''));
            }

            if (event.which && (event.which != 0 && event.which != 8 && (event.which < 48 || event.which > 57))) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        }
    }).on("keyup blur", function(event) {
        if ($(this).val() != null && $(this).val() != '') {
            if ($(this).attr("format") == "num_comma_only") {
                $(this).val($(this).val().replace(/[^0-9,\.]/g, ''));
                $(this).val($(this).val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
            }
            if ($(this).attr("format") == "num_only") {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
                $(this).val($(this).val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
            }
            if ($(this).attr("format") == "han_no") {
                $(this).val($(this).val().replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''));
            }

            if (event.which && (event.which != 0 && event.which != 8 && (event.which < 48 || event.which > 57))) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        }
    });
});

/**
 * byte 단위 문자 체크하여 특정 문자 이상 입력 시 문자 오버 메세지 alert()
 * 
 * @param {*} obj  -target obj
 * @param {*} maxByte - maxByte
 */
function ChkByte(obj, maxByte) {
    var str = obj.value;
    var str_len = str.length;

    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";

    for (var i = 0; i < str_len; i++) {
        one_char = str.charAt(i);
        if (escape(one_char).length > 4) {
            rbyte += 2; //한글2Byte
        } else {
            rbyte++; //영문 등 나머지 1Byte
        }

        if (rbyte <= maxByte) {
            rlen = i + 1; //return할 문자열 갯수
        }
    }

    if (rbyte > maxByte) {
        alert("한글 " + (maxByte / 2) + "자 / 영문 " + maxByte + "자를 초과 입력할 수 없습니다.");
        str2 = str.substr(0, rlen); //문자열 자르기
        obj.value = str2;
        fnChkByte(obj, maxByte);
    } else {
        document.getElementById('byteInfo').innerText = rbyte;
    }
}


function strip_tags(input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}