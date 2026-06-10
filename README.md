# Parafia św. Matki Teresy z Kalkuty PWA

Statycznie eksportowana aplikacja Next.js App Router dla parafii. Projekt jest przygotowany pod Firebase Hosting w planie Spark i nie wymaga SSR, API routes, server actions, Cloud Functions ani Firebase Storage.

## Uruchomienie lokalne

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Wymagane publiczne zmienne środowiskowe Firebase:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_PARISH_ID=matki-teresy
```

## Funkcje fazy 2

- Strona główna z nazwą parafii, opisem, trzema ogłoszeniami, trzema wydarzeniami, wejściem do wspólnoty i kontaktem.
- Akceptacja zasad po logowaniu z przekierowaniem do `/rules`, a po akceptacji do `/community`.
- Kategorie pokoi: `official`, `prayer`, `help`, `groups`, `casual`.
- Lista pokoi pogrupowana kategoriami, z podglądem ostatniej wiadomości, stanem zamknięcia i odznaką pokoju oficjalnego.
- Tworzenie pokoi tylko dla ról `moderator`, `admin`, `superadmin`.
- Oznaczenie pokoju jako oficjalny tylko dla `admin` i `superadmin`.
- Płaskie odpowiedzi do wiadomości z podglądem cytowanej treści.
- Reakcje emoji `🙏`, `❤️`, `👍` z jedną reakcją użytkownika na wiadomość.
- Lekkie wzmianki `@Name` na podstawie widocznych użytkowników pokoju i osobny widok `/community/mentions`.
- Kolejka moderacji dla moderatorów i administratorów: zgłoszenia, blokady użytkowników i zamknięte pokoje.
- Kliencki anti-spam: minimum 5 sekund między wiadomościami i blokada powtórzonej identycznej wiadomości w tym samym pokoju.

## Struktura Firestore

```text
parishes/{parishId}
  users/{uid}
    uid
    displayName
    role: member | moderator | admin | superadmin
    banned
    acceptedRulesAt
  rooms/{roomId}
    name
    description
    category: official | prayer | help | groups | casual
    official
    closed
    memberCount
    lastMessageText
    lastMessageAt
    lastMessageAuthorName
    messages/{messageId}
      uid
      authorName
      text
      createdAt
      deleted
      replyToMessageId
      replyToText
      replyToAuthorName
      mentions: string[]
      reactions/{uid}
        uid
        emoji: 🙏 | ❤️ | 👍
        createdAt
  reports/{reportId}
    roomId
    messageId
    messageText
    authorUid
    authorName
    reporterUid
    reason
    status: pending | reviewed | dismissed
    reviewedBy
    reviewedAt
```

## Reakcje

Reakcje są przechowywane jako dokument użytkownika w subkolekcji wiadomości:

```text
parishes/{parishId}/rooms/{roomId}/messages/{messageId}/reactions/{userId}
```

Kliknięcie emoji zapisuje albo aktualizuje dokument reakcji. Kliknięcie tej samej reakcji usuwa dokument. Dzięki temu każdy użytkownik ma dokładnie jedną reakcję na wiadomość. Reguły blokują reakcje na usunięte wiadomości oraz reakcje osób niezalogowanych, zablokowanych albo bez zaakceptowanych zasad.

## Moderowanie zgłoszeń

Użytkownik może zgłosić wiadomość, co tworzy dokument w `reports` ze statusem `pending`. Moderator, administrator lub superadministrator może:

1. oznaczyć zgłoszenie jako sprawdzone,
2. miękko usunąć zgłoszoną wiadomość przez ustawienie `deleted: true` i wyczyszczenie tekstu,
3. zablokować autora wiadomości przez ustawienie `banned: true`.

Każda decyzja zapisuje `reviewedBy` i `reviewedAt`.

## Ręczne testowanie uprawnień

1. Zaloguj się zwykłym kontem i potwierdź, że widzisz pokoje, możesz pisać po akceptacji zasad, ale nie możesz tworzyć pokoi ani wejść do kolejki moderacji.
2. Nadaj użytkownikowi rolę `moderator` bezpośrednio w konsoli Firestore i sprawdź, że może tworzyć pokoje nieoficjalne, przeglądać zgłoszenia, usuwać wiadomości i blokować autorów.
3. Sprawdź, że moderator nie może utworzyć pokoju `official`, zmienić ról użytkowników ani nadać sobie wyższej roli.
4. Nadaj rolę `admin` i sprawdź, że może utworzyć pokój oficjalny oraz zarządzać rolami `member` i `moderator`, ale nie może edytować użytkownika `admin` ani `superadmin`.
5. Nadaj rolę `superadmin` wyłącznie ręcznie z zaufanego środowiska i sprawdź, że może przypisać rolę `admin`, ale reguły nadal blokują przypisanie `superadmin` z klienta.
6. Ustaw `banned: true` i sprawdź, że konto nie może wysyłać wiadomości ani reakcji.

## Ograniczenia planu Spark

- Aplikacja używa wyłącznie statycznego eksportu i klienta Firebase Web SDK.
- Brak SSR, API routes, server actions, Cloud Functions i Firebase Storage.
- Brak push notifications w fazie 2, dlatego wzmianki są tylko widokiem w aplikacji.
- Liczniki, podglądy ostatnich wiadomości i moderacja są wykonywane przez klienta oraz reguły Firestore, bez zaufanego backendu.
- Przy większym ruchu należy obserwować koszty odczytów Firestore i rozważyć płatny backend dopiero poza ograniczeniami Spark.
