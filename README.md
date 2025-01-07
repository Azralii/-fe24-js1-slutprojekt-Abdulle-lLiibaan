 README.md content

## Beskrivning
Denna applikation är en förenklad version av IMDB, byggd med hjälp av The Movie Database (TMDB) API. Applikationen låter användare:

 Visa topp 10 högst rankade filmer just nu.
 Visa topp 10 mest populära filmer just nu.
  Söka efter information om en film eller en person.

## Funktionalitet

### För filmer:
  Bild
  Titel
  Release-datum
  Beskrivning (för sökresultat)

### För personer:
 Bild
  Namn
  Avdelning (t.ex. acting, directing)
 Lista över de mest kända filmerna och TV-serierna med tydlig separation mellan film och TV-serie.

### Felhantering:
  Om inget resultat hittas visas ett meddelande till användaren.
 Vid server- eller nätverksfel informeras användaren om att något gick fel.

## Tekniska krav
Verktyg och teknologier:
HTML: För att bygga strukturen för applikationen.
CSS: Anpassad styling med stöd av Bootstrap.
JavaScript: För att hämta och visa data från TMDB API med hjälp av Fetch API.
Bootstrap: Responsiv design och färdiga komponenter.
Vi använde Bootstrap via CDN:
html
Kopiera kod
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
Kodstruktur:
Separation av kod: HTML, CSS och JavaScript är uppdelade i separata filer för bättre underhållbarhet.
Responsiv design: Bootstrap används för att säkerställa att applikationen fungerar på olika skärmstorlekar.
TMDB API: För att hämta data om filmer och personer i realtid.

