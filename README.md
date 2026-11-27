# Grammaire A1–A2

French grammar practice for levels A1 and A2: a rulebook for every topic and 995 exercises, with progress saved in the browser (`localStorage`).

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8765
```

## Files

| File | Contents |
|---|---|
| `index.html` | Layout and styles |
| `js/grammar.js` | Chapters, short rule recaps and the core exercises |
| `js/verbs.js` | Irregular, regular and pronominal verbs with example sentences |
| `js/book.js` | The full rulebook, one page per chapter |
| `js/basics.js` | A1–A2 fundamentals (23 chapters: present tense, articles, pronouns, futur, impératif, conditionnel, subjonctif, questions…) |
| `js/sets.js` | Extra exercise sets (passé composé, imparfait, y/en, negation, relatives, possessives, demonstratives) |
| `js/app.js` | The app: exercises, rulebook, search, progress |

## Exercise types

- `mc`: multiple choice
- `fill`: fill in the blank (`___`)
- `tr`: write the whole sentence (transform)
- `ord`: put the words in order
- `match`: match pairs

To add exercises to a chapter, add a set to `EXTRA_SETS` in `js/sets.js`, keyed by the chapter id.
