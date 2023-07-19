// Função para conectar a carteira
function connectWallet() {
  // Verifica se a API da Phantom está disponível no navegador
  if (typeof window.solana !== 'undefined') {
    // Tenta conectar a carteira do usuário
    window.solana.connect().then(() => {
      // A conexão foi bem-sucedida
      alert('Carteira conectada com sucesso!');
      // Aqui você pode adicionar a lógica para liberar acesso à parte protegida do formulário
    }).catch((error) => {
      // Ocorreu um erro ao conectar a carteira
      console.error('Erro ao conectar a carteira:', error);
    });
  } else {
    // API da Phantom não está disponível, redireciona para a página da Phantom
    window.location.href = 'https://phantom.app/';
  }
}

// Event listener para o botão de conexão
var connectButton = document.getElementById('connect-button');
connectButton.addEventListener('click', connectWallet);
