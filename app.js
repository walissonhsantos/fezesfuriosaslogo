const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const logo = new Image();
const downloadBtn = document.getElementById('downloadBtn');
const positionSelect = document.getElementById('positionSelect');

// Carregar o logotipo do repositório GitHub
logo.src = "https://raw.githubusercontent.com/walissonhsantos/fezesfuriosaslogo/refs/heads/main/limpo.png";

let baseImage = null;  // Imagem base carregada pelo usuário

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        baseImage = new Image();
        baseImage.onload = function() {
            // Ajusta o tamanho do canvas para o tamanho da imagem
            canvas.width = baseImage.width;
            canvas.height = baseImage.height;
            drawImageAndLogo();
        }
        baseImage.src = e.target.result;
    }
    reader.readAsDataURL(file);
});

function drawImageAndLogo() {
    if (!baseImage) return;

    // Limpar o canvas e desenhar a imagem base
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(baseImage, 0, 0);

    // Tamanho do logotipo
    const logoWidth = 100;
    const logoHeight = 100;

    // Posição do logotipo
    let x = 0, y = 0;
    const position = positionSelect.value;

    switch (position) {
        case 'top-left':
            x = 10;
            y = 10;
            break;
        case 'top-right':
            x = canvas.width - logoWidth - 10;
            y = 10;
            break;
        case 'bottom-left':
            x = 10;
            y = canvas.height - logoHeight - 10;
            break;
        case 'bottom-right':
            x = canvas.width - logoWidth - 10;
            y = canvas.height - logoHeight - 10;
            break;
        case 'center':
            x = (canvas.width - logoWidth) / 2;
            y = (canvas.height - logoHeight) / 2;
            break;
    }

    // Desenhar o logotipo no canvas
    context.drawImage(logo, x, y, logoWidth, logoHeight);
}

// Função para baixar a imagem com o logotipo
downloadBtn.addEventListener('click', function() {
    const errorMessage = document.getElementById('errorMessage');

    // Verifica se o canvas tem conteúdo
    if (!baseImage) {
        errorMessage.textContent = "Por favor, carregue uma imagem base antes de baixar.";
        return;
    }
    
    // Mensagem de erro personalizada
    errorMessage.textContent = "A merda do botão parou de funcionar depois de tanto eu mexer nesse código.. sinto muito, clica na foto que já está com sua logo e baixa ela, lerdão(ona).";

    // Cria um link para download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'imagem_com_logo.png';

    // Cria um evento para simular o clique no link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Remove o link após o clique
});
