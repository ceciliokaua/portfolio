// Animação das skills no scroll
window.addEventListener('scroll', () => {
    const skills = document.querySelectorAll('.progress');
    skills.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (!bar.style.width) {
                bar.style.width = bar.dataset.width;
            }
        }
    });
});

// Smooth scroll para links (já no CSS, mas reforço)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* ============================================
   FUNCIONALIDADE DO CAROUSEL DE PROJETOS
   ============================================ */

const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

// Calcula quantos cards cabem na tela
function getCardsPerView() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const cardWidth = 350 + 32; // largura do card + gap
    return Math.floor(carouselWrapper.clientWidth / cardWidth);
}

// Função para mover o carousel
function moveCarousel() {
    const cardWidth = 350 + 32; // largura do card + gap
    const offset = -currentIndex * cardWidth;
    carouselTrack.style.transform = `translateX(${offset}px)`;
}

// Atualiza o estado dos botões
function updateButtonState() {
    const totalCards = carouselTrack.children.length;
    const cardsPerView = getCardsPerView();
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
    
    prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
}

// Event listeners dos botões
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        moveCarousel();
        updateButtonState();
    }
});

nextBtn.addEventListener('click', () => {
    const totalCards = carouselTrack.children.length;
    const cardsPerView = getCardsPerView();
    if (currentIndex < totalCards - cardsPerView) {
        currentIndex++;
        moveCarousel();
        updateButtonState();
    }
});

// Redimensiona o carousel quando a janela muda de tamanho
window.addEventListener('resize', () => {
    currentIndex = 0;
    moveCarousel();
    updateButtonState();
});

// Inicializa o estado dos botões
updateButtonState();

/* ============================================
   FUNCIONALIDADE DE EXPANDIR IMAGEM
   ============================================ */

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const projectImages = document.querySelectorAll('.project-image img');

// Abre o modal com a imagem expandida
projectImages.forEach(img => {
    img.addEventListener('click', function() {
        modalImage.src = this.src;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede scroll
    });
});

// Fecha o modal
function closeModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaura scroll
}

// Fecha ao clicar no botão de fechar
modalCloseBtn.addEventListener('click', closeModal);

// Fecha ao clicar fora da imagem (no fundo escuro)
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        closeModal();
    }
});

// Fecha ao pressionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeModal();
    }
});
