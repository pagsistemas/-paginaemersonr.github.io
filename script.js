document.addEventListener('DOMContentLoaded', function() { 
    let menuPrincipal = document.querySelector('.menu-principal'); 
    if (menuPrincipal) { 
        menuPrincipal.addEventListener('mouseover', function() { 
            this.style.backgroundColor = 'darkgreen';  // Cambia el fondo a verde oscuro al pasar el ratón 
            this.style.transition = 'background-color 0.5s ease';  // Agrega una transición suave 
        }); 
        menuPrincipal.addEventListener('mouseout', function() { 
            this.style.backgroundColor = '#333'; // Vuelve al color de fondo original (definido en tu CSS) 
            this.style.transition = 'background-color 0.5s ease'; // Agrega una transición suave 
        }); 
    } 
}); 

document.addEventListener('DOMContentLoaded', function() { 
    let titulo = document.getElementById('tituloPrincipal'); 
    let posicion = 0; 
    let direccion = 1;  
    const velocidad = 1;  
    if (titulo) { 
        function moverTitulo() { 
            posicion += direccion * velocidad; 
            titulo.style.transform = `translateX(${posicion}px)`; 
            if (posicion > 50) { 
                direccion = -1; 
            } else if (posicion < -50) { 
                direccion = 1; 
            } 
           requestAnimationFrame(moverTitulo);    } 
        requestAnimationFrame(moverTitulo);   } 
}); 

document.addEventListener('DOMContentLoaded', function() { 
    let imagen = document.getElementById('imagenPrincipal'); 
    if (imagen) { 
        imagen.addEventListener('mouseover', function() { 
            this.style.transform = 'scale(1.2)'; // Aumenta el tamaño en un 20% 
            this.style.transition = 'transform 0.3s ease-in-out'; // Transición suave 
        }); 
        imagen.addEventListener('mouseout', function() { 
            this.style.transform = 'scale(1)'; // Vuelve al tamaño original 
            this.style.transition = 'transform 0.3s ease-in-out';  
        }); 
    } 
}); 

window.onload = () => { 
    const gameContainer = document.getElementById("game-container"); 
    const playerElement = document.getElementById("player"); 
    const enemyElement = document.getElementById("enemy"); 
    const player = { element: playerElement,  topPosition: 0,  leftPosition: 0,  step: 25, 
        move: function(direction) { let newTop = this.topPosition;   let newLeft = this.leftPosition; 
            switch (direction) { 
                case "ArrowUp": 
                    newTop = Math.max(0, this.topPosition - this.step); 
                    break; 
                case "ArrowDown": 
   newTop = Math.min(gameContainer.offsetHeight - this.element.offsetHeight, this.topPosition + this.step); 
                    break; 
                case "ArrowRight": 
   newLeft = Math.min(gameContainer.offsetWidth - this.element.offsetWidth, this.leftPosition + this.step); 
                    break; 
 
 
 
                case "ArrowLeft": 
                    newLeft = Math.max(0, this.leftPosition - this.step); 
                    break;   default:   break; 
            } 
            this.topPosition = newTop; this.leftPosition = newLeft; 
            this.element.style.top = this.topPosition + "px";  this.element.style.left = this.leftPosition + "px"; 
        } 
    }; 
    onkeydown = (key) => { 
        if (key.code === "ArrowUp" || key.code === "ArrowDown") { 
            key.preventDefault();  
        } 
        player.move(key.code); 
    }; 
    const enemy = { 
        element: enemyElement,  topPosition: 300,  leftPosition: 400, step: 5,  playerLeftPosition: 0, 
        playerTopPosition: 0, 
        chase: function(player) { 
            this.playerTopPosition = player.element.offsetTop; 
            this.playerLeftPosition = player.element.offsetLeft; 
            if (Math.abs(this.playerTopPosition - this.topPosition) > this.step / 2) { 
                this.topPosition += (this.playerTopPosition > this.topPosition) ? this.step : -this.step; 
           } 
            if (Math.abs(this.playerLeftPosition - this.leftPosition) > this.step / 2) { 
                this.leftPosition += (this.playerLeftPosition > this.leftPosition) ? this.step : -this.step; 
            } 
            this.move(); 
        }, 
        move: function() { 
            this.element.style.top = this.topPosition + 'px';  this.element.style.left = this.leftPosition + 'px'; 
        } 
    }; 
    function checkCollision() { 
        const playerRect = player.element.getBoundingClientRect(); 
        const enemyRect = enemy.element.getBoundingClientRect(); 
        return !(playerRect.right < enemyRect.left || 
                 playerRect.left > enemyRect.right || 
                 playerRect.bottom < enemyRect.top || 
                 playerRect.top > enemyRect.bottom); 
    } 
    const gameInterval = setInterval(() => { 
        enemy.chase(player); 
        if (checkCollision()) { 
            console.log("¡Tocando!"); 
        } 
    }, 50); 
}; 
