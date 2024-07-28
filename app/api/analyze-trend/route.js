import OpenAI from "openai";

export async function POST(req) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const { field } = await req.json();
    console.log("Field received from route", field);

    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system", content: `Analyze the current and future trends for the field of ${field}. Provide the data in the following JSON format with relevant fields for businesses and personal branding:
    {
      "id": 1,
      "trend": "Title for the trend",
      "period": "The period of the trends (e.g. 2021-2023)",
      "description": "A detailed description of the trend.",
      "type": "current or future",
      "impact": "impact of the trend (e.g. low, high)",
      "actionable_advice": "What actions should be taken based on this trend."
    }
    Provide up to 5 trends for the type 'current' and 3 to 5 more for possible future trends that you think would become available for this ${field} with the type 'future'`
        }],
        model: "gpt-4o-mini",
    });

    console.log("Completion from OpenAI", completion);

    const responseText = completion.choices[0].message.content;
    const jsonString = responseText.match(/```json\s*([\s\S]*?)\s*```/);

    console.log("JSON string from OpenAI", jsonString);

    let trends = [];

    if (jsonString && jsonString[1]) {
        try {
            trends = JSON.parse(jsonString[1]);

            if (Array.isArray(trends)) {
                trends = trends.filter(item => (
                    item &&
                    typeof item.id === 'number' &&
                    typeof item.trend === 'string' &&
                    typeof item.period === 'string' &&
                    typeof item.description === 'string' &&
                    typeof item.type === 'string' &&
                    typeof item.impact === 'string' &&
                    typeof item.actionable_advice === 'string'
                ));
            } else {
                trends = [];
            }

            console.log("Trends parsed from JSON", trends);
            return Response.json(trends);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return Response.json({ error: 'Failed to parse JSON response from OpenAI' }, { status: 500 });
        }
    } else {
        return Response.json({ error: 'No JSON content found in OpenAI response' }, { status: 500 });
    }
}
