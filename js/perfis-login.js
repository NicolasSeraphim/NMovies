let usuarios = [];

function initializeData() {
    //localStorage.removeItem("galloflix-users");
    let dados = JSON.parse(localStorage.getItem("galloflix-users"));
    if (dados === null) {
        dados = [
            {
                nome: "Gallo",
                avatar: "img/avatar/outros/avatar1.png",
                crianca: false
            },
            {
                nome: "Capitão",
                avatar: "img/avatar/outros/avatar4.png",
                crianca: false
            },
            {
                nome: "Trizóio",
                avatar: "img/avatar/outros/avatar5.png",
                crianca: true
            }
        ];
        localStorage.setItem("galloflix-users", JSON.stringify(dados));
    }
    usuarios = dados;
}

window.onload = init();


function init() {
    initializeData();

    let ul = document.querySelector('ul');
    ul.innerHTML = '';

    for (let i = 0; i < usuarios.length; i++) {
        ul.innerHTML += showUser(usuarios[i]);
    }

    ul.innerHTML += showUser();

    document.getElementById("addUser").addEventListener("click", addUserInterface, false);
    document.getElementById("btnRoles").addEventListener("click", showEditOptions, false);

}


function showUser(user) {
    if (user == null)
        return `<li>
                    <a href="javascript:void(0)" id='addUser'>
                        <div class="profile">
                            <i class='bi bi-plus-circle-fill'></i>
                            <span>Adicionar perfil</span>
                        </div>
                    </a>
                </li>`
    else
        return `<li>
                    <a href="#">
                        <div class="profile">
                            <img src="${user.avatar}" alt="${user.nome}">
                            <span>${user.nome}</span>
                        </div>
                    </a>
                </li>`
}


function returnHome() {
    let container = document.querySelector('.container');
    container.classList.add('text-center');

    container.innerHTML = `<h1>Quem está assistindo?</h1>
                           <ul></ul>
                           <button id="btnRoles" class="btn">Gerenciar perfis</button>`;
    init();
}


function addUserInterface() {
    let container = document.querySelector('.container');
    container.classList.remove('text-center');
    container.innerHTML = `<h1>Adicionar perfil</h1>
                            <h3>Adicione um perfil Galloflix para outra pessoa.</h3>
                            <hr>
                            <form onsubmit="return false;">
                                <div class="form-group">
                                    <img src="img/avatar/outros/avatar2.png" alt="Avatar" class="avatar">
                                    <input type="text" name="nome" id="nome" placeholder="Nome" autocomplete="none">
                                    <div class="checkbox">
                                        <input type="checkbox" id="crianca">
                                        <label for="crianca">Criança?</label>
                                    </div>
                                </div>
                                <hr>
                                <div class="buttons">
                                    <button id="btnOk" class="btn">Continuar</button>
                                    <button id="btnCancel" class="btn">Cancelar</button>
                                </div>
                            </form>`;

    document.getElementById("btnCancel").addEventListener("click", returnHome, false);
    document.getElementById("btnOk").addEventListener("click", saveUser, false);
}


function saveUser() {
    let user = {
        nome: document.getElementById('nome').value,
        avatar: 'img/avatar/outros/avatar2.png',
        crianca: document.getElementById('crianca').checked
    };
    usuarios.push(user);
    localStorage.setItem("galloflix-users", JSON.stringify(usuarios));
    returnHome();
}


function showEditOptions() {
    let container = document.querySelector('.container');
    container.classList.add('text-center');

    container.innerHTML = `<h1>Gerenciar Perfis:</h1>
                           <ul></ul>
                           <button id="btnOk" class="btn">Concluído</button>`;

    let ul = document.querySelector('ul');
    ul.innerHTML = '';

    for (let i = 0; i < usuarios.length; i++) {
        ul.innerHTML += editItem(usuarios[i]);
    }

    ul.innerHTML += editItem();

    document.getElementById("btnOk").addEventListener("click", returnHome, false);
    document.getElementById("addUser").addEventListener("click", addUserInterface, false);
}


function editItem(user) {
    if (user == null)
        return `<li>
                    <a href="javascript:void(0)" id='addUser'>
                        <div class="profile">
                            <i class='bi bi-plus-circle-fill'></i>
                            <span>Adicionar perfil</span>
                        </div>
                    </a>
                </li>`
    else
        return `<li>
                    <a href="javascript:void(0)" onclick="editUserInterface('${user.nome}')" >
                        <div class="profile">
                            <div class="profile-image">
                                <img src="${user.avatar}" alt="${user.nome}">
                                <div class="overlay"></div>
                                <i class="icon bi bi-pencil-fill"></i>
                            </div>
                            <span>${user.nome}</span>
                        </div>
                    </a>
                </li>`
}


