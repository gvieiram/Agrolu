<div style="text-align: center;">
  <h1 style="line-height: 0">
    Projeto Mobile Agrolu
  </h1>
  <h3 style="line-height: 0">
    Aluguel de Máquinas e Implementos Agrícolas
  </h3>
</div>

***
</br>

* [Como rodar](#construction_worker-como-rodar)
* [Abrindo o emulador](#iphone-abrindo-o-emulador)
* [Configurações do VSCode para desenvolvimento](#gear-configurações-do-vscode)

</br>

## :construction_worker: Como rodar

###### Clone o Repositório

```bash
cd suaPasta

git clone https://gitlab.com/agrolu/mobile.git
```


###### :gear:  Instalando Yarn

- Você precisará ter o [NodeJs](https://nodejs.org/en/) já instalado em seu computador

```bash
npm install --global yarn
```

###### 💻 Rode o Projeto

```bash
# Vá para a pasta onde clonou o projeto
cd suaPasta/mobile

# Instale as dependências
yarn

# Rode a aplicação
expo start
```

### :iphone: Abrindo o emulador

- Para emular o app faça o download do [Expo Go](https://expo.dev/client) em seu dispositivo móvel

> Certifique-se que o Expo Go esteja na mesma rede que o projeto está rodando.

- Com o Expo Go, leia o QRCode

</br>

### :gear: Configurações do VSCode

- Para seguir o desenvolvimento com a padronização de código ( padronização do Airbnb, Eslint, Prettier e EditorConfig ) você deverá seguir os seguintes passos:

1. Instalar a extensão chamada `EditorConfig for VS Code`. [EditorConfig for VS Code - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
2. Instalar a extensão do **Eslint** no VSCode. [ESLint - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. Uma outra configuração que é geral e precisamos fazer para o **VSCode** formatar o código sempre que salvarmos algum arquivo é adicionar uma opção chamada `codeActionsOnSave` nas configurações (`settings.json`), assim como mostrado abaixo:

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

⚠️ 4.  Remover a extensão **Prettier - Code Formatter** do seu VS Code, ela pode gerar incompatibilidades com as configurações do projeto.
