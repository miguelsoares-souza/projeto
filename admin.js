
const form = document.getElementById("formUser");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const lista = document.getElementById("listaUsuarios");
const btnLimpar = document.getElementById("btnLimpar");
const btnExcluirTodos = document.getElementById("btnExcluirTodos");
const inputPesquisa = document.getElementById("pesquisa");


if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify([]));
}


renderLista(JSON.parse(localStorage.getItem("usuarios")));


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();

  if (!nome || !email) return;

  const data = new Date().toLocaleString("pt-BR");

  const novoUsuario = { data, nome, email };

  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  usuarios.push(novoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  renderLista(usuarios);
  form.reset();
});


btnLimpar.addEventListener("click", () => {
  form.reset();
});


btnExcluirTodos.addEventListener("click", () => {
  localStorage.setItem("usuarios", JSON.stringify([]));
  renderLista([]);
});


inputPesquisa.addEventListener("input", () => {
  const termo = inputPesquisa.value.toLowerCase();

  const usuarios = JSON.parse(localStorage.getItem("usuarios"));

  const filtrados = usuarios.filter(
    u =>
      u.nome.toLowerCase().includes(termo) ||
      u.email.toLowerCase().includes(termo)
  );

  renderLista(filtrados);
});


function renderLista(dados) {
  lista.innerHTML = "";

  dados.forEach((usuario, index) => {
    const li = document.createElement("li");
    li.style.padding = "12px";
    li.style.border = "1px solid var(--border)";
    li.style.borderRadius = "10px";
    li.style.marginBottom = "10px";
    li.style.background = "var(--bg-alt)";

    li.innerHTML = `
      <strong>${usuario.nome}</strong> — ${usuario.email}
      <br><small>${usuario.data}</small>
      <button class="btn btn--small" style="float:right; margin-top:5px;" data-index="${index}">
        Excluir
      </button>
    `;

    lista.appendChild(li);
  });

  
  document.querySelectorAll("button[data-index]").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.getAttribute("data-index");

      const usuarios = JSON.parse(localStorage.getItem("usuarios"));
      usuarios.splice(index, 1);

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      renderLista(usuarios);
    });
  });
}
