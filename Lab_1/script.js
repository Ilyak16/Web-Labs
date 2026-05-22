// script.js - Интерактивная карта Швеции + карусель + анимации

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ДАННЫЕ О ПОГОДЕ ДЛЯ ВСЕХ РЕГИОНОВ ШВЕЦИИ ====================
    const weatherData = {
        'sm_state_SEC': { name: 'Уппсала', temp: '+11°C', condition: '☀️ Солнечно', humidity: '63%', desc: 'Отличный день для экскурсий' },
        'sm_state_SED': { name: 'Сёдерманланд', temp: '+12°C', condition: '☀️ Солнечно', humidity: '64%', desc: 'Прекрасная погода для прогулок' },
        'sm_state_SEE': { name: 'Эстергётланд', temp: '+10°C', condition: '⛅ Облачно', humidity: '68%', desc: 'Комфортная температура' },
        'sm_state_SEF': { name: 'Йёнчёпинг', temp: '+9°C', condition: '⛅ Облачно', humidity: '70%', desc: 'Прохлада и свежесть' },
        'sm_state_SEG': { name: 'Крунуберг', temp: '+8°C', condition: '🌤️ Переменная облачность', humidity: '72%', desc: 'Уютная атмосфера' },
        'sm_state_SEH': { name: 'Кальмар', temp: '+10°C', condition: '🌤️ Ясно', humidity: '66%', desc: 'Хорошая видимость' },
        'sm_state_SEI': { name: 'Готланд', temp: '+9°C', condition: '🌬️ Ветрено', humidity: '75%', desc: 'Свежий морской бриз' },
        'sm_state_SEK': { name: 'Блекинге', temp: '+11°C', condition: '☀️ Солнечно', humidity: '65%', desc: 'Идеально для пляжного отдыха' },
        'sm_state_SEM': { name: 'Сконе', temp: '+12°C', condition: '☀️ Солнечно', humidity: '62%', desc: 'Тёплый южный регион' },
        'sm_state_SEN': { name: 'Халланд', temp: '+10°C', condition: '⛅ Облачно', humidity: '70%', desc: 'Западное побережье' },
        'sm_state_SEO': { name: 'Вестра-Гёталанд', temp: '+9°C', condition: '🌧️ Небольшой дождь', humidity: '78%', desc: 'Не забудьте зонт' },
        'sm_state_SES': { name: 'Вермланд', temp: '+8°C', condition: '🌧️ Дождь', humidity: '80%', desc: 'Лесной край' },
        'sm_state_SET': { name: 'Эребру', temp: '+10°C', condition: '⛅ Облачно', humidity: '70%', desc: 'Центральный регион' },
        'sm_state_SEU': { name: 'Вестманланд', temp: '+11°C', condition: '☀️ Солнечно', humidity: '65%', desc: 'Исторический регион' },
        'sm_state_SEW': { name: 'Даларна', temp: '+7°C', condition: '⛅ Облачно', humidity: '72%', desc: 'Горы и озёра' },
        'sm_state_SEX': { name: 'Евлеборг', temp: '+8°C', condition: '🌤️ Переменная облачность', humidity: '70%', desc: 'Восточное побережье' },
        'sm_state_SEY': { name: 'Вестерноррланд', temp: '+6°C', condition: '🌫️ Туман', humidity: '82%', desc: 'Таинственная атмосфера' },
        'sm_state_SEZ': { name: 'Емтланд', temp: '+5°C', condition: '❄️ Снег', humidity: '85%', desc: 'Зимние развлечения' },
        'sm_state_SEAC': { name: 'Вестерботтен', temp: '+3°C', condition: '❄️ Снег', humidity: '88%', desc: 'Северный регион' },
        'sm_state_SEBD': { name: 'Норрботтен', temp: '+2°C', condition: '❄️ Мороз', humidity: '90%', desc: 'Самый северный регион, возможно северное сияние' }
    };

    // ==================== КАРТА ШВЕЦИИ ====================
    const swedenMap = {
        paths: document.querySelectorAll('path[class*="sm_state"]'),
        weatherBox: document.getElementById('weatherInfo'),
        selectedPath: null,

        init() {
            this.addEventListeners();
            console.log('✅ Карта Швеции инициализирована');
        },

        addEventListeners() {
            this.paths.forEach(path => {
                // Сохраняем оригинальные стили
                path.dataset.originalFill = path.getAttribute('fill') || '#88a4bc';
                path.dataset.originalStroke = path.getAttribute('stroke') || '#ffffff';

                // Hover эффект
                path.addEventListener('mouseenter', (e) => this.onRegionHover(e));
                path.addEventListener('mouseleave', () => this.onRegionLeave());
                
                // Клик по региону
                path.addEventListener('click', (e) => this.onRegionClick(e));
                
                // Touch для мобильных
                path.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.onRegionClick(e);
                }, { passive: false });

                // Курсор-указатель
                path.style.cursor = 'pointer';
                path.style.transition = 'all 0.3s ease';
            });
        },

        getRegionClass(path) {
            // Извлекаем класс региона (например, sm_state_SEC)
            const classes = path.className.baseVal || path.getAttribute('class') || '';
            const match = classes.match(/sm_state_[A-Z]{3,4}/);
            return match ? match[0] : null;
        },

        onRegionHover(e) {
            const path = e.target;
            const regionClass = this.getRegionClass(path);
            const data = weatherData[regionClass];

            // Подсветка при наведении
            if (!this.selectedPath || this.selectedPath === path) {
                path.setAttribute('fill', '#00a8e8');
                path.setAttribute('stroke', '#ffd700');
                path.setAttribute('stroke-width', '3');
                path.style.filter = 'drop-shadow(0 0 12px rgba(0, 168, 232, 0.9))';
            }

            // Показываем погоду
            if (data) {
                this.showWeather(data);
            } else {
                this.showDefaultWeather();
            }
        },

        onRegionLeave() {
            if (!this.selectedPath) {
                this.paths.forEach(path => {
                    path.setAttribute('fill', path.dataset.originalFill);
                    path.setAttribute('stroke', path.dataset.originalStroke);
                    path.setAttribute('stroke-width', '1.5');
                    path.style.filter = 'none';
                });
                this.showDefaultWeather();
            }
        },

        onRegionClick(e) {
            const path = e.target;
            const regionClass = this.getRegionClass(path);
            const data = weatherData[regionClass];

            // Снимаем выделение с предыдущего
            if (this.selectedPath && this.selectedPath !== path) {
                this.selectedPath.setAttribute('fill', this.selectedPath.dataset.originalFill);
                this.selectedPath.setAttribute('stroke', this.selectedPath.dataset.originalStroke);
                this.selectedPath.setAttribute('stroke-width', '1.5');
                this.selectedPath.style.filter = 'none';
                this.selectedPath.classList.remove('selected');
            }

            // Выделяем текущий
            path.setAttribute('fill', '#ff6b6b');
            path.setAttribute('stroke', '#ffd700');
            path.setAttribute('stroke-width', '3');
            path.style.filter = 'drop-shadow(0 0 15px rgba(255, 107, 107, 0.95))';
            path.classList.add('selected');
            
            this.selectedPath = path;

            // Показываем детальную информацию
            if (data) {
                this.showDetailedInfo(data);
            }

            // Плавная прокрутка к карте
            document.getElementById('map')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        },

        showWeather(data) {
            if (!this.weatherBox) return;
            this.weatherBox.innerHTML = `
                <div class="weather-brief">
                    <strong>📍 ${data.name}</strong><br>
                    <span class="temp">${data.temp}</span> 
                    <span class="condition">${data.condition}</span><br>
                    <small>💧 ${data.humidity}</small>
                </div>
            `;
        },

        showDetailedInfo(data) {
            if (!this.weatherBox) return;
            this.weatherBox.innerHTML = `
                <div class="weather-detailed">
                    <h3>🇸🇪 ${data.name}</h3>
                    <div class="weather-grid">
                        <div class="w-item"><span class="label">Температура</span><span class="val">${data.temp}</span></div>
                        <div class="w-item"><span class="label">Погода</span><span class="val">${data.condition}</span></div>
                        <div class="w-item"><span class="label">Влажность</span><span class="val">${data.humidity}</span></div>
                    </div>
                    <p class="w-desc">${data.desc}</p>
                    <button class="explore-btn" onclick="alert('Туры в регионе ${data.name}')">
                        🔍 Исследовать регион
                    </button>
                </div>
            `;
        },

        showDefaultWeather() {
            if (!this.weatherBox) return;
            this.weatherBox.innerHTML = '🗺️ Наведите на регион карты, чтобы увидеть погоду';
        }
    };

    // ==================== КАРУСЕЛЬ С АНИМАЦИЕЙ CSS ====================
    const carousel = {
        track: document.querySelector('.carousel-track'),
        items: document.querySelectorAll('.carousel-item'),
        indicators: document.querySelectorAll('.indicator'),
        currentIndex: 0,
        interval: null,
        intervalTime: 6000,

        init() {
            if (!this.track) return;
            this.startAutoPlay();
            this.addIndicators();
            this.addEventListeners();
            console.log('✅ Карусель инициализирована');
        },

        addIndicators() {
            this.items.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = `indicator ${i === 0 ? 'active' : ''}`;
                dot.dataset.index = i;
                this.track.parentElement.querySelector('.carousel-indicators')?.appendChild(dot);
            });
            this.indicators = document.querySelectorAll('.indicator');
        },

        goToSlide(index) {
            this.currentIndex = index;
            this.track.style.transform = `translateX(-${index * 100}%)`;
            this.updateIndicators();
            this.resetAutoPlay();
        },

        next() {
            this.goToSlide((this.currentIndex + 1) % this.items.length);
        },

        prev() {
            this.goToSlide((this.currentIndex - 1 + this.items.length) % this.items.length);
        },

        updateIndicators() {
            this.indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === this.currentIndex);
            });
        },

        startAutoPlay() {
            this.interval = setInterval(() => this.next(), this.intervalTime);
        },

        stopAutoPlay() {
            clearInterval(this.interval);
        },

        resetAutoPlay() {
            this.stopAutoPlay();
            this.startAutoPlay();
        },

        addEventListeners() {
            const container = this.track?.parentElement;
            if (!container) return;

            // Индикаторы
            container.addEventListener('click', (e) => {
                if (e.target.classList.contains('indicator')) {
                    this.goToSlide(parseInt(e.target.dataset.index));
                }
            });

            // Пауза при наведении
            container.addEventListener('mouseenter', () => this.stopAutoPlay());
            container.addEventListener('mouseleave', () => this.startAutoPlay());

            // Свайпы для мобильных
            let startX = 0;
            container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                this.stopAutoPlay();
            }, { passive: true });

            container.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? this.next() : this.prev();
                }
                this.startAutoPlay();
            }, { passive: true });
        }
    };

    // ==================== ПЛАВНАЯ ПРОКРУТКА НАВИГАЦИИ ====================
    function initSmoothScroll() {
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==================== АНИМАЦИИ ПРИ СКРОЛЛЕ ====================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        document.querySelectorAll('.description-card, .stat-item, .card, .tour-card').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // ==================== ФОРМА ОБРАТНОЙ СВЯЗИ ====================
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                showNotification('⚠️ Заполните все поля', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showNotification('⚠️ Введите корректный email', 'error');
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Отправка...';
            btn.disabled = true;

            setTimeout(() => {
                showNotification(`✅ Спасибо, ${name}! Ответ отправим на ${email}`, 'success');
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    function showNotification(message, type) {
        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed; top: 100px; right: 20px;
            padding: 15px 25px; border-radius: 8px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white; z-index: 10000;
            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        `;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }

    // ==================== ДОБАВЛЕНИЕ СТИЛЕЙ ====================
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
            .animate-on-scroll.animate-in { opacity: 1; transform: translateY(0); }
            
            .weather-brief, .weather-detailed { animation: fadeIn 0.4s ease; }
            .weather-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 15px 0; }
            .w-item { background: rgba(255,255,255,0.1); padding: 8px; border-radius: 6px; text-align: center; }
            .w-item .label { display: block; font-size: 11px; color: #aaa; }
            .w-item .val { font-size: 14px; font-weight: bold; color: #00a8e8; }
            .w-desc { font-size: 14px; margin: 10px 0; color: #ddd; }
            .explore-btn { padding: 8px 20px; background: linear-gradient(135deg, #00a8e8, #0052a3); border: none; border-radius: 20px; color: white; cursor: pointer; font-weight: 600; transition: all 0.3s; }
            .explore-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,168,232,0.4); }
            
            .carousel-indicators { display: flex; justify-content: center; gap: 8px; margin-top: 15px; }
            .indicator { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
            .indicator:hover, .indicator.active { background: #fff; transform: scale(1.3); }
            
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
        `;
        document.head.appendChild(style);
    }

    // ==================== ЗАПУСК ВСЕГО ====================
    function init() {
        swedenMap.init();
        carousel.init();
        initSmoothScroll();
        initScrollAnimations();
        initContactForm();
        addDynamicStyles();
        
        console.log('🎉 Сайт "Путешествие по Швеции" полностью готов!');
    }

    init();
});