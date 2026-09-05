// --- Unix Timestamp & Epoch Timezone Converter Logic ---

export function setupTimestampConverter() {
    const liveClock = document.getElementById('live-epoch');
    const input = document.getElementById('ts-input');
    const setNowBtn = document.getElementById('btn-ts-now');
    
    const outIso = document.getElementById('ts-iso');
    const outUtc = document.getElementById('ts-utc');
    const outKst = document.getElementById('ts-kst');
    const outRelative = document.getElementById('ts-relative');

    if (!input || !outIso) return;

    // 1. Live Clock Interval
    function updateLiveClock() {
        if (liveClock) {
            liveClock.textContent = Math.floor(Date.now() / 1000).toString();
        }
    }
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

    function formatRelativeTime(targetMs) {
        const diffSec = Math.floor((targetMs - Date.now()) / 1000);
        const absSec = Math.abs(diffSec);

        if (absSec < 5) return 'Just now';

        const mins = Math.floor(absSec / 60);
        const hours = Math.floor(mins / 60);
        const days = Math.floor(hours / 24);

        if (diffSec > 0) {
            if (days > 0) return `In ${days} day(s)`;
            if (hours > 0) return `In ${hours} hour(s)`;
            if (mins > 0) return `In ${mins} minute(s)`;
            return `In ${diffSec} second(s)`;
        } else {
            if (days > 0) return `${days} day(s) ago`;
            if (hours > 0) return `${hours} hour(s) ago`;
            if (mins > 0) return `${mins} minute(s) ago`;
            return `${absSec} second(s) ago`;
        }
    }

    function processTimestamp() {
        let val = input.value.trim();

        if (!val) {
            outIso.value = '';
            outUtc.value = '';
            outKst.value = '';
            outRelative.value = '';
            return;
        }

        let epochMs;

        // Check if input is digits only (epoch seconds or ms) or date string
        if (/^\d+$/.test(val)) {
            let num = parseInt(val, 10);
            // If less than 10^11, assume seconds (e.g. 1772668800), else ms
            epochMs = num < 100000000000 ? num * 1000 : num;
        } else {
            epochMs = Date.parse(val);
        }

        if (isNaN(epochMs)) {
            outIso.value = 'Invalid Date / Timestamp';
            outUtc.value = '';
            outKst.value = '';
            outRelative.value = '';
            return;
        }

        const date = new Date(epochMs);

        outIso.value = date.toISOString();
        outUtc.value = date.toUTCString();
        
        // Formatter for KST (Asia/Seoul - UTC+9)
        try {
            const kstFormatted = new Intl.DateTimeFormat('ko-KR', {
                timeZone: 'Asia/Seoul',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(date);
            outKst.value = `${kstFormatted} (KST / UTC+9)`;
        } catch (e) {
            outKst.value = date.toLocaleString();
        }

        outRelative.value = formatRelativeTime(epochMs);
    }

    input.addEventListener('input', processTimestamp);

    if (setNowBtn) {
        setNowBtn.addEventListener('click', () => {
            input.value = Math.floor(Date.now() / 1000).toString();
            processTimestamp();
        });
    }

    // Default init with current timestamp
    input.value = Math.floor(Date.now() / 1000).toString();
    processTimestamp();
}
