
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
var titulo;
var total;

async function armazenarPlano(pagamentoinfo) {
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
                nome: usuarioLogado.nome,
                email: usuarioLogado.email,
                senha: usuarioLogado.senha,
                plano: {
                    planoescolhido: pagamentoinfo.planoEscolhido,
                    dataproxpag: pagamentoinfo.dataproxpagamento,
                    datapag: pagamentoinfo.datapagamento,
                    Tipoplano: pagamentoinfo.tipoplano,
                    formadepagamento: pagamentoinfo.formadepagamento,
                    nocart: pagamentoinfo.nocart,
                    valid: pagamentoinfo.valid,
                    cvv: pagamentoinfo.cvvv,
                    nomecomple: pagamentoinfo.nomecomple,
                    numcard: pagamentoinfo.numcard,
                    titulo: pagamentoinfo.tituloplano,
                    parcelame: pagamentoinfo.parcelame,
                    valortotal: pagamentoinfo.valortotal,
                }
            })
        });

        if (response.ok) {
            console.log('Dados do usuário atualizados com sucesso!');
            // Atualizar o LocalStorage com as novas informações do plano
            usuarioLogado.plano = {
                planoescolhido: pagamentoinfo.planoEscolhido,
                dataproxpag: pagamentoinfo.dataproxpagamento,
                datapag: pagamentoinfo.datapagamento,
                Tipoplano: pagamentoinfo.tipoplano,
                formadepagamento: pagamentoinfo.formadepagamento,
                nocart: pagamentoinfo.nocart,
                valid: pagamentoinfo.valid,
                cvv: pagamentoinfo.cvvv,
                nomecomple: pagamentoinfo.nomecomple,
                numcard: pagamentoinfo.numcard,
                tituloplano: pagamentoinfo.tituloplano,
                parcelame: pagamentoinfo.parcelame,
                valortotal: pagamentoinfo.valortotal
            };
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
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
            if (planoEscolhido == "basicomensal") { titulo = "Básico Mensal"; total = "R$: XX,XX" }
            else if (planoEscolhido == "mediomensal") { titulo = "Médio Mensal"; total = "R$: XX,XX" }
            else if (planoEscolhido == "avancadomensal") { titulo = "Avançado Mensal"; total = "R$: XX,XX" }

            const dataproxpag = soma30dias()
            const hojee = hoje()
            var pagamentoinfo = {
                "nocart": nocart,
                "valid": valid,
                "cvvv": cvvv,
                "nomecomple": nomecomple,
                "parcelame": "Plano não parcelado por ser mensal",
                "numcard": numcard,
                "formadepagamento": "Crédito",
                "tipoplano": "Mensal",
                "datapagamento": hojee,
                "dataproxpagamento": dataproxpag,
                "planoEscolhido": planoEscolhido,
                "tituloplano": titulo,
                "valortotal": total,

            }

            // localStorage.setItem('pagamentoinfo', JSON.stringify(pagamentoinfo));
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

        armazenarPlano(pagamentoinfo);
        const usuarioLogadoId = localStorage.getItem('usuarioLogado');
        const usuarioLogado = JSON.parse(usuarioLogadoId);
        usuarioLogado.plano = {
            planoescolhido: pagamentoinfo.planoEscolhido,
            dataproxpag: pagamentoinfo.dataproxpagamento,
            datapag: pagamentoinfo.datapagamento,
            Tipoplano: pagamentoinfo.tipoplano,
            formadepagamento: pagamentoinfo.formadepagamento,
            nocart: pagamentoinfo.nocart,
            valid: pagamentoinfo.valid,
            cvv: pagamentoinfo.cvvv,
            nomecomple: pagamentoinfo.nomecomple,
            numcard: pagamentoinfo.numcard,
            tituloplano: pagamentoinfo.tituloplano,
            parcelame: pagamentoinfo.parcelame,
            valortotal: pagamentoinfo.total,

        };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        window.location.href = "telaempres.html";




    } else {
        if (planoEscolhido == "basicoanual") { titulo = "Básico anual"; total = "R$: XX,XX" }
        else if (planoEscolhido == "medioanual") { titulo = "Médio anual"; total = "R$: XX,XX" }
        else if (planoEscolhido == "avancadoanual") { titulo = "Avançado anual"; total = "R$: XX,XX" }
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
                "dataproxpagamento": dataproxpag,
                "tituloplano": titulo,
                "valortotal": total,

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
        armazenarPlano(pagamentoinfo);
        const usuarioLogadoId = localStorage.getItem('usuarioLogado');
        const usuarioLogado = JSON.parse(usuarioLogadoId);
        usuarioLogado.plano = {
            planoescolhido: pagamentoinfo.planoEscolhido,
            dataproxpag: pagamentoinfo.dataproxpagamento,
            datapag: pagamentoinfo.datapagamento,
            Tipoplano: pagamentoinfo.tipoplano,
            formadepagamento: pagamentoinfo.formadepagamento,
            nocart: pagamentoinfo.nocart,
            valid: pagamentoinfo.valid,
            cvv: pagamentoinfo.cvvv,
            nomecomple: pagamentoinfo.nomecomple,
            numcard: pagamentoinfo.numcard,
            tituloplano: pagamentoinfo.tituloplano,
            parcelame: pagamentoinfo.parcelame,
            valortotal: pagamentoinfo.total,
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        window.location.href = "telaempres.html";

    }
}

