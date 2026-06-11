    const video = document.getElementById('videoPlayer');
    let tDespegue = null;
    let tAterrizaje = null;

    function procesarVideo(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const url = URL.createObjectURL(file);
      video.src = url;

      tDespegue = null; 
      tAterrizaje = null;

      
    }

    document.getElementById('videoGallery').addEventListener('change', procesarVideo);

    function moverVideo(direccionFotogramas) {
      const tiempoPorFotogramaVideo = 1 / 30; 
      
      video.pause();
      video.currentTime += (tiempoPorFotogramaVideo * direccionFotogramas);
    }

    function marcarDespegue() {
      tDespegue = video.currentTime;
      document.getElementById('txtDespegue').innerText = tDespegue.toFixed(3) + ' s';
      calcular();
    }

    function marcarAterrizaje() {
      tAterrizaje = video.currentTime;
      document.getElementById('txtAterrizaje').innerText = tAterrizaje.toFixed(3) + ' s';
      calcular();
    }

    function reiniciarMarcadores() {
      tDespegue = null;
      tAterrizaje = null;
      document.getElementById('txtDespegue').innerText = '--';
      document.getElementById('txtAterrizaje').innerText = '--';
      document.getElementById('txtAltura').innerText = '0.0 cm';
      document.getElementById('txtVuelo').innerText = '0.000';
    }

    function calcular() {
      if (tDespegue !== null && tAterrizaje !== null) {
        let tiempoVueloReproduccion = tAterrizaje - tDespegue;
        
        if (tiempoVueloReproduccion <= 0) {
          alert("El aterrizaje debe ser posterior al despegue.");
          return;
        }
        
        const factorLentitud = parseFloat(document.getElementById('velocidadSelector').value);
        
        let tiempoVueloReal = tiempoVueloReproduccion / factorLentitud;
        
        document.getElementById('txtVuelo').innerText = tiempoVueloReal.toFixed(3);
        
        let alturaMetros = ((tiempoVueloReal * tiempoVueloReal) * 9.8) / 8;
        let alturaCm = alturaMetros * 100;
        
        document.getElementById('txtAltura').innerText = alturaCm.toFixed(1) + ' cm';
      }
    }