export const analyzeCourseContent = (content) => {
    // 1. Hoca Uyarılarını Çek
    const blockquoteRegex = /(^|\n)>\s*(.*?)(?=\n\n|\n>|$)/gs;
    const warnings = [];
    let match;

    while ((match = blockquoteRegex.exec(content)) !== null) {
        const rawText = match[2].trim();
        const lowerText = rawText.toLowerCase();

        if (rawText.includes('🚨') || lowerText.includes('hoca') || lowerText.includes('puan') || lowerText.includes('dikkat') || lowerText.includes('tuzak')) {
            const titleMatch = rawText.match(/^\s*(?:🚨\s*)?\*\*([^*]+)\*\*:?/);
            let title = titleMatch ? titleMatch[1] : 'Sınav İpucu';
            let text = rawText.replace(/\n>/g, ' ');

            if (titleMatch) {
                text = text.substring(titleMatch[0].length).trim();
            }

            warnings.push({ title, text, full: rawText });
        }
    }

    // Satır bazlı analize geçiş (Regex bağımlılığını azaltmak için)
    const lines = content.split(/\r?\n/);
    const formulas = [];
    const cheatSheets = [];
    const strategies = [];

    // Döngü ile tek seferde satırları tara
    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // Liste elemanı kontrolü (* veya -)
        const isListItem = /^[*-]\s+/.test(trimmed);

        if (isListItem) {
            // **Kalın Anahtar**: Değer yapısını kontrol et
            const firstBold = trimmed.indexOf('**');

            if (firstBold !== -1 && firstBold < 10) { // Başlarda olmalı
                // 2. Formüller (Genel Tanımlar)
                // Kriter: **Anahtar**: Değer
                const endKeyColon = trimmed.indexOf('**:', firstBold);

                if (endKeyColon !== -1) {
                    const name = trimmed.substring(firstBold + 2, endKeyColon).trim();
                    const contentValues = trimmed.substring(endKeyColon + 3).trim();

                    if (name && contentValues) {
                        formulas.push({ name, content: contentValues });
                    }
                }

                // 3. Ezber Kartları (Cheat Sheet)
                // Kriter: **Anahtar**... : Değer (Soru işareti opsiyonel)
                // Formüllerden farkı: İki nokta (:) bold bitiminden hemen sonra gelmeyebilir.
                // Örnek: * **Barkhausen Kriteri** nedir? : Cevap

                // İkinci bold kapanışını bul
                const secondBold = trimmed.indexOf('**', firstBold + 2);
                if (secondBold !== -1) {
                    const colonIndex = trimmed.indexOf(':', secondBold);

                    // Eğer colon varsa ve bu colon formül yapısındaki (**:) değilse
                    if (colonIndex !== -1 && colonIndex > secondBold) {
                        const term = trimmed.substring(firstBold + 2, secondBold).trim();
                        // Formül listesine eklenenleri tekrar eklememek için basit bir kontrol
                        // Eğer formüllere eklediysek buraya girmesin (veya tam tersi) yönetim zor.
                        // Şimdilik çakışma olsa da ekleyelim, UI'da filtreleriz veya veri setinde zaten ayrı bölümdeler.

                        // Ancak Formül regex'i (Key**:) ile Kart regex'i (Key** ... :) ayrımı:
                        // Formülde : hemen ** bitişinde. Kartta arada boşluk veya soru eki olabilir.
                        // Eğer endKeyColon == -1 ise (yani **: yoksa) buraya düşer.

                        if (endKeyColon === -1) {
                            const questionPart = trimmed.substring(secondBold + 2, colonIndex).trim();
                            const answer = trimmed.substring(colonIndex + 1).trim();

                            if (term && answer) {
                                cheatSheets.push({
                                    term,
                                    question: questionPart || 'Nedir?',
                                    answer
                                });
                            }
                        }
                    }
                }
            }
        }

        // 6. Sınav Stratejisi (Satır Bazlı Blok Yakalama)
        if (line.includes('Sınavda Ezberden Yazılacak') && line.includes('**')) {
            let strategySteps = [];
            for (let i = index + 1; i < lines.length; i++) {
                const current = lines[i].trim();
                if (current.startsWith('---') || current.startsWith('##')) break;
                if (current.length > 0) strategySteps.push(lines[i]);
            }
            if (strategySteps.length > 0) {
                strategies.push({
                    title: "Başlangıç Hamleleri",
                    steps: strategySteps.join('\n')
                });
            }
        }
    });

    // Yeni Formül Parsing Mantığı (lines.forEach dışına taşındı)
    const formulaRegex = /(?:^|\n)(?:\*|-)\s+(.*?)(?=\n|$)/g;
    let fMatch;
    // Formül bölümünün başladığı yeri bul (Kabaca)
    const formulaSectionCoords = content.search(/Formül Bankası|FORMULAS/i);
    if (formulaSectionCoords !== -1) {
        const formulaText = content.slice(formulaSectionCoords);
        while ((fMatch = formulaRegex.exec(formulaText)) !== null) {
            const line = fMatch[1].trim();
            // İçinde $$ veya $ geçen liste elemanlarını formül olarak kabul et
            if (line.includes('$')) {
                // Determine name and content
                const detailMatch = line.match(/^\*\*(.*?)\*\*:\s*(.*)$/);
                if (detailMatch) {
                    formulas.push({
                        name: detailMatch[1].trim(),
                        content: detailMatch[2].trim()
                    });
                } else {
                    formulas.push({
                        name: 'FORMÜL',
                        content: line
                    });
                }
            }
        }
    }

    // 4. Çözüm Reçeteleri (Regex blok yakalamada daha iyi)
    const recipes = [];
    const recipeSectionRegex = /### Soru Tipi:\s*(.*?)\n([\s\S]*?)(?=\n###|\n##|$)/g;
    let rMatch;
    while ((rMatch = recipeSectionRegex.exec(content)) !== null) {
        recipes.push({ title: rMatch[1].trim(), steps: rMatch[2].trim() });
    }

    // 5. Kritik Teori
    const theories = [];
    const theoryRegex = /##\s*(.*?)\n[\s\S]*?\*\*Kritik Teori:\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n##|$)/g;
    let tMatch;
    while ((tMatch = theoryRegex.exec(content)) !== null) {
        theories.push({ title: tMatch[1].trim(), content: tMatch[2].trim() });
    }

    // 7. Meta Bilgiler
    const metaInfo = [];
    const metaRegex = /##\s*(.*?)\n[\s\S]*?\*\*Öncelik Skoru:\*\*\s*(.*?)\s*\n\*\*Sınav İstatistikleri:\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n##|$)/g;
    let mMatch;
    while ((mMatch = metaRegex.exec(content)) !== null) {
        metaInfo.push({
            title: mMatch[1].trim(),
            score: mMatch[2].trim(),
            stats: mMatch[3].trim()
        });
    }

    return {
        warnings,
        formulas,
        cheatSheets,
        recipes,
        theories,
        strategies,
        metaInfo,
        stats: {
            warningCount: warnings.length,
            formulaCount: formulas.length,
            cheatSheetCount: cheatSheets.length,
            recipeCount: recipes.length,
            theoryCount: theories.length,
            strategyCount: strategies.length,
            metaCount: metaInfo.length
        }
    };
};
