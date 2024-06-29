
var planoEscolhido = localStorage.getItem('planoEscolhido');
var planoss2 = {
    "plano1": {
        "titulo": "Básico",
        "valor": "R$ XX,XX",
        "GB": "X GB de Armazenamento",
        "grafico": "Não oferece gráfico e relatorio de vendas automatico",
        "distribição": "Não estabelece conexões com centros de distribuições",
    },
    "plano2": {
        "titulo": "Médio",
        "valor": "R$ YY,YY",
        "GB": "Y GB de Armazenamento",
        "grafico": "Não oferece gráfico e relatorio de vendas automatico",
        "distribição": "Não estabelece conexões com centros de distribuições",
    },
    "plano3": {
        "titulo": "Avançado",
        "valor": "R$ zz,zz",
        "GB": "X GB de Armazenamento",
        "grafico": "Gráfico e relatorio de vendas automatico",
        "distribição": "Estabelece conexões com centros de distribuições",
    },
    "plano11": {
        "titulo": "Básico",
        "valor": "R$XX,XX",
    },
    "plano22": {
        "titulo": "Médio",
        "valor": "R$ YY,YY",

    },
    "plano33": {
        "titulo": "Avançado",
        "valor": "R$ zz,zz",
    }
}

async function armazenarPlano(planoEscolhido) {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const usuarioId = usuarioLogado.id;
  
    try {
      const response = await fetch(`http://localhost:3000/users/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({   
          id: usuarioLogado.id, 
          nome: usuarioLogado.nome, // Adiciona o nome
          email: usuarioLogado.email, // Adiciona o email
          senha: usuarioLogado.senha,  // Adiciona a senha
          plano: planoEscolhido
        })
      });
  
      if (response.ok) {
        console.log('Dados do usuário atualizados com sucesso!');
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar os dados do usuário:', response.status, errorData.error);
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error.message);
    }
  }
  




function salvarpagamentocred() {
    if (planoEscolhido == 'avancadomensal' || planoEscolhido == 'mediomensal' || planoEscolhido == 'basicomensal') {

        const nocart = document.getElementById('nome-cartao').value;
        const valid = document.getElementById('validade').value;
        const cvvv = document.getElementById('cvvvv').value;
        const nomecomple = document.getElementById('nome-completo').value;
        //const parcelame = document.getElementById('validationCustom04').value;
        const numcard = document.getElementById('numero-cartao').value;

        if (nocart.length >= 10 && valid.length == 5 && cvvv.length == 3 && nomecomple.length >= 10 && numcard.length == 19) {

            const dataproxpag = soma30dias()
            const hojee = hoje()
            const pagamentoinfo = {
                "nocart": nocart,
                "valid": valid,
                "cvvv": cvvv,
                "nomecomple": nomecomple,
                // "parcelame": parcelame,
                "numcard": numcard,
                "formadepagamento": "Crédito",
                "tipoplano": "Mensal",
                "datapagamento": hojee,
                "dataproxpagamento": dataproxpag

            }

            localStorage.setItem('pagamentoinfo', JSON.stringify(pagamentoinfo));
            if (planoEscolhido == 'mediomensal' || planoEscolhido == 'basicomensal') {
                localStorage.setItem('confirmacao', 'false');
            }
            else {
                localStorage.setItem('confirmacao', 'true');
            }
            alert("Pagamento Realizado com Sucesso!");
            alert("Você comprou um plano mensal, lembre-se que a renovação automatica está ativada!");
            //window.location.href = 'telaempres.html';
        } else {
            alert("Não foi possível prosseguir com o pagamento, verifique as informações e tente novamente!")
        }

        armazenarPlano(planoEscolhido);


    } else {
        const nocart = document.getElementById('nome-cartao').value;
        const valid = document.getElementById('validade').value;
        const cvvv = document.getElementById('cvvvv').value;
        const nomecomple = document.getElementById('nome-completo').value;
        const parcelame = document.getElementById('validationCustom04').value;
        const numcard = document.getElementById('numero-cartao').value;
        console.log(numcard.length)
        if (nocart.length >= 10 && valid.length == 5 && cvvv.length == 3 && nomecomple.length >= 10 && numcard.length == 19) {
            const dataproxpag = soma365dias()
            const hojee = hoje()
            const pagamentoinfo = {
                "nocart": nocart,
                "valid": valid,
                "cvvv": cvvv,
                "nomecomple": nomecomple,
                "parcelame": parcelame,
                "numcard": numcard,
                "formadepagamento": "Crédito",
                "tipoplano": "Anual",
                "datapagamento": hojee,
                "dataproxpagamento": dataproxpag
            }

            localStorage.setItem('pagamentoinfo', JSON.stringify(pagamentoinfo));
            if (planoEscolhido == 'mediomensal' || planoEscolhido == 'basicomensal') {
                localStorage.setItem('confirmacao', 'false');
            }
            else {
                localStorage.setItem('confirmacao', 'true');
            }
            alert("Pagamento Realizado com Sucesso!");
            alert("Você comprou um plano Anual");
            //window.location.href = 'telaempres.html';
        } else {
            alert("Não foi possível prosseguir com o pagamento, verifique as informações e tente novamente!")
        }
        //Armazenar informação do plano: 
        armazenarPlano(planoEscolhido)

    }
}

function salvarpagamentodeb() {

    if (planoEscolhido == 'avancadomensal' || planoEscolhido == 'mediomensal' || planoEscolhido == 'basicomensal') {
        const nocart = document.getElementById('nome-cartao1').value;
        const valid = document.getElementById('validade1').value;
        const cvvv = document.getElementById('cvvvv1').value;
        const nomecomple = document.getElementById('nome-completo1').value;
        //const parcelame = document.getElementById('validationCustom04').value;
        const numcard = document.getElementById('numero-cartao1').value;
        if (nocart.length >= 10 && valid.length == 5 && cvvv.length == 3 && nomecomple.length >= 10 && numcard.length == 19) {
            const dataproxpag = soma30dias()
            const hojee = hoje()

            const pagamentoinfo = {
                "nocart": nocart,
                "valid": valid,
                "cvvv": cvvv,
                "nomecomple": nomecomple,
                // "parcelame": parcelame,
                "numcard": numcard,
                "formadepagamento": "Débito",
                "tipoplano": "Mensal",
                "datapagamento": hojee,
                "dataproxpagamento": dataproxpag
            }

            localStorage.setItem('pagamentoinfo', JSON.stringify(pagamentoinfo));
            if (planoEscolhido == 'mediomensal' || planoEscolhido == 'basicomensal') {
                localStorage.setItem('confirmacao', 'false');
            }
            else {
                localStorage.setItem('confirmacao', 'true');
            }
            alert("Pagamento Realizado com Sucesso!");
            alert("Você comprou um plano mensal, lembre-se que a renovação automatica está ativada!");
            //window.location.href = 'telaempres.html';
        } else {
            alert("Não foi possível prosseguir com o pagamento, verifique as informações e tente novamente!")
        }
        //Armazenar informação do plano: 
        armazenarPlano(planoEscolhido)

    } else {
        const nocart = document.getElementById('nome-cartao1').value;
        const valid = document.getElementById('validade1').value;
        const cvvv = document.getElementById('cvvvv1').value;
        const nomecomple = document.getElementById('nome-completo1').value;
        //const parcelame = document.getElementById('validationCustom04').value;
        const numcard = document.getElementById('numero-cartao1').value;
        if (nocart.length >= 10 && valid.length == 5 && cvvv.length == 3 && nomecomple.length >= 10 && numcard.length == 19) {
            const dataproxpag = soma365dias()
            const hojee = hoje()
            const pagamentoinfo = {
                "nocart": nocart,
                "valid": valid,
                "cvvv": cvvv,
                "nomecomple": nomecomple,
                //"parcelame": parcelame,
                "numcard": numcard,
                "formadepagamento": "Débito",
                "tipoplano": "Anual",
                "datapagamento": hojee,
                "dataproxpagamento": dataproxpag
            }

            localStorage.setItem('pagamentoinfo', JSON.stringify(pagamentoinfo));
            if (planoEscolhido == 'mediomensal' || planoEscolhido == 'basicomensal') {
                localStorage.setItem('confirmacao', 'false');
            }
            else {
                localStorage.setItem('confirmacao', 'true');
            }
            alert("Pagamento Realizado com Sucesso!");
            alert("Você comprou um plano mensal, lembre-se que a renovação automatica está ativada!");
            //window.location.href = 'telaempres.html';
        } else {
            alert("Não foi possível prosseguir com o pagamento, verifique as informações e tente novamente!")
        }
        //Armazenar informação do plano: 
        armazenarPlano(planoEscolhido)


    }
}

function hoje() {
    const hoje = new Date();

    const hojeee = new Date(hoje);
    const hojee = hojeee.toLocaleDateString();

    return hojee;
}

function soma30dias() {
    const hoje = new Date();

    const daquidias = new Date(hoje);
    daquidias.setDate(daquidias.getDate() + 30);

    const daquidiass = daquidias.toLocaleDateString();

    return daquidiass;
}


function soma365dias() {
    const hoje = new Date();

    const daquidias = new Date(hoje);
    daquidias.setDate(daquidias.getDate() + 365);

    const daquidiass = daquidias.toLocaleDateString();

    return daquidiass;
}