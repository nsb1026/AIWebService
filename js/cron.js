// --- Cron Expression Explainer & Generator Logic ---

export function setupCronExplainer() {
    const input = document.getElementById('cron-input');
    const explanationOut = document.getElementById('cron-explanation');
    const scheduleOut = document.getElementById('cron-schedule');
    const status = document.getElementById('cron-status');
    const clearBtn = document.getElementById('btn-cron-clear');
    const presetBtns = document.querySelectorAll('.preset-btn');

    if (!input || !explanationOut) return;

    const weekdaysEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weekdaysKO = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

    const monthsEN = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function parseCron(expr) {
        if (!expr) return null;
        const parts = expr.trim().split(/\s+/);
        if (parts.length !== 5) return null;

        const [min, hour, dom, month, dow] = parts;

        return { min, hour, dom, month, dow };
    }

    function explainPart(part, type, lang) {
        if (part === '*') {
            if (type === 'min') return lang === 'ko' ? '매분' : 'every minute';
            if (type === 'hour') return lang === 'ko' ? '매시' : 'every hour';
            if (type === 'dom') return lang === 'ko' ? '매일' : 'every day';
            if (type === 'month') return lang === 'ko' ? '매월' : 'every month';
            if (type === 'dow') return lang === 'ko' ? '매요일' : 'every day of the week';
        }

        if (part.startsWith('*/')) {
            const step = part.replace('*/', '');
            if (type === 'min') return lang === 'ko' ? `매 ${step}분마다` : `every ${step} minutes`;
            if (type === 'hour') return lang === 'ko' ? `매 ${step}시간마다` : `every ${step} hours`;
        }

        if (type === 'dow') {
            const num = parseInt(part, 10);
            if (!isNaN(num) && num >= 0 && num <= 7) {
                return lang === 'ko' ? `매주 ${weekdaysKO[num]}` : `on ${weekdaysEN[num]}`;
            }
        }

        if (type === 'min') return lang === 'ko' ? `${part}분에` : `at minute ${part}`;
        if (type === 'hour') return lang === 'ko' ? `${part}시에` : `at ${part}:00`;

        return part;
    }

    function generateExplanation(parsed, lang) {
        const { min, hour, dom, month, dow } = parsed;

        if (lang === 'ko') {
            if (min === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') {
                return '매분 1회 연속 실행됩니다.';
            }
            if (min.startsWith('*/') && hour === '*' && dom === '*' && month === '*' && dow === '*') {
                return `${min.replace('*/', '')}분마다 실행됩니다.`;
            }
            if (min === '0' && hour === '0' && dom === '*' && month === '*' && dow === '*') {
                return '매일 자정(00:00)에 실행됩니다.';
            }
            if (min === '0' && hour === '0' && dom === '1' && month === '*' && dow === '*') {
                return '매월 1일 자정(00:00)에 실행됩니다.';
            }

            let str = '';
            if (month !== '*') str += `${month}월 `;
            if (dom !== '*') str += `${dom}일 `;
            if (dow !== '*') str += `${explainPart(dow, 'dow', 'ko')} `;
            if (hour !== '*') str += `${explainPart(hour, 'hour', 'ko')} `;
            str += `${explainPart(min, 'min', 'ko')} 실행됩니다.`;
            return str;
        } else {
            if (min === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') {
                return 'Runs every minute.';
            }
            if (min.startsWith('*/') && hour === '*' && dom === '*' && month === '*' && dow === '*') {
                return `Runs every ${min.replace('*/', '')} minutes.`;
            }
            if (min === '0' && hour === '0' && dom === '*' && month === '*' && dow === '*') {
                return 'Runs every day at midnight (00:00).';
            }

            return `Runs ${explainPart(min, 'min', 'en')} ${explainPart(hour, 'hour', 'en')} ${explainPart(dow, 'dow', 'en')}.`;
        }
    }

    function calculateNextRuns(parsed) {
        const runs = [];
        let now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);

        const { min, hour } = parsed;
        const intervalMins = min.startsWith('*/') ? parseInt(min.replace('*/', ''), 10) : (min === '*' ? 1 : 60);

        for (let i = 1; i <= 5; i++) {
            let nextDate = new Date(now.getTime() + (i * intervalMins * 60 * 1000));
            runs.push(`${i}. ${nextDate.toISOString().replace('T', ' ').substring(0, 19)} (UTC)`);
        }

        return runs.join('\n');
    }

    function processCron() {
        const val = input.value.trim();
        const parsed = parseCron(val);
        const lang = document.documentElement.lang || 'en';

        if (parsed) {
            if (status) {
                status.textContent = 'Valid 5-part Cron Syntax';
                status.className = 'json-status success';
            }
            explanationOut.value = generateExplanation(parsed, lang);
            scheduleOut.value = calculateNextRuns(parsed);
        } else if (val) {
            if (status) {
                status.textContent = 'Invalid Cron Syntax (Requires 5 fields: * * * * *)';
                status.className = 'json-status error';
            }
            explanationOut.value = 'Invalid expression. Standard cron requires 5 fields separated by spaces.';
            scheduleOut.value = '';
        } else {
            if (status) {
                status.textContent = '';
                status.className = 'json-status';
            }
            explanationOut.value = '';
            scheduleOut.value = '';
        }
    }

    input.addEventListener('input', processCron);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '*/15 * * * *';
            processCron();
        });
    }

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cron = btn.getAttribute('data-cron');
            if (cron) {
                input.value = cron;
                processCron();
            }
        });
    });

    processCron();
}
