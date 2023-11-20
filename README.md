# Arg Q! - Extensão de Navegador

**Classifique tweets no domínio da política brasileira com um simples clique!**

🔗 [Read this in English](README_EN.md)

## Sobre

`Arg Q!` é uma extensão de navegador projetada para oferecer insights instantâneos sobre tweets relacionados à política brasileira. Com apenas um clique, você pode obter uma classificação rápida e confiável de tweets, facilitando a análise e o entendimento do cenário político nas redes sociais.

## Como utilizar

Para começar a usar a extensão `Arg Q!` no seu navegador, siga os passos abaixo:

1. **Baixe o Projeto**  
   Faça o download ou clone este repositório para o seu computador.

2. **Configure o Backend (FastAPI)**
   - Entre na pasta `backend`.
   - Entre em um ambiente virtual Python.
   - Execute `make install` para instalar as dependências.
   - Após a instalação, execute `make run` para subir a API.

3. **Configure o Frontend (Vite)**
   - Navegue até a pasta `argq-browser-extension`.
   - Execute `npm run build` para empacotar a aplicação.

4. **Carregue a Extensão no Navegador**
   - Abra o Gerenciador de Extensões do seu navegador.
     - Para navegadores baseados no Chromium (como Google Chrome ou Brave), isso geralmente pode ser encontrado em "Mais ferramentas" > "Extensões", ou digitando `chrome://extensions/` na barra de endereços.
   - Ative o "Modo do desenvolvedor", geralmente localizado no canto superior direito.
   - Clique em "Carregar sem compactação" e selecione a pasta `dist` gerada dentro de `argq-browser-extension`.

5. **Pronto para Uso**  
   A extensão `Arg Q!` deve aparecer na sua lista de extensões e você pode começar a classificar tweets imediatamente!

## Suporte e Contribuição

Se você encontrar problemas ou tiver sugestões, sinta-se à vontade para abrir uma issue neste repositório. Contribuições, seja através de melhorias de código, correções de bugs ou novas funcionalidades, são sempre bem-vindas!
