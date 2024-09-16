const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require('fs').promises

let mensagem = 'Bem-vindo ao app de metas'
let metas

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile('./app/metas.json', 'utf-8')
    metas = JSON.parse(dados)
  } catch (erro) {
    metas = []
  }
}

const salvarMetas = async () => {
  await fs.writeFile('./app/metas.json', JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
  const meta = await input({ message: 'Digite a meta:' })

  if (meta.length == 0) {
    console.log('A meta não pode ser vazia.')
    return // posso chamar a função novamente cadastrarMeta()
  }

  metas.push({ value: meta, checked: false })
  mensagem = 'Meta cadastrada com sucesso!'
}

const listarMetas = async () => {
  // if adicionado por mim //
  if (metas.length == 0) {
    mensagem = 'Não existe(m) meta(s) cadastrada(s).'
    return
  }

  const respostas = await checkbox({
    message:
      'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.',
    choices: [...metas], // aqui estou copiando o array de metas para aqui, gerando uma cópia, para não manipular direto
    instructions: false
  })

  metas.forEach(meta => {
    meta.checked = false
  })

  if (respostas.length == 0) {
    mensagem = 'Nenhuma meta selecionada!'
    return
  }

  respostas.forEach(resposta => {
    const meta = metas.find(meta => {
      return meta.value == resposta
    })

    meta.checked = true

    mensagem = 'Meta(s) marcadas como concluída(s).'
  })
}

const metasRealizadas = async () => {
  if (metas.length == 0) {
    mensagem = 'Não existem metas cadastradas'
    return
  }

  const realizadas = metas.filter(meta => {
    return meta.checked // para entrar no filter, esse retorno tem que ser 'true'
  })
  // .filter -> retorna opções de um array dada uma condição; para retornar, a condição tem que ser verdade sempre!

  if (realizadas.length == 0) {
    mensagem = 'Não existem metas realizadas :('
    return
  }

  await select({
    message: 'Metas Realizadas: ' + realizadas.length,
    choices: [...realizadas]
  })
}

const metasAbertas = async () => {
  if (metas.length == 0) {
    mensagem = 'Não existem metas cadastradas'
  }

  const abertas = metas.filter(meta => {
    return meta.checked != true // pode ser usado a '!' exclamação = !meta.checked
    // para entrar na lista, temos que mudar a lógica para que o 'meta.checked' false na lista retorna verdade para entrar nas metas abertas
  })

  if (abertas.length == 0) {
    mensagem = 'Não existem metas abertas :)'
    return
  }

  await select({
    message: 'Metas abertas: ' + abertas.length,
    choices: [...abertas]
  })
}

const removerMetas = async () => {
  if (metas.length == 0) {
    mensagem = 'Não existe(m) meta(s) para remover.'
    return
  }

  const metasDesmarcadas = metas.map(meta => {
    return { value: meta.value, checked: false }
  })

  const listaARemover = await checkbox({
    message: 'Selecione item para remover',
    choices: [...metasDesmarcadas], // aqui estou copiando o array de metas para aqui, gerando uma cópia, para não manipular direto
    instructions: false
  })

  if (listaARemover.length == 0) {
    mensagem = 'Nenhum item para remover'
    return
  }

  listaARemover.forEach(item => {
    metas = metas.filter(meta => {
      return meta.value != item
    })
  })

  mensagem = 'Meta(s) removida(s) com sucesso.'
}

const mostrarMensagem = () => {
  console.clear()
  if (mensagem != '') {
    console.log(mensagem)
    console.log('')
    mensagem = ''
  }
}

const start = async () => {
  await carregarMetas()

  while (true) {
    mostrarMensagem()
    await salvarMetas()

    const option = await select({
      message: 'Menu >',
      choices: [
        {
          name: 'Cadastrar meta',
          value: 'cadastrar'
        },
        {
          name: 'Listar metas',
          value: 'listar'
        },
        {
          name: 'Metas realizadas',
          value: 'realizadas'
        },
        {
          name: 'Metas abertas',
          value: 'abertas'
        },
        {
          name: 'Remover metas',
          value: 'remover'
        },
        {
          name: 'Sair',
          value: 'sair'
        }
      ]
    })
    // message e choices são propriedades padrão do 'select' da biblioteca inquirer, tem que ser nesse modelo
    // await - espera a opção do usuário - senão o código não irá aguardar a seleção
    // a função que tem o 'await' é uma promessa que os dados irão retornar
    // dentro do 'choices', dado o que foi selecionado pelo usuário, será atribuído ao 'option' o 'value' de cada opção existente na lista

    switch (option) {
      case 'cadastrar':
        await cadastrarMeta()
        break
      case 'listar':
        await listarMetas()
        break
      case 'realizadas':
        await metasRealizadas()
        break
      case 'abertas':
        await metasAbertas()
        break
      case 'remover':
        await removerMetas()
        break
      case 'sair':
        console.log('Até a próxima')
        return
      // o return dentro de uma função 'encerra' ela automaticamente
    }
  }
}

start()