function salvarpagamentodeb() {

    if (planoEscolhido == 'avancadomensal' || planoEscolhido == 'mediomensal' || planoEscolhido == 'basicomensal') {
        if (planoEscolhido == "basicomensal") { titulo = "Básico Mensal"; total = "R$: XX,XX" }
        else if (planoEscolhido == "mediomensal") { titulo = "Médio Mensal"; total = "R$: XX,XX" }
        else if (planoEscolhido == "avancadomensal") { titulo = "Avançado Mensal"; total = "R$: XX,XX" }
        const nocart = document.getElementById('nome-cartao1').value;
        const valid = document.getElementById('validade1').value;
        const cvvv = document.getElementById('cvvvv1').value;
        const nomecomple = document.getElementById('nome-completo1').value;
        // const parcelame = document.getElementById('validationCustom04').value;
        const numcard = document.getElementById('numero-cartao1').value;
        if (nocart.length >= 10 && valid.length == 5 && cvvv.length == 3 && nomecomple.length >= 10 && numcard.length == 19) {
            const dataproxpag = soma30dias()
            const hojee = hoje()

            const pagamentoinfo = {
                "nocart": nocart,
                "valid": valid,
                "cvvv": cvvv,
                "nomecomple": nomecomple,
                "parcelame": "Plano não parcelado por ser mensal",
                "numcard": numcard,
                "formadepagamento": "Débito",
                "tipoplano": "Mensal",
                "datapagamento": hojee,
                "dataproxpagamento": dataproxpag,
                "tituloplano": titulo,
                "valortotal": total,
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
        armazenarPlano(pagamentoinfo);
        const usuarioLogadoId = localStorage.getItem('usuarioLogado');
        const usuarioLogado = JSON.parse(usuarioLogadoId);
        usuarioLogado.plano = {
            planoescolhido: pagamentoinfo.planoEscolhido,
            dataproxpag: pagamentoinfo.dataproxpagamento,
            datapag: pagamentoinfo.datapagamento,
            Tipoplano: pagamentoinfo.tipoplano,
            formadepagamento: pagamentoinfo.formadepagamento,
            nocart: pagamentoinfo.nocart,
            valid: pagamentoinfo.valid,
            cvv: pagamentoinfo.cvvv,
            nomecomple: pagamentoinfo.nomecomple,
            numcard: pagamentoinfo.numcard,
            tituloplano: pagamentoinfo.tituloplano,
            parcelame: pagamentoinfo.parcelame,
            valortotal: pagamentoinfo.total,

        };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        window.location.href = "telaempres.html";

    } else {
        if (planoEscolhido == "basicoanual") { titulo = "Básico anual"; total = "R$: XX,XX" }
        else if (planoEscolhido == "medioanual") { titulo = "Médio anual"; total = "R$: XX,XX" }
        else if (planoEscolhido == "avancadoanual") { titulo = "Avançado anual"; total = "R$: XX,XX" }
        const nocart = document.getElementById('nome-cartao1').value;
        const valid = document.getElementById('validade1').value;
        const cvvv = document.getElementById('cvvvv1').value;
        const nomecomple = document.getElementById('nome-completo1').value;
        const parcelame = document.getElementById('validationCustom04').value;
        const numcard = document.getElementById('numero-cartao1').value;
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
                "formadepagamento": "Débito",
                "tipoplano": "Anual",
                "datapagamento": hojee,
                "dataproxpagamento": dataproxpag,
                "tituloplano": titulo,
                "valortotal": total,
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
        armazenarPlano(pagamentoinfo);
        const usuarioLogadoId = localStorage.getItem('usuarioLogado');
        const usuarioLogado = JSON.parse(usuarioLogadoId);
        usuarioLogado.plano = {
            planoescolhido: pagamentoinfo.planoEscolhido,
            dataproxpag: pagamentoinfo.dataproxpagamento,
            datapag: pagamentoinfo.datapagamento,
            Tipoplano: pagamentoinfo.tipoplano,
            formadepagamento: pagamentoinfo.formadepagamento,
            nocart: pagamentoinfo.nocart,
            valid: pagamentoinfo.valid,
            cvv: pagamentoinfo.cvvv,
            nomecomple: pagamentoinfo.nomecomple,
            numcard: pagamentoinfo.numcard,
            tituloplano: pagamentoinfo.tituloplano,
            parcelame: pagamentoinfo.parcelame,
            valortotal: pagamentoinfo.total,

        };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        window.location.href = "telaempres.html";

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