
const filter = (input, allowedTags) => {
    const tagRegExp = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
    const tagsMas = [...input.matchAll(tagRegExp)]
        .map(match => match[0].substring(1, match[0].length - 1))
        .filter(tag => allowedTags.includes(tag))
        .map(tag => {
            const openingTagRegex = new RegExp(`<${tag}\\b[^>]*>`, 'g');
            const closingTagRegex = new RegExp(`</${tag}>`, 'g');
            const openingTagMatch = openingTagRegex.exec(input);
            const openingTagIndex = openingTagMatch ? openingTagMatch.index : 0;
            const closingTagMatch = closingTagRegex.exec(input.slice(openingTagIndex));
            const closingTagIndex = closingTagMatch ? openingTagIndex + closingTagMatch.index + closingTagMatch[0].length : input.length;
            return [openingTagIndex, closingTagIndex];
        });
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return input.replaceAll(/[&<>"'\s]/g, (match, index) =>
        tagsMas.some(([start, end]) => index >= start && index <= end) ? match : map[match] || match
    );
};
