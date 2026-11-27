// Séries d'exercices supplémentaires. Chaque chapitre peut avoir plusieurs séries.
// Types : mc (choix), fill (trou ___), tr (phrase entière), ord (remettre dans l'ordre), match (associer).
const Tr = (q, a, x) => ({ t: "tr", q, a: [].concat(a), x });
const O = (tokens, x, alts) => ({ t: "ord", q: "Fais une phrase correcte avec ces mots.", tokens: tokens.filter(w => !/^[.?!]$/.test(w)), a: [joinTokens(tokens)].concat(alts || []), x });
const Mt = (q, pairs, x) => ({ t: "match", q, pairs, a: [pairs.map(p => p[0] + " → " + p[1]).join(" · ")], x });
function joinTokens(t) { return t.join(" ").replace(/ ([?!.,])/g, "$1").replace(/' /g, "'") }
const chunk = (a, n) => a.reduce((acc, v, i) => (i % n ? acc[acc.length - 1].push(v) : acc.push([v]), acc), []);

// ---------- Passé composé ----------
const ETRE14 = ["naître", "mourir", "monter", "descendre", "aller", "venir", "partir", "arriver", "retourner", "rester", "entrer", "sortir", "tomber", "devenir"];
const ETRE_DERIV = ["revenir", "rentrer", "repartir", "remonter", "redescendre", "parvenir", "intervenir"];
const AVOIR_ODD = ["être", "avoir", "marcher", "courir", "voyager", "sauter", "nager", "danser", "dormir", "habiter", "quitter", "passer un examen"];
const ETRE_SENT = [
  ["devenir", "Elle ___ (devenir) médecin en 2015.", ["est devenue"]],
  ["revenir", "Mes parents ___ (revenir) de vacances hier.", ["sont revenus"]],
  ["retourner", "Nous ___ (retourner) à Paris l'an dernier.", ["sommes retournés", "sommes retournées"]],
  ["monter", "Les enfants ___ (monter) dans le bus.", ["sont montés"]],
  ["rentrer", "À quelle heure est-ce que tu ___ (rentrer) ?", ["es rentré", "es rentrée"]],
  ["naître", "Mes jumelles ___ (naître) en mai.", ["sont nées"]],
  ["partir", "Marie et Paul ___ (partir) ensemble.", ["sont partis"]],
  ["mourir", "Ses grands-parents ___ (mourir) l'an dernier.", ["sont morts"]]
];
const isEtreAns = a => /^(suis|es|est|sommes|êtes|sont) /.test(a[0]);
const REG_EXTRA = [["danser", "dansé"], ["chanter", "chanté"], ["écouter", "écouté"], ["visiter", "visité"], ["oublier", "oublié"], ["envoyer", "envoyé"], ["payer", "payé"], ["appeler", "appelé"], ["étudier", "étudié"], ["nager", "nagé"], ["bâtir", "bâti"], ["applaudir", "applaudi"], ["obéir", "obéi"], ["perdre", "perdu"], ["rendre", "rendu"], ["mordre", "mordu"]];

const PC_SETS = [
  { id: "aux", title: "Être ou avoir ?", desc: "Trie chaque verbe selon son auxiliaire.", items: [].concat(
      ETRE14.map(v => M(`Passé composé de « ${v} » : quel auxiliaire ?`, "être", ["avoir"], `${v} fait partie des 14 verbes de la maison d'être.`)),
      ETRE_DERIV.map(v => M(`Passé composé de « ${v} » : quel auxiliaire ?`, "être", ["avoir"], `${v} est un dérivé d'un verbe de la maison d'être.`)),
      PRO.slice(0, 12).map(p => M(`Passé composé de « ${p[0]} » : quel auxiliaire ?`, "être", ["avoir"], "Tous les verbes pronominaux prennent être.")),
      AVOIR_ODD.map(v => M(`Passé composé de « ${v} » : quel auxiliaire ?`, "avoir", ["être"], `${v} n'est pas dans la liste de être : avoir.`)),
      IRREG.filter(r => !isEtreAns(r[3])).slice(0, 20).map(r => M(`Passé composé de « ${r[0]} » : quel auxiliaire ?`, "avoir", ["être"], `${r[0]} → j'ai ${r[1]}.`))) },
  { id: "ppreg", title: "Participes réguliers", desc: "-er → -é, -ir → -i, -re → -u.", items: REG.map(r => [r[0], r[1]]).concat(REG_EXTRA).map(([inf, pp]) =>
      F(`Participe passé de « ${inf} » : ___`, [pp], inf.endsWith("er") ? "-er → -é." : inf.endsWith("ir") ? "-ir → -i." : "-re → -u.")) },
  { id: "ppirr", title: "Participes irréguliers", desc: "Les 55 participes à connaître par cœur.", items: IRREG.map(r => F(`Participe passé de « ${r[0]} » : ___`, [r[1]], `${r[0]} → ${r[1]}.`)) },
  { id: "match", title: "Associer", desc: "Relie l'infinitif à son participe, le sujet à son auxiliaire.", items: [].concat(
      [Mt("Relie le sujet et l'auxiliaire être.", [["je", "suis"], ["tu", "es"], ["elle", "est"], ["nous", "sommes"], ["vous", "êtes"], ["ils", "sont"]], "être au présent : suis, es, est, sommes, êtes, sont."),
       Mt("Relie le sujet et l'auxiliaire avoir.", [["j'", "ai"], ["tu", "as"], ["on", "a"], ["nous", "avons"], ["vous", "avez"], ["elles", "ont"]], "avoir au présent : ai, as, a, avons, avez, ont.")],
      chunk(shuffleOnce(IRREG.slice()), 6).filter(c => c.length === 6).map(c => Mt("Relie chaque infinitif à son participe passé.", c.map(r => [r[0], r[1]]), "Revois la liste des participes irréguliers."))) },
  { id: "avoir", title: "Phrases avec avoir", desc: "Conjugue avec avoir, sans accord avec le sujet.", items: IRREG.concat(REG).filter(r => !isEtreAns(r[3])).map(r => F(r[2], r[3], `${r[0]} → avoir + ${r[1]}.`, r[4])) },
  { id: "etre", title: "Phrases avec être", desc: "Les verbes de mouvement. Accorde avec le sujet.", items: IRREG.concat(REG).filter(r => isEtreAns(r[3]) && r[0] !== "asseoir").map(r => F(r[2], r[3], `${r[0]} → être, accord avec le sujet.`, r[4]))
      .concat(ETRE_SENT.map(([v, q, a]) => F(q, a, `${v} → être, accord avec le sujet.`))) },
  { id: "pro", title: "Verbes pronominaux", desc: "Toujours être. Accord, sauf COD après ou se = l'un à l'autre.", items: PRO.map(r => F(r[2], r[3], r[5] === "pacc" ? "Pronominal → être, accord avec le sujet." : "Pronominal sans accord : un COD suit, ou se = à l'autre.", r[4])) },
  { id: "cod", title: "Accord avec le COD", desc: "Avec avoir, accord seulement si le COD est avant.", items: [
    F("Ta lettre ? Je l'ai ___ (lire) hier.", ["lue"], "l' = la lettre, COD placé avant avoir → accord féminin."),
    F("Ces films, je les ai ___ (voir) deux fois.", ["vus"], "les = ces films → masculin pluriel."),
    F("Les fleurs que tu m'as ___ (offrir) sont magnifiques.", ["offertes"], "que = les fleurs, avant avoir → féminin pluriel."),
    F("Quelle robe as-tu ___ (choisir) ?", ["choisie"], "quelle robe est avant avoir → accord."),
    F("La maison qu'ils ont ___ (construire) est grande.", ["construite"], "que = la maison → féminin."),
    F("Mes clés ? Je les ai ___ (perdre) !", ["perdues"], "les = mes clés → féminin pluriel."),
    F("Les photos que nous avons ___ (prendre) sont belles.", ["prises"], "que = les photos → féminin pluriel."),
    F("Cette chanson, tu l'as ___ (écrire) toi-même ?", ["écrite"], "l' = cette chanson → féminin."),
    M("Elle a ___ des pommes.", "mangé", ["mangée", "mangées"], "Le COD est après le verbe → pas d'accord."),
    M("Des pommes ? J'en ai ___ trois.", "mangé", ["mangées", "mangés"], "Jamais d'accord avec en."),
    M("Mes amies ? Je leur ai ___ hier.", "parlé", ["parlées", "parlés"], "leur est un COI → pas d'accord."),
    M("Les lettres qu'ils ont ___ étaient longues.", "écrites", ["écrit", "écrits"], "que = les lettres, avant avoir → écrites.")] },
  { id: "double", title: "Monter, sortir, passer… : être ou avoir ?", desc: "Avoir s'il y a un COD, être sinon.", items: [
    M("Elle ___ ses valises dans sa chambre.", "a monté", ["est montée", "est monté"], "COD (ses valises) → avoir, pas d'accord."),
    M("Elle ___ dans sa chambre.", "est montée", ["a monté", "est monté"], "Pas de COD → être, accord féminin."),
    M("Nous ___ le chien ce matin.", "avons sorti", ["sommes sortis", "avons sortis"], "COD (le chien) → avoir."),
    M("Nous ___ hier soir.", "sommes sortis", ["avons sorti", "sommes sorti"], "Pas de COD → être, accord pluriel."),
    M("Il ___ les poubelles.", "a descendu", ["est descendu", "a descendue"], "COD (les poubelles) → avoir."),
    M("Ils ___ par Lyon.", "sont passés", ["ont passé", "sont passé"], "passer par (pas de COD) → être."),
    M("Ils ___ une semaine chez moi.", "ont passé", ["sont passés", "ont passés"], "COD (une semaine) → avoir."),
    M("Paul ___ la voiture au garage.", "a rentré", ["est rentré", "a rentrée"], "COD (la voiture) → avoir."),
    M("Paul ___ tard hier.", "est rentré", ["a rentré", "est rentrée"], "Pas de COD → être."),
    M("Elle ___ la crêpe.", "a retourné", ["est retournée", "a retournée"], "COD (la crêpe) → avoir."),
    M("Elle ___ en Espagne l'été dernier.", "est retournée", ["a retourné", "est retourné"], "Pas de COD → être, accord."),
    M("Les enfants ___ l'escalier en courant.", "ont descendu", ["sont descendus", "ont descendus"], "COD (l'escalier) → avoir.")] },
  { id: "transf", title: "Transformer au passé composé", desc: "Écris toute la phrase au passé composé.", items: [
    Tr("Je mange une pomme.", ["J'ai mangé une pomme."], "manger → avoir + mangé."),
    Tr("Elle va au cinéma.", ["Elle est allée au cinéma."], "aller → être, accord féminin."),
    Tr("Nous prenons le train.", ["Nous avons pris le train."], "prendre → pris."),
    Tr("Ils se couchent tard.", ["Ils se sont couchés tard."], "Pronominal → être, accord."),
    Tr("Tu ne bois pas de café.", ["Tu n'as pas bu de café."], "La négation encadre l'auxiliaire."),
    Tr("Vous faites du sport ?", ["Vous avez fait du sport ?"], "faire → fait."),
    Tr("Les filles sortent ensemble.", ["Les filles sont sorties ensemble."], "sortir sans COD → être, féminin pluriel."),
    Tr("Je le vois.", ["Je l'ai vu."], "Le pronom passe devant l'auxiliaire : je l'ai vu."),
    Tr("Il pleut.", ["Il a plu."], "pleuvoir → plu."),
    Tr("On finit à 18 h.", ["On a fini à 18 h."], "finir → fini."),
    Tr("Elle se lave les mains.", ["Elle s'est lavé les mains."], "COD après (les mains) → pas d'accord."),
    Tr("Nous ne sortons jamais.", ["Nous ne sommes jamais sortis.", "Nous ne sommes jamais sorties."], "jamais se place entre l'auxiliaire et le participe.")] },
  { id: "place", title: "Négation et place des mots", desc: "Ne… pas autour de l'auxiliaire, pronoms devant.", items: [
    Tr("Mets à la forme négative : J'ai vu ce film.", ["Je n'ai pas vu ce film."], "ne + auxiliaire + pas + participe."),
    Tr("Mets à la forme négative : Elle est partie.", ["Elle n'est pas partie."], "La négation encadre est."),
    Tr("Négation avec jamais : Nous sommes allés au Japon.", ["Nous ne sommes jamais allés au Japon."], "jamais après l'auxiliaire."),
    Tr("Négation avec rien : Il a mangé quelque chose.", ["Il n'a rien mangé."], "rien entre auxiliaire et participe."),
    Tr("Négation avec personne : J'ai vu quelqu'un.", ["Je n'ai vu personne."], "personne se place après le participe."),
    Tr("Remplace par un pronom : J'ai appelé Marie.", ["Je l'ai appelée."], "l' = Marie, COD avant → appelée."),
    Tr("Remplace par y : Je suis allé à la banque.", ["J'y suis allé."], "y devant l'auxiliaire."),
    Tr("Remplace par en : Nous avons acheté du pain.", ["Nous en avons acheté."], "en devant l'auxiliaire, pas d'accord."),
    M("Quelle phrase est correcte ?", "J'ai bien dormi.", ["J'ai dormi bien.", "Bien j'ai dormi."], "Adverbe court entre auxiliaire et participe."),
    M("Quelle phrase est correcte ?", "Il est arrivé hier.", ["Il est hier arrivé.", "Il hier est arrivé."], "Les adverbes de temps vont après le participe."),
    O(["Je", "ne", "l'ai", "pas", "vu", "."], "ne + pronom + auxiliaire + pas + participe."),
    O(["Nous", "n'y", "sommes", "jamais", "allés", "."], "n'y + auxiliaire + jamais + participe."),
    O(["Ils", "ne", "se", "sont", "pas", "parlé", "."], "Pronominal : ne + se + être + pas + participe."),
    O(["Il", "ne", "m'a", "rien", "dit", "."], "rien entre l'auxiliaire et le participe."),
    O(["Tu", "as", "déjà", "fini", "tes", "devoirs", "?"], "déjà entre l'auxiliaire et le participe.")] },
  { id: "rep", title: "Répondre avec un pronom", desc: "Réponds aux questions sans répéter le nom.", items: [
    F("Tu as fini le rapport ? — Oui, ___", ["je l'ai fini"], "l' = le rapport, masculin."),
    F("Elle a appelé sa sœur ? — Non, ___", ["elle ne l'a pas appelée"], "l' = sa sœur → appelée."),
    F("Vous êtes allés au musée ? — Oui, ___", ["nous y sommes allés"], "y = au musée."),
    F("Tu as acheté des tomates ? — Oui, ___", ["j'en ai acheté"], "en = des tomates, pas d'accord."),
    F("Ils ont vu tes photos ? — Oui, ___", ["ils les ont vues"], "les = tes photos → vues."),
    F("Tu t'es levé tôt ? — Non, ___", ["je ne me suis pas levé tôt", "je ne me suis pas levée tôt"], "ne + me + suis + pas + levé."),
    F("Vous avez parlé au directeur ? — Oui, ___", ["nous lui avons parlé", "je lui ai parlé"], "lui = au directeur (COI), pas d'accord."),
    F("Elle est rentrée en taxi ? — Non, ___", ["elle n'est pas rentrée en taxi"], "La négation encadre est.")] }
];
function shuffleOnce(a) { let s = 7; for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

// ---------- Imparfait ----------
const IMP = [["parler", "parl"], ["finir", "finiss"], ["faire", "fais"], ["prendre", "pren"], ["avoir", "av"], ["être", "ét"], ["aller", "all"], ["manger", "mange", "mang"], ["commencer", "commenç", "commenc"], ["boire", "buv"], ["voir", "voy"], ["dire", "dis"], ["lire", "lis"], ["venir", "ven"], ["pouvoir", "pouv"], ["vouloir", "voul"], ["savoir", "sav"], ["écrire", "écriv"], ["mettre", "mett"], ["dormir", "dorm"], ["habiter", "habit"], ["vivre", "viv"]];
const PERS = [["je", "ais"], ["tu", "ais"], ["il", "ait"], ["nous", "ions"], ["vous", "iez"], ["elles", "aient"]];
const IMP_ITEMS = IMP.flatMap(([inf, sa, si], k) => [PERS[k % 6], PERS[(k + 3) % 6]].map(([p, end]) => {
  const form = (end.startsWith("i") ? (si || sa) : sa) + end;
  const pron = p === "je" && /^[aeéèêiouh]/.test(form) ? "j'" : p + " ";
  return F(`Imparfait de « ${inf} » : ${pron === "j'" ? "j'" : p} ___`, [form, pron + form], `Radical de nous au présent + -${end}${si ? " (attention à l'orthographe devant i)" : ""}.`);
}));
const STORY = [
  M("Quand j'étais petit, nous ___ chaque été à la mer.", "allions", ["sommes allés"], "Habitude (chaque été) → imparfait."),
  M("Un été, mon père ___ un bateau.", "a acheté", ["achetait"], "« Un été » : événement unique → passé composé."),
  M("Il faisait chaud et le ciel ___ bleu.", "était", ["a été"], "Description → imparfait."),
  M("Un matin, nous ___ très tôt.", "sommes partis", ["partions"], "« Un matin » → passé composé."),
  M("Pendant que mon père ramait, ma sœur ___.", "chantait", ["a chanté"], "pendant que + deux actions longues → imparfait."),
  M("Tout à coup, le vent ___.", "s'est levé", ["se levait"], "« Tout à coup » → passé composé."),
  M("Les vagues ___ de plus en plus grandes.", "devenaient", ["sont devenues"], "Évolution progressive, décor → imparfait."),
  M("Finalement, nous ___ au port à midi.", "sommes rentrés", ["rentrions"], "« Finalement » → passé composé."),
  M("D'habitude, ma mère ___ des crêpes le dimanche.", "faisait", ["a fait"], "« D'habitude » → imparfait."),
  M("Hier, je ___ mes clés pendant que je faisais les courses.", "ai perdu", ["perdais"], "Action ponctuelle pendant une action longue → passé composé."),
  M("Je ___ la télé quand Paul a sonné.", "regardais", ["ai regardé"], "Action en cours interrompue → imparfait."),
  M("Avant, il ___ à Lyon, maintenant il habite à Paris.", "habitait", ["a habité"], "« Avant » + situation passée → imparfait.")
];

// ---------- autres chapitres ----------
const YEN = [
  M("Tu vas à la poste ? — Oui, j'___ vais.", "y", ["en", "le", "lui"], "à + lieu → y."),
  M("Tu reviens du marché ? — Oui, j'___ reviens.", "en", ["y", "le", "lui"], "de + lieu → en."),
  M("Il pense à son travail. → Il ___ pense.", "y", ["en", "le", "lui"], "penser à + chose → y."),
  M("Elle a besoin de son téléphone. → Elle ___ a besoin.", "en", ["y", "le", "lui"], "avoir besoin de → en."),
  M("On joue au tennis ? — Oui, on ___ joue.", "y", ["en", "le", "lui"], "jouer à → y."),
  M("Il y a du lait ? — Oui, il y ___ a.", "en", ["y", "le", "lui"], "du lait → en ; y avant en."),
  M("Tu as peur des chiens ? — Oui, j'___ ai peur.", "en", ["y", "les", "leur"], "avoir peur de → en."),
  M("Tu habites à Bangkok ? — Oui, j'___ habite.", "y", ["en", "le", "lui"], "à + lieu → y."),
  M("Tu parles à Marc ? — Oui, je ___ parle.", "lui", ["y", "en", "le"], "à + personne → lui."),
  M("Tu vois le film ce soir ? — Oui, je ___ vois.", "le", ["y", "en", "lui"], "COD défini → le."),
  O(["Je", "n'y", "vais", "pas", "."], "ne + y + verbe + pas."),
  O(["J'en", "ai", "acheté", "deux", "."], "en devant l'auxiliaire, la quantité à la fin.")
];
const NEG_TR = [
  Tr("Négation avec plus : Je fume encore.", ["Je ne fume plus."], "encore → ne … plus."),
  Tr("Négation avec personne : Il voit quelqu'un.", ["Il ne voit personne."], "quelqu'un → ne … personne."),
  Tr("Négation avec rien : Elle mange quelque chose.", ["Elle ne mange rien."], "quelque chose → ne … rien."),
  Tr("Négation avec plus : J'ai du lait.", ["Je n'ai plus de lait."], "du → de après la négation."),
  Tr("Mets à la forme négative : Nous avons une voiture.", ["Nous n'avons pas de voiture."], "une → de après la négation."),
  Tr("Négation avec pas encore : Il est déjà parti.", ["Il n'est pas encore parti."], "déjà → pas encore."),
  Tr("Négation avec ni … ni : Je veux du thé et du café.", ["Je ne veux ni thé ni café."], "ne … ni … ni, sans article."),
  Tr("Mets à la forme négative : C'est un livre.", ["Ce n'est pas un livre."], "Avec être, l'article reste."),
  Tr("Négation avec jamais : Je bois toujours du café.", ["Je ne bois jamais de café."], "toujours → jamais ; du → de."),
  O(["Je", "préfère", "ne", "pas", "venir", "."], "Avec un infinitif : ne pas ensemble devant."),
  O(["Personne", "n'est", "venu", "."], "Personne en sujet + ne."),
  O(["Je", "n'ai", "vu", "personne", "."], "personne après le participe.")
];
const REL_TR = [
  Tr("Relie avec qui ou que : J'ai un ami. Il parle chinois.", ["J'ai un ami qui parle chinois."], "Il (sujet) → qui."),
  Tr("Relie avec qui ou que : Voici le livre. Je lis ce livre.", ["Voici le livre que je lis."], "ce livre (COD) → que."),
  Tr("Relie avec qui ou que : C'est une ville. J'adore cette ville.", ["C'est une ville que j'adore."], "cette ville (COD) → que."),
  Tr("Relie avec qui ou que : Le bus est en retard. Je prends ce bus.", ["Le bus que je prends est en retard."], "que se place juste après le nom."),
  Tr("Relie avec qui ou que : La femme est ma prof. Elle parle.", ["La femme qui parle est ma prof."], "Elle (sujet) → qui."),
  Tr("Relie avec qui ou que : Tu connais le garçon ? Il chante.", ["Tu connais le garçon qui chante ?"], "Il (sujet) → qui.")
];
const POSS_MATCH = [
  Mt("Associe l'adjectif et le pronom.", [["mon livre", "le mien"], ["ta maison", "la tienne"], ["ses chaussures", "les siennes"], ["notre voiture", "la nôtre"], ["vos enfants", "les vôtres"], ["leur chien", "le leur"]], "Le pronom garde le genre et le nombre du nom."),
  Mt("Associe l'adjectif et le pronom.", [["mes clés", "les miennes"], ["ton sac", "le tien"], ["sa robe", "la sienne"], ["nos amis", "les nôtres"], ["votre ville", "la vôtre"], ["leurs valises", "les leurs"]], "Le pronom garde le genre et le nombre du nom.")
];
const DEM_MATCH = [Mt("Associe le nom et le pronom démonstratif.", [["ce gâteau-ci", "celui-ci"], ["cette robe-là", "celle-là"], ["ces livres-ci", "ceux-ci"], ["ces fleurs-là", "celles-là"], ["cette idée", "cela"]], "Le pronom garde le genre et le nombre du nom.")];

const EXTRA_SETS = {
  pc: PC_SETS,
  "3": [{ id: "imp", title: "Former l'imparfait", desc: "Radical de nous + -ais, -ais, -ait, -ions, -iez, -aient.", items: IMP_ITEMS },
        { id: "story", title: "Raconter une histoire", desc: "Décor à l'imparfait, événements au passé composé.", items: STORY }],
  "2": [{ id: "yen", title: "y, en, le ou lui ?", desc: "Choisis le bon pronom.", items: YEN }],
  "8": [{ id: "rel", title: "Relier deux phrases", desc: "Écris une seule phrase avec qui ou que.", items: REL_TR }],
  "12": [{ id: "dem", title: "Associer", desc: "Nom → pronom démonstratif.", items: DEM_MATCH }],
  "15": [{ id: "poss", title: "Associer", desc: "Adjectif possessif → pronom.", items: POSS_MATCH }],
  "17": [{ id: "negtr", title: "Transformer à la négative", desc: "Écris toute la phrase à la forme négative.", items: NEG_TR }]
};
