const questions = [
    { 
        question: "What Patient’s expectations from PsO systemic treatment to deliver", 
        answer: [16, 33],
        min1: 0,
        min2: 0,
        max1: 60,
        max2: 120,
        image: "./images/q1.png",

        label1: "50% improvement",
        label2: "100% improvement",
        type: "persons"
    },
    { 
        question: "Taltz improved mean PASI score by ….% by week 2.", 
        answer: [60],
        min1: 0,
        max1: 100,
        image: "./images/q2.png",
        type: "circles"
    },
    { 
        question: "What Patient’s expectations from PsO systemic treatment to deliver", 
        answer: [7, 9],
        min1: 0,
        max1: 10,
        min2: 0,
        max2: 10,
        image: "./images/q3.png",
        title1: "Complete skin clearance (PASI 100)",
        title2: "Almost complete skin clearance (PASI 90)",
        type: "circles"
    },
    { 
        question: "In the PSoHO study, how would the durability of Taltz compare to other treatment options like Risankizumab and Secukinumab?", 
        answer: [40.4],
        min1: 0,
        max1: 100,
        image: "./images/q4.png",
        type: "circles"
    },
    { 
        question: "In IXORA-R study, what percentage of patients achieved complete nail clearance with Taltz compared to Guselkumab at 6 months?", 
        answer: [6, 4],
        min1: 0, 
        max1: 10,
        min2: 0,
        max2: 10,
        title1: "Taltz",
        title2: "Guselkumab",
        image: "./images/q5.png",
        type: "persons"
    },
    { 
        question: "Out of 10 patients, how many experienced no radiographic changes over a 3-year journey with Taltz?", 
        answer: [7],
        min1: 0, 
        max1: 10,
        image: "./images/q6.png",
        type: "persons"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;

    // Set up the first slider
    document.getElementById('range1').min = currentQuestion.min1; 
    document.getElementById('range1').max = currentQuestion.max1; 
    document.getElementById('range1').value = 0;

    updateSliderValue(document.getElementById('range1'), document.getElementById('sliderValue1'));

    // Set the labels for the first slider
   // Update labels with min and max values
   document.getElementById('startLabel').textContent = (currentQuestion.min1 === 0 && currentQuestion.max1 === 100) ? `${currentQuestion.min1}%` : `${currentQuestion.min1}`;
   document.getElementById('endLabel').textContent = (currentQuestion.min1 === 0 && currentQuestion.max1 === 100) ? `${currentQuestion.max1}%` : `${currentQuestion.max1}`;

    document.getElementById('label1').textContent = currentQuestion.label1 || '';
    document.getElementById('title1').textContent = currentQuestion.title1 || '';

    // Check if there is a second slider
    if (currentQuestion.answer.length > 1) {
        document.getElementById('secondSliderContainer').style.display = 'block';
        document.getElementById('range2').min = currentQuestion.min2; 
        document.getElementById('range2').max = currentQuestion.max2; 
        document.getElementById('range2').value = 0;
        updateSliderValue(document.getElementById('range2'), document.getElementById('sliderValue2'));

       // Update labels with min and max values
    document.getElementById('startLabel2').textContent = (currentQuestion.min2 === 0 && currentQuestion.max2 === 100) ? `${currentQuestion.min2}%` : `${currentQuestion.min2}`;
    document.getElementById('endLabel2').textContent = (currentQuestion.min2 === 0 && currentQuestion.max2 === 100) ? `${currentQuestion.max2}%` : `${currentQuestion.max2}`;

        document.getElementById('label2').textContent = currentQuestion.label2 || '';
        document.getElementById('title2').textContent = currentQuestion.title2 || '';
    } else {
        document.getElementById('secondSliderContainer').style.display = 'none';
    }

    updatePersonIcons(0, 20); // Initialize person icons for the first slider
    updatePersonIcons2(0, 20); // Initialize for the second slider if it exists
}

function updateSliderValue(slider, display) {
    const value = slider.value;
    display.textContent = `${value}${slider.max == 100 ? '%' : ''}`;
    
    // Calculate the position for the display
    const percentage = (value - slider.min) / (slider.max - slider.min) * 100;
    display.style.left = `${percentage}%`;
}

document.getElementById('range1').addEventListener('input', function() {
    updateSliderValue(this, document.getElementById('sliderValue1'));
    updatePersonIcons(this.value, 20); // Update person icons when the slider moves
});

document.getElementById('range2').addEventListener('input', function() {
    updateSliderValue(this, document.getElementById('sliderValue2'));
    updatePersonIcons2(this.value, 20); // Update the second slider's icons
});

function updatePersonIcons(value, totalIcons) {
    const min = parseFloat(document.getElementById('range1').min);
    const max = parseFloat(document.getElementById('range1').max);
    const range = max - min;
    
    const iconsPerUnit = range / totalIcons;
    const iconCount = Math.floor((value - min) / iconsPerUnit);
    
    const icons = document.querySelectorAll('.icon-person');
    icons.forEach((icon, index) => {
        if (index < iconCount) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });
}

function updatePersonIcons2(value, totalIcons) {
    const min = parseFloat(document.getElementById('range2').min);
    const max = parseFloat(document.getElementById('range2').max);
    const range = max - min;
    
    const iconsPerUnit = range / totalIcons;
    const iconCount = Math.floor((value - min) / iconsPerUnit);
    
    const icons = document.querySelectorAll('.icon-person2');
    icons.forEach((icon, index) => {
        if (index < iconCount) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });
}

document.getElementById('submit').addEventListener('click', function() {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer1 = parseFloat(document.getElementById('range1').value);
    const correctAnswer1 = currentQuestion.answer[0];

    let isCorrect = Math.abs(userAnswer1 - correctAnswer1) <= 5; // Check first answer validity

    let correctAnswerText = `Correct answer: ${correctAnswer1}`;
    if (currentQuestion.max1 === 100) {
        correctAnswerText += "%"; // Append % if the range is from 0 to 100
    }

    if (currentQuestion.answer.length > 1) {
        const userAnswer2 = parseFloat(document.getElementById('range2').value);
        const correctAnswer2 = currentQuestion.answer[1];
        isCorrect = isCorrect && Math.abs(userAnswer2 - correctAnswer2) <= 5;
        correctAnswerText += ` & ${correctAnswer2}`;
        if (currentQuestion.max2 === 100) {
            correctAnswerText += "%";
        }
    }

    document.getElementById('modal-text').innerHTML = isCorrect 
        ? 'Correct answer!'
        : `Oh! <br><span style="color: green;">${correctAnswerText}</span>`;
    document.getElementById('modal-img').src = isCorrect ? "./images/like.png" : "./images/sad.png";

    if (currentQuestion.image) {
        document.getElementById("modal-img2").src = currentQuestion.image;
        document.getElementById("modal-img2").style.display = "block";
    } else {
        document.getElementById("modal-img2").style.display = "none";
    }

    document.getElementById('modal').style.display = 'block';
});

document.getElementById("modal-btn").addEventListener("click", function() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++; // Move to the next question
        loadQuestion();
    } else {
        
        window.location.href = "restart.html"; 
    }
    document.getElementById('modal').style.display = 'none'; 
});

loadQuestion();

// last version