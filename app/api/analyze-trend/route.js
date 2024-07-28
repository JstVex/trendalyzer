import OpenAI from "openai";

export async function POST(req) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const { field } = await req.json();
    console.log("Field received from route", field);

    const prompt = `
You are an AI assistant tasked with analyzing current and future trends for the field of ${field}. Respond with the data in the following JSON format, ensuring all fields are correctly populated. Do not include any text outside the JSON format:

{
  "trends": [
    {
      "id": 1,
      "trend": "Title for the trend",
      "period": "The period of the trends (e.g. 2021-2023)",
      "description": "A detailed description of the trend.",
      "type": "current or future",
      "impact": "impact of the trend (e.g. low, medium, high)",
      "actionable_advice": "What actions should be taken based on this trend.",
      "actions": ["Action 1", "Action 2", "Action 3"]
    },
    {
      "id": 2,
      "trend": "Another trend",
      "period": "The period of the trends (e.g. 2022-2024)",
      "description": "A detailed description of another trend.",
      "type": "current or future",
      "impact": "impact of the trend (e.g. low, medium, high)",
      "actionable_advice": "What actions should be taken based on this trend.",
      "actions": ["Action 1", "Action 2", "Action 3"]
    }
    // Repeat for each trend
  ]
}

Ensure the response adheres strictly to this JSON format. Do not include any text outside the JSON structure.

Provide up to 5 trends for the type 'current' and 3 to 5 more for possible future trends that you think would become available for this ${field} with the type 'future'.
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: prompt }],
    });

    console.log("Completion from OpenAI", completion);

    const responseText = completion.choices[0].message.content;
    // const jsonString = responseText.match(/```json\s*([\s\S]*?)\s*```/);

    // console.log("JSON string from OpenAI", jsonString);

    let trends = [];


    try {
        const parsedData = JSON.parse(responseText);

        // Ensure the parsed data is an object with a 'trends' array property
        if (parsedData && Array.isArray(parsedData.trends)) {
            trends = parsedData.trends.filter(item => (
                item &&
                typeof item.id === 'number' &&
                typeof item.trend === 'string' &&
                typeof item.period === 'string' &&
                typeof item.description === 'string' &&
                typeof item.type === 'string' &&
                (item.impact === 'low' || item.impact === 'medium' || item.impact === 'high') &&
                typeof item.actionable_advice === 'string' &&
                Array.isArray(item.actions)
            ));
        } else {
            console.error("Invalid trends format:", parsedData);
        }

        console.log("Trends parsed from JSON", trends);
        return Response.json(trends);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return Response.json({ error: 'Failed to parse JSON response from OpenAI' }, { status: 500 });
    }
}
