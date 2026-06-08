// Singleton content loader — fetches content.json once, caches for all components
let _cache = null;
let _promise = null;

export async function loadContent() {
    if (_cache) return _cache;
    if (_promise) return _promise;

    _promise = fetch('data/content.json?v=' + Date.now())
        .then(r => {
            if (!r.ok) throw new Error('Failed to load content.json');
            return r.json();
        })
        .then(data => {
            _cache = data;
            return data;
        });

    return _promise;
}
