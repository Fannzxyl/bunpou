
import type { GrammarPoint } from '../types';

export const grammarData: GrammarPoint[] = [
  // BAGIAN 1: Partikel
  {
    part: 'BAGIAN 1: Partikel (Si "Lem" Ajaib)',
    title: '1. Partikel は (wa) - Si Lampu Sorot',
    hiragana: 'は',
    reading: 'wa',
    function: 'Menandai TOPIK kalimat. Memberitahu pendengar, "Hei, sekarang kita lagi ngomongin ini ya..."',
    examples: [
      { source: 'TKA', japanese: 'Akiko san は ... oyogimasu.', translation: 'Ngomongin Akiko, dia berenang.' },
      { source: 'TKA', japanese: 'Minna は supootsu ga suki desu.', translation: 'Ngomongin semua orang, mereka suka olahraga.' },
      { source: 'TKA', japanese: 'Kyoushitsu は doko desu ka?', translation: 'Ngomongin ruang kelas, di mana ya?' },
      { source: 'Baru', japanese: 'Watashi は gakusei desu.', translation: 'Saya [topiknya] adalah pelajar.' },
    ],
  },
  {
    part: 'BAGIAN 1: Partikel (Si "Lem" Ajaib)',
    title: '2. Partikel が (ga) - Si Penegas Subjek',
    hiragana: 'が',
    reading: 'ga',
    function: 'Menegaskan subjek. Paling sering dipakai untuk menyatakan "Suka" (suki desu), "Bisa"/"Jago" (dekimasu, tokui desu), dan "Ada" (arimasu, imasu).',
    examples: [
      { source: 'TKA', japanese: 'サッカー が suki desu.', translation: 'Suka sepak bola.' },
      { source: 'TKA', japanese: 'りょうり が とくいです。', translation: 'Jago masak.' },
      { source: 'Baru', japanese: 'Nihongo が wakarimasu.', translation: 'Saya mengerti bahasa Jepang.' },
      { source: 'Baru', japanese: 'Neko が imasu.', translation: 'Ada kucing.' },
    ],
  },
  {
    part: 'BAGIAN 1: Partikel (Si "Lem" Ajaib)',
    title: '3. Partikel を (o) - Si Penanda Objek',
    hiragana: 'を',
    reading: 'o',
    function: 'Menandai OBJEK yang dikenai pekerjaan/aksi. (Makan apa? Minum apa? Baca apa?)',
    examples: [
      { source: 'TKA', japanese: '...nani を tabemasu ka?', translation: 'Makan apa?' },
      { source: 'TKA', japanese: '...tamago を tabemasu.', translation: 'Makan telur.' },
      { source: 'TKA', japanese: '...hon を yomimasu.', translation: 'Membaca buku.' },
      { source: 'TKA', japanese: '...badominton を shimasu.', translation: 'Bermain badminton.' },
      { source: 'Baru', japanese: 'Mizu を nomimasu.', translation: 'Minum air.' },
    ],
  },
  {
    part: 'BAGIAN 1: Partikel (Si "Lem" Ajaib)',
    title: '4. Partikel に (ni) - Si Penanda Waktu & Tempat Diam',
    hiragana: 'に',
    reading: 'ni',
    function: 'Punya 2 fungsi utama: WAKTU SPESIFIK (pada jam/hari) dan TEMPAT KEBERADAAN (ada di/tinggal di).',
    examples: [
      { source: 'TKA', japanese: '...5-ji に okimasu.', translation: 'Bangun pada jam 5.' },
      { source: 'TKA', japanese: '...nichiyoubi に oyogimasu.', translation: 'Berenang pada hari Minggu.' },
      { source: 'TKA', japanese: '...ik-kai に arimasu.', translation: 'Ada di lantai 1.' },
      { source: 'Baru', japanese: 'Watashi wa Bogor に sundeimasu.', translation: 'Saya tinggal di Bogor.' },
    ],
  },
  {
    part: 'BAGIAN 1: Partikel (Si "Lem" Ajaib)',
    title: '5. Partikel で (de) - Si Penanda Tempat Aksi',
    hiragana: 'で',
    reading: 'de',
    function: 'Menandai DI MANA sebuah AKSI/KEGIATAN berlangsung. (Belajar di mana? Bekerja di mana?)',
    examples: [
      { source: 'TKA', japanese: 'Toshoshitsu で ... [hon o yomimasu].', translation: 'Membaca buku di perpustakaan.' },
      { source: 'TKA', japanese: 'Byouin で hataraiteimasu.', translation: 'Bekerja di rumah sakit.' },
      { source: 'Baru', japanese: 'Uchi で benkyou shimasu.', translation: 'Belajar di rumah.' },
    ],
  },
  {
    part: 'BAGIAN 1: Partikel (Si "Lem" Ajaib)',
    title: '6. Partikel の (no) - Si Penanda Kepemilikan',
    hiragana: 'の',
    reading: 'no',
    function: 'Artinya "milik", "punya", atau "dari". Menggabungkan dua kata benda.',
    examples: [
      { source: 'TKA', japanese: '...juunensei の kyoushitsu...', translation: 'Ruang kelas milik kelas 10...' },
      { source: 'TKA', japanese: 'Okaasan の shigoto...', translation: 'Pekerjaan milik Ibu...' },
      { source: 'Baru', japanese: 'Watashi の hon desu.', translation: 'Ini buku milik saya.' },
      { source: 'Baru', japanese: 'Nihongo の sensei.', translation: 'Guru bahasa Jepang.' },
    ],
  },
  // BAGIAN 2: Pola Kalimat & Perubahan Waktu
  {
    part: 'BAGIAN 2: Pola Kalimat & Perubahan Waktu',
    title: '1. Pola A は B です (A adalah B)',
    function: 'Pola kalimat paling dasar untuk menyatakan identitas, fakta, atau deskripsi.',
    examples: [
      { source: 'TKA', japanese: 'Ashita は suiyoubi です。', translation: 'Besok adalah hari Rabu.' },
      { source: 'TKA', japanese: 'Shumi は sakkaa です。', translation: 'Hobinya adalah sepak bola.' },
      { source: 'TKA', japanese: 'Watashi no gakkou は hiroi です。', translation: 'Sekolah saya luas.' },
    ],
  },
  {
    part: 'BAGIAN 2: Pola Kalimat & Perubahan Waktu',
    title: '2. Bentuk Waktu (PENTING!)',
    function: 'Bentuk ~masu (Sekarang/Kebiasaan), ~masen (Negatif), ~deshita/~mashita (Lampau).',
    examples: [
      { source: 'TKA', japanese: 'Tabemasu, Oyogimasu, Shimasu', translation: 'Bentuk ~masu: Menyatakan aksi sopan yang terjadi sekarang atau rutin.' },
      { source: 'TKA', japanese: '...nani mo dekimasen.', translation: 'Bentuk ~masen: Tidak bisa apa-apa.' },
      { source: 'Baru', japanese: 'Gohan o tabemasen.', translation: 'Bentuk ~masen: Tidak makan nasi.' },
      { source: 'TKA', japanese: 'Kinou は yasumi でした。', translation: 'Bentuk ~deshita: Kemarin adalah libur.' },
      { source: 'TKA', japanese: '...nan youbi でしたか。', translation: 'Bentuk ~deshita: Kemarin hari apa?' },
      { source: 'Baru', japanese: 'Kinou, benkyou shimashita.', translation: 'Bentuk ~mashita: Kemarin, saya sudah belajar.' },
    ],
  },
  // BAGIAN 3: Pola Kalimat Tanya
  {
    part: 'BAGIAN 3: Pola Kalimat Tanya (Kata Tanya)',
    title: '1. ...nan desu ka? (Apa?)',
    function: 'Menanyakan "Apa?" untuk benda atau konsep.',
    examples: [
      { source: 'TKA', japanese: 'Shumi は nan desu ka?', translation: 'Hobinya apa?' },
      { source: 'TKA', japanese: 'Shigoto は nan desu ka?', translation: 'Pekerjaannya apa?' },
    ],
  },
  {
    part: 'BAGIAN 3: Pola Kalimat Tanya (Kata Tanya)',
    title: '2. nani o ... ka? (Melakukan Apa?)',
    function: 'Menanyakan aksi atau kegiatan yang dilakukan terhadap suatu objek.',
    examples: [
      { source: 'TKA', japanese: '...nani o tabemasu ka?', translation: 'Makan apa?' },
      { source: 'TKA', japanese: '...nani o shimasu ka?', translation: 'Melakukan apa?' },
    ],
  },
  {
    part: 'BAGIAN 3: Pola Kalimat Tanya (Kata Tanya)',
    title: '3. ...doko desu ka? (Di mana?)',
    function: 'Menanyakan lokasi atau tempat.',
    examples: [
      { source: 'TKA', japanese: 'Kyoushitsu は doko desu ka?', translation: 'Ruang kelas di mana?' },
    ],
  },
  {
    part: 'BAGIAN 3: Pola Kalimat Tanya (Kata Tanya)',
    title: '4. ...nan youbi / nan nichi ... ka? (Hari apa / Tanggal apa?)',
    function: 'Menanyakan hari atau tanggal.',
    examples: [
      { source: 'TKA', japanese: '...nan youbi deshita ka?', translation: 'Kemarin hari apa?' },
      { source: 'TKA', japanese: '...nan nichi desu ka?', translation: 'Tanggal berapa?' },
    ],
  },
];
