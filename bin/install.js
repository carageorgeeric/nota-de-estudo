#!/usr/bin/env node
// Instala a skill nota-de-estudo no Claude Code.
//   npx github:carageorgeeric/nota-de-estudo            -> ~/.claude/skills (todos os projetos)
//   npx github:carageorgeeric/nota-de-estudo --projeto  -> ./.claude/skills (só este projeto)
//   npx github:carageorgeeric/nota-de-estudo --remover  -> desinstala

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL = "nota-de-estudo";
const args = process.argv.slice(2);
const has = (...flags) => flags.some((f) => args.includes(f));

if (has("-h", "--help", "--ajuda")) {
  console.log(`Uso: npx github:carageorgeeric/${SKILL} [opções]

  (sem opção)          instala em ~/.claude/skills (vale para todos os projetos)
  --projeto, -p        instala em ./.claude/skills (só no projeto atual)
  --remover, -r        remove a skill
  --ajuda, -h          mostra esta ajuda`);
  process.exit(0);
}

const base = has("-p", "--projeto", "--project")
  ? path.join(process.cwd(), ".claude", "skills")
  : path.join(os.homedir(), ".claude", "skills");
const dest = path.join(base, SKILL);
const src = path.join(__dirname, "..", "skills", SKILL);

if (has("-r", "--remover", "--uninstall")) {
  if (!fs.existsSync(dest)) {
    console.log(`Nada para remover: ${dest} não existe.`);
    process.exit(0);
  }
  fs.rmSync(dest, { recursive: true, force: true });
  console.log(`✓ Removida: ${dest}`);
  process.exit(0);
}

// Cópia manual: fs.cpSync falha no Windows quando o caminho tem acento (ex.: C:\Users\Usuário).
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

const update = fs.existsSync(dest);
copyDir(src, dest);

console.log(`✓ ${update ? "Atualizada" : "Instalada"}: ${dest}

Próximo passo:
  1. Abra (ou reinicie) o Claude Code
  2. Digite: /${SKILL} <tema>

Precisa de um servidor MCP do Obsidian conectado. Veja o README:
  https://github.com/carageorgeeric/${SKILL}#requisitos`);
