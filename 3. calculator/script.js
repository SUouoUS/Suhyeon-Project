let output = "" // 표시 전용

const input_num = document.getElementById("result");
const input_op = document.getElementById("operator");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-onclick]").forEach((btn) => {
        const handlerName = btn.dataset.onclick; // 속성 값 = 함수 이름
            if (typeof window[handlerName] === "function") {
                btn.addEventListener("click", window[handlerName]);
            }
        }
    );
})

function setButtons(e) {

    if(e.target.id === "op") {
        if(output === "") return
        switch(e.target.value) {
            case "ce":
                output = ""
                break

            case "equal":
                try {
                    output = new Function(`return ${output}`)();
                } catch(error) {
                    alert("올바른 수식을 입력하세요.");
                    console.error("Error evaluating expression:", error);
                } 
                break
            
            default:
                const operatorMap = operatorConverter();
                if (operatorMap[e.target.value]) {
                    output += operatorMap[e.target.value];
                } else {
                    // 잘못된 연산자 처리
                    alert("올바른 연산자를 입력하세요.");
                    console.error("Invalid operator:", e.target.value);
                    return;
                }
        }
    } else {
        // 00 또는 0이 처음에 입력되는 경우는 무시
        if(output === "" && (e.target.value === "00" || e.target.value === "0") ) {
            return;
        }
        output += e.target.value;
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
        "sqrt": "**",
        "equal": "=",
        "dot": "."
    };
    return operatorMap;
}