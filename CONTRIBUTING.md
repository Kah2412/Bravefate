# Contribuindo para o Brave

Obrigado por querer contribuir para o Brave! Este documento explica como manter a identidade e qualidade do projeto.

## 🎯 Princípios do Brave

- **Segurança em Primeiro Lugar**: Mulheres em risco devem sentir-se protegidas
- **Linguagem Humana**: Fuja de jargão técnico, seja acolhedor
- **Sem Julgamento**: Nunca culpe a vítima de violência
- **Ação Real**: Ofereça recursos concretos, não apenas palavras
- **Confidencialidade**: Privacidade é sagrada

## 🛠 Antes de Contribuir

1. **Entenda a Missão**: Brave existe para empoderar mulheres
2. **Teste Localmente**: Certifique-se que tudo funciona
3. **Mantenha a Identidade**: Não adicione cor genérica, UI de template, ou comentários de código sobre "TODO" ou "fix this"
4. **Revise Textos**: Reimagine como uma mulher em risco leria isso

## 📝 Diretrizes de Código

### Nomes de Variáveis
- ❌ `button1`, `card`, `section`
- ✅ `supportButton`, `WomanCard`, `SafetySection`

### Textos e Mensagens
- ❌ "Error", "Loading", "Something went wrong"
- ✅ "Algo não saiu como esperado, mas estou aqui", "Carregando com cuidado..."

### Comentários
- ❌ Evite comentários óbvios: `// renderizar card`
- ✅ Escreva intenção: `// Delays rendering to allow sensitive data to be handled`

### Estilos
- Use Tailwind + custom colors
- Siga paleta de Brave (rose-deep, coral, teal, gold)
- Adicione microinterações suaves (hover, scale, fade)
- Evite blocos muito padronizados/genéricos

## 🎨 Design Principles

1. **Espaço Branco**: Não aperte muito - mulheres em crise precisam respirar
2. **Contraste**: Certifique-se que ícone e texto são acessíveis
3. **Movimento Suave**: Use Framer Motion com easing suave
4. **Cores com Propósito**: Cada cor deve ter significado

## 🗂 Estrutura de Pastas

```
components/
├── brave/          # Componentes únicos do Brave
├── support/        # Itens de apoio e segurança
└── ui/             # Base components (shadcn/ui)

pages/
├── (principais)    # Homepages e seções principais
└── (apoio)         # Pages de segurança

data/
├── women.ts        # Mulheres extraordinárias
└── support-resources.ts  # Recursos de apoio
```

## 🧪 Testando

```bash
npm run test        # Rodar testes
npm run dev         # Desenvolvimento
npm run build       # Build para produção
```

## 📊 Tipos de Contribuição

### 1. Novas Mulheres
Adicione à `src/data/women.ts` com:
- Nome, profissão
- Descrição autêntica
- Categoria e era
- Se aplicável: gameClass, gameSkill, power

### 2. Recursos de Apoio
Crie em `src/data/support-resources.ts`:
- Título claro
- Conteúdo compassivo
- Dicas práticas
- Categoria apropriada

### 3. Livros Curados
Atualize `src/pages/Livros.tsx`:
- Título e autor
- Descrição genuína
- Link para compra/leitura
- Categoria temática

### 4. UI/Design
- Crie componentes em `src/components/brave/`
- Siga pattern shadcn/ui
- Exporte propTypes claramente
- Documente no componente

## ✅ Checklist Antes de Submeter

- [ ] Nenhum texto genérico/template no código
- [ ] Linguagem é humana e acolhedora
- [ ] Sigo paleta de cores do Brave
- [ ] Testes passam (`npm run test`)
- [ ] Build sucede (`npm run build`)
- [ ] Não há `console.log` ou comentários genéricos
- [ ] Revisei a estrutura de pastas
- [ ] Documentei mudanças significativas

## 🚫 O Que NÃO Fazer

- Não adicione "TODO" ou "FIXME" sem resolver
- Não use mensagens genéricas de erro
- Não adicione cores aleatórias
- Não remova funcionalidades existentes
- Não quebre responsividade mobile

## 💬 Dúvidas?

Abra uma Issue descrevendo:
1. O que quer contribuir
2. Por que é importante para Brave
3. Como você imagina isso funcionando

---

**Lembre-se**: Todo código que você escreve pode impactar uma mulher em momento crítico. Escreva com cuidado, sensibilidade e intenção.
