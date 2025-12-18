export async function fetchWordDefinition(word: string): Promise<string | null> {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if(!response.ok)
        return null;

    const data = await response.json();

    return data[0]?.meanings[0]?.definitions[0]?.definition || null;
}