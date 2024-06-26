/* alert("Bem-vindo ao seu menu de produção!!!") */



document.addEventListener("DOMContentLoaded", function () {
  const cardDiv = document.querySelector("#prd1");
  cardDiv.style.display = "none";

  const btn_prod = document.getElementById("btn_prod");
  btn_prod.addEventListener("click", function () {
    if (cardDiv.style.display === "none") {
      cardDiv.style.display = "block";
      cardDiv4.style.display = "none";
      cardDiv2.style.display = "none";
      cardDiv3.style.display = "none";
    } else {
      cardDiv.style.display = "none";
    }
  });

  const cardDiv4 = document.querySelector("#edit1");
  cardDiv4.style.display = "none";

  const btn_edit = document.getElementById("btn_edit");
  btn_edit.addEventListener("click", function () {
    if (cardDiv4.style.display === "none") {
      cardDiv.style.display = "none";
      cardDiv4.style.display = "block";
      cardDiv2.style.display = "none";
      cardDiv3.style.display = "none";
    } else {
      cardDiv4.style.display = "none";
    }
  });

  const cardDiv2 = document.querySelector("#prd2");
  cardDiv2.style.display = "none"; // Esconde o card inicialmente

  const btn_novo = document.getElementById("btn_novo");
  btn_novo.addEventListener("click", function () {
    if (cardDiv2.style.display === "none") {
      cardDiv.style.display = "none";
      cardDiv4.style.display = "none";
      cardDiv2.style.display = "block";
      cardDiv3.style.display = "none"; // Exibe o card ao clicar no botão "btn_novo"
    } else {
      cardDiv2.style.display = "none"; // Esconde o card se já estiver visível
    }
  });


  const cardDiv3 = document.querySelector("#prd3");
  cardDiv3.style.display = "none"; // Esconde o card inicialmente

  const btn_ex = document.getElementById("btn_ex");
  btn_ex.addEventListener("click", function () {
    if (cardDiv3.style.display === "none") {
      cardDiv.style.display = "none";
      cardDiv4.style.display = "none";
      cardDiv2.style.display = "none";
      cardDiv3.style.display = "block"; // Exibe o card ao clicar no botão "btn_prod"
    } else {
      cardDiv3.style.display = "none"; // Esconde o card se já estiver visível
    }
  });
  preencherTabela();
  preencherTabelamp();



  var formExcluir = document.getElementById("prd3");

  formExcluir.addEventListener("submit", (e) => {
    e.preventDefault();

    var codigo = document.getElementById("cod_ex").value.trim();

    console.log("Código:", codigo);

    excluirLinhaTabela(codigo);

    document.getElementById("cod_ex").value = "";
    alert("Matéria-prima excluída!");
  });

  // Função para excluir uma linha da tabela e remover do localStorage
  function excluirLinhaTabela(codigo) {
    // Obtém a referência para a tabela
    var tabelaa = document.getElementById("tabela-corpomp");

    if (!tabelaa) {
      console.error("Elemento com o ID 'tabela-corpomp' não encontrado.");
      return;
    }

    // Percorre as linhas da tabela
    for (var i = 1; i < tabelaa.rows.length; i++) {
      var row = tabelaa.rows[i];
      var codCell = row.cells[0];

      // Verifica se o código e o lote da linha correspondem aos valores especificados
      if (codCell.textContent.trim() === codigo) {
        console.log("Linha encontrada:", row);

        // Remove a linha da tabela visual
        tabelaa.deleteRow(i);

        // Remove o item correspondente do localStorage
        removerItemLocalStorage(codigo);
        break;
      }
    }
  }

  // Função para remover um item do localStorage
  function removerItemLocalStorage(codigo) {
    // Verifica se o item existe no localStorage
    if (localStorage.hasOwnProperty("prod2")) {
      // Recupera os dados do localStorage
      var produtos = JSON.parse(localStorage.getItem("prod2"));

      console.log("Produtos antes da remoção:", produtos);

      // Filtra o array de produtos para remover o item correspondente
      produtos = produtos.filter(function (item) {
        return item.cod2 !== codigo;
      });

      console.log("Produtos depois da remoção:", produtos);

      // Atualiza o localStorage com o novo array de produtos
      localStorage.setItem("prod2", JSON.stringify(produtos));
    } else {
      console.log("Chave 'prod2' não encontrada no localStorage.");
    }
  }







});


//Botões de validação --> Iniciar Produção
var cadForm = document.getElementById("prd1");

