let output = "" // 계산기 출력 문자열

//입력 결과 및 연산자를 표시할 DOM 요소
const input_num = document.getElementById("result");        //결과 표시창
const input_op = document.getElementById("operator");        //입력 진행 상황 표시창


//버튼 이벤트 자동 연결
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-onclick]").forEach((btn) => {
        const handlerName = btn.dataset.onclick;                        // 속성 값 = 함수 이름
            if (typeof window[handlerName] === "function") {
                btn.addEventListener("click", window[handlerName]);     //버튼 클릭 시 해당 함수 실행
            }
        }
    );
})

//버튼 클릭 시 동작하는 함수
function setButtons(e) {

    if(e.target.id === "op") {
        if(output === "") return        //아무것도 입력하지 않았을 경우
        switch(e.target.value) {
            case "ce":                  //초기화
                output = ""
                break

            case "equal":               //"=" 버튼
                try {
                    output = new Function(`return ${output}`)();            //자바스크립트로 문자열 계산
                } catch(error) {
                    alert("올바른 수식을 입력하세요.");
                    console.error("Error evaluating expression:", error);
                } 
                break
            
            default:        //그 외 연산 (+,-,*,/,%,√)
                const operatorMap = operatorConverter();
                if (operatorMap[e.target.value]) {
                    output += operatorMap[e.target.value];              //변환된 연산자 추가
                } else {
                    // 잘못된 연산자 처리
                    alert("올바른 연산자를 입력하세요.");
                    console.error("Invalid operator:", e.target.value);
                    return;
                }
        }
    } else {
        //숫자 버튼 입력 시
        // 00 또는 0이 처음에 입력되는 경우는 무시
        if(output === "" && (e.target.value === "00" || e.target.value === "0") ) {
            return;
        }
        output += e.target.value;       //숫자 추가 시
    }

    document.getElementById("output").innerHTML = output;
}


const operatorConverter = () => {
    // 연산자 변환 함수
    const operatorMap = {
        "plus": "+",
        "sub": "-",
        "mul": "*",
        "div": "/",
        "mod": "%",
        "sqrt": "**",       //제곱 (√ 버튼을 거듭제곱 표현으로 변환)
        "equal": "=",
        "dot": "."
    };
    return operatorMap;
}