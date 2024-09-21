export async function getIDEmotion(text: string): Promise<number> {
  const url1 = "http://127.0.0.1:5000/predict";
  const url2 = "http://127.0.0.1:5001/predict"; // Fallback URL
  
  try {
    // Try fetching from url1
    return await fetchPredictionFromURL(url1, text);
  } catch (error) {
    // Type assertion to cast 'error' to Error type
    const err = error as Error;
    console.warn(`Error fetching from url1: ${err.message}, trying url2...`);
    try {
      // If url1 fails, try fetching from url2
      return await fetchPredictionFromURL(url2, text);
    } catch (secondError) {
      const secondErr = secondError as Error;
      console.error('Error fetching from both URLs:', secondErr.message);
      throw secondErr;
    }
  }
}

// Helper function to fetch prediction from a given URL
async function fetchPredictionFromURL(url: string, text: string): Promise<number> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text, model: 1 }),
  });

  if (!response.ok) {
    throw new Error(`Model Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.prediction;
}
