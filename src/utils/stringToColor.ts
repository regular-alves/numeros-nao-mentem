/**
 * credits to https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
 */
export default function stringToColor(word: string): string {
  let hash = 0;

  if (word.length === 0) {
    return '';
  }

  for (let i = 0; i < word.length; i++) {
      hash = word.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
  }
  
  let color = '#';

  for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 255;
      color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}