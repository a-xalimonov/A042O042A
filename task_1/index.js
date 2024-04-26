import { encoded, translations } from "./data.js";

console.log(encoded, translations);

const decoded = [];
const unique = [];

for (let obj of encoded) {
    const newObj = {};
    for (let key in obj) {
        let val = obj[key];
        if (key.slice(-2) === "Id" && typeof val === "string" && translations.hasOwnProperty(val)) {
            if (!unique.includes(val)) unique.push(val);
            val = translations[val];
        }
        newObj[key] = val;
    }
    decoded.push(newObj);
}
console.log(decoded, unique);
