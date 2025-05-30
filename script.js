// Задание 1: Адаптивная страница
function setupAdaptivePage() {
    const container = document.getElementById('task1');
    container.innerHTML = '<h2>1. Адаптивная страница</h2><div id="adaptiveContent"></div>';
    
    const content = document.getElementById('adaptiveContent');
    
    function updateLayout() {
        const width = window.innerWidth;
        
        if (width < 768) {
            content.innerHTML = '<p>Мобильная версия (width: ' + width + 'px)</p>';
            document.body.style.backgroundColor = '#FFF3E0';
        } else {
            content.innerHTML = '<p>Десктопная версия (width: ' + width + 'px)</p>';
            document.body.style.backgroundColor = '#E3F2FD';
        }
    }

    window.addEventListener('load', updateLayout);
    window.addEventListener('resize', updateLayout);
}

// Задание 2: Геолокация
function setupGeolocation() {
    const container = document.getElementById('task2');
    container.innerHTML = `
        <h2>2. Геолокация</h2>
        <button id="geoBtn">Получить местоположение</button>
        <div id="map" style="height:200px; border:1px solid #ccc; margin:10px 0;"></div>
    `;
    
    document.getElementById('geoBtn').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                alert(`Широта: ${position.coords.latitude}\nДолгота: ${position.coords.longitude}`);
            });
        } else {
            alert("Геолокация не поддерживается");
        }
    });
}

// Задание 3: История переходов
function setupHistoryNavigation() {
    const container = document.getElementById('task3');
    container.innerHTML = `
        <h2>3. История переходов</h2>
        <div id="navButtons" style="margin:10px 0;"></div>
        <div id="pages"></div>
    `;
    
    const navButtons = document.getElementById('navButtons');
    const pagesContainer = document.getElementById('pages');
    
    for (let i = 1; i <= 3; i++) {
        const btn = document.createElement('button');
        btn.textContent = `Страница ${i}`;
        btn.addEventListener('click', () => showPage(i));
        navButtons.appendChild(btn);
    }
    
    for (let i = 1; i <= 3; i++) {
        const page = document.createElement('div');
        page.id = `page${i}`;
        page.innerHTML = `<h3>Содержимое страницы ${i}</h3>`;
        page.style.display = i === 1 ? 'block' : 'none';
        pagesContainer.appendChild(page);
    }
    
    function showPage(pageNum) {
        document.querySelectorAll('#pages > div').forEach(page => {
            page.style.display = 'none';
        });
        
        document.getElementById(`page${pageNum}`).style.display = 'block';
        
        // Добавляем запись в историю
        history.pushState({ page: pageNum }, '', `?page=${pageNum}`);
    }
    
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page) {
            showPage(event.state.page);
        }
    });
}

// Задание 4: Анализ браузера
function setupBrowserAnalysis() {
    const container = document.getElementById('task4');
    container.innerHTML = `
        <h2>4. Анализ браузера</h2>
        <button id="checkBtn">Проверить браузер</button>
        <div id="browserInfo" style="margin:10px 0;"></div>
    `;
    
    document.getElementById('checkBtn').addEventListener('click', function() {
        const features = {
            'WebGL': !!window.WebGLRenderingContext,
            'Геолокация': !!navigator.geolocation,
            'LocalStorage': !!window.localStorage,
            'Cookies': navigator.cookieEnabled,
            'Online': navigator.onLine
        };
        
        let info = '<h3>Поддержка технологий:</h3><ul>';
        for (const [name, supported] of Object.entries(features)) {
            info += `<li>${name}: ${supported ? '✅' : '❌'}</li>`;
        }
        info += '</ul>';
        
        info += `<p><strong>User Agent:</strong> ${navigator.userAgent}</p>`;
        
        document.getElementById('browserInfo').innerHTML = info;
    });
}

// Задание 5: Модальные окна
function setupModals() {
    const container = document.getElementById('task5');
    container.innerHTML = `
        <h2>5. Модальные окна</h2>
        <button id="showModalBtn">Показать модальное окно</button>
        <div id="modal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; border:1px solid #ccc; z-index:1000;">
            <h3>Пример модального окна</h3>
            <p>Это тестовое модальное окно</p>
            <button id="closeModalBtn">Закрыть</button>
        </div>
        <div id="modalOverlay" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:999;"></div>
    `;
    
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('showModalBtn').addEventListener('click', function() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });
    
    document.getElementById('closeModalBtn').addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
    
    setTimeout(() => {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    setupAdaptivePage();
    setupGeolocation();
    setupHistoryNavigation();
    setupBrowserAnalysis();
    setupModals();
});