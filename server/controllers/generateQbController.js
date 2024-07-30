const Groq = require('groq-sdk');
const client = new Groq({ apiKey: process.env.GENERATEQB_KEY });

exports.generateQb = async (req, res) => {
  try {
    const { topic, difficulty, numQuestions } = req.body;
    console.log("AI test",req?.body)
    console.log("call++")
    const system = "Generate Quiz Questions, Options, Answer in Json format only, don't provide any other text than json, format should be like in quote as i want '{['question1': string, 'options1':string[], answer1: string]}' same for the number of questions."
    const prompt = `Generate ${numQuestions} ${difficulty} quiz questions about ${topic}. For each question, provide 4 options and the correct answer. Format the response as a JSON array.`;
    const completion = await client.chat.completions.create({
      messages: [{role: 'system', content: system},{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.0,
      max_tokens: 2064,
    });

    const qbData = JSON.parse(completion.choices[0].message.content);
    // console.log(qbData)
    res.json(qbData);
  } catch (error) {
    console.error('Error generating quiz:', error.message);
    res.status(500).json({ error: 'Failed to generate quiz', details: error.message });
  }
};