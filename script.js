document.addEventListener("DOMContentLoaded", () => {
    // Alocação de Referências de nós do DOM
    const viewLocked = document.getElementById("view-locked");
    const viewUnlocked = document.getElementById("view-unlocked");
    const oathFieldInput = document.getElementById("oath-field-input");
    const triggerUnlockBtn = document.getElementById("trigger-unlock-btn");
    const triggerLockBtn = document.getElementById("trigger-lock-btn");
    const errorConsoleMsg = document.getElementById("error-console-msg");
    const canvasStage = document.getElementById("magic-spark-canvas");
    const searchBox = document.getElementById("live-search-box");
    const chambers = document.querySelectorAll(".blueprint-chamber");
    
    const tabButtons = document.querySelectorAll(".tab-trigger-btn");
    const tabContents = document.querySelectorAll(".section-view");

    const TARGET_OATH = "eu juro solenemente nao fazer nada de bom";

    // SINCRONIZAR LOCALSTORAGE (Curtidas Individuais e Estáveis)
    chambers.forEach(cham => {
        const id = cham.getAttribute("data-id");
        cham.querySelector(".spy-count").textContent = localStorage.getItem(`m_sepia_likes_${id}`) || 0;
    });

    // MOTOR MÁGICO DE FAGULHAS AMBAR / AMARELO QUEIMADO
    function spawnAmberSparks(x, y, quantity = 25) {
        if (!canvasStage) return;
        for (let i = 0; i < quantity; i++) {
            const ember = document.createElement("div");
            ember.classList.add("amber-ember");
            
            // Dimencionamento dinâmico
            const size = Math.random() * 5 + 4;
            ember.style.width = ember.style.height = `${size}px`;
            ember.style.left = `${x}px`; 
            ember.style.top = `${y}px`;

            // Projeção Angular Polar Estocástica
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 110 + 40;
            ember.style.setProperty('--dx', `${Math.cos(angle) * radius}px`);
            ember.style.setProperty('--dy', `${Math.sin(angle) * radius}px`);

            canvasStage.appendChild(ember);
            
            // Limpeza preventiva de nós órfãos
            setTimeout(() => ember.remove(), 500);
        }
    }

    // SANITIZAÇÃO DE STRINGS UNICODE (IGNORA MAIÚSCULAS/ACENTOS)
    function cleanText(txt) {
        if (!txt) return "";
        return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    // CONTRATO DE DESTRAVAR O LACRE
    function executeOpenSequence() {
        if (cleanText(oathFieldInput.value) === TARGET_OATH) {
            errorConsoleMsg.textContent = ""; 
            viewLocked.classList.remove("active"); 
            viewUnlocked.classList.add("active"); 
            oathFieldInput.value = "";
            
            // Detonação centralizada na viewport
            spawnAmberSparks(window.innerWidth / 2, window.innerHeight / 2, 80);
        } else {
            errorConsoleMsg.textContent = "O papiro permanece estático... Insira o juramento.";
        }
    }

    if (triggerUnlockBtn) triggerUnlockBtn.addEventListener("click", executeOpenSequence);
    if (oathFieldInput) oathFieldInput.addEventListener("keypress", (e) => { if (e.key === "Enter") executeOpenSequence(); });
    
    if (triggerLockBtn) {
        triggerLockBtn.addEventListener("click", () => { 
            viewUnlocked.classList.remove("active"); 
            viewLocked.classList.add("active"); 
        });
    }

    // NAVEGAÇÃO ENTRE ABAS DO PAINEL LATERAL
    tabButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const targetId = btn.getAttribute("data-target");
            
            tabButtons.forEach(t => t.classList.remove("active-tab-btn"));
            tabContents.forEach(c => c.classList.remove("active-tab-content"));

            btn.classList.add("active-tab-btn");
            const targetNode = document.getElementById(targetId);
            if (targetNode) targetNode.classList.add("active-tab-content");
            
            // Efeito estocástico de faíscas sob o mouse ao clicar
            spawnAmberSparks(e.clientX, e.clientY, 15);
        });
    });

    // SISTEMA INDEPENDENTE DE MONITORAMENTO (CURTIDAS)
    document.querySelectorAll(".btn-spy-chamber").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const cham = e.target.closest(".blueprint-chamber");
            if (!cham) return;
            
            const id = cham.getAttribute("data-id");
            const counterNode = cham.querySelector(".spy-count");

            let currentTotal = parseInt(counterNode.textContent) || 0;
            currentTotal++;
            counterNode.textContent = currentTotal;
            
            // Gravação individual persistente
            localStorage.setItem(`m_sepia_likes_${id}`, currentTotal);

            spawnAmberSparks(e.clientX, e.clientY, 25);
        });
    });

    // MOTOR DE FILTRAGEM REALTIME POR DIGITAÇÃO
    if (searchBox) {
        searchBox.addEventListener("input", (e) => {
            const query = cleanText(e.target.value);
            chambers.forEach(cham => {
                const identity = cleanText(cham.getAttribute("data-wizard"));
                if (identity.includes(query)) {
                    cham.classList.remove("hidden-node");
                } else {
                    cham.classList.add("hidden-node");
                }
            });
        });
    }
});
