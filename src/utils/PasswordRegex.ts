interface PasswordRegexProps {
  description: string;
  messageError: string;
  regex: RegExp;
}

const PasswordRegex: Array<PasswordRegexProps> = [
  {
    description: 'Mínimo 8 caracteres',
    messageError: 'Mínimo de 8 caracteres',
    regex: /^.{8,}$/,
  },
  {
    description: 'Letra maiúscula',
    messageError: 'Pelo menos uma letra maiúscula',
    regex: /(?=.*?[A-Z])/,
  },
  {
    description: 'Letra minúscula',
    messageError: 'Pelo menos uma letra minúscula',
    regex: /(?=.*?[a-z])/,
  },
  {
    description: 'Número',
    messageError: 'Pelo menos um número',
    regex: /(?=.*?[0-9])/,
  },
  {
    description: 'Caracteres especiais (*&%$#@!)',
    messageError: 'Pelo menos um carácter especial ou espaço',
    regex: /(?=.*?[#?!@$ %^&*-])/,
  },
];

export default PasswordRegex;
