const list = document.querySelector('#lista-tarefas');
const buttonAdd = document.querySelector('#criar-tarefa');
const buttonDelete = document.querySelector('#apaga-tudo');
const buttonRemoveComplete = document.querySelector('#remover-finalizados');
const moveCima = document.querySelector('#mover-cima');

// cria novo item da lista
function pushItem() {
  const inputValue = document.querySelector('#texto-tarefa');
  const itemLine = document.createElement('li');
  itemLine.classList = 'item';
  itemLine.style.cursor = 'Pointer';
  itemLine.innerText = inputValue.value;
  inputValue.value = '';
  list.appendChild(itemLine);
}

buttonAdd.addEventListener('click', pushItem);

// adiciona a cor gray
const itemList = list;
itemList.addEventListener('click', (event) => {
  const li = document.querySelectorAll('li');
  for (let i = 0; i < li.length; i += 1) {
    li[i].classList.remove('item-setado');
  }
  const itemSetado = event.target;
  console.log(itemSetado);
  itemSetado.classList.add('item-setado');
});

itemList.addEventListener('dblclick', (event) => {
  const itemClicado = event.target;
  itemClicado.classList.toggle('completed');
});

// remover toda a lista
buttonDelete.addEventListener('click', () => {
  const alvoRemove = document.querySelector('#lista-tarefas');
  alvoRemove.innerHTML = '';
});

// romover as que estão finalizadas
buttonRemoveComplete.addEventListener('click', () => {
  const itemsLi = document.querySelectorAll('.completed');
  for (let i = 0; i < itemsLi.length; i += 1) {
    list.removeChild(itemsLi[i]);
  }
});

// mover para cima
function moveItemsCima() {
  const lineItems = document.querySelector('.item-setado');
  if (lineItems === null) return;
  if (lineItems.previousElementSibling === null) return;
  lineItems.parentNode.insertBefore(lineItems, lineItems.previousElementSibling);
}

moveCima.addEventListener('click', moveItemsCima);

const buttonMoveBaixo = document.querySelector('#mover-baixo');

function moveItemsBaixo() {
  const lineItems = document.querySelector('.item-setado');
  if (lineItems === null) return;
  if (lineItems.nextElementSibling === null) return;
  lineItems.parentNode.insertBefore(lineItems.nextElementSibling, lineItems);
}

buttonMoveBaixo.addEventListener('click', moveItemsBaixo);

const buttonSave = document.querySelector('#salvar-tarefas');

function salvarStorage(array) {
  localStorage.setItem('lista', JSON.stringify(array));
}

function criarObjeto() {
  const listaItems = document.querySelector('#lista-tarefas');
  const listaFilhos = listaItems.children;
  const array = [];
  for (let i = 0; i < listaFilhos.length; i += 1) {
    array.push({
      id: i,
      text: listaFilhos[i].innerHTML,
      class: listaFilhos[i].className,
    });
  }
  salvarStorage(array);
}

buttonSave.addEventListener('click', criarObjeto);

function criaElemento(listaLocalStorage) {
  const ol = document.querySelector('#lista-tarefas');

  for (let i = 0; i < listaLocalStorage.length; i += 1) {
    const item = document.createElement('li');
    item.classList = listaLocalStorage[i].class;
    item.innerText = listaLocalStorage[i].text;
    item.style.cursor = 'Pointer';
    ol.appendChild(item);
  }
}

const buttonRomoveSelect = document.querySelector('#remover-selecionado');
buttonRomoveSelect.addEventListener('click', function () {
  const lineItems = document.querySelector('.item-setado');
  list.removeChild(lineItems);
})

window.onload = function () {
  if (localStorage.getItem('lista')) {
    const listaLocalStorage = JSON.parse(localStorage.getItem('lista'));
    criaElemento(listaLocalStorage);
  }
};
