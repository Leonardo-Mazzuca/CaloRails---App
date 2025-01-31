

const transformRecipe = (recipeText: string): string[] => {

    const lines = recipeText.split('\n');
    const ingredients: string[] = [];
  
    for (const line of lines) {
      const trimmedLine = line.trim().replace(/^,|,$/g, '');
  
      if (trimmedLine === "") continue; 
  
      const match = trimmedLine.match(/^(\d+(?:\.\d+)?\s*)?([\w\s-]+(?:,\s*[\w\s-]+)*)/i);
  
      if (match) {
        const quantity = match[1] ? match[1].trim() : ""; 
        const ingredient = match[2].trim(); 
        ingredients.push(`${quantity}${ingredient}`);
      } else {
  
        ingredients.push(trimmedLine);
  
      }
    }
    return ingredients;
  };

  const translateText = async (text: string, targetLanguage: string) => {

    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    const model = process.env.EXPO_PUBLIC_OPENAI_MODEL;
    
    console.log(text);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model, 
        messages: [
          {
            role: "system",
            content: `Você é um tradutor de idiomas altamente preciso.`,
          },
          {
            role: "user",
            content: `Traduza o seguinte texto para ${targetLanguage}: "${text}"`,
          },
        ],
        temperature: 0.3,
      }),
    });
    

    
    const data = await response.json();

    console.log(data);
    

    return data.choices[0]?.message?.content;

  };

export {
    transformRecipe,translateText
}