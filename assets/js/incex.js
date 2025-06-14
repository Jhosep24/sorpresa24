
    const bear = document.getElementById("bear");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const loveEmojis = [
      '❤️', '💖', '💘', '💝', '💞', '💗', '💕', '💓', '💑', 
      '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩', '🥰', '😍', '😘', 
      '🤍', '💌', '❣️', '💟', '🌹', '🌸', '💍', '🎀', '✨'
    ];

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
      return { x: x * scale + centerX, y: y * scale + centerY };
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
  // Entrada del osito
  await moveTo(centerX - 60, bearY);

  // Formar corazón con corazones fijos
  const fixedHearts = [];
  for (let i = 0; i < 30; i++) {
    const t = i * 0.3;
    const point = heartPoint(t, 12); // Escala reducida para móviles
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

  // Añadir luces brillantes
  addSparkles();

  // Mover osito a esquina inferior izquierda
  setTimeout(() => {
    bear.style.transition = "all 1.5s ease";
    bear.style.left = `15px`;
    bear.style.top = `${window.innerHeight - 80}px`;
    bear.style.transform = "rotate(-15deg)";
  }, 2000);

  // MOSTRAR OSITOS ABRAZÁNDOSE (y que se queden permanentemente)
  setTimeout(() => {
    // Crear imagen de ositos abrazándose
    const huggingBears = document.createElement('img');
    huggingBears.className = 'hugging-bears';
    huggingBears.src = 'assets/img/amorOsito.gif';
    huggingBears.alt = 'Ositos abrazándose';
    
    // Posicionar debajo del corazón formado
    huggingBears.style.left = `${centerX - 40}px`;
    huggingBears.style.top = `${centerY + 200}px`;
    
    document.body.appendChild(huggingBears);
    
    // Animación de entrada suave
    setTimeout(() => {
      huggingBears.style.opacity = '1';
      huggingBears.style.transform = 'translateY(0)';
    }, 100);

    // Mostrar fuegos artificiales y lluvia (sin quitar los ositos)
    setTimeout(() => {
      launchFireworks().then(() => {
        startLoveRain();
      });
    }, 1000); // Pequeña espera después de que aparezcan los ositos
  }, 2500);
}
    function addSparkles() {
      for (let i = 0; i < 20; i++) { // Menos sparkles en móvil
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
      // Menos emojis iniciales en móvil
      for (let i = 0; i < 15; i++) {
        setTimeout(createFallingEmoji, i * 400); // Más espaciados
      }
      
      // Intervalo más lento
      setInterval(createFallingEmoji, 300);
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
      for (let i = 0; i < 30; i++) { // Menos partículas
        const particle = document.createElement('div');
        particle.className = 'explosion';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--hue', `${Math.floor(Math.random() * 360)}`);
        document.body.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const radius = 80 + Math.random() * 120; // Radio menor
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
