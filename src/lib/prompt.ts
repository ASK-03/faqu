import faq from './faq.json';

// Generate a prompt string containing all the FAQ questions and answers
export const faqPrompt: string = `
${faq
  .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
  .join('\n\n')}
`;
