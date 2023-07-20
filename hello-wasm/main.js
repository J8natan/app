// Função para verificar a disponibilidade da extensão Phantom Wallet
async function isPhantomWalletAvailable() {
  if (window.solana && window.solana.isPhantom) {
    return true;
  } else {
    return false;
  }
}

// Função para conectar a extensão Phantom Wallet
async function connectPhantomWallet() {
  try {
    if (await isPhantomWalletAvailable()) {
      // Conectar a carteira
      const publicKey = await window.solana.connect();
      alert('Conexão bem-sucedida com a carteira!');

      // Aqui você pode realizar a transação e aguardar a confirmação antes de mudar para a próxima página
      // Exemplo:
      // await performTransaction();

      // Após a transação bem-sucedida, mude para a próxima página
      // window.location.href = 'proxima_pagina.html';
    } else {
      // Caso a extensão Phantom Wallet não esteja disponível, redirecione para a página oficial
      window.location.href = 'https://phantom.app/';
    }
  } catch (error) {
    console.error('Erro ao conectar a carteira:', error);
    alert('Erro ao conectar a carteira. Verifique se a extensão Phantom Wallet está instalada e ativa.');
  }
}

// Adicionando o evento de clique ao botão
document.getElementById('connectWalletButton').addEventListener('click', connectPhantomWallet);
