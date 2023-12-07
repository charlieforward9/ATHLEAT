export function safelyParseJSON(jsonString: string) {
  try {
    let parsed = JSON.parse(jsonString);
    // If the parsed result is a string, try to parse it again
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }
    return parsed;
  } catch (error) {
    // Handle error if it's not valid JSON
    console.error("Parsing error:", error);
    return null; // or return the original string or handle it as you see fit
  }
}
