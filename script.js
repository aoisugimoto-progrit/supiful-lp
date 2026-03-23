// ========================================
// カルーセル機能
// ========================================

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // すべてのスライドとインジケーターから active クラスを削除
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // 指定されたスライドとインジケーターに active クラスを追加
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// 自動スライド切り替え（5秒ごと）
setInterval(nextSlide, 5000);

// インジケータークリックで手動切り替え
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// ========================================
// スクロールアニメーション（フェードイン）
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// fade-in クラスを持つすべての要素を監視
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ========================================
// タブ切り替え機能（体験談セクション）
// ========================================

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // すべてのタブとパネルから active クラスを削除
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // クリックされたタブと対応するパネルに active クラスを追加
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ========================================
// FAQ アコーディオン機能
// ========================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // クリックされたアイテムのアクティブ状態をトグル
        const isActive = item.classList.contains('active');

        // すべてのFAQアイテムを閉じる
        faqItems.forEach(faq => faq.classList.remove('active'));

        // クリックされたアイテムが閉じていた場合は開く
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========================================
// スムーススクロール
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // #のみの場合はトップへ
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ヘッダーのスクロール時の背景変化
// ========================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // スクロール位置が100px以上の場合、ヘッダーに影を追加
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ========================================
// CTAボタンのクリック処理（体験登録へ）
// ========================================

// 実際の登録処理はここに実装
// 現在はアラート表示のみ
document.querySelectorAll('.cta-button, .pricing-button').forEach(button => {
    // #trial へのリンクの場合のみ処理
    if (button.getAttribute('href') === '#trial' || button.getAttribute('href') === '#') {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // 実際のアプリでは、ここで登録フォームへ遷移または
            // モーダルを表示する処理を実装
            alert('体験登録ページへ遷移します\n\n実際のサイトでは、ここで登録フォームが表示されます。');
        });
    }
});

// ========================================
// ページ読み込み時の初期化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // 最初のスライドを表示
    showSlide(0);

    // ページトップに既に表示されている要素をすぐに表示
    const heroElements = document.querySelector('.hero').querySelectorAll('.fade-in');
    heroElements.forEach(element => {
        element.classList.add('visible');
    });

    console.log('SUPIFUL LP loaded successfully!');
});

// ========================================
// パフォーマンス最適化：画像遅延読み込み
// ========================================

// 将来的に画像を追加する場合のための準備
if ('loading' in HTMLImageElement.prototype) {
    // ブラウザがネイティブ遅延読み込みをサポートしている場合
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // フォールバック：Intersection Observer を使用
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// アニメーションのパフォーマンス最適化
// ========================================

// ユーザーが「アニメーションを減らす」設定をしている場合
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // アニメーションを無効化
    document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.add('visible');
    });

    // カルーセルの自動切り替えを停止
    // （既存のsetIntervalは停止できないので、新しい実装が必要な場合は修正）
}

// ========================================
// エラーハンドリング
// ========================================

window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.message);
});

// ========================================
// レスポンシブ対応：モバイルメニュー
// ========================================

// 将来的にモバイルハンバーガーメニューを追加する場合の準備
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const headerContainer = document.querySelector('.header-container');

    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
        // モバイルメニュートグルボタンを作成
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.innerHTML = '☰';
        toggleButton.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 28px;
            color: #2563EB;
            cursor: pointer;
        `;

        toggleButton.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'white';
            nav.style.padding = '1rem';
            nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });

        headerContainer.appendChild(toggleButton);
    }
};

// ウィンドウリサイズ時にモバイルメニューを調整
window.addEventListener('resize', () => {
    const nav = document.querySelector('.nav');
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
        nav.style.position = 'static';
        nav.style.flexDirection = 'row';
        nav.style.padding = '0';
        nav.style.boxShadow = 'none';
    }
});

// 初期化時にモバイルメニューを確認
if (window.innerWidth <= 768) {
    createMobileMenu();
}