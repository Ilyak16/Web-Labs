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
function Fifthfunc
(str) {
    const freq = {};
    for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
    for (const ch of str) if (freq[ch] === 1) return ch;
    return 'Все повторяются';
}

function Sixthfunc(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let res = '';
    for (let i = 0; i < length; i++) res += chars[Math.floor(Math.random() * chars.length)];
    return res;
}

function Seventhfunc(str) {
    return [...new Set(str)].join('');
}

document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.getElementById("button1");
    const btn2 = document.getElementById("button2");
    const btn3 = document.getElementById("button3");
    const btn4 = document.getElementById("button4");
    const btn5 = document.getElementById("button5");
    const btn6 = document.getElementById("button6");
    const btn7 = document.getElementById("button7");
    
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
    if (btn5) {
        btn5.addEventListener("click", () =>{
            const string = document.getElementById("input5").value;
            const result = Fifthfunc(string);
            alert(result);
        });
    }
    if (btn6) {
        btn6.addEventListener("click", () =>{
            const len = document.getElementById("input6").value;
            const result = Sixthfunc(len);
            alert(result);
        });
    }
    if (btn7) {
        btn7.addEventListener("click", () =>{
            const string = document.getElementById("input7").value;
            const result = Seventhfunc(string);
            alert(result);
        });
    }
});