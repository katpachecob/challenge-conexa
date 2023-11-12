import OpenAI from 'openai';

export default async function searchHelper(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const movie = req.movie || '';
  try {
    const completion = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: generatePrompt(movie),
      temperature: 0.6,
      max_tokens: 2048,
    });
    return completion.choices;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    } else {
      // Non-API error
      console.log(error);
    }
  }
}

export function generatePrompt(movie) {
  return `Tell me who is the major producer of the movie: ${movie}. No details, just the name.`;
}
