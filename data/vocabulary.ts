
import type { VocabularyWord } from '../types';

const category1 = "Kategori 1: Salam & Perkenalan Diri (Aisatsu & Jikoshoukai)";
const category2 = "Kategori 2: Waktu & Kehidupan Sehari-hari (Jikan & Mainichi no Seikatsu)";
const category3 = "Kategori 3: Kehidupan Sekolah (Gakkou no Seikatsu)";
const category4 = "Kategori 4: Rumah & Tempat Lain (Uchi & Tempat)";
const category5 = "Kategori 5: Keluarga (Kazoku)";
const category6 = "Kategori 6: Hobi, Kemampuan & Waktu Luang (Shumi, Dekirukoto)";
const category7 = "Kategori 7: Pekerjaan & Kata Sifat";
const category8 = "Kategori 8: Kata Tanya (Wajib Tahu)";

export const vocabularyData: VocabularyWord[] = [
  // Kategori 1
  { romaji: 'Hajimemashite', japanese: 'はじめまして', indonesian: 'Senang bertemu denganmu', category: category1 },
  { romaji: 'Watashi', japanese: 'わたし', indonesian: 'Saya', category: category1 },
  { romaji: 'Boku', japanese: 'ぼく', indonesian: 'Saya (laki-laki)', category: category1 },
  { romaji: '~jin', japanese: '～じん', indonesian: 'Orang (kewarganegaraan)', category: category1 },
  { romaji: 'Pakisutanjin', japanese: 'パキスタンじん', indonesian: 'Orang Pakistan', category: category1 },
  { romaji: 'Ohayou gozaimasu', japanese: 'おはようございます', indonesian: 'Selamat pagi', category: category1 },
  { romaji: 'Konnichiwa', japanese: 'こんにちは', indonesian: 'Selamat siang', category: category1 },
  { romaji: 'Konbanwa', japanese: 'こんばんは', indonesian: 'Selamat malam', category: category1 },
  { romaji: 'Sayounara', japanese: 'さようなら', indonesian: 'Selamat tinggal', category: category1 },
  { romaji: 'Arigatou', japanese: 'ありがとう', indonesian: 'Terima kasih', category: category1 },
  { romaji: 'Sumimasen', japanese: 'すみません', indonesian: 'Permisi / Maaf', category: category1 },

  // Kategori 2
  { romaji: 'Maiasa', japanese: 'まいあさ', indonesian: 'Setiap pagi', category: category2 },
  { romaji: 'Mainichi', japanese: 'まいにち', indonesian: 'Setiap hari', category: category2 },
  { romaji: 'Maishuu', japanese: 'まいしゅう', indonesian: 'Setiap minggu', category: category2 },
  { romaji: 'Tokidoki', japanese: 'ときどき', indonesian: 'Kadang-kadang', category: category2 },
  { romaji: '~ji', japanese: '～じ', indonesian: 'Jam...', category: category2 },
  { romaji: 'Goji', japanese: '５じ (ごじ)', indonesian: 'Jam 5', category: category2 },
  { romaji: '~youbi', japanese: '～ようび', indonesian: 'Hari...', category: category2 },
  { romaji: 'Kayoubi', japanese: 'かようび', indonesian: 'Hari Selasa', category: category2 },
  { romaji: 'Kinyoubi', japanese: 'きんようび', indonesian: 'Hari Jumat', category: category2 },
  { romaji: 'Nichiyoubi', japanese: 'にちようび', indonesian: 'Hari Minggu', category: category2 },
  { romaji: 'Kinou', japanese: 'きのう', indonesian: 'Kemarin', category: category2 },
  { romaji: 'Ashita', japanese: 'あした', indonesian: 'Besok', category: category2 },
  { romaji: 'Asatte', japanese: 'あさって', indonesian: 'Lusa', category: category2 },
  { romaji: 'Okimasu', japanese: 'おきます', indonesian: 'Bangun', category: category2 },
  { romaji: 'Tabemasu', japanese: 'たべます', indonesian: 'Makan', category: category2 },
  { romaji: 'Ikimasu', japanese: 'いきます', indonesian: 'Pergi', category: category2 },
  { romaji: 'Shimasu', japanese: 'します', indonesian: 'Melakukan', category: category2 },
  { romaji: 'Nemasu', japanese: 'ねます', indonesian: 'Tidur', category: category2 },
  { romaji: 'Tamago', japanese: 'たまご', indonesian: 'Telur', category: category2 },
  { romaji: 'Juusu', japanese: 'ジュース', indonesian: 'Jus', category: category2 },
  { romaji: 'Ocha', japanese: 'おちゃ', indonesian: 'Teh', category: category2 },
  { romaji: 'Gyuunyuu', japanese: 'ぎゅうにゅう', indonesian: 'Susu sapi', category: category2 },
  { romaji: 'Mizu', japanese: 'みず', indonesian: 'Air', category: category2 },
  { romaji: 'Gohan', japanese: 'ごはん', indonesian: 'Nasi', category: category2 },

  // Kategori 3
  { romaji: 'Gakkou', japanese: 'がっこう', indonesian: 'Sekolah', category: category3 },
  { romaji: 'Esu-emu-kei', japanese: 'SMK', indonesian: 'SMK', category: category3 },
  { romaji: 'Kyoushitsu', japanese: 'きょうしつ', indonesian: 'Ruang kelas', category: category3 },
  { romaji: 'Toshoshitsu', japanese: 'としょしつ', indonesian: 'Perpustakaan', category: category3 },
  { romaji: 'Hokenshitsu', japanese: 'ほけんしつ', indonesian: 'Ruang UKS', category: category3 },
  { romaji: 'Shokuinshitsu', japanese: 'しょくいんしつ', indonesian: 'Ruang guru', category: category3 },
  { romaji: 'Jimushitsu', japanese: 'じむしつ', indonesian: 'Ruang Tata Usaha', category: category3 },
  { romaji: 'Gakusei', japanese: 'がくせい', indonesian: 'Pelajar', category: category3 },
  { romaji: 'Seito', japanese: 'せいと', indonesian: 'Siswa (SMP/SMA)', category: category3 },
  { romaji: 'Sensei', japanese: 'せんせい', indonesian: 'Guru', category: category3 },
  { romaji: 'Yasumi jikan', japanese: 'やすみ じかん', indonesian: 'Waktu istirahat', category: category3 },
  { romaji: 'Benkyou shimasu', japanese: 'べんきょうします', indonesian: 'Belajar', category: category3 },
  { romaji: '~nensei', japanese: '～ねんせい', indonesian: 'Siswa kelas...', category: category3 },
  { romaji: 'Juunensei', japanese: 'じゅうねんせい', indonesian: 'Siswa kelas 10', category: category3 },

  // Kategori 4
  { romaji: 'Uchi', japanese: 'うち', indonesian: 'Rumah (sendiri)', category: category4 },
  { romaji: '~kai', japanese: '～かい', indonesian: 'Lantai...', category: category4 },
  { romaji: 'Ikkai', japanese: 'いっかい', indonesian: 'Lantai 1', category: category4 },
  { romaji: 'Sangai', japanese: 'さんがい', indonesian: 'Lantai 3', category: category4 },
  { romaji: 'Byouin', japanese: 'びょういん', indonesian: 'Rumah sakit', category: category4 },
  { romaji: 'Kouen', japanese: 'こうえん', indonesian: 'Taman', category: category4 },
  { romaji: 'Tokoro', japanese: 'ところ', indonesian: 'Tempat', category: category4 },

  // Kategori 5
  { romaji: 'Kazoku', japanese: 'かぞく', indonesian: 'Keluarga', category: category5 },
  { romaji: '~nin', japanese: '～にん', indonesian: 'Penghitung orang', category: category5 },
  { romaji: 'Gonin', japanese: 'ごにん', indonesian: '5 orang', category: category5 },
  { romaji: 'Chichi', japanese: 'ちち', indonesian: 'Ayah (saya)', category: category5 },
  { romaji: 'Haha', japanese: 'はは', indonesian: 'Ibu (saya)', category: category5 },
  { romaji: 'Ane', japanese: 'あね', indonesian: 'Kakak perempuan (saya)', category: category5 },
  { romaji: 'Ani', japanese: 'あに', indonesian: 'Kakak laki-laki (saya)', category: category5 },
  { romaji: 'Otouto', japanese: 'おとうと', indonesian: 'Adik laki-laki (saya)', category: category5 },
  { romaji: 'Imouto', japanese: 'いもうと', indonesian: 'Adik perempuan (saya)', category: category5 },

  // Kategori 6
  { romaji: 'Shumi', japanese: 'しゅみ', indonesian: 'Hobi', category: category6 },
  { romaji: 'Sakkaa', japanese: 'サッカー', indonesian: 'Sepak bola', category: category6 },
  { romaji: 'Badominton', japanese: 'バドミントン', indonesian: 'Badminton', category: category6 },
  { romaji: 'Supootsu', japanese: 'スポーツ', indonesian: 'Olahraga', category: category6 },
  { romaji: 'Oyogimasu', japanese: 'およぎます', indonesian: 'Berenang', category: category6 },
  { romaji: 'Hon o yomimasu', japanese: 'ほんを よみます', indonesian: 'Membaca buku', category: category6 },
  { romaji: 'Uta o utaimasu', japanese: 'うたを うたいます', indonesian: 'Menyanyi lagu', category: category6 },
  { romaji: 'Ongaku', japanese: 'おんがく', indonesian: 'Musik', category: category6 },
  { romaji: 'Dansu', japanese: 'ダンス', indonesian: 'Tarian', category: category6 },
  { romaji: 'Ryouri', japanese: 'りょうり', indonesian: 'Masakan', category: category6 },
  { romaji: 'Suki desu', japanese: 'すき です', indonesian: 'Suka', category: category6 },
  { romaji: 'Daisuki desu', japanese: 'だいすき です', indonesian: 'Sangat suka', category: category6 },
  { romaji: 'Tokui desu', japanese: 'とくい です', indonesian: 'Jago / Pandai', category: category6 },
  { romaji: 'Dekimasu', japanese: 'できます', indonesian: 'Bisa', category: category6 },
  { romaji: 'Dekimasen', japanese: 'できません', indonesian: 'Tidak bisa', category: category6 },

  // Kategori 7
  { romaji: 'Shigoto', japanese: 'しごと', indonesian: 'Pekerjaan', category: category7 },
  { romaji: 'Kaishain', japanese: 'かいしゃいん', indonesian: 'Karyawan', category: category7 },
  { romaji: 'Kyoushi', japanese: 'きょうし', indonesian: 'Guru (profesi)', category: category7 },
  { romaji: 'Kangoshi', japanese: 'かんごし', indonesian: 'Perawat', category: category7 },
  { romaji: 'Kokku', japanese: 'コック', indonesian: 'Koki', category: category7 },
  { romaji: 'Shufu', japanese: 'しゅふ', indonesian: 'Ibu rumah tangga', category: category7 },
  { romaji: 'Hataraiteimasu', japanese: 'はたらいています', indonesian: 'Sedang bekerja', category: category7 },
  { romaji: 'Hiroi', japanese: 'ひろい', indonesian: 'Luas', category: category7 },
  { romaji: 'Shizuka', japanese: 'しずか', indonesian: 'Tenang / Sunyi', category: category7 },

  // Kategori 8
  { romaji: 'Nani', japanese: 'なに', indonesian: 'Apa', category: category8 },
  { romaji: 'Doko', japanese: 'どこ', indonesian: 'Di mana', category: category8 },
  { romaji: 'Dare', japanese: 'だれ', indonesian: 'Siapa', category: category8 },
  { romaji: 'Nanji', japanese: 'なんじ', indonesian: 'Jam berapa', category: category8 },
  { romaji: 'Nanyoubi', japanese: 'なんようび', indonesian: 'Hari apa', category: category8 },
  { romaji: 'Nannichi', japanese: 'なんにち', indonesian: 'Tanggal berapa', category: category8 },
];
