---
name: nota-de-estudo
description: 'Escreve uma nota de estudo no Obsidian do usuário para ele APRENDER um tema, não só registrar. Use quando o usuário pedir para documentar, anotar, registrar ou explicar algo "no Obsidian", criar uma nota sobre um assunto, ou disser que quer aprender/entender um tema a partir do que foi feito na conversa (ex.: "documenta isso no meu obsidian", "cria uma nota pra eu aprender X", "/nota-de-estudo deploy").'
---

# Nota de estudo no Obsidian

Assuma que o usuário é iniciante no tema e lê pulando (a nota foi pensada para quem tem TDAH). A nota existe para ele **aprender**: entender o conceito, saber por que cada decisão foi tomada e conseguir repetir sozinho. Um registro seco do que foi feito não basta.

Argumento opcional: o tema da nota (ex.: `deploy na VPS`, `migrations`). Sem argumento, o tema é o assunto principal da conversa atual.

## Passo 1. Entender o vault antes de escrever

Use as ferramentas do MCP do Obsidian (os nomes abaixo são do servidor usado no exemplo; troque pelos equivalentes do seu).

1. `get_vault_overview` para ver as pastas. Cada projeto tem a sua pasta (ex.: `Meu projeto/`).
2. `search_vault_simple` pelo tema e por palavras próximas. **Se já existe nota sobre o tema, atualize-a** (`patch_vault_file`) em vez de criar outra.
3. Leia 1 nota irmã da mesma pasta para copiar o estilo: frontmatter, linha de "Voltar", tabelas, tom.
4. Se o tema envolve código do projeto, leia os arquivos reais (Dockerfile, schema, config). A nota explica o que **existe**, não o que costuma existir.

Pergunte ao usuário só se o tema for ambíguo ("documenta isso" depois de uma conversa com 3 assuntos). Uma pergunta, curta.

## Passo 2. Convenções do vault (obrigatórias)

- Português do Brasil, frases curtas, voz ativa.
- Frontmatter:
  ```yaml
  ---
  tags: [<projeto-em-kebab>, tutorial, <tema>, ...]
  atualizado: AAAA-MM-DD
  ---
  ```
- Logo abaixo do título: `Voltar: [[<nota principal do projeto>]] · Veja também: [[...]]`. Link para notas que existem e que tenham relação real.
- Nome do arquivo descritivo, com acentos normais: `Meu projeto/Colocando o site no ar.md`.
- Nunca escreva segredos (senhas, tokens, chaves de API, conteúdo de `.env`). Pode citar o **nome** da variável e onde ela mora.

## Passo 3. Estrutura da nota

Use as seções que fizerem sentido para o tema, nesta ordem. Títulos numerados (`## 1. ...`) para o leitor saber onde está.

1. **`> [!summary] Se ler só uma coisa`**: 3 a 5 linhas com o essencial. É o que o usuário relê daqui a 3 meses.
2. **O mapa**: um diagrama (```mermaid``` ou ASCII) de como as peças se ligam. Desenhe antes de explicar as peças.
3. **Os conceitos**: um bloco por conceito, cada um com:
   - **Analogia** do dia a dia (cadeado e chave, porteiro, receita de bolo).
   - **O que é**, em 1 ou 2 frases.
   - **Onde aparece aqui**: o exemplo real do projeto.
4. **O que foi feito, passo a passo**: cada passo com o comando real, **o que ele faz** e **por que assim**. O "por quê" é a parte que ensina; nunca pule.
5. **Decisões e alternativas**: tabela `Decisão | Alternativa | Por que essa`. Inclua o custo da escolha (todo trade-off tem um lado ruim).
6. **O que deu errado e o que ensina**: erros reais da conversa, com causa e lição. Inclua os erros do Claude também. Erro explicado é a melhor aula.
7. **Dia a dia (cola)**: tabela `Quero... | Comando`, para consulta rápida.
8. **Teste-se**: 3 a 5 perguntas em callouts dobráveis, para o usuário se testar antes de ver a resposta:
   ```
   > [!question]- Por que o banco não tem porta publicada?
   > Resposta aqui.
   ```
9. **Glossário**: termos técnicos da nota, uma linha cada.
10. **Para praticar**: 1 a 3 exercícios pequenos que o usuário consegue fazer sozinho em menos de 10 minutos.

## Passo 4. Forma (TDAH)

- Parágrafos de no máximo 3 linhas. Prefira tabela e lista.
- **Negrito** só na palavra-chave de cada ideia, para dar para ler pulando.
- Listas com no máximo 5 itens. Passou disso, divida em grupos.
- Callouts do Obsidian para destacar: `> [!tip]`, `> [!warning]`, `> [!example]`.
- Explique cada termo técnico na primeira vez que aparecer, ou mande para o glossário.
- Comandos sempre em bloco de código e prontos para copiar.

## Passo 5. Entregar

1. Crie ou atualize a nota (`create_vault_file` / `patch_vault_file`).
2. Se a nota corrigir algo que outra nota diz errado (ex.: provedor antigo), corrija a outra também e diga qual.
3. Responda ao usuário em poucas linhas: o caminho da nota, as seções principais e **uma** sugestão do que ler primeiro.
