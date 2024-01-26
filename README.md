<div style="text-align: center" align="center">
  <h1 style="line-height: 0">
    Projeto Mobile Agrolu
  </h1>
  <h3 style="line-height: 0">
    Aluguel de Máquinas e Implementos Agrícolas
  </h3>
  <img width="400px" title="Agrolu" src="docs/welcome.png"/>
</div>

***
</br>

* [Como instalar](#construction_worker-como-instalar)
* [Abrindo o emulador](#iphone-abrindo-o-emulador)
* [Configurações do VSCode para desenvolvimento](#gear-configurações-do-vscode)

</br>

## :construction_worker: Como instalar

###### Clone o Repositório

```bash
cd suaPasta

git clone https://gitlab.com/agrolu/mobile.git
```


###### :gear:  Instalando Yarn e Expo

- Você precisará ter o [NodeJs](https://nodejs.org/en/) já instalado em seu computador

```bash
npm install --global yarn
```

Após a instalação, verifique se ela foi realizada com sucesso com o comando:

```bash
yarn -v
```

Para que as instalações globais do Yarn funcionem, vamos ter que fazer mais um passo. Execute o comando:

```bash
yarn global bin
```

**Anote o caminho retornado** e o insira nas configurações das variáveis ambiente do seu sistema operacional. Se não souber como fazer, acesse este [link](https://react-native.rocketseat.dev/) escolha seu sistema operacional e siga as instruções para a configuração do yarn global.

Após a configuração da variável de ambiente, instale o Expo

```bash
yarn global add expo-cli
```

Pronto agora você já pode rodar o projeto :tada:

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
