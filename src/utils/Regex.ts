/* eslint-disable no-param-reassign */
interface PasswordRegexProps {
  description: string;
  messageError: string;
  regex: RegExp;
}

export const PasswordRegex: Array<PasswordRegexProps> = [
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

export const convertToSlug = text => {
  const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[\s\W-]+/g, '-'); // Replace spaces, non-word characters and dashes with a single dash (-)
};

export default { PasswordRegex, convertToSlug };
