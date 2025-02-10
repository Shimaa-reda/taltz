const questions = [
   
    
    { 
        question: "What Patient’s expectations from PsO systemic treatment to deliver ? ", 
        answer: [16, 33],
        min1: 0,
        min2: 0,
        max1: 60,
        max2: 120,
        image: "./images/q1.png",
        label1: "50% improvement",
        label2: "100% improvement",
        type: "circles"
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
        question: "How many patients will maintain the following efficacy endpoints on Taltz over 5 Year?", 
        answer: [7, 9],
        min1: 0,
        max1: 10,
        min2: 0,
        max2: 10,
        image: "./images/q3.png",
        label1: "Complete skin clearance (PASI 100)",
        label2: "Almost complete skin clearance (PASI 90)",
        type: "persons"
    },
    { 
        question: "In the PSoHO study, how would the durability* of Taltz compare to other treatment options like Risankizumab and Secukinumab ?", 
        answer: [40.4,35.4,32.4],
        min1: 0,
        max1: 100,
        min2: 0,
        max2: 100,
        min3: 0,
        max3: 100,
        image: "./images/q4.png",
        label1: "Taltz",
        label2: "Risankizumab",
        label3:"Secukinumab",
        type: "circles",
        note:"* durability is defined as having a rapid and lasting response that was measured by % of patients achieving PASI 90 at week 12, and maintained it at week 24 and 52"

    },
    { 
        question: "In IXORA-R study, what percentage of patients achieved complete nail clearance with Taltz compared to Guselkumab at 6 months ?", 
        answer: [6, 4],
        min1: 0, 
        max1: 10,
        min2: 0,
        max2: 10,
        label1: "Taltz",
        label2: "Guselkumab",
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

    // Update labels for the first slider
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
        document.getElementById('startLabel2').textContent = (currentQuestion.min2 === 0 && currentQuestion.max2 === 100) ? `${currentQuestion.min2}%` : `${currentQuestion.min2}`;
        document.getElementById('endLabel2').textContent = (currentQuestion.min2 === 0 && currentQuestion.max2 === 100) ? `${currentQuestion.max2}%` : `${currentQuestion.max2}`;
    
        document.getElementById('label2').textContent = currentQuestion.label2 || '';
        document.getElementById('title2').textContent = currentQuestion.title2 || '';
    } else {
        document.getElementById('secondSliderContainer').style.display = 'none';
    }

    // Check if there is a third slider
    if (currentQuestion.answer.length > 2) {
        document.getElementById('thirdSliderContainer').style.display = 'block';
        document.getElementById('range3').min = currentQuestion.min3 || 0; 
        document.getElementById('range3').max = currentQuestion.max3 || 100; 
        document.getElementById('range3').value = 0;
        updateSliderValue(document.getElementById('range3'), document.getElementById('sliderValue3'));
        document.getElementById('startLabel3').textContent = (currentQuestion.min3 === 0 && currentQuestion.max3 === 100) ? `${currentQuestion.min3}%` : `${currentQuestion.min3}`;
        document.getElementById('endLabel3').textContent = (currentQuestion.min3 === 0 && currentQuestion.max3 === 100) ? `${currentQuestion.max3}%` : `${currentQuestion.max3}`;
    
        document.getElementById('label3').textContent = currentQuestion.label3 || '';
        document.getElementById('title3').textContent = currentQuestion.title3 || '';
    } else {
        document.getElementById('thirdSliderContainer').style.display = 'none';
    }

    // Generate icons based on the type and number of answers
    generateIcons(currentQuestion.type, 'icon-person', '.slider-container');
    if (currentQuestion.answer.length > 1) {
        generateIcons(currentQuestion.type, 'icon-person2', '#secondSliderContainer');
    }
    if (currentQuestion.answer.length > 2) {
        generateIcons(currentQuestion.type, 'icon-person3', '#thirdSliderContainer');
    }
}

function generateIcons(type, iconClass, containerSelector) {
    const container = document.querySelector(containerSelector);
    const existingIcons = container.querySelectorAll(`.${iconClass}`);
    
    // Remove existing icons
    existingIcons.forEach(icon => icon.remove());

    const totalIcons = 20; // Limit to 20 icons per slider
    for (let i = 0; i < totalIcons; i++) {
        const icon = document.createElement('i');
        if (type === "circles") {
            icon.className = `fa-solid fa-circle ${iconClass}`; // Use circle icons for circle type
        } else {
            icon.className = `fa-solid fa-person ${iconClass}`; // Use person icons for person type
        }
        container.appendChild(icon);
    }
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
// Add event listener for the third slider
document.getElementById('range3').addEventListener('input', function() {
    updateSliderValue(this, document.getElementById('sliderValue3'));
    updatePersonIcons3(this.value, 20); // Update the third slider's icons
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
// Function to update icons based on the third slider value
function updatePersonIcons3(value, totalIcons) {
    const min = parseFloat(document.getElementById('range3').min);
    const max = parseFloat(document.getElementById('range3').max);
    const range = max - min;
    
    const iconsPerUnit = range / totalIcons;
    const iconCount = Math.floor((value - min) / iconsPerUnit);
    
    const icons = document.querySelectorAll('.icon-person3');
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
    if (currentQuestion.answer.length > 2) {
        const userAnswer3 = parseFloat(document.getElementById('range3').value);
        const correctAnswer3 = currentQuestion.answer[2];

        isCorrect = isCorrect && Math.abs(userAnswer3 - correctAnswer3) <= 5;
        correctAnswerText += ` & ${correctAnswer3}`;
        if (currentQuestion.max3 === 100) {
            correctAnswerText += "%";
        }
    }

    document.getElementById('modal-text').innerHTML = isCorrect 
    ? '<span style="color: #49A942; font-weight:bold">Correct answer!</span> '
    : `<span style="color: red; font-weight:bold">Oh!</span><br><br><span style="color: green;">${correctAnswerText}</span>`;

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