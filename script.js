// Create floating hearts animation
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartSymbols = ['❤', '💕', '💗', '💖', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 10 + 10 + 's';
        heart.style.fontSize = Math.random() * 15 + 15 + 'px';
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }, 800);
}

// Fireworks animation with hearts and colorful bursts
function setupFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor(x, y, color, shape = 'circle') {
            this.x = x;
            this.y = y;
            this.color = color;
            this.shape = shape;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 3;
            this.velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.012 + 0.01;
            this.size = Math.random() * 4 + 2;
            this.gravity = 0.08;
            this.friction = 0.98;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        }
        
        update() {
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
            this.rotation += this.rotationSpeed;
        }
        
        drawHeart(x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            const topCurveHeight = size * 0.3;
            ctx.moveTo(0, topCurveHeight);
            ctx.bezierCurveTo(0, 0, size / 2, 0, size / 2, topCurveHeight);
            ctx.bezierCurveTo(size / 2, size / 1.2, 0, size, 0, size);
            ctx.bezierCurveTo(0, size, -size / 2, size / 1.2, -size / 2, topCurveHeight);
            ctx.bezierCurveTo(-size / 2, 0, 0, 0, 0, topCurveHeight);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            
            if (this.shape === 'heart') {
                this.drawHeart(this.x, this.y, this.size * 2, this.rotation);
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }
    }
    
    function createFirework(x, y) {
        const colorSets = [
            ['#ff1493', '#ff69b4', '#ffc0cb', '#ff00ff', '#da70d6'],
            ['#00ffff', '#87ceeb', '#1e90ff', '#4169e1', '#6495ed'],
            ['#ffd700', '#ffa500', '#ff6347', '#ff4500', '#ffff00'],
            ['#00ff00', '#32cd32', '#90ee90', '#98fb98', '#adff2f'],
            ['#d946a0', '#f8a4c4', '#ff69b4', '#e75480', '#ffc0cb'],
            ['#ff6b6b', '#ee5a6f', '#f06595', '#cc5de8', '#845ef7']
        ];
        const colors = colorSets[Math.floor(Math.random() * colorSets.length)];
        const useHearts = Math.random() > 0.4;
        
        for (let i = 0; i < 60; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = useHearts && i % 3 === 0 ? 'heart' : 'circle';
            particles.push(new Particle(x, y, color, shape));
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    return createFirework;
}

// Surprise button functionality
function setupSurpriseButton() {
    const surpriseButton = document.getElementById('surprise-button');
    const hiddenMessage = document.getElementById('hidden-message');
    const createFirework = setupFireworks();
    
    if (surpriseButton) {
        surpriseButton.addEventListener('click', () => {
            // Hide button
            surpriseButton.style.display = 'none';
            
            // Show hidden message
            hiddenMessage.classList.add('show');
            
            // Trigger confetti
            if (typeof confetti === 'function') {
                const duration = 5000;
                const end = Date.now() + duration;
                
                const colors = ['#d946a0', '#f8a4c4', '#f2d77c', '#ffffff', '#ff69b4', '#ff1493', '#ffc0cb'];
                
                (function frame() {
                    confetti({
                        particleCount: 5,
                        angle: 60,
                        spread: 70,
                        origin: { x: 0, y: 0.8 },
                        colors: colors
                    });
                    confetti({
                        particleCount: 5,
                        angle: 120,
                        spread: 70,
                        origin: { x: 1, y: 0.8 },
                        colors: colors
                    });
                    confetti({
                        particleCount: 3,
                        angle: 90,
                        spread: 100,
                        origin: { x: 0.5, y: 0.9 },
                        colors: colors
                    });
                    
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());
            }
            
            // Trigger fireworks
            if (createFirework) {
                const fireworksCanvas = document.getElementById('fireworks-canvas');
                
                // Launch colorful fireworks all across the sky
                if (fireworksCanvas) {
                    for (let i = 0; i < 12; i++) {
                        setTimeout(() => {
                            const x = Math.random() * fireworksCanvas.offsetWidth;
                            const y = Math.random() * fireworksCanvas.offsetHeight * 0.65;
                            createFirework(x, y);
                        }, i * 200);
                    }
                }
                
                // Second wave of heart-shaped fireworks
                setTimeout(() => {
                    if (fireworksCanvas && createFirework) {
                        for (let i = 0; i < 10; i++) {
                            setTimeout(() => {
                                const x = Math.random() * fireworksCanvas.offsetWidth;
                                const y = Math.random() * fireworksCanvas.offsetHeight * 0.55;
                                createFirework(x, y);
                            }, i * 180);
                        }
                    }
                }, 2800);
                
                // Final grand finale
                setTimeout(() => {
                    if (fireworksCanvas && createFirework) {
                        for (let i = 0; i < 15; i++) {
                            setTimeout(() => {
                                const x = Math.random() * fireworksCanvas.offsetWidth;
                                const y = Math.random() * fireworksCanvas.offsetHeight * 0.6;
                                createFirework(x, y);
                            }, i * 120);
                        }
                    }
                }, 5500);
            }
        });
    }
}

// Smooth scroll reveal animation for timeline items
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(item);
    });
    
    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe letter card
    const letterCard = document.querySelector('.letter-card');
    if (letterCard) {
        letterCard.style.opacity = '0';
        letterCard.style.transform = 'translateY(30px)';
        letterCard.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(letterCard);
    }
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    setupSurpriseButton();
    setupScrollAnimations();
});
