(() => {
  const descriptions = {
    "livro do desassossego|fernando pessoa": "Em fragmentos atribuídos principalmente a Bernardo Soares, um ajudante de guarda-livros em Lisboa observa a cidade, sonha e reflete sobre a solidão e o cotidiano.",
    "o conto da aia|margaret atwood": "Em Gilead, uma teocracia que controla a reprodução, Offred tenta sobreviver enquanto recorda a vida que lhe foi tirada.",
    "o rei de amarelo|robert w chambers": "Uma peça proibida e perturbadora liga parte dos contos desta coletânea, em que arte, obsessão e acontecimentos sobrenaturais desestabilizam os personagens.",
    "onde foi que eu errei|michele borba": "A educadora propõe estratégias práticas para lidar com conflitos e comportamentos difíceis das crianças, com orientações para a convivência em família.",
    "voce pode fazer a diferenca|stacey abrams": "A autora usa sua trajetória para discutir como pessoas com menos acesso a oportunidades podem enfrentar barreiras e desenvolver sua capacidade de liderar.",
    "fazer amigos na era da solidao|adam smiley poswolsky": "O autor apresenta práticas para fazer novas amizades, retomar vínculos e cultivar relações mais próximas em uma época marcada pelo isolamento.",
    "primeira manha|jean claude kaufmann": "O sociólogo analisa como gestos e expectativas da primeira manhã juntos revelam muito sobre o início de uma relação amorosa.",
    "acesso a justica e cidadania|maria aparecida lucca caovilla": "A obra discute o acesso à justiça e sua relação com o exercício da cidadania, com atenção às barreiras enfrentadas por quem precisa de assistência jurídica.",
    "empoderamento feminino colecao slam|emerson alcalde org": "Antologia organizada por Emerson Alcalde que reúne poemas de slam sobre experiências de mulheres, desigualdade e afirmação de suas vozes.",
    "zezinho o dono da porquinha preta|jair vitoria": "Zezinho se afeiçoa a uma porquinha e precisa lidar com o destino que os adultos planejam para ela. A história explora o vínculo entre uma criança e um animal.",
    "as aventuras de xisto|lucia machado de almeida": "Xisto parte com seu companheiro Bruzo e vive aventuras em um mundo de inspiração medieval, com perigos e encontros fantásticos.",
    "veneno digital|walcyr carrasco": "Camila muda de cidade depois que o pai perde o emprego. Ao tentar se adaptar e fazer novas amizades, vê sua vida se complicar com conflitos que passam pelo mundo digital.",
    "onde esta daisy mason|cara hunter": "Daisy, de oito anos, desaparece durante uma festa de família. O investigador Adam Fawley busca respostas entre vizinhos e parentes cujos relatos deixam lacunas.",
    "misterio em windsor|s j bennett": "Após a morte de um convidado no castelo de Windsor, a rainha Elizabeth II investiga discretamente o caso, contando com a ajuda de sua secretária.",
    "desenfreados parte i|kelly m": "Ryen guarda uma paixão pelo amigo do irmão, Kellan. Uma tragédia muda a vida dos dois e deixa perguntas que reaparecem quando seus caminhos voltam a se cruzar.",
    "desenfreados parte ii|kelly m": "A segunda parte retoma a relação conturbada de Ryen e Kellan, marcada por um reencontro, segredos e consequências do passado.",
    "taming 7 os garotos de tommen livro 5|chloe walsh": "Gibsie usa o humor para esconder um passado doloroso. Claire, que o conhece desde a infância, tenta se aproximar quando ele mais precisa de apoio.",
    "assistente do vilao|hannah nicole maehrer": "Evie Sage aceita trabalhar para o temido Vilão para sustentar a família. Entre tarefas inusitadas e um possível sabotador, ela começa a enxergar o chefe de outra forma.",
    "era uma vez um coracao partido|stephanie garber": "Evangeline faz um acordo com Jacks, o Príncipe de Copas, para impedir um casamento. A barganha a leva a um mundo de magia em que promessas têm consequências.",
    "as viagens de gulliver|jonathan swift": "Gulliver viaja por terras povoadas por seres como os minúsculos habitantes de Lilipute e os gigantes de Brobdingnag. Suas aventuras satirizam costumes e instituições humanas.",
    "daqui nao saio|marco balzano": "Trina resiste às pressões do fascismo e da guerra em um povoado alpino, ameaçado também por um projeto que pode submergir suas casas.",
    "na ponta dos pes|adair de aguiar neitzel maria lindamir de aguiar neitzel": "Uma menina sonha em ser equilibrista. Seu desejo conduz uma história ilustrada sobre imaginação e a descoberta do que se quer fazer.",
    "noites brancas|fiodor dostoievski": "Um jovem solitário conhece Nástienka durante suas caminhadas noturnas por São Petersburgo. Em poucos encontros, ele se apaixona enquanto ela espera pelo retorno de outro homem.",
    "mulherzinhas|louisa may alcott": "As irmãs Meg, Jo, Beth e Amy March crescem nos Estados Unidos durante a Guerra Civil. Entre perdas, dificuldades e sonhos, cada uma procura seu próprio caminho.",
    "blue period vol 1|tsubasa yamaguchi": "Yatora, um estudante que parece satisfeito com a própria vida, descobre a pintura e passa a encarar o desafio de se expressar pela arte.",
    'dom casmurro|machado de assis': 'Bentinho revisita sua juventude e seu casamento com Capitu. Ao narrar suas lembranças, ele mistura afeto, ciúme e suspeitas, deixando ao leitor a tarefa de avaliar sua versão.',
    'dom casmurro|toni brandao': 'Nesta adaptação do romance de Machado de Assis, Bentinho revisita sua história com Capitu e as suspeitas que marcaram seu casamento.',
    'o cortico|aluisio azevedo': 'A vida dos moradores de um cortiço no Rio de Janeiro se entrelaça com a ambição de seu proprietário, João Romão. O romance retrata exploração, desigualdade e disputas por ascensão social.',
    'vidas secas|graciliano ramos': 'Fabiano, Sinhá Vitória, seus filhos e a cadela Baleia atravessam o sertão em busca de sobrevivência. A seca e a exploração obrigam a família a recomeçar repetidamente.',
    'capitaes da areia|jorge amado': 'Um grupo de meninos vive nas ruas de Salvador sob a liderança de Pedro Bala. Entre aventuras e confrontos com as autoridades, o romance acompanha seus afetos, sonhos e estratégias de sobrevivência.',
    'fahrenheit 451|ray bradbury': 'Guy Montag queima livros a serviço de uma sociedade que os proibiu. O encontro com uma jovem curiosa o leva a questionar seu trabalho e o mundo em que vive.',
    'a revolucao dos bichos|george orwell': 'Os animais de uma fazenda expulsam o dono humano e tentam criar uma sociedade igualitária. Aos poucos, os porcos concentram o poder e transformam os ideais da revolução.',
    'o navio negreiro|castro alves': 'O poema descreve o horror vivido por africanos escravizados durante a travessia do Atlântico e denuncia a violência do tráfico negreiro.',
    'o meu pe de laranja lima|jose mauro de vasconcelos': 'Zezé, um menino imaginativo de uma família pobre, faz de um pé de laranja-lima seu confidente. Uma amizade inesperada o ajuda a lidar com a dureza da infância.',
    'a bolsa amarela|lygia bojunga nunes': 'Raquel guarda numa bolsa amarela três vontades que sua família não compreende. A imaginação transforma a bolsa em refúgio e espaço para descobrir sua própria voz.',
    'auto da compadecida|ariano suassuna': 'João Grilo e Chicó recorrem à esperteza para sobreviver no sertão. Suas confusões levam a um julgamento em que a Compadecida intercede pelos acusados.',
    'o pequeno principe|antoine de saint exupery': 'Um piloto perdido no deserto conhece um príncipe de outro planeta. Ao contar suas viagens e sua relação com uma rosa, o menino convida a pensar sobre amizade, cuidado e saudade.',
    'a empregada bem vinda a familia|freida mcfadden': 'Millie tenta recomeçar com a família em um novo bairro. Comportamentos estranhos na vizinhança e segredos por trás das casas impecáveis ameaçam a tranquilidade que ela esperava encontrar.',
    'fazendo meu filme|paula pimenta': 'Fani, uma adolescente apaixonada por cinema, vive descobertas sobre amizade e amor. A possibilidade de fazer intercâmbio a obriga a pensar no que deseja para o futuro.',
    'dublinenses|james joyce': 'Contos acompanham personagens de diferentes idades e classes sociais em Dublin. Situações do cotidiano revelam frustrações, escolhas difíceis e pequenos momentos de descoberta.',
    'torto arado|itamar vieira junior': 'As irmãs Bibiana e Belonísia crescem numa comunidade rural da Chapada Diamantina. Um acidente marca suas vidas, entrelaçadas à luta pela terra e à memória de sua comunidade.',
    'a metamorfose|franz kafka': 'Gregor Samsa acorda transformado em uma criatura monstruosa. Enquanto tenta entender o que aconteceu, sua família precisa reorganizar a vida e passa a tratá-lo de outra maneira.',
    'o alienista|machado de assis': 'O médico Simão Bacamarte instala um hospício em Itaguaí e amplia cada vez mais sua definição de loucura. A sátira questiona quem tem o poder de decidir o que é normal.',
    'memorias postumas de bras cubas|machado de assis': 'Depois de morto, Brás Cubas narra episódios da própria vida, incluindo amores, ambições e fracassos. Sua franqueza irônica expõe os privilégios e a hipocrisia da sociedade em que viveu.',
    'a hora da estrela|clarice lispector': 'Macabéa, uma jovem nordestina que trabalha como datilógrafa no Rio de Janeiro, vive entre dificuldades e sonhos modestos. O narrador Rodrigo S. M. questiona seu papel ao contar essa história.'
  };
  const minimumAges = new Map([["o rei de amarelo|robert w chambers",15],["desenfreados parte i|kelly m",15],["desenfreados parte ii|kelly m",15],["taming 7 os garotos de tommen livro 5|chloe walsh",15]]);
  window.BMLMinimumReadingAge = key => minimumAges.get(key);
  const lookups = new Map();
  const isbnValue = value => String(value || '').replace(/[^0-9X]/gi, '').toUpperCase();
  const queryPart = value => String(value || '').replace(/["\\]/g, ' ').trim();

  async function readJson(url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(4500), credentials: 'omit', referrerPolicy: 'no-referrer' });
    if (!response.ok) throw new Error('Consulta indisponível');
    return response.json();
  }

  function shortExcerpt(value) {
    if (typeof value !== 'string') return '';
    const plain = document.createElement('textarea');
    plain.innerHTML = value.replace(/<[^>]*>/g, ' ');
    const words = plain.value.trim().split(/\s+/).filter(Boolean);
    if (words.length < 8) return '';
    const sample = words.slice(0, 23).join(' ');
    return sample + (words.length > 23 ? '…' : '');
  }

  function sameWork(book, title, authors) {
    return norm(title) === norm(book.titulo) &&
      Boolean(norm(book.autor)) && (authors || []).some(author => norm(author) === norm(book.autor));
  }

  async function fromGoogle(book, isbn) {
    const query = isbn ? 'isbn:' + isbn : 'intitle:"' + queryPart(book.titulo) + '" inauthor:"' + queryPart(book.autor) + '"';
    const url = new URL('https://www.googleapis.com/books/v1/volumes');
    url.search = new URLSearchParams({ q: query, langRestrict: 'pt', maxResults: '5' });
    const data = await readJson(url);
    for (const item of data.items || []) {
      const info = item.volumeInfo || {};
      const isbnMatch = isbn && (info.industryIdentifiers || []).some(id => isbnValue(id.identifier) === isbn);
      if (info.language !== 'pt' || (!isbnMatch && !sameWork(book, info.title, info.authors))) continue;
      const text = shortExcerpt(info.description);
      if (text && /^[\w-]+$/.test(item.id)) {
        return { text, source: 'Google Livros', url: 'https://books.google.com/books?id=' + item.id };
      }
    }
  }

  async function fromOpenLibrary(book, isbn) {
    const url = new URL('https://openlibrary.org/search.json');
    const query = isbn ? { isbn } : { title: book.titulo, author: book.autor };
    url.search = new URLSearchParams({ ...query, fields: 'key,title,author_name,language,isbn', limit: '5' });
    const data = await readJson(url);
    const match = (data.docs || []).find(item => /^\/works\/OL\d+W$/.test(item.key) &&
      (isbn && item.isbn?.includes(isbn) || sameWork(book, item.title, item.author_name)));
    if (!match) return;
    const work = await readJson('https://openlibrary.org' + match.key + '.json');
    const text = shortExcerpt(typeof work.description === 'string' ? work.description : work.description?.value);
    if (text) return { text, source: 'Open Library · idioma da fonte', url: 'https://openlibrary.org' + match.key };
  }

  window.BMLShowSynopsis = function(book, isbn, section) {
    const paragraph = section.querySelector('p');
    const age = minimumAges.get(book.key);
    if (age) {
      const notice = document.createElement('p');
      const label = document.createElement('strong');
      label.textContent = 'Regra da biblioteca: leitura a partir de ' + age + ' anos.';
      notice.append(label);
      section.before(notice);
    }
    const local = descriptions[norm(book.titulo) + '|' + norm(book.autor)] || descriptions[book.key];
    if (typeof local === 'string') {
      paragraph.textContent = local;
      return;
    }
    isbn = isbnValue(isbn);
    if (!/^(?:\d{9}[\dX]|\d{13})$/.test(isbn)) isbn = '';
    const unavailable = 'Sinopse ainda não disponível para esta obra.';
    if (!isbn && (!norm(book.titulo) || !norm(book.autor))) {
      paragraph.textContent = unavailable;
      return;
    }
    paragraph.textContent = 'Buscando sinopse…';
    const key = JSON.stringify([book.key, book.titulo, book.autor, isbn]);
    if (!lookups.has(key)) {
      if (lookups.size >= 100) lookups.delete(lookups.keys().next().value);
      const request = (async () => {
        let temporaryFailure = false;
        for (const source of [fromGoogle, fromOpenLibrary]) {
          try {
            const result = await source(book, isbn);
            if (result) return result;
          } catch {
            temporaryFailure = true;
          }
        }
        if (temporaryFailure) lookups.delete(key);
        return null;
      })();
      lookups.set(key, request);
    }
    lookups.get(key).then(result => {
      if (!section.isConnected) return;
      paragraph.textContent = result?.text || unavailable;
      if (!result) return;
      const link = document.createElement('a');
      link.href = result.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = result.source;
      section.append(link);
    });
  };
})();
