document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const numbersDisplay = document.querySelectorAll('.number');
    const historyList = document.getElementById('history-list');

    function getRandomColor() {
        const colors = ['#fbc400', '#69c8f2', '#ff7272', '#aaa', '#b0d840'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function generateLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers.sort((a, b) => a - b);
    }

    function updateDisplay(numbers) {
        numbersDisplay.forEach((el, index) => {
            el.textContent = numbers[index];
            el.style.backgroundColor = getBallColor(numbers[index]);
            el.style.color = '#fff';
            el.style.transform = 'scale(1.2)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 200);
        });
    }

    function getBallColor(num) {
        if (num <= 10) return '#fbc400'; // Yellow
        if (num <= 20) return '#69c8f2'; // Blue
        if (num <= 30) return '#ff7272'; // Red
        if (num <= 40) return '#aaa';    // Grey
        return '#b0d840';                // Green
    }

    function addToHistory(numbers) {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = numbers.map(num => `<span class="small-ball" style="background-color: ${getBallColor(num)}">${num}</span>`).join('');
        historyList.prepend(li);
        
        // Keep only last 10
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }

    generateBtn.addEventListener('click', () => {
        const numbers = generateLottoNumbers();
        updateDisplay(numbers);
        addToHistory(numbers);
    });
});