function editUserInterface(nome) {
    let user = usuarios.find(u => u.nome == nome);
    let container = document.querySelector('.container');
    container.classList.remove('text-center', 'w-330');
    container.innerHTML = `<h1>Editar perfil</h1>
                            <hr>
                            <form onsubmit="return false;">
                                <div class="form-container">
                                    <div class="left">
                                        <div class="imgBox">
                                            <img src="${user.avatar}" alt="Avatar">
                                            <i class="bi bi-pencil" onclick="editUserAvatarInterface('${user.nome}')"></i>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <input type="text" id="nome" placeholder="Nome" autocomplete="none" value="${user.nome}">
                                        <label class="opt">Idioma:</label>
                                        <select name="idioma" id="idioma">
                                            <option value="">Português</option>
                                            <option value="">Espanhol</option>
                                            <option value="">Inglês</option>
                                        </select>
                                        <label class="opt">Game ID:</label>
                                        <p>Seu ID é um nome exclusivo que será usado ao jogar com outros assinantes no GalloFlix Games. <a href="#">Saiba Mais</a></p>
                                        <input type="text" placeholder="Criar Game ID" autocomplete="none">
                                        <hr>
                                        <label class="opt">Configurações de classificação etária:</label>
                                        <label class="age">Todas as classificações etárias</label>
                                        <p>Mostrar títulos de todas as classificações etárias para este perfil.</p>
                                        <button class="btn">Editar</button>
                                        <hr>
                                        <label class="opt">Controles de início automático</label>
                                        <div class="checkbox">
                                            <input type="checkbox" id="proximo">
                                            <label for="proximo">Iniciar automaticamente o próximo episódio de uma série em todos os aparelhos.</label>
                                        </div>
                                        <div class="checkbox">
                                            <input type="checkbox" id="proximo">
                                            <label for="proximo">Iniciar automaticamente o próximo episódio de uma série em todos os aparelhos.</label>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="buttons">
                                    <button id="btnOk" onclick="updateUser('${nome}')" class="btn">Salvar</button>
                                    <button id="btnCancel" onclick="returnHome()" class="btn">Cancelar</button>
                                    <button id="btnDelete" class="btn" onclick="deleteUserInterface('${nome}')">Excluir</button>
                                </div>
                            </form>`;
    //document.getElementById("btnCancel").addEventListener("click", returnHome, false);
}


function editUserAvatarInterface(nome) {
    let user = usuarios.find(u => u.nome == nome);
    let container = document.querySelector('.container');
    container.classList.remove('text-center', 'w-330');
    container.innerHTML = `<div class="navbar">
                                <div class="item">
                                    <i class="bi bi-arrow-left-short" onclick="editUserInterface('${nome}')" ></i>
                                    <div>
                                        <h4>Editar perfil</h4>
                                        <h5>Escolha o ícone do seu perfil.</h5>
                                    </div>
                                </div>
                                <div class="user">
                                    <p>${user.nome}</p>
                                    <img src="${user.avatar}" alt="Avatar">
                                </div>
                            </div>

                            <div id="classicos" class="category">
                                <h2>Os Clássicos</h2>
                                <div class="slider"></div>
                            </div>

                            <div id="outros" class="category">
                                <h2>Os Gallos</h2>
                                <div class="slider"></div>
                            </div>`;
    let slider = document.querySelector('#classicos .slider');
    slider.innerHTML = '';
    for (let i = 1; i < 20; i++) {
        slider.innerHTML += `<img src="img/avatar/classicos/avatar${i}.png" alt="Avatar" onclick="saveUserAvatarInterface('${user.nome}', 'img/avatar/classicos/avatar${i}.png')">`;
    }

    slider = document.querySelector('#outros .slider');
    slider.innerHTML = '';
    for (let i = 1; i < 6; i++) {
        slider.innerHTML += `<img src="img/avatar/outros/avatar${i}.png" alt="Avatar">`;
    }
}

function saveUserAvatarInterface(nome, avatar) {
    let user = usuarios.find(u => u.nome == nome);
    let container = document.querySelector('.container');
    container.classList.add('text-center', 'w-330');
    container.innerHTML =  `<h3 class="text-white">Mudar o ícone do perfil?</h3>
                            <hr>
                            <div class="avatar-change">
                                <div>
                                    <img src="${user.avatar}" alt="Avatar Atual">
                                    <p>Atual</p>
                                </div>
                                <i class="bi bi-chevron-right"></i>
                                <div>
                                    <img src="${avatar}" alt="Novo Avatar">
                                    <p>Novo</p>
                                </div>
                            </div>
                            <hr>
                            <div class="buttons">
                                <button id="btnOk" onclick="saveUserAvatar('${nome}', '${avatar}')"  class="btn">Boa ideia</button>
                                <button id="btnCancel" onclick="editUserInterface('${nome}')" class="btn">Agora não</button>
                            </div>`;
}

function saveUserAvatar(nome, avatar) {
    let user = usuarios.find(u => u.nome == nome);
    let index = usuarios.indexOf(user);
    let upUser = {
        nome: nome,
        avatar: avatar,
        crianca: user.crianca
    };
    usuarios[index] = upUser;
    return editUserInterface(nome);
}


function updateUser(nome) {
    let user = usuarios.find(u => u.nome == nome);
    let index = usuarios.indexOf(user);
    let upUser = {
        nome: document.getElementById('nome').value,
        avatar: user.avatar,
        crianca: user.crianca
    };
    usuarios[index] = upUser;
    localStorage.setItem("galloflix-users", JSON.stringify(usuarios));
    returnHome();
}


function deleteUserInterface(nome) {
    let user = usuarios.find(u => u.nome == nome);
    let container = document.querySelector('.container');
    container.classList.remove('text-center');
    container.innerHTML = `<h1>Deseja excluir este perfil?</h1>
                            <hr>
                            <form onsubmit="return;">
                                <div class="form-container">
                                    <div class="left">
                                        <div class="imgBox">
                                            <img src="${user.avatar}" alt="Avatar">
                                            <p>${user.nome}</p>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <p class="text-center">Todo o histórico deste perfil, inclusive a Minha lista, avaliações e atividades recentes, serão apagadas para sempre e você não terá mais acesso a elas.</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="buttons">
                                    <button id="btnOk" onclick="editUserInterface('${nome}')" class="btn">Manter perfil</button>
                                    <button id="btnCancel" class="btn" onclick="deleteUser('${nome}')">Excluir perfil</button>
                                </div>
                            </form>`
}


function deleteUser(nome) {
    let user = usuarios.find(u => u.nome == nome);
    usuarios.splice(usuarios.indexOf(user), 1);
    localStorage.setItem("galloflix-users", JSON.stringify(usuarios));
    returnHome();
}

