// Função para alternar entre as abas
document.querySelectorAll('.tab-link').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const tab = button.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tab).classList.add('active');
    });
});

// Variáveis globais para armazenar dados
let totalPontos = 0;
let totalTreinamentos = 0;
let pontoHistoryData = [];
let trainingHistoryData = [];

// Registrar Ponto
document.getElementById('markPonto').addEventListener('click', () => {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('lastPonto').textContent = currentTime;
    pontoHistoryData.push(`Ponto registrado às ${currentTime}`);
    totalPontos++;
    updateFeedback('pontoFeedback', `Ponto registrado com sucesso às ${currentTime}`, true);
    updateDashboard();
    updatePontoHistory();
});

// Limpar Histórico de Pontos
document.getElementById('clearHistory').addEventListener('click', () => {
    pontoHistoryData = [];
    document.getElementById('pontoHistory').innerHTML = '';
    document.getElementById('lastPonto').textContent = 'Nenhum ponto registrado';
    totalPontos = 0;
    updateDashboard();
});

// Atualizar Histórico de Pontos
function updatePontoHistory() {
    const pontoHistory = document.getElementById('pontoHistory');
    pontoHistory.innerHTML = '';
    pontoHistoryData.forEach(ponto => {
        const newPontoDiv = document.createElement('div');
        newPontoDiv.innerHTML = `<p>${ponto}</p>`;
        pontoHistory.appendChild(newPontoDiv);
    });
}

// Adicionar Novo Curso
document.getElementById('addCourse').addEventListener('click', () => {
    const newCourseName = document.getElementById('newCourseName').value.trim();
    if (newCourseName) {
        const availableTrainings = document.getElementById('availableTrainings');
        const existingCourses = Array.from(availableTrainings.querySelectorAll('li span')).map(span => span.textContent);
        if (existingCourses.includes(newCourseName)) {
            updateFeedback('courseFeedback', 'Curso já adicionado.', false);
            return;
        }

        const newTrainingItem = document.createElement('li');
        newTrainingItem.innerHTML = `<span>${newCourseName}</span>
                                     <button class="concluir-btn main-button">Concluir</button>`;
        availableTrainings.appendChild(newTrainingItem);
        trainingHistoryData.push(newCourseName);
        newTrainingItem.querySelector('.concluir-btn').addEventListener('click', () => {
            const completedTrainings = document.getElementById('completedTrainings');
            completedTrainings.appendChild(newTrainingItem);
            newTrainingItem.querySelector('.concluir-btn').remove();
            totalTreinamentos++;
            updateDashboard();
            updateTrainingProgress();
        });

        document.getElementById('newCourseName').value = '';
        updateFeedback('courseFeedback', 'Curso adicionado com sucesso!', true);
    } else {
        updateFeedback('courseFeedback', 'Por favor, insira o nome do curso.', false);
    }
});

// Atualizar Progresso nos Treinamentos
function updateTrainingProgress() {
    const progressPercentage = (totalTreinamentos / trainingHistoryData.length) * 100;
    document.getElementById('trainingProgress').style.width = `${progressPercentage}%`;
    document.getElementById('trainingProgress').textContent = `${progressPercentage.toFixed(0)}% Concluído`;
}

// Atualiza as estatísticas do Dashboard
function updateDashboard() {
    document.getElementById('totalPontos').textContent = totalPontos;
    document.getElementById('totalTreinamentos').textContent = totalTreinamentos;
}

// Gráfico de Progresso
const ctx = document.getElementById('progressChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Pontos Registrados', 'Treinamentos Concluídos'],
        datasets: [{
            label: 'Progresso',
            data: [totalPontos, totalTreinamentos],
            backgroundColor: ['#0077b6', '#28a745']
        }]
    },
    options: {
        responsive: true,
    }
});

// Alternar entre modo claro e escuro
document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Alterna a classe dark-mode no body
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.getElementById('toggleTheme').textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro'; // Atualiza o texto do botão

    // Adiciona classe dark-mode a outros elementos
    document.querySelectorAll('.main-button, .tab-link, .history-container, .input-field, .stat-card, .tabs').forEach(element => {
        element.classList.toggle('dark-mode');
    });
});






// Atualiza o relógio em tempo real
function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Função para atualizar feedback
function updateFeedback(elementId, message, isSuccess) {
    const feedbackElement = document.getElementById(elementId);
    feedbackElement.textContent = message;
    feedbackElement.className = 'feedback-message';
    feedbackElement.classList.add(isSuccess ? 'success' : 'error');
}
