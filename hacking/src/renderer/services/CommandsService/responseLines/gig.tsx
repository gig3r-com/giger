import { onlyTab } from './utils';

export function getFullGigLines(gig, isGigerGate: boolean): string[] {
  const lines = [
    ``,
    `${onlyTab(gig.id)} <span class="secondary-color">${gig.title}</span> ${
      gig.status
    } ${gig.category} ${gig.subcategory}`,
  ];

  if (gig.isAnonymizedAuthor && isGigerGate) {
    lines.push(
      `<span class="secondary-color">From:</span> AUTHOR_DECRYPTED ${onlyTab(
        gig.authorId,
      )} (by GIgerGate)`,
    );
  } else if (gig.isAnonymizedAuthor && !isGigerGate) {
    lines.push(
      `<span class="secondary-color">From:</span> AUTHOR_ANONYMIZED (encryption impossible to decrypt)`,
    );
  } else {
    lines.push(
      `<span class="secondary-color">From:</span> ${onlyTab(gig.authorId)} ${
        gig.authorName
      }`,
    );
  }

  lines.push(
    `<span class="secondary-color">To:</span> ${onlyTab(gig.takenById)}`,
  );
  lines.push(
    `<span class="secondary-color">Description:</span> ${gig.description}`,
  );
  return lines;
}
