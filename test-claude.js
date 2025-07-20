const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testCodeGeneration() {
  const prompt = "Write a Python function to calculate the factorial of a number.";
  const language = "python";
  const provider = "claude";

  try {
    const response = await fetch('http://localhost:3000/api/ai/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        language,
        provider,
        options: {},
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Generated code:", data.code);
  } catch (error) {
    console.error("Error testing code generation:", error);
  }
}

testCodeGeneration();
