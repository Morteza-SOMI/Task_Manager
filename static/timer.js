document.addEventListener('DOMContentLoaded', function() {
    const taskIcons = document.querySelectorAll('.task-icon');
    const taskDetails = document.getElementById('task-details');
    const taskTitle = document.getElementById('task-title');
    const taskDescription = document.getElementById('task-description');
    const taskDeadline = document.getElementById('task-deadline');
    const taskTimer = document.getElementById('task-timer');
    const taskStartButton = document.getElementById('task-start');
    const taskStopButton = document.getElementById('task-stop');
    const taskEditButton = document.getElementById('task-edit');
    const taskDeleteButton = document.getElementById('task-delete');
    const timers = {};
    let totalSeconds = 0;
    const totalTimeElement = document.getElementById('total-time');

    taskIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const taskId = icon.dataset.taskId;
            const taskElement = {
                id: taskId,
                title: icon.querySelector('h5').textContent,
                description: icon.dataset.description,
                deadline: icon.dataset.deadline
            };

            taskTitle.textContent = taskElement.title;
            taskDescription.textContent = taskElement.description;
            taskDeadline.textContent = `Deadline: ${taskElement.deadline}`;
            taskTimer.textContent = '00:00:00';
            taskDetails.classList.remove('hidden');

            taskStartButton.dataset.taskId = taskId;
            taskStopButton.dataset.taskId = taskId;
            taskEditButton.onclick = () => location.href = `/edit/${taskId}`;
            taskDeleteButton.onclick = () => location.href = `/delete/${taskId}`;
        });
    });

    taskStartButton.addEventListener('click', function() {
        const taskId = taskStartButton.dataset.taskId;

        for (const id in timers) {
            if (timers[id].interval) {
                clearInterval(timers[id].interval);
                timers[id].interval = null;
            }
        }

        if (!timers[taskId]) {
            timers[taskId] = { seconds: 0, interval: null };
        }
        timers[taskId].interval = setInterval(() => {
            timers[taskId].seconds++;
            updateTimerDisplay(taskId);
            updateTotalTime();
        }, 1000);
    });

    taskStopButton.addEventListener('click', function() {
        const taskId = taskStopButton.dataset.taskId;
        if (timers[taskId] && timers[taskId].interval) {
            clearInterval(timers[taskId].interval);
            timers[taskId].interval = null;
        }
    });

    function updateTimerDisplay(taskId) {
        const timerElement = taskTimer;
        const hours = Math.floor(timers[taskId].seconds / 3600);
        const minutes = Math.floor((timers[taskId].seconds % 3600) / 60);
        const seconds = timers[taskId].seconds % 60;
        timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateTotalTime() {
        totalSeconds = 0;
        for (const taskId in timers) {
            totalSeconds += timers[taskId].seconds;
        }
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        totalTimeElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
});
