
export const analyzeCourseContent = (content) => {
    // ... (Warning extraction logic omitted for brevity) ... 
    // We only care about Formula debugging here
    const warnings = []; // Dummy

    // DEBUG: Log first 1000 chars of content
    console.log("DEBUG: Content start:", content.substring(0, 200));

    const lines = content.split(/\r?\n/);
    console.log(`DEBUG: Total lines: ${lines.length}`);

    const formulas = [];

    lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (i < 50 && trimmed.length > 0) {
            // console.log(`DEBUG: Line ${i}:`, JSON.stringify(trimmed));
        }

        // Test the target line specifically
        if (trimmed.includes("İyileştirme (Duyarlılık) Faktörü")) {
            console.log(`DEBUG: Found Target Line at ${i}:`, JSON.stringify(trimmed));

            const regex = /^[*-]\s+\*\*.*\*\*:/i;
            const isMatch = regex.test(trimmed);
            console.log(`DEBUG: Regex /^[*-]\\s+\\*\\*.*\\*\\*:/i test result: ${isMatch}`);

            // Check char codes of the start
            console.log("DEBUG: Start chars:", trimmed.substring(0, 10));
        }

        if (/^[*-]\s+\*\*.*\*\*:/i.test(trimmed)) {
            // Extract Title
            const titleStart = trimmed.indexOf('**') + 2;
            const titleEnd = trimmed.indexOf('**:', titleStart);

            if (titleStart > 1 && titleEnd > titleStart) {
                const title = trimmed.substring(titleStart, titleEnd).trim();
                const contentText = trimmed.substring(titleEnd + 3).trim();

                formulas.push({
                    name: title,
                    content: contentText
                });
            }
        }
    });

    console.log(`DEBUG: Total Formulas Found: ${formulas.length}`);
    return {
        warnings,
        formulas,
        strategies: [],
        recipes: [],
        theories: [],
        cheatSheets: [],
        metaInfo: [],
        stats: { formulaCount: formulas.length }
    };
};
