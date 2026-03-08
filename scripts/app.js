AOS.init({
    duration: 1000,
    once: false
});

const dataDoEvento = new Date("Apr 1, 2026 10:00:00");
const timeStampDoEvento = dataDoEvento.getTime();

const contaAsHoras = setInterval(() => {
    const agora = new Date();
    const distancia = timeStampDoEvento - agora.getTime();

    const dia = 1000 * 60 * 60 * 24;
    const hora = 1000 * 60 * 60;
    const minuto = 1000 * 60;

    const dias = Math.floor(distancia / dia);
    const horas = Math.floor((distancia % dia) / hora);
    const minutos = Math.floor((distancia % hora) / minuto);
    const segundos = Math.floor((distancia % minuto) / 1000);

    document.getElementById('contador').innerHTML =
        `${dias}d ${horas}h ${minutos}m ${segundos}s`;

    if (distancia < 0) {
        clearInterval(contaAsHoras);
        document.getElementById('contador').innerHTML = 'Evento expirado';
    }
}, 1000);

Vue.config.devtools = true;

Vue.component("dialogue", { template: "#dialogue" });

Vue.component("dialogue-text", {
    template: "#dialogue-text",
    data() {
        return { text: "", displayedText: "" };
    },
    created() {
        this.text = this.$slots.default[0].text;
    },
    mounted() {
        let i = 0;
        const speed = 25;
        const delay = 2000;

        const typewriter = () => {
            if (i < this.text.length) {
                this.displayedText += this.text.charAt(i);
                i++;
                setTimeout(typewriter, speed);
            }
        };

        setTimeout(typewriter, delay);

        // Atualiza o AOS quando o componente aparecer
        this.$nextTick(() => {
            AOS.refreshHard();
        });
    }
});

new Vue({
    el: "#app",
    mounted() {
        setTimeout(() => {
            if (this.$refs.audio) {
                this.$refs.audio.play();
            }

            // Atualiza animações AOS depois que Vue renderiza
            this.$nextTick(() => {
                AOS.refreshHard();
            });

        }, 2000);
    },
    updated() {
        // Sempre que Vue atualizar o DOM
        this.$nextTick(() => {
            AOS.refreshHard();
        });
    }
});