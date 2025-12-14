export const getEditDistance = (a: string, b: string): number => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
};

export const checkFuzzyMatch = (input: string, aliases: string[]) => {
    const normalizedInput = input.trim().toLowerCase();
    for (const alias of aliases) {
        const normalizedAlias = alias.toLowerCase();
        if (normalizedInput === normalizedAlias) return { match: true, exact: true };
        const distance = getEditDistance(normalizedInput, normalizedAlias);
        const tolerance = normalizedAlias.length > 5 ? 2 : 1;
        if (distance <= tolerance) return { match: true, exact: false, correction: alias };
    }
    return { match: false };
};

export const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'mk-MK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
};