// Aguardar o usuário clicar no botão cadastrar do formulário
cadForm.addEventListener("submit", (e) => {

  // Não recarregar a página
  e.preventDefault();

  // Receber os dados do formulário
  var cod1 = document.getElementById('cod1').value;
  var descprod1 = document.getElementById('descprod1').value;
  var loteprod1 = document.getElementById('loteprod1').value;
  var qtdprod1 = document.getElementById('qtdprod1').value;
  var validprod1 = document.getElementById('validprod1').value;
  var valor1 = document.getElementById('valor1').value;
  var ncm1 = document.getElementById('ncm1').value;
  var uni1 = document.getElementById('uni1').value;
  // O Array() é usado para criar Array de objetos
  let prod1 = new Array();

  // Verifica se a propriedade no localStorage
  if (localStorage.hasOwnProperty("prod1")) {
    // Recuperar os valores da propriedade usuarios do localStorage
    // Converte de String para Object
    prod1 = JSON.parse(localStorage.getItem("prod1"));
  }

  // Adiciona um novo objeto no array criado
  prod1.push({ cod1, descprod1, loteprod1, qtdprod1, validprod1, valor1, ncm1, uni1 });

  // Salva no localStorage
  localStorage.setItem("prod1", JSON.stringify(prod1));

  document.getElementById("cod1").value = "";
  document.getElementById("descprod1").value = "";
  document.getElementById("loteprod1").value = "";
  document.getElementById("qtdprod1").value = "";
  document.getElementById("validprod1").value = "";
  document.getElementById("valor1").value = "";
  document.getElementById("ncm1").value = "";
  document.getElementById("uni1").value = "";



  if (localStorage.hasOwnProperty("prod_vendas")) {
    // Recuperar os valores da propriedade usuarios do localStorage
    // Converte de String para Object
    prod_vendas = JSON.parse(localStorage.getItem("prod_vendas"));
  }

  // Adiciona um novo objeto no array criado
  prod_vendas.push({ cod1, descprod1, loteprod1, qtdprod1, validprod1, valor1, ncm1, uni1 });

  // Salva no localStorage
  localStorage.setItem("prod1", JSON.stringify(prod1));

  document.getElementById("cod1").value = "";
  document.getElementById("descprod1").value = "";
  document.getElementById("loteprod1").value = "";
  document.getElementById("qtdprod1").value = "";
  document.getElementById("validprod1").value = "";
  document.getElementById("valor1").value = "";
  document.getElementById("ncm1").value = "";
  document.getElementById("uni1").value = "";



  addDataprod(cod1, validprod1, qtdprod1, valor1);
  
  location.reload();

  alert("Produção realizada com sucesso!")

});


cadForm.addEventListener("reset", (e) => {

});




//Botões de validação --> Iniciar Produção
var cadFormmp = document.getElementById("prd2");

// Aguardar o usuário clicar no botão cadastrar do formulário
cadFormmp.addEventListener("submit", (e) => {

  // Não recarregar a página
  e.preventDefault();

  // Receber os dados do formulário
  var cod2 = document.getElementById('cod2').value;
  var descprod2 = document.getElementById('descprod2').value;
  var un2 = document.getElementById('un2').value;
  var qtdprod2 = document.getElementById('qtdprod2').value;
  var validprod2 = document.getElementById('validprod2').value;
  // O Array() é usado para criar Array de objetos
  let prod2 = new Array();

  // Verifica se a propriedade no localStorage
  if (localStorage.hasOwnProperty("prod2")) {
    // Recuperar os valores da propriedade usuarios do localStorage
    // Converte de String para Object
    prod2 = JSON.parse(localStorage.getItem("prod2"));
  }

  // Adiciona um novo objeto no array criado
  prod2.push({ cod2, descprod2, un2, qtdprod2, validprod2 });

  // Salva no localStorage
  localStorage.setItem("prod2", JSON.stringify(prod2));

  document.getElementById("cod2").value = "";
  document.getElementById("descprod2").value = "";
  document.getElementById("un2").value = "";
  document.getElementById("qtdprod2").value = "";
  document.getElementById("validprod2").value = "";
  location.reload();

  alert("Matéria-prima cadastrada com sucesso!")

});


cadFormmp.addEventListener("reset", (e) => {

});





var linhacod1 = [];
var linhavalid1 = [];
var linhaqtd1 = [];
var linhavalor1 = [];
var idprod = 0;
editIndex = -1;

function addDataprod(cod1, validprod1, qtdprod1, valor1) {
  linhacod1.push(cod1);
  linhavalid1.push(validprod1);
  linhaqtd1.push(qtdprod1);
  linhavalor1.push(valor1);

  saveprod_vendas();
}


function saveprod_vendas() {
  var prod_vendas = {
      cod1: linhacod1,
      validprod1: linhavalid1,
      qtdprod1: linhaqtd1,
      valor1: linhavalor1
  };

  localStorage.setItem("prod_vendas", JSON.stringify(prod_vendas));
}