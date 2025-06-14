
    const bear = document.getElementById("bear");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const loveEmojis = [
      '❤️', '💖', '💘', '💝', '💞', '💗', '💕', '💓', '💑', 
      '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩', '🥰', '😍', '😘', 
      '🤍', '💌', '❣️', '💟', '🌹', '🌸', '💍', '🎀', '✨'
    ];

    // Ajustar escala del corazón según tamaño de pantalla
    const heartScale = window.innerWidth <= 480 ? 8 : 12;

    // Iniciar posición inicial del osito (fuera de pantalla)
    let bearStartX = -80;
    let bearY = centerY - 30;

    bear.style.left = `${bearStartX}px`;
    bear.style.top = `${bearY}px`;

    function moveTo(x, y) {
      return new Promise(resolve => {
        bear.style.transition = "all 1s ease-in-out";
        bear.style.left = `${x}px`;
        bear.style.top = `${y}px`;
        setTimeout(resolve, 1100);
      });
    }

    // Función para formar un corazón (usando ecuación paramétrica)
    function heartPoint(t, scale = 1) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return { 
        x: x * scale + centerX, 
        y: y * scale + centerY 
      };
    }

    // Crear corazón fijo
    function createFixedHeart(x, y) {
      return new Promise(resolve => {
        const heart = document.createElement('div');
        heart.className = 'heart-figure';
        heart.innerText = '❤️';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        document.body.appendChild(heart);

        setTimeout(() => {
          heart.style.opacity = '1';
          heart.style.transform = 'scale(1.2)';
        }, 50);

        setTimeout(() => {
          heart.style.transform = 'scale(1)';
          resolve(heart);
        }, 1000);
      });
    }

    async function startAnimation() {

       // Mostrar mensaje de Kiara con animación
  setTimeout(() => {
    const kiaraMessage = document.getElementById("kiaraMessage");
    kiaraMessage.style.opacity = '1';
    kiaraMessage.style.animation = 'heartbeat 1.5s infinite';
  }, 500);
      // Entrada del osito
      await moveTo(centerX - 60, bearY);

      // Formar corazón con corazones fijos
      const fixedHearts = [];
      for (let i = 0; i < 30; i++) {
        const t = i * 0.3;
        const point = heartPoint(t, heartScale); // Usamos la escala ajustada
        const heartPromise = createFixedHeart(point.x, point.y);
        fixedHearts.push(heartPromise);
        await new Promise(r => setTimeout(r, 600));
      }

      // Esperar que todos los corazones se creen y animen
      const heartElements = await Promise.all(fixedHearts);

      // Hacer que todos latan juntos
      heartElements.forEach(heart => {
        heart.style.animation = 'heartbeat 1.2s infinite';
      });

      // Mostrar mensaje final
      document.getElementById("finalMessage").classList.add("show");

       // Mostrar mensaje de Kiara con retraso
      setTimeout(() => {
        document.getElementById("kiaraMessage").style.opacity = '1';
      }, 500);
 
      // Añadir luces brillantes
      addSparkles();

      // Mover osito a esquina inferior izquierda
      setTimeout(() => {
        bear.style.transition = "all 1.5s ease";
        bear.style.left = `15px`;
        bear.style.top = `${window.innerHeight - 80}px`;
        bear.style.transform = "rotate(-15deg)";
      }, 2000);

      // MOSTRAR OSITOS ABRAZÁNDOSE (permanente)
      setTimeout(() => {
        const huggingBears = document.createElement('img');
        huggingBears.className = 'hugging-bears';
        huggingBears.src = 'assets/img/amorOsito.gif';
        huggingBears.alt = 'Ositos abrazándose';
        
        // Posicionar debajo del corazón formado
        const bearsTop = window.innerWidth <= 480 ? centerY + 150 : centerY + 200;
        huggingBears.style.left = `${centerX - (window.innerWidth <= 480 ? 30 : 40)}px`;
        huggingBears.style.top = `${bearsTop}px`;
        
        document.body.appendChild(huggingBears);
        
        // Animación de entrada suave
        setTimeout(() => {
          huggingBears.style.opacity = '1';
          huggingBears.style.transform = 'translateY(0)';
        }, 100);

        // Mostrar fuegos artificiales y lluvia
        setTimeout(() => {
          launchFireworks().then(() => {
            startLoveRain();
          });
        }, 1000);
      }, 2500);
    }

    function addSparkles() {
      for (let i = 0; i < (window.innerWidth <= 480 ? 15 : 20); i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * window.innerWidth}px`;
        sparkle.style.top = `${Math.random() * window.innerHeight}px`;
        document.body.appendChild(sparkle);
      }
    }

    function createFallingEmoji() {
      const emoji = document.createElement('div');
      emoji.className = 'falling-emoji';
      
      const randomEmoji = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
      emoji.innerText = randomEmoji;
      
      const startX = Math.random() * window.innerWidth;
      const startY = -30;
      
      emoji.style.left = `${startX}px`;
      emoji.style.top = `${startY}px`;
      
      const fallDuration = Math.random() * 2 + 5;
      
      emoji.style.animation = `falling ${fallDuration}s linear forwards`;
      
      document.body.appendChild(emoji);
      
      setTimeout(() => {
        emoji.remove();
      }, fallDuration * 1000);
    }

    function startLoveRain() {
      const initialEmojis = window.innerWidth <= 480 ? 10 : 15;
      const emojiDelay = window.innerWidth <= 480 ? 500 : 400;
      
      for (let i = 0; i < initialEmojis; i++) {
        setTimeout(createFallingEmoji, i * emojiDelay);
      }
      
      setInterval(createFallingEmoji, window.innerWidth <= 480 ? 400 : 300);
    }

    function launchFireworks() {
      return new Promise(resolve => {
        const rockets = [];

        for (let i = 0; i < 2; i++) {
          const rocket = document.createElement('div');
          rocket.className = 'rocket';
          rocket.style.left = `${window.innerWidth / 2 + (i === 0 ? -100 : 100)}px`;
          rocket.style.bottom = `0px`;
          document.body.appendChild(rocket);
          rockets.push(rocket);

          const rocketHeight = window.innerHeight * 0.82;

          rocket.animate([
            { bottom: '0px', opacity: 1 },
            { bottom: `${rocketHeight}px`, opacity: 1 }
          ], {
            duration: 1800,
            fill: 'forwards'
          });

          setTimeout(() => {
            const rocketX = rocket.getBoundingClientRect().left + rocket.offsetWidth / 2;
            createExplosion(rocketX, window.innerHeight - rocketHeight);
            rocket.remove();
          }, 1800);
        }

        setTimeout(resolve, 3000);
      });
    }

    function createExplosion(x, y) {
      const particles = window.innerWidth <= 480 ? 20 : 30;
      const radius = window.innerWidth <= 480 ? 60 + Math.random() * 80 : 80 + Math.random() * 120;
      
      for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--hue', `${Math.floor(Math.random() * 360)}`);
        document.body.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const targetX = x + Math.cos(angle) * radius;
        const targetY = y + Math.sin(angle) * radius;

        particle.animate([
          { transform: 'translate(0, 0)', opacity: 1 },
          { transform: `translate(${targetX - x}px, ${targetY - y}px)`, opacity: 0 }
        ], {
          duration: 1300 + Math.random() * 400,
          easing: 'ease-out',
          fill: 'forwards'
        });

        setTimeout(() => particle.remove(), 1800);
      }
    }

    // Iniciar al hacer clic
    const startButton = document.getElementById("startButton");
    const bgMusic = document.getElementById("bgMusic");

    startButton.addEventListener("click", () => {
      startButton.style.display = "none";
      document.getElementById("romanticPhrase").style.opacity = "0";
      document.getElementById("romanticTitle").style.opacity = "0";
      
      setTimeout(() => {
        document.getElementById("romanticPhrase").style.display = "none";
        document.getElementById("romanticTitle").style.display = "none";
      }, 600);

      // Reproducir música desde los 28 segundos
      setTimeout(() => {
        bgMusic.currentTime = 28;
        bgMusic.play().catch(e => console.log("Error al reproducir música:", e));
      }, 100);

      // Iniciar animación principal
      setTimeout(startAnimation, 100);
    });

    // Precargar música para mejor rendimiento
    window.addEventListener('load', () => {
      bgMusic.load();
    });
