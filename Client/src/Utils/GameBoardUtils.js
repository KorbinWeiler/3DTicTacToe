function normalizeToArray(data) {
    if (data == null) return null;
    // If it's a JSON string, try to parse it
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            return normalizeToArray(parsed);
        } catch (e) {
            // If it's a plain string value (e.g. "-" without JSON structure), return it as-is
            return data;
        }
    }

    if (Array.isArray(data)) {
        // Deep-normalize array elements (they may be JSON strings or nested arrays/objects)
        return data.map((item) => {
            if (item == null) return null;
            if (typeof item === 'string') {
                try {
                    return normalizeToArray(JSON.parse(item));
                } catch (e) {
                    return item;
                }
            }
            return normalizeToArray(item);
        });
    }

    if (data.BoardState) return normalizeToArray(data.BoardState);

    // If object has numeric keys at top level, map them to an array (one level deep)
    const topKeys = Object.keys(data).filter(k => /^\d+$/.test(k)).sort((a,b) => Number(a)-Number(b));
    if (topKeys.length) {
        return topKeys.map(k => {
            const v = data[k];
            // If value is a JSON string or an object/array, normalize it
            return normalizeToArray(v);
        });
    }

    return null;
}

export { normalizeToArray };