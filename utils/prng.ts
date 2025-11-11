
/**
 * cyrb128 (string)
 * A simple but effective 128-bit string hash function.
 * It's used to generate a seed for the PRNG from the user's input string.
 * @param str The string to hash.
 * @returns An array of four 32-bit numbers.
 */
export function cyrb128(str: string): [number, number, number, number] {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;

    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }

    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

    return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}

/**
 * mulberry32 (seed)
 * A fast, simple 32-bit pseudo-random number generator.
 * @param a The seed (a 32-bit integer).
 * @returns A function that returns a new pseudo-random number (0 to 1) each time it's called.
 */
export function mulberry32(a: number): () => number {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

/**
 * fisherYatesShuffle (array, prng)
 * Shuffles an array in place using a seeded pseudo-random number generator.
 * This ensures that for the same seed, the shuffle is always the same.
 * @param array The array to shuffle.
 * @param prng A function that returns a pseudo-random number between 0 and 1.
 */
export function fisherYatesShuffle<T,>(array: T[], prng: () => number): void {
    let m = array.length, t: T, i: number;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(prng() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}
