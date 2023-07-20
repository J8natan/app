<<<<<<< HEAD
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
=======
let canvas;
let gl;
let shaderProgram;
let texture;

const vertexShaderSource = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
void main() {
  gl_Position = vec4(a_position, 0, 1);
  v_texCoord = a_texCoord;
}
`;

const fragmentShaderSource = `
precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_texture;
void main() {
  gl_FragColor = texture2D(u_texture, v_texCoord);
}
`;

// Função para carregar a imagem como textura
function loadTexture(url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Configuração da textura
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Carregar a imagem
  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  };
  image.src = url;

  return texture;
}

function initWebGL() {
  canvas = document.getElementById('canvas');
  gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Seu navegador não suporta WebGL.');
    return;
  }

  // Compilar os shaders
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  // Criar o programa do shader
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Atributos do shader
  const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
  const texCoordAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_texCoord');
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.enableVertexAttribArray(texCoordAttributeLocation);

  // Criar um buffer para os vértices
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // Criar um buffer para as coordenadas de textura
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  const texCoords = [
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // Carregar a imagem como textura
  texture = loadTexture('path/para/sua/imagem.jpg');

  // Definir a textura ativa
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const textureUniformLocation = gl.getUniformLocation(shaderProgram, 'u_texture');
  gl.uniform1i(textureUniformLocation, 0);

  // Limpar o canvas e desenhar a imagem
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

document.getElementById('connectButton').addEventListener('click', connectToPhantomWallet);

initWebGL();
>>>>>>> ced789e (adicionado web gl)
