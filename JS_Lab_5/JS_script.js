function firstfun(num) {
    return Number(String(num).split('').reverse().join(''));
}

function secondfunc(num){
    const seen = new Set();
    let res = "";
    for (const ch of String(num)){
        if (!seen.has(ch)) {seen.add(ch); res += ch}
    }
    return Number(res)
}
function thritefunc(num, ch){
    let count = 0;
    for (const i of String(num)) if(i === String(ch)) count++;
    return count;
}
function longestBinaryFunc(num) {
    // Проверяем, что число корректное
    num = Number(num);
    if (isNaN(num)) {
        return { binary: "Ошибка", maxLen: 0 };
    }
    
    const bin = (num >>> 0).toString(2);
    let max = 0, cur = 0, last = '';
    
    for (const ch of bin) {
        cur = (ch === last) ? cur + 1 : 1;
        last = ch;
        if (cur > max) max = cur;
    }
    
    return { binary: bin, maxLen: max };
}

document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.getElementById("button1");
    const btn2 = document.getElementById("button2");
    const btn3 = document.getElementById("button3");
    const btn4 = document.getElementById("button4");
    
    if (btn1) {
        btn1.addEventListener("click", () => {
            const num = document.getElementById("input1").value;
            const result = firstfun(num);
            alert(result);
        });
    }
    
    if (btn2) {
        btn2.addEventListener("click", () => {
            const num = document.getElementById("input2").value;
            const result = secondfunc(num);
            alert(result);
        });
    }
    
    if (btn3) {
        btn3.addEventListener("click", () => {
            const num = document.getElementById("input3").value;
            const ch = document.getElementById("input3.1").value;
            const result = thritefunc(num, ch);
            alert(`Цифра "${ch}" встречается ${result} раз(а)`);
        });
    }
    
    if (btn4) {
        btn4.addEventListener("click", () => {
            const inputVal = document.getElementById("input4").value;
            
            if (!inputVal || inputVal.trim() === "") {
                alert("Введите число!");
                return;
            }
            
            const result = longestBinaryFunc(inputVal);
            
            // Проверяем, что результат — объект
            if (result && result.binary !== undefined && result.maxLen !== undefined) {
                alert(`Двоичная запись: ${result.binary}\nМакс. последовательность: ${result.maxLen}`);
            } else {
                alert("Ошибка вычисления");
            }
        });
    }
});