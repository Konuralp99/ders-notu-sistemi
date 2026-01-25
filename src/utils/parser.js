export const parseMarkdownToCards = (content) => {
    if (!content) return [];

    // Başlıklara (##) göre böl
    const sections = content.split(/(?=^## )/m);

    return sections.map((section, index) => {
        const lines = section.trim().split('\n');
        const title = lines[0].replace('## ', '').trim();
        const bodyContent = lines.slice(1).join('\n').trim();

        // Etiketleri (keywords) ayıkla
        // Hem keywords hem tags anahtar kelimelerini destekle
        const keywordsMatch = bodyContent.match(/> \*\*(?:keywords|tags):\*\* (.*)/i);
        const keywords = keywordsMatch ? keywordsMatch[1] : '';

        // Etiket satırını içerikten temizle (isteğe bağlı, ama temiz bir görünüm sağlar)
        const cleanContent = bodyContent.replace(/> \*\*(?:keywords|tags):\*\* .*/i, '').trim();

        return {
            id: index,
            title: title || "Giriş",
            content: cleanContent,
            keywords: keywords,
            category: detectCategory(title)
        };
    });
};

const detectCategory = (title) => {
    const t = title.toLowerCase();
    if (t.includes('soru') || t.includes('sınav')) return 'Sınav';
    if (t.includes('denklem') || t.includes('formül')) return 'Formül';
    if (t.includes('strateji') || t.includes('kural')) return 'Strateji';
    return 'Konu';
};
