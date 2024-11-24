class CacheHandler {
    constructor(options) {
        this.options = options;
        this.cache = new Map();
    }

    async get(key) {
        return this.cache.get(key);
    }

    async set(key, data, options) {
        this.cache.set(key, {
            value: data,
            lastModified: Date.now(),
            tags: options?.tags || [],
        });
    }

    async delete(key) {
        this.cache.delete(key);
    }

    async revalidateTag(tag) {
        for (const [key, data] of this.cache.entries()) {
            if (data.tags?.includes(tag)) {
                this.cache.delete(key);
            }
        }
    }
}

module.exports = CacheHandler;
