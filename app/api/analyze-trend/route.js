import OpenAI from "openai";

export async function POST(req, res) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const { field } = await req.json();
    console.log("Field received from route", field);

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Analyze current and future trends for the field: ${field}` }],
        model: "gpt-4o-mini",
    });

    console.log("Completion from OpenAI", completion);

    return Response.json({ text: completion.choices[0].message.content });
}