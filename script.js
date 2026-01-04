let capacity = 0;
let cache = new Map();

function setCapacity() {
    capacity = Number(document.getElementById("capacity").value);
    cache.clear();
    displayCache();
}

function put() {
    let key = document.getElementById("key").value;
    let value = document.getElementById("value").value;

    if (!key || capacity === 0) return;

    if (cache.has(key)) {
        cache.delete(key);
    } else if (cache.size === capacity) {
        let lruKey = cache.keys().next().value;
        cache.delete(lruKey);
    }

    cache.set(key, value);
    displayCache();
}

function get() {
    let key = document.getElementById("getKey").value;

    if (!cache.has(key)) {
        document.getElementById("result").innerText = "Cache Miss ❌";
        return;
    }

    let value = cache.get(key);
    cache.delete(key);
    cache.set(key, value);

    document.getElementById("result").innerText =
        "Cache Hit ✅ Value: " + value;

    displayCache();
}

function displayCache() {
    let cacheDiv = document.getElementById("cache");
    cacheDiv.innerHTML = "";

    Array.from(cache.entries()).reverse().forEach(([k, v]) => {
        let div = document.createElement("div");
        div.className = "cache-item";
        div.innerText = `${k} : ${v}`;
        cacheDiv.appendChild(div);
    });
}
