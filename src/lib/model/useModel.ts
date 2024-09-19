export async function getModelPrediction(text: string): Promise<string> {
  try {
    const url1 = "http://127.0.0.1:5000/predict"
    const response = await fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text,
        model:1
       }),
    });

    if (!response.ok) {
      throw new Error(`Model Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Assuming the Flask API returns the prediction in `data.prediction`
    return data.prediction;
  } catch (error) {
    console.error('Error getting prediction from API:', error);
    throw error;
  }
}