
// ---------- contenu ----------
// M(question, bonne réponse, [mauvaises], explication, anglais?)  F(question avec ___, [réponses acceptées], explication, anglais?)
const M = (q, a, o, x, en) => ({ t: "mc", q, a: [a], o, x, en });
const F = (q, a, x, en) => ({ t: "fill", q, a: [].concat(a), x, en });
const ex = (fr, en) => ({ ex: [fr, en] });

const TOPICS = [
{ id: "1", title: "Le pronom complément « y »", rule: [
  "**y** remplace **à / au / aux + lieu ou chose**. Sens : *there*, *it*. Il se place devant le verbe.",
  ex("Je vais au cinéma. → J'y vais.", "I'm going there."),
  ex("Je pense à ma nouvelle voiture. → J'y pense.", "I'm thinking of it.")],
  items: [
  M("Je vais au cinéma. → ?", "J'y vais.", ["J'en vais.", "Je le vais."], "au + lieu → y."),
  M("Tu penses à ton examen ? — Oui, …", "j'y pense.", ["j'en pense.", "je le pense."], "penser à + chose → y."),
  F("Nous allons à Lyon demain. → Nous ___ allons demain.", "y", "à + lieu → y, devant le verbe."),
  M("Elle répond à la lettre. → ?", "Elle y répond.", ["Elle en répond.", "Elle la répond."], "répondre à + chose → y."),
  F("Ils habitent en France ? — Oui, ils ___ habitent.", "y", "en / à + lieu où l'on est → y."),
  F("Je ne vais pas à la piscine. → Je n'___ vais pas.", "y", "À la forme négative : n'y … pas."),
  M("Tu es allé au marché ? — Oui, …", "j'y suis allé.", ["je suis y allé.", "j'en suis allé."], "Au passé composé, y se place devant l'auxiliaire.")
]},
{ id: "2", title: "Le pronom complément « en »", rule: [
  "**en** remplace **de + objet** : article partitif (du, de la, de l', des), **de + lieu** (venir de), ou une quantité.",
  ex("Je bois du café. → J'en bois.", "I'm drinking some."),
  ex("Je viens de Paris. → J'en viens.", "I come from there."),
  ex("Tu as une voiture ? — J'en ai deux.", "I have two."),
  ex("Tu as pris le dîner ? — J'en ai pris beaucoup.", "I had a lot.")],
  items: [
  M("Je bois du café. → ?", "J'en bois.", ["J'y bois.", "Je le bois."], "du + nom (partitif) → en."),
  M("Je viens de Paris. → ?", "J'en viens.", ["J'y viens.", "Je la viens."], "venir de + lieu → en."),
  F("Tu as une voiture ? — Oui, j'___ ai deux.", "en", "Quantité (deux) → en … deux."),
  M("Elle mange des pommes. → ?", "Elle en mange.", ["Elle les mange.", "Elle y mange."], "des + nom indéfini → en."),
  M("Il a beaucoup d'amis ? — Oui, …", "il en a beaucoup.", ["il y a beaucoup.", "il les a beaucoup."], "beaucoup de + nom → en … beaucoup."),
  F("Vous voulez de l'eau ? — Oui, j'___ veux bien.", "en", "de l' + nom → en."),
  M("Ils parlent de leur voyage. → ?", "Ils en parlent.", ["Ils y parlent.", "Ils le parlent."], "parler de + chose → en."),
  M("Je pense à mes vacances. → ?", "J'y pense.", ["J'en pense.", "Je les pense."], "Piège : penser À → y, pas en.")
]},
{ id: "pc", label: "PC", title: "Le passé composé", rule: [
  "**auxiliaire être ou avoir au présent + participe passé**. Action ponctuelle, terminée dans le passé.",
  "**être** : 14 verbes (naître, mourir, monter, descendre, aller, venir, partir, arriver, retourner, rester, entrer, sortir, tomber, devenir) + tous les verbes pronominaux. Accord avec le sujet.",
  "**avoir** : tous les autres. Pas d'accord avec le sujet, mais accord avec le COD placé avant.",
  "monter, descendre, rentrer, sortir, passer, retourner + COD → **avoir**.",
  ex("Elle est montée dans sa chambre. / Elle a monté sa valise.", "She went up to her room. / She took her suitcase up.")],
  items: []},
{ id: "3", title: "Le passé composé vs l'imparfait", rule: [
  "**Passé composé** : action terminée, événement ponctuel ou série d'événements.",
  "**Imparfait** : description (émotion, météo, personne), action en cours (*was / were + -ing*), habitude.",
  ex("J'avais faim. Il faisait beau. Il portait une chemise noire.", "I was hungry. It was nice. He wore a black shirt."),
  ex("Je regardais la télé quand il est arrivé.", "I was watching TV when he arrived."),
  ex("J'allais à l'école tous les jours.", "I went to school every day."),
  "Imparfait : tous les jours, chaque matin, en général, d'habitude, autrefois, à l'époque, toujours, souvent, rarement.",
  "Passé composé : un jour, un matin, soudain, brusquement, tout à coup, tout de suite, immédiatement, d'abord, enfin, puis, ensuite.",
  "être, avoir, porter, voir, pouvoir, vouloir, savoir sont surtout à l'imparfait."],
  items: [
  F("Hier, il ___ (faire) beau.", "faisait", "Météo, description → imparfait."),
  F("J'___ (avoir) faim.", "avais", "Sensation, état → imparfait."),
  F("Je regardais la télé quand il ___ (arriver).", ["est arrivé"], "Action ponctuelle qui interrompt → passé composé."),
  F("Quand j'étais petit, j'___ (aller) à l'école à pied tous les jours.", "allais", "Habitude (tous les jours) → imparfait."),
  M("Un jour, elle ___ son voisin dans l'ascenseur.", "a rencontré", ["rencontrait", "rencontre"], "« Un jour » → événement unique → passé composé."),
  M("Soudain, le téléphone ___.", "a sonné", ["sonnait", "sonne"], "« Soudain » → passé composé."),
  M("D'habitude, nous ___ au restaurant le samedi.", "mangions", ["avons mangé", "mangeons"], "« D'habitude » → imparfait."),
  M("Ce jour-là, il ___ une chemise noire.", "portait", ["a porté", "porte"], "Description de ce qu'il portait → imparfait."),
  M("Ce matin, je me ___ à 7 h, puis j'ai pris le bus.", "suis levé", ["levais", "lève"], "Série d'actions (puis) → passé composé."),
  M("Quel mot va avec l'imparfait ?", "autrefois", ["tout à coup", "un matin", "immédiatement"], "Autrefois = in the past, habitude → imparfait.")
]},
{ id: "4", title: "Les prépositions du temps", rule: [
  "**à** : heure précise (à 8 heures). **en** : saison, mois, année, ou durée nécessaire (en 10 minutes = within).",
  "**dans** : temps avant une action future (dans 10 minutes). **depuis** : action qui continue (depuis une heure).",
  "**pendant / durant** : durée complète d'une action. **pour** : durée d'un événement futur.",
  ex("Nous mangerons dans 10 minutes.", "We'll eat in 10 minutes."),
  ex("Nous parlons depuis une heure.", "We've been talking for an hour."),
  ex("Il a dormi pendant 12 heures.", "He slept for 12 hours.")],
  items: [
  M("Le film commence ___ 20 heures.", "à", ["en", "dans"], "Heure précise → à."),
  M("Nous partons en vacances ___ été.", "en", ["à", "dans"], "Saison (sauf printemps) → en."),
  M("Il est né ___ 1995.", "en", ["à", "dans"], "Année → en."),
  M("Le train part ___ 10 minutes. (from now)", "dans", ["en", "depuis"], "Temps avant une action future → dans."),
  M("J'apprends le français ___ deux ans. (still learning)", "depuis", ["pendant", "pour"], "Action qui continue → depuis."),
  M("Il a dormi ___ 12 heures.", "pendant", ["depuis", "dans"], "Durée complète d'une action passée → pendant."),
  M("Elle part au Japon ___ une semaine.", "pour", ["depuis", "en"], "Durée prévue d'un événement futur → pour."),
  M("J'ai fini ce travail ___ une heure. (it took me one hour)", "en", ["dans", "pour"], "Temps nécessaire → en."),
  F("Nous mangerons ___ dix minutes.", "dans", "Futur, temps avant l'action → dans.")
]},
{ id: "5", title: "Monter dans, descendre de + transport", rule: [
  "**monter dans** + transport : *to get on / in*. **descendre de** + transport : *to get off / out of*.",
  "de + le → **du** : descendre du bus.",
  ex("Je monte dans le bus.", "I'm getting on the bus."),
  ex("Les enfants descendent du bus scolaire.", "The kids are getting off the school bus.")],
  items: [
  F("Je monte ___ le bus.", "dans", "monter dans + transport."),
  F("Les enfants descendent ___ bus scolaire.", "du", "descendre de + le bus → du bus."),
  M("Susan ___ l'avion. (is getting off)", "descend de", ["descend dans", "monte de"], "Sortir d'un transport → descendre de."),
  F("Allez, monte ___ la voiture !", "dans", "Entrer dans un transport → monter dans."),
  M("Il descend ___ train à Lyon.", "du", ["de le", "dans le"], "de + le → du."),
  M("I'm getting on the metro.", "Je monte dans le métro.", ["Je monte du métro.", "Je descends dans le métro."], "Get on → monter dans."),
  F("Nous descendons ___ taxi devant l'hôtel.", "du", "descendre de + le taxi → du taxi.")
]},
{ id: "6", title: "Les adjectifs interrogatifs", rule: [
  { table: [["", "Singulier", "Pluriel"], ["Masculin", "quel", "quels"], ["Féminin", "quelle", "quelles"]] },
  "Avec une préposition, elle se place devant quel : **À quel** voyage penses-tu ?",
  "Quel + être : **Quel est** … ? / **Quels sont** … ?",
  "Expressions : Quelle heure est-il ? Quelle est la date ? Quel jour sommes-nous ?",
  "Aussi hors des questions : Je ne sais pas **quelle** chemise acheter."],
  items: [
  M("___ film veux-tu voir ?", "Quel", ["Quelle", "Quels"], "film : masculin singulier."),
  M("___ ville est plus jolie : Paris ou New York ?", "Quelle", ["Quel", "Quelles"], "ville : féminin singulier."),
  M("___ livres est-ce qu'elle doit acheter ?", "Quels", ["Quel", "Quelles"], "livres : masculin pluriel."),
  M("Elle doit acheter ___ fleurs ?", "quelles", ["quels", "quelle"], "fleurs : féminin pluriel."),
  F("___ heure est-il ?", "quelle", "heure est féminin → quelle."),
  M("___ sont les cours les plus intéressants ?", "Quels", ["Quel", "Quelles"], "Quels sont + nom masculin pluriel."),
  M("___ voyage penses-tu ?", "À quel", ["Quel", "Quel à"], "penser à : la préposition précède quel."),
  F("Je ne sais pas ___ chemise acheter.", "quelle", "chemise : féminin singulier."),
  F("___ est la date ?", "quelle", "date est féminin → Quelle est la date ?")
]},
{ id: "7", title: "Le plus-que-parfait", rule: [
  "**être / avoir à l'imparfait + participe passé** = *had + past participle*. Action passée avant une autre action passée.",
  ex("J'avais fini de dîner quand il est arrivé.", "I had finished dinner when he arrived."),
  ex("Nous étions partis à six heures du matin.", "We had left at six in the morning.")],
  items: [
  F("J'___ (finir) de dîner quand il est arrivé.", ["avais fini"], "avoir à l'imparfait + fini."),
  F("Nous ___ (partir) à six heures du matin.", ["étions partis", "étions parties"], "partir → être ; accord avec nous."),
  F("Elle ___ (oublier) ses clés, alors elle n'a pas pu entrer.", ["avait oublié"], "L'oubli vient avant → plus-que-parfait."),
  F("Quand je suis arrivé, le film ___ (commencer).", ["avait commencé"], "Le film a commencé avant mon arrivée."),
  M("Ils ___ quand on a téléphoné.", "étaient déjà sortis", ["avaient déjà sortis", "sont déjà sortis"], "sortir → être, à l'imparfait : étaient sortis."),
  F("Tu ___ (lire) ce livre avant de voir le film ?", ["avais lu"], "avoir à l'imparfait + lu."),
  M("Comment forme-t-on le plus-que-parfait ?", "auxiliaire à l'imparfait + participe passé", ["auxiliaire au présent + participe passé", "verbe à l'imparfait + de + infinitif"], "had + V3 = avais / étais + participe.")
]},
{ id: "8", title: "Les pronoms relatifs simples (qui, que)", rule: [
  "**nom + qui + verbe** : qui est le sujet du verbe qui suit.",
  "**nom + que + sujet + verbe** : que est le complément d'objet. Devant une voyelle : **qu'**.",
  ex("Je vois une femme qui porte une robe.", "I see a woman who is wearing a dress."),
  ex("Fabio, que Susan a rencontré hier, est le frère de Léo.", "Fabio, whom Susan met yesterday, is Léo's brother.")],
  items: [
  M("Je vois une femme ___ porte une robe.", "qui", ["que", "qu'"], "Le verbe suit directement → qui."),
  M("La femme ___ je vois porte une robe.", "que", ["qui", "dont"], "Un sujet (je) suit → que."),
  M("Fabio, ___ Susan a rencontré hier, est le frère de Léo.", "que", ["qui", "quoi"], "Sujet (Susan) + verbe → que."),
  F("C'est le livre ___ j'ai acheté.", ["que"], "Sujet (j') suit → que."),
  F("J'ai un ami ___ habite à Lyon.", "qui", "Verbe (habite) suit → qui."),
  F("Le gâteau ___ est sur la table est pour toi.", "qui", "Verbe (est) suit → qui."),
  M("C'est la ville ___ il préfère.", "qu'", ["qui", "que"], "que + il → qu'il."),
  F("Le film ___ nous avons vu était long.", "que", "Sujet (nous) suit → que.")
]},
{ id: "9", title: "Les pronoms relatifs indéfinis (ce qui, ce que)", rule: [
  "**ce qui + verbe** : *what* sujet. **ce que + sujet + verbe** : *what* complément. Devant voyelle : **ce qu'**.",
  ex("Je ne sais pas ce qui me rend triste.", "I don't know what makes me sad."),
  ex("Je ne sais pas ce que je fais.", "I don't know what I'm doing."),
  ex("Il ne se souvient pas de ce qu'il a mangé.", "He doesn't remember what he ate.")],
  items: [
  M("Je ne sais pas ___ me rend triste.", "ce qui", ["ce que", "qui"], "Verbe directement après → ce qui."),
  M("Je ne sais pas ___ je fais.", "ce que", ["ce qui", "que"], "Sujet (je) après → ce que."),
  M("Il ne se souvient pas de ___ il a mangé.", "ce qu'", ["ce qui", "ce que"], "ce que + il → ce qu'il."),
  F("Dis-moi ___ tu veux.", ["ce que"], "Sujet (tu) après → ce que."),
  F("___ m'intéresse, c'est la musique.", ["ce qui"], "Verbe (intéresse) après → ce qui."),
  F("Je ne comprends pas ___ se passe.", ["ce qui"], "Verbe (se passe) après → ce qui."),
  F("Fais ___ tu peux.", ["ce que"], "Sujet (tu) après → ce que."),
  M("Je ne peux pas penser à ___ est bon pour toi.", "ce qui", ["ce que", "qu'"], "Verbe (est) après → ce qui.")
]},
{ id: "10", title: "La comparaison", rule: [
  "Adjectif / adverbe : **plus … que**, **aussi … que**, **moins … que**.",
  "Verbe : **plus que**, **autant que**, **moins que**. Nom : **plus de / autant de / moins de … que**.",
  "Évolution : **de plus en plus**, **de moins en moins**.",
  ex("Jean travaille aussi vite que Max.", "Jean works as fast as Max."),
  ex("Max travaille autant que Jean.", "Max works as much as Jean."),
  ex("Max a moins de travail que Jean.", "Max has less work than Jean.")],
  items: [
  M("Jean est ___ rapide que Max. (more)", "plus", ["plus de", "autant"], "Adjectif → plus … que."),
  M("Jean travaille ___ vite que Max. (as)", "aussi", ["autant", "autant de"], "Adverbe (vite) → aussi … que."),
  M("Max a ___ travail que Jean. (as much)", "autant de", ["aussi", "autant"], "Nom → autant de … que."),
  M("Max travaille ___ que Jean. (as much)", "autant", ["aussi", "autant de"], "Verbe → autant que."),
  M("Max a ___ travail que Jean. (less)", "moins de", ["moins", "moins que"], "Nom → moins de … que."),
  F("Ce travail est ___ intéressant. (more and more)", ["de plus en plus"], "de plus en plus."),
  F("Ma grand-mère sort ___. (less and less)", ["de moins en moins"], "de moins en moins."),
  F("Jean est ___ rapide que Max. (less)", "moins", "Adjectif → moins … que."),
  M("Jacques mange ___ avec le temps. (more and more)", "de plus en plus", ["plus en plus", "de plus que plus"], "de plus en plus, après le verbe.")
]},
{ id: "11", title: "Le superlatif", rule: [
  "Adjectif : **le / la / les plus (moins)** + adjectif, accordé : Zoe est **la plus grande**.",
  "Adverbe : toujours **le plus / le moins** : Marie chante **le plus fort**.",
  "Verbe : verbe + **le plus / le moins** : C'est Juliette qui travaille **le plus**."],
  items: [
  M("Zoe est ___ grande de la classe.", "la plus", ["le plus", "plus"], "Adjectif féminin → la plus."),
  M("Marie chante ___ fort.", "le plus", ["la plus", "plus que"], "Adverbe → toujours le plus, même pour Marie."),
  M("Mac est ___ grand. (least)", "le moins", ["la moins", "moins"], "Adjectif masculin → le moins."),
  F("Paul est celui qui boit ___ dans ma famille. (least)", ["le moins"], "Verbe + le moins."),
  F("Patrick est ___ courageux. (most)", ["le plus"], "Adjectif masculin → le plus."),
  F("Cet ordinateur marche ___ bien. (least)", ["le moins"], "Adverbe → le moins."),
  M("Ce sont ___ beaux jours de l'année.", "les plus", ["le plus", "plus"], "Adjectif pluriel → les plus."),
  F("Qu'est-ce que tu aimes ___ ici ? (most)", ["le plus"], "Verbe + le plus.")
]},
{ id: "12", title: "Les pronoms démonstratifs", rule: [
  { table: [["", "this one", "that one", "these", "those"], ["Masculin", "celui-ci", "celui-là", "ceux-ci", "ceux-là"], ["Féminin", "celle-ci", "celle-là", "celles-ci", "celles-là"]] },
  "**ceci / cela** (neutres) remplacent une idée, une situation ou une chose non nommée.",
  ex("Ceci va être difficile à croire.", "This is going to be hard to believe."),
  ex("J'ai pensé à cela hier.", "I thought about that yesterday.")],
  items: [
  M("Tu veux ce gâteau-ci ? → Tu veux ___ ?", "celui-ci", ["celle-ci", "ceci"], "gâteau : masculin singulier."),
  M("J'aime cette robe-là. → J'aime ___.", "celle-là", ["celui-là", "cela"], "robe : féminin singulier."),
  M("Je prends ces livres-ci. → Je prends ___.", "ceux-ci", ["celles-ci", "ceci"], "livres : masculin pluriel."),
  M("Ces fleurs-là sont jolies. → ___ sont jolies.", "Celles-là", ["Ceux-là", "Cela"], "fleurs : féminin pluriel."),
  M("___ va être difficile à croire.", "Ceci", ["Celui-ci", "Celle-ci"], "Une idée, pas un nom précis → ceci."),
  F("J'ai pensé à ___ hier. (that, une idée)", "cela", "Idée abstraite → cela."),
  M("Quelle voiture préfères-tu ? ___ ou celle-là ?", "Celle-ci", ["Celui-ci", "Ceci"], "voiture : féminin singulier.")
]},
{ id: "13", title: "Le passé récent (venir de)", rule: [
  "**venir (présent) + de + infinitif** = *just did*.",
  { table: [["je viens de finir", "nous venons de finir"], ["tu viens de finir", "vous venez de finir"], ["il / elle / on vient de finir", "ils / elles viennent de finir"]] }],
  items: [
  F("Je ___ finir. (I just finished)", ["viens de"], "je viens de + infinitif."),
  F("Nous ___ manger.", ["venons de"], "nous venons de."),
  F("Ils ___ partir.", ["viennent de"], "ils viennent de."),
  F("Elle ___ téléphoner.", ["vient de"], "elle vient de."),
  F("Vous ___ commencer ?", ["venez de"], "vous venez de."),
  F("Tu ___ rentrer ?", ["viens de"], "tu viens de."),
  M("« Tu viens de finir » veut dire :", "You just finished.", ["You will finish.", "You come from finishing."], "venir de + infinitif = passé récent.")
]},
{ id: "14", title: "Le présent continu", rule: [
  "Le présent simple suffit : *Qu'est-ce que tu fais ? — Je mange.* = I am eating.",
  "Pour insister : **être en train de + infinitif**.",
  "Au passé, l'imparfait est déjà continu : *Je mangeais* = I was eating. Insistance : *J'étais en train de manger.*",
  ex("Nous ne sommes pas en train de manger.", "We are not eating.")],
  items: [
  M("I am eating. (avec insistance)", "Je suis en train de manger.", ["Je suis mangeant.", "Je suis de manger."], "être en train de + infinitif."),
  F("Il ___ en train de jouer.", "est", "il est en train de."),
  F("Nous ne sommes pas en train ___ manger.", "de", "en train de + infinitif."),
  M("I was eating.", "Je mangeais.", ["J'ai mangé.", "Je suis mangé."], "L'imparfait exprime l'action en cours."),
  F("Qu'est-ce que tu es ___ de faire ?", ["en train"], "être en train de faire."),
  F("J'___ en train de manger quand tu as appelé.", "étais", "Au passé : imparfait de être."),
  M("Tu manges. = ?", "You are eating.", ["You were eating.", "You just ate."], "Le présent simple couvre « am / are -ing ».")
]},
{ id: "15", title: "Les pronoms possessifs", rule: [
  { table: [["", "m. sing.", "f. sing.", "m. pl.", "f. pl."], ["mine", "le mien", "la mienne", "les miens", "les miennes"], ["yours (tu)", "le tien", "la tienne", "les tiens", "les tiennes"], ["his / hers", "le sien", "la sienne", "les siens", "les siennes"], ["ours", "le nôtre", "la nôtre", "les nôtres", "les nôtres"], ["yours (vous)", "le vôtre", "la vôtre", "les vôtres", "les vôtres"], ["theirs", "le leur", "la leur", "les leurs", "les leurs"]] },
  "Le pronom s'accorde avec **l'objet possédé**, pas avec le possesseur.",
  ex("J'aime bien tes chaussures, mais je préfère les miennes.", "I like your shoes but I prefer mine.")],
  items: [
  M("C'est ton livre ? — Oui, c'est ___.", "le mien", ["la mienne", "les miens"], "livre : masculin singulier."),
  M("J'aime bien tes chaussures, mais je préfère ___.", "les miennes", ["les miens", "la mienne"], "chaussures : féminin pluriel."),
  M("C'est la voiture de Paul ? — Oui, c'est ___.", "la sienne", ["le sien", "la leur"], "voiture : féminin ; un possesseur → sienne."),
  F("Ce sont nos clés ? — Oui, ce sont ___.", ["les nôtres"], "Pluriel, à nous → les nôtres."),
  M("Leur maison est grande, ___ est petite. (ours)", "la nôtre", ["le nôtre", "la notre"], "maison : féminin ; attention à l'accent : nôtre."),
  M("Mes parents vont bien. Et ___ ? (vous)", "les vôtres", ["les vôtre", "le vôtre"], "parents : pluriel."),
  F("Ce sont leurs enfants ? — Oui, ce sont ___.", ["les leurs"], "Pluriel, à eux → les leurs."),
  M("Ta valise est ici. Où est ___ ? (hers)", "la sienne", ["le sien", "la leur"], "valise : féminin ; à elle → la sienne.")
]},
{ id: "16", title: "Les pronoms indéfinis", rule: [
  "**plusieurs**, **certain(e)s**, **d'autres**, **quelques-un(e)s**, **tous / toutes** : pluriel.",
  "**aucun(e) … ne**, **chacun(e)**, **quelqu'un**, **quelque chose**, **quelque part** : singulier.",
  "tous / toutes se placent souvent après le verbe : *Ils sont tous sympathiques.* On prononce le **s** de tous (pronom).",
  "**tout** (neutre) = les choses : *Tout va bien. Je comprends tout.*"],
  items: [
  F("J'attends ___. (someone)", ["quelqu'un"], "someone → quelqu'un."),
  F("Je cherche ___. (something)", ["quelque chose"], "something → quelque chose."),
  F("Je vais ___ ce week-end. (somewhere)", ["quelque part"], "somewhere → quelque part."),
  M("Parmi les étudiants, ___ n'est français.", "aucun", ["chacun", "plusieurs"], "zéro → aucun … ne, singulier."),
  M("___ est intéressant. (each one)", "Chacun", ["Tous", "Plusieurs"], "each → chacun, singulier."),
  M("Elles sont ___ sympathiques.", "toutes", ["tous", "tout"], "elles → toutes."),
  F("Je comprends ___. (everything)", "tout", "Choses, neutre → tout."),
  M("Plusieurs sont scandinaves, ___ sont suédois.", "d'autres", ["autres", "aucun"], "others → d'autres."),
  M("___ sont bilingues. (a few)", "Quelques-uns", ["Quelqu'un", "Quelque chose"], "a few → quelques-uns, pluriel.")
]},
{ id: "17", title: "Les mots et constructions négatifs", rule: [
  { table: [["ne … pas du tout", "not at all"], ["ne … plus", "not anymore"], ["ne … personne", "no one"], ["ne … rien", "nothing"], ["n'avoir plus de", "to have none left"], ["ne … pas non plus", "not … either"], ["ne … aucun(e)", "none"], ["ne … pas assez (de)", "not enough"], ["ne … ni … ni", "neither … nor"], ["ne … pas encore", "not yet"], ["ne … grand-chose", "not much"], ["ne … nulle part", "nowhere"], ["ne … guère / à peine", "hardly"], ["ne … point", "not (formel)"]] }],
  items: [
  M("I don't smoke anymore.", "Je ne fume plus.", ["Je ne fume pas.", "Je ne fume rien."], "not anymore → ne … plus."),
  F("Je n'y ai vu ___. (no one)", "personne", "ne … personne."),
  F("Je n'y ai ___ vu. (nothing)", "rien", "ne … rien ; au passé composé, rien avant le participe."),
  F("Tu n'as ___ de lait ? (none left)", "plus", "n'avoir plus de."),
  F("Je n'ai ___ idée ! (no idea)", "aucune", "idée est féminin → aucune."),
  M("Je ne veux ___ chanter ___ danser.", "ni … ni", ["pas … pas", "rien … rien"], "neither … nor → ne … ni … ni."),
  F("Je n'aime ___. (not at all)", ["pas du tout"], "ne … pas du tout."),
  F("Je ne le vois ___. (nowhere)", ["nulle part"], "ne … nulle part."),
  F("Hier, je n'ai pas fait ___. (not much)", ["grand-chose"], "ne … pas grand-chose."),
  F("Je ne commence pas ___. (not yet)", "encore", "ne … pas encore."),
  F("Je n'ai pas ___ de lait. (not enough)", "assez", "ne … pas assez de."),
  F("Je ne regarde pas la télé ___. (either)", ["non plus"], "ne … pas non plus.")
]},
{ id: "18", title: "La forme passive", rule: [
  "**être + participe passé + par + agent**. Le participe s'accorde avec le sujet. Le temps de **être** donne le temps de la phrase.",
  ex("Un cadeau est donné par Fabio. (présent)", "A gift is given by Fabio."),
  ex("La télévision a été inventée par John Baird. (passé composé)", "Television was invented by John Baird."),
  ex("Un gâteau était fait par Fabio. (imparfait)", "A cake was being made by Fabio.")],
  items: [
  M("Fabio donne un cadeau. → ?", "Un cadeau est donné par Fabio.", ["Un cadeau a donné par Fabio.", "Un cadeau donne par Fabio."], "Présent : est + participe."),
  M("John Baird a inventé la télévision. → ?", "La télévision a été inventée par John Baird.", ["La télévision est inventé par John Baird.", "La télévision a inventée par John Baird."], "Passé composé : a été + participe accordé."),
  M("Fabio faisait un gâteau. → ?", "Un gâteau était fait par Fabio.", ["Un gâteau a été fait par Fabio.", "Un gâteau faisait par Fabio."], "Imparfait : était + participe."),
  F("La lettre ___ écrite par Marie. (présent)", "est", "Présent de être."),
  F("Les maisons ont été ___ (construire) en 1950.", "construites", "Accord : maisons, féminin pluriel."),
  M("Le gâteau a été mangé ___ les enfants.", "par", ["de", "pour"], "L'agent est introduit par par."),
  F("La fenêtre a été ___ (ouvrir) par le vent.", "ouverte", "Accord : fenêtre, féminin.")
]},
{ id: "19-i", sub: "i", title: "N'importe …", rule: [
  "**n'importe quel / quelle** (any + nom), **n'importe comment** (any old way), **n'importe où** (anywhere), **n'importe quand** (anytime), **n'importe qui** (anyone), **n'importe quoi** (anything), **n'importe lequel** (any one).",
  ex("Je peux dormir n'importe où.", "I can sleep anywhere."),
  ex("Il ne faut pas manger n'importe quoi.", "You shouldn't eat just anything.")],
  items: [
  M("___ boutique va le vendre. (any)", "N'importe quelle", ["N'importe quel", "N'importe quoi"], "boutique : féminin → quelle."),
  F("Je peux dormir ___. (anywhere)", ["n'importe où"], "anywhere → n'importe où."),
  F("Vous pouvez partir ___. (anytime)", ["n'importe quand"], "anytime → n'importe quand."),
  F("___ aurait pu le faire. (anyone)", ["n'importe qui"], "anyone → n'importe qui."),
  F("Il ne faut pas manger ___. (anything)", ["n'importe quoi"], "anything → n'importe quoi."),
  M("Il ne faut pas le faire ___. (any old way)", "n'importe comment", ["n'importe quoi", "n'importe où"], "manière → n'importe comment."),
  M("Prends ___. (any one of them)", "n'importe lequel", ["n'importe quel", "n'importe qui"], "any one of them → n'importe lequel."),
  M("Vous pouvez prendre ___ siège.", "n'importe quel", ["n'importe quelle", "n'importe lequel"], "siège : masculin + nom → quel.")
]},
{ id: "19-ii", sub: "ii", title: "Aimer bien / beaucoup vs aimer très fort / tellement", rule: [
  "**aimer** = to love. **aimer bien / beaucoup** = to like (a lot). Attention : *Je t'aime beaucoup* = I really like you.",
  "*I love you very much* → **Je t'aime très fort** / **Je t'aime tellement**.",
  ex("J'aime bien tes chaussures, mais je préfère les miennes.", "I like your shoes but I prefer mine.")],
  items: [
  M("I love you very much.", "Je t'aime très fort.", ["Je t'aime beaucoup.", "Je t'aime bien."], "Amour fort → très fort / tellement."),
  M("I really like Paris.", "J'aime beaucoup Paris.", ["J'aime tellement Paris.", "J'aime très fort Paris."], "aimer beaucoup = to really like."),
  F("J'aime ___ tes chaussures, mais je préfère les miennes. (like)", "bien", "aimer bien = to like."),
  F("J'aime mes chiens ___. (very much)", "tellement", "aimer tellement = to love very much."),
  M("« Je t'aime bien » veut dire :", "I like you.", ["I love you very much.", "I love you well."], "aimer bien adoucit aimer.")
]},
{ id: "19-iii", sub: "iii", title: "Le mot « trouver »", rule: [
  "**trouver que** = penser que (*to think*). **trouver + nom + adjectif** = *to find (something) + adjective*.",
  ex("Je trouve que c'est dangereux.", "I think it's dangerous."),
  ex("Je trouve Martha intéressante.", "I find Martha interesting.")],
  items: [
  M("« Je trouve que c'est dangereux » veut dire :", "I think it's dangerous.", ["I found a danger.", "I'm looking for danger."], "trouver que = penser que."),
  M("« Elle trouve qu'elles sont malpolies » = ?", "Elle pense qu'elles sont malpolies.", ["Elle cherche qu'elles sont malpolies.", "Elle voit qu'elles sont malpolies."], "trouver que = penser que."),
  M("I find Martha interesting.", "Je trouve Martha intéressante.", ["Je trouve que Martha intéressante.", "Je trouve Martha intéressant."], "trouver + nom + adjectif accordé."),
  F("Je ___ cela fascinant. (find)", "trouve", "trouver + chose + adjectif."),
  M("I find you harsh on him.", "Je te trouve dur avec lui.", ["Je trouve toi dur avec lui.", "Je te trouve que dur avec lui."], "Pronom devant le verbe : je te trouve.")
]},
{ id: "19-iv", sub: "iv", title: "Sentir vs se sentir", rule: [
  "**sentir bon / mauvais** = to smell good / bad. **se sentir** + adverbe/adjectif = to feel.",
  ex("Ces fleurs sentent bon.", "These flowers smell good."),
  ex("Je me sens super bien aujourd'hui !", "I feel great today!")],
  items: [
  F("Ces fleurs ___ bon.", "sentent", "Odeur → sentir, sans pronom."),
  F("Je me ___ super bien aujourd'hui !", "sens", "se sentir → je me sens."),
  M("He smells bad.", "Il sent mauvais.", ["Il se sent mauvais.", "Il se sent mal."], "Odeur → sentir mauvais."),
  M("Zoë feels unwell today.", "Zoë se sent mal aujourd'hui.", ["Zoë sent mal aujourd'hui.", "Zoë se sent mauvais aujourd'hui."], "Sentiment → se sentir mal."),
  F("Je ___ sens seul.", "me", "se sentir : je me sens.")
]},
{ id: "19-v", sub: "v", title: "Le mot « avoir »", rule: [
  "**avoir raison / tort / de la chance** = to be right / wrong / lucky.",
  "**avoir hâte de** + infinitif / **que** + subjonctif = to look forward to. **avoir honte de** = to be ashamed of. **avoir l'habitude de** = to usually / tend to.",
  ex("J'ai hâte de partir en vacances !", "I'm looking forward to going on holiday!"),
  ex("Il avait l'habitude de m'envoyer des messages la nuit.", "He used to send me texts at night.")],
  items: [
  M("You are wrong.", "Tu as tort.", ["Tu es tort.", "Tu as raison."], "to be wrong → avoir tort."),
  F("Vous avez toujours ___. (right)", "raison", "avoir raison."),
  F("Nous avons de la ___. (lucky)", "chance", "avoir de la chance."),
  F("J'ai ___ de partir en vacances ! (can't wait)", "hâte", "avoir hâte de + infinitif."),
  F("J'ai ___ de continuer à fumer. (ashamed)", "honte", "avoir honte de."),
  F("J'ai l'___ de prendre le bus 12 le matin.", "habitude", "avoir l'habitude de."),
  M("I can't wait for you to come!", "J'ai hâte que tu viennes !", ["J'ai hâte que tu viens !", "J'ai hâte de tu viennes !"], "avoir hâte que + subjonctif (viennes).")
]},
{ id: "19-vi", sub: "vi", title: "Le mot « plaire »", rule: [
  "**A plaît à B** = B likes A. La chose aimée est le sujet.",
  ex("Cette veste plaît à Marie.", "Marie likes this jacket."),
  ex("Je plais à Luc.", "Luc likes me."),
  ex("Ces fleurs me plaisent.", "I like these flowers.")],
  items: [
  M("Marie likes this jacket.", "Cette veste plaît à Marie.", ["Marie plaît à cette veste.", "Marie plaît cette veste."], "La chose aimée est le sujet."),
  M("Luc likes me.", "Je plais à Luc.", ["Luc me plaît.", "Luc plaît à moi."], "Luc me plaît = I like Luc."),
  F("Ces fleurs me ___.", "plaisent", "fleurs (pluriel) → plaisent."),
  F("Ça me ___ beaucoup !", "plaît", "ça → plaît."),
  M("I like Luc.", "Luc me plaît.", ["Je plais à Luc.", "Je plaît Luc."], "Luc est le sujet : Luc me plaît.")
]},
{ id: "19-vii", sub: "vii", title: "Le mot « aller »", rule: [
  "**aller à quelqu'un** = to suit someone, ou to be OK for someone. **s'en aller** = to leave.",
  ex("Le rose va à ma sœur.", "Pink suits my sister."),
  ex("Ça lui va ? — Oui, ça lui va parfaitement.", "Is he OK with that? — Yes, perfectly."),
  ex("Je m'en vais. Va-t'en ! Il s'en est allé.", "I'm leaving. Go away! He left.")],
  items: [
  M("Pink suits my sister.", "Le rose va à ma sœur.", ["Ma sœur va au rose.", "Le rose va ma sœur."], "aller à quelqu'un."),
  F("Ce chapeau te ___ vraiment bien.", "va", "aller à → te va."),
  M("I'm leaving.", "Je m'en vais.", ["Je vais.", "Je m'y vais."], "s'en aller."),
  M("Go away! (tu)", "Va-t'en !", ["Va-toi !", "Vas-en !"], "Impératif de s'en aller : va-t'en."),
  F("Il s'en est ___. (left)", "allé", "Passé composé : il s'en est allé."),
  F("Ça lui ___ ? — Oui, ça lui va parfaitement.", "va", "Is he OK with that → ça lui va.")
]},
{ id: "19-viii", sub: "viii", title: "Visiter vs rendre visite à", rule: [
  "**visiter** + lieu. **rendre visite à** + personne.",
  ex("J'ai visité Paris.", "I visited Paris."),
  ex("J'ai rendu visite à ma sœur.", "I went to see my sister.")],
  items: [
  F("J'ai ___ Paris.", "visité", "Lieu → visiter."),
  F("J'ai ___ visite à ma sœur.", "rendu", "Personne → rendre visite à."),
  F("Il rend visite ___ ses parents.", "à", "rendre visite à."),
  M("I visited my grandmother.", "J'ai rendu visite à ma grand-mère.", ["J'ai visité ma grand-mère.", "J'ai rendu visite ma grand-mère."], "Personne → rendre visite à."),
  M("He visited the Orsay museum.", "Il a visité le musée d'Orsay.", ["Il a rendu visite au musée d'Orsay.", "Il a visité au musée d'Orsay."], "Lieu → visiter.")
]},
{ id: "19-ix", sub: "ix", title: "Connaître vs savoir", rule: [
  "**connaître** + nom (personne, lieu, chose) : *Tu connais Philippe ?*",
  "**savoir** + proposition (que, qui, où, quand, ce que…) ou + infinitif (savoir-faire) : *Je sais qu'il vient. Je sais jouer aux échecs.*",
  "Avec certains mots abstraits, les deux sont possibles : *je sais / connais la vérité, la réponse*."],
  items: [
  F("Est-ce que tu ___ Philippe ?", "connais", "Personne → connaître."),
  F("Je ___ qu'il vient ce soir.", "sais", "+ que → savoir."),
  F("Il ___ ce que tu veux.", "sait", "+ ce que → savoir."),
  F("___-vous parler français ?", "savez", "+ infinitif → savoir."),
  F("Elle ___ cette recette par cœur.", "connaît", "+ nom → connaître."),
  F("Je ___ jouer aux échecs.", "sais", "Compétence + infinitif → savoir."),
  M("Tu ___ où il habite ?", "sais", ["connais", "connaît"], "+ où → savoir."),
  M("Vous ___ Paris ?", "connaissez", ["savez", "savoir"], "Lieu → connaître.")
]},
{ id: "19-x", sub: "x", title: "Marcher, aller à pied, se promener, promener", rule: [
  "**marcher** : l'action de marcher, la façon de marcher. **aller à pied** : aller quelque part à pied.",
  "**se promener** (faire une promenade, se balader) : *to go for a walk*. **promener** + chien / personne : *to walk someone*.",
  ex("Je voulais prendre le bus, mais finalement j'y suis allé à pied.", "In the end I walked there."),
  ex("Luc a promené son chien ce matin.", "Luc walked his dog this morning.")],
  items: [
  F("Amélie ___ très vite.", "marche", "Façon de marcher → marcher."),
  F("Il va au travail ___ tous les jours.", ["à pied"], "aller quelque part à pied."),
  F("Je me ___ dans le parc avec Julie.", "promène", "se promener : je me promène."),
  F("Luc a ___ son chien ce matin.", "promené", "promener + animal."),
  M("We're wandering around in the woods.", "Nous nous promenons dans les bois.", ["Nous promenons dans les bois.", "Nous marchons à pied dans les bois."], "Se promener est pronominal."),
  M("In the end I walked there.", "Finalement, j'y suis allé à pied.", ["Finalement, j'y ai marché.", "Finalement, je me suis promené là."], "Aller à un endroit → aller à pied."),
  F("Je fais une ___ dans le parc.", "promenade", "faire une promenade.")
]},
{ id: "19-xi", sub: "xi", title: "Le mot « manquer »", rule: [
  "**manquer** + chose = to miss (un train, un rendez-vous). Familier : **rater**.",
  "**A manque à B** = B misses A (émotion) : *Mon chien me manque* = I miss my dog. *Tu manques à Lise* = Lise misses you.",
  "**manquer de** = to lack. **Il manque X à Y** = Y is missing X.",
  ex("Il me manque deux euros pour l'acheter.", "I need two more euros to buy it.")],
  items: [
  F("Jacques a ___ son train.", ["manqué", "raté"], "manquer (ou rater) un train."),
  M("I miss my old school.", "Mon ancienne école me manque.", ["Je manque mon ancienne école.", "Je manque à mon ancienne école."], "La chose qui manque est le sujet."),
  M("Lise misses you.", "Tu manques à Lise.", ["Lise te manque.", "Lise manque à toi."], "Lise te manque = you miss Lise."),
  M("I miss my dog.", "Mon chien me manque.", ["Je manque mon chien.", "Je me manque de mon chien."], "A manque à B."),
  F("Je manque ___ sucre pour faire ce gâteau.", "de", "manquer de = to lack."),
  F("Il ___ un bouton à ta chemise.", "manque", "Il manque X à Y."),
  F("Il manque toujours ___ courage.", "de", "manquer de.")
]},
{ id: "19-xii", sub: "xii", title: "Le mot « faire »", rule: [
  "**faire exprès (de)** = on purpose. **faire la queue** = to queue. **faire peur à** = to scare.",
  "**faire mal à** = to hurt (physiquement). **faire du mal à** = to hurt (émotionnellement).",
  "**faire partie de** = to be part of. **faire confiance à** = to trust."],
  items: [
  F("Il l'a fait ___ ! (on purpose)", "exprès", "faire exprès."),
  F("Je déteste faire la ___ au supermarché.", "queue", "faire la queue."),
  F("À Halloween, je fais ___ à mes neveux.", "peur", "faire peur à."),
  M("He's going to hurt my best friend. (emotionally)", "Il va faire du mal à ma meilleure amie.", ["Il va faire mal à ma meilleure amie.", "Il va faire le mal à ma meilleure amie."], "Émotionnel → faire du mal à."),
  M("He's going to hurt my best friend. (physically)", "Il va faire mal à ma meilleure amie.", ["Il va faire du mal à ma meilleure amie.", "Il va faire de mal à ma meilleure amie."], "Physique → faire mal à."),
  F("Tu veux faire ___ de l'équipe ?", "partie", "faire partie de."),
  F("Je te fais ___. (I trust you)", "confiance", "faire confiance à.")
]},
{ id: "19-xiii", sub: "xiii", title: "Il y a + durée", rule: [
  "**il y a + durée** = *ago*. À ne pas confondre avec **depuis** (action qui continue).",
  ex("J'ai mangé il y a une heure.", "I ate an hour ago."),
  ex("Il est venu à Londres il y a cinq ans.", "He came to London five years ago.")],
  items: [
  M("I ate an hour ago.", "J'ai mangé il y a une heure.", ["J'ai mangé depuis une heure.", "J'ai mangé dans une heure."], "ago → il y a."),
  F("Il est venu à Londres ___ cinq ans. (ago)", ["il y a"], "ago → il y a."),
  F("Elle est partie ___ dix minutes. (ago)", ["il y a"], "ago → il y a."),
  M("J'habite ici ___ cinq ans. (and I still live here)", "depuis", ["il y a", "dans"], "Action qui continue → depuis."),
  M("« Il y a deux jours » veut dire :", "two days ago", ["for two days", "in two days"], "il y a + durée = ago.")
]},
{ id: "19-xiv", sub: "xiv", title: "Demi, moitié", rule: [
  "**la moitié de** + nom = half (of) the. **un/une demi-** + nom = half a (invariable, avec trait d'union).",
  "nom + **et demi / et demie** : accord en genre avec le nom. **à moitié** + adjectif = half / halfway.",
  ex("J'ai bu une bouteille et demie.", "I drank a bottle and a half."),
  ex("Ma dissertation est à moitié terminée.", "My essay is halfway finished.")],
  items: [
  F("J'ai bu ___ de la bouteille. (half of)", ["la moitié"], "la moitié de."),
  F("Tu as mangé la moitié ___ gâteau.", "du", "de + le → du."),
  F("J'ai utilisé un ___-seau d'eau.", "demi", "demi- devant le nom, invariable."),
  F("Marc a quinze ans et ___.", "demi", "ans est masculin → et demi."),
  F("J'ai bu une bouteille et ___.", "demie", "bouteille est féminin → et demie."),
  F("Tu vois toujours le verre ___ vide !", ["à moitié"], "à moitié + adjectif."),
  M("Je bois une ___ de vin par jour.", "demi-bouteille", ["demie-bouteille", "moitié bouteille"], "demi- reste invariable devant le nom.")
]},
{ id: "19-xv", sub: "xv", title: "Le mot « devoir »", rule: [
  "Présent = **have to / must** : *Je dois faire mes devoirs.*",
  "Imparfait = **was supposed to** : *Il devait me rappeler, mais il a oublié.*",
  "Passé composé = **had to / must have** : *J'ai dû faire la lessive. Il a dû le laisser là.*",
  "Conditionnel = **should** : *Vous devriez demander cette bourse.*"],
  items: [
  F("Je ___ faire mes devoirs aujourd'hui. (have to)", "dois", "Présent."),
  F("Il ___ me rappeler, mais il a oublié. (was supposed to)", "devait", "Imparfait = était censé."),
  F("Il est parti tôt, donc j'___ faire la lessive moi-même. (had to)", ["ai dû"], "Passé composé."),
  F("Vous ___ demander cette bourse. (should)", "devriez", "Conditionnel."),
  F("On ___ partir maintenant. (should)", "devrait", "Conditionnel."),
  M("« Il a dû le laisser là pour toi » veut dire :", "He must have left it there for you.", ["He should leave it there for you.", "He was supposed to leave it there."], "Passé composé de devoir = must have."),
  F("Ils ___ venir ce soir, mais ils ont annulé. (were supposed to)", "devaient", "Imparfait.")
]},
{ id: "19-xvi", sub: "xvi", title: "Les nombres approximatifs", rule: [
  { table: [["10", "une dizaine"], ["12", "une douzaine"], ["15", "une quinzaine"], ["20", "une vingtaine"], ["30", "une trentaine"], ["40", "une quarantaine"], ["50", "une cinquantaine"], ["60", "une soixantaine"], ["100", "une centaine"]] },
  "+ **de** + nom : *une dizaine de chats* = about ten cats. *deux douzaines de pommes* = two dozen apples."],
  items: [
  F("J'ai une ___ de chats. (about 10)", "dizaine", "10 → une dizaine."),
  F("Une ___ d'œufs, s'il vous plaît. (12)", "douzaine", "12 → une douzaine."),
  F("Je pars une ___ de jours. (about 15)", "quinzaine", "15 → une quinzaine."),
  F("Il y avait une ___ de personnes. (about 100)", "centaine", "100 → une centaine."),
  F("Je veux deux ___ de pommes. (2 × 12)", "douzaines", "Pluriel : deux douzaines."),
  M("« Il achète une trentaine de poires » :", "about thirty pears", ["exactly thirty pears", "the thirtieth pear"], "-aine = environ."),
  M("Une quarantaine de personnes = ?", "about 40 people", ["about 4 people", "about 400 people"], "quarante → quarantaine."),
  F("Elle a une ___ d'années. (about 50)", "cinquantaine", "50 → une cinquantaine.")
]},
{ id: "19-xvii", sub: "xvii", title: "L'arithmétique", rule: [
  { table: [["+", "plus"], ["−", "moins"], ["×", "fois / multiplié par"], ["÷", "divisé par"], ["=", "égal / font"]] },
  ex("Deux plus deux égal quatre. / Deux plus deux font quatre.", "2 + 2 = 4"),
  ex("Trente divisé par dix égal trois.", "30 ÷ 10 = 3")],
  items: [
  M("2 + 2 = 4", "Deux plus deux font quatre.", ["Deux et deux sont quatre.", "Deux moins deux font quatre."], "font (ou égal)."),
  F("Six ___ un égal cinq. (6 − 1)", "moins", "− → moins."),
  F("Trente ___ par dix égal trois. (30 ÷ 10)", "divisé", "÷ → divisé par."),
  M("3 × 4 = 12", "Trois fois quatre égal douze.", ["Trois par quatre égal douze.", "Trois plus quatre égal douze."], "× → fois."),
  F("Huit ___ par deux égal seize. (8 × 2)", "multiplié", "× → multiplié par."),
  F("Dix ___ cinq égal quinze. (10 + 5)", "plus", "+ → plus.")
]}
];
