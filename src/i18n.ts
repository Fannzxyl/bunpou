import { useMemo } from 'react';
import { useSettings, SupportedLanguage, SupportedTheme } from '../context/SettingsContext';

type StepCopy = {
  badge: string;
  title: string;
  description: string;
};

type QuizModeCopy = {
  id: string;
  title: string;
  description: string;
  gradient: string;
};

type TranslationShape = {
  app: {
    steps: StepCopy[];
    footerNote: string;
    footerMotivation: string;
  };
  header: {
    toolkitLabel: string;
    title: string;
    description: string;
    exploreCta: string;
    quizCta: string;
    snapshotTitle: string;
    grammarLabel: string;
    vocabularyLabel: string;
    categoriesLabel: string;
    tip: string;
  };
  settings: {
    buttonLabel: string;
    title: string;
    description: string;
    languageLabel: string;
    themeLabel: string;
    closeLabel: string;
    languageDescriptions: Record<SupportedLanguage, string>;
    themeDescriptions: Record<SupportedTheme, string>;
  };
  tabs: {
    sectionLabel: string;
    searchPlaceholder: string;
    searchHelp: string;
    reset: string;
    noResultsTitle: string;
    noResultsBody: string;
    countLabel: string;
    stats: Array<{ label: string; detail: string }>;
    tabs: Record<
      'grammar' | 'vocabulary' | 'quiz',
      { badge: string; label: string; heading: string; description: string }
    >;
  };
  vocabularyCard: {
    flipHint: string;
    backLabel: string;
  };
  grammarCard: {
    functionLabel: string;
    examplesLabel: string;
  };
  quizMenu: {
    heading: string;
    description: string;
    footnote: string;
    ctaLabel: string;
    modes: QuizModeCopy[];
  };
  quizCommon: {
    loading: {
      multipleChoice: string;
      matching: string;
      fillBlank: string;
      flashcards: string;
      typing: string;
    };
    backToMenu: string;
    restart: string;
    scorePrefix: string;
    progressPrefix: string;
  };
  multipleChoice: {
    badge: string;
    finishedTitle: string;
    finishedSummary: string;
    prompt: string;
    instruction: string;
  };
  matchingGame: {
    title: string;
    subtitle: string;
    finishedTitle: string;
    finishedSummary: string;
    stepsLabel: string;
    matchesLabel: string;
  };
  fillBlank: {
    title: string;
    instruction: string;
    loading: string;
    finishedTitle: string;
    finishedSummary: string;
    prompt: string;
  };
  flashcards: {
    title: string;
    instruction: string;
    reveal: string;
    next: string;
    previous: string;
    remembered: string;
    retry: string;
    finishedTitle: string;
    finishedSummary: string;
  };
  typing: {
    title: string;
    instruction: string;
    placeholder: string;
    correct: string;
    incorrect: string;
    check: string;
    finishedTitle: string;
    finishedSummary: string;
  };
};

const translations: Record<SupportedLanguage, TranslationShape> = {
  id: {
    app: {
      steps: [
        {
          badge: 'Langkah 1',
          title: 'Kuasi Partikel Dasar',
          description: 'Buka kartu interaktif untuk memahami fungsi partikel, pola, dan contoh kalimat yang siap dipakai.',
        },
        {
          badge: 'Langkah 2',
          title: 'Bangun Kosakata Aktif',
          description: 'Filter kosakata berdasarkan kategori, latih pengucapan, dan hafalkan arti dengan kartu beranimasi.',
        },
        {
          badge: 'Langkah 3',
          title: 'Uji Diri dan Ulangi',
          description: 'Tiga mode kuis menjaga progres belajar tetap menantang - dari pilihan ganda sampai lengkapi kalimat.',
        },
      ],
      footerNote: 'Dibangun untuk membantu persiapan JLPT dan ujian sekolah. Terakhir diperbarui 2024.',
      footerMotivation: 'Tetap semangat belajar!',
    },
    header: {
      toolkitLabel: 'Bunpou Toolkit',
      title: 'Rangkuman Bunpou dan Kosakata TKA',
      description:
        'Ringkasan materi kelas internasional yang sering muncul di ujian. Susun jadwal belajar, dalami contoh kalimat, lalu uji diri dengan kuis interaktif kapan pun kamu siap.',
      exploreCta: 'Mulai eksplor materi',
      quizCta: 'Langsung ke mode kuis',
      snapshotTitle: 'Snapshot belajar',
      grammarLabel: 'Grammar',
      vocabularyLabel: 'Kosakata',
      categoriesLabel: 'Kategori',
      tip: 'Tip: perbarui data setelah sesi belajar supaya statistik tetap relevan.',
    },
    settings: {
      buttonLabel: 'Pengaturan',
      title: 'Pengaturan Belajar',
      description: 'Sesuaikan bahasa antarmuka dan tema warna supaya sesi belajar lebih nyaman.',
      languageLabel: 'Bahasa antarmuka',
      themeLabel: 'Tema warna',
      closeLabel: 'Tutup',
      languageDescriptions: {
        id: 'Gunakan Bahasa Indonesia untuk antarmuka dan instruksi.',
        en: 'Use English for the interface and instructions.',
      },
      themeDescriptions: {
        twilight: 'Nuansa gelap lembut yang nyaman untuk malam hari.',
        daylight: 'Tema cerah dengan kontras lembut untuk belajar siang hari.',
        sakura: 'Palet pastel bernuansa sakura untuk suasana santai.',
      },
    },
    tabs: {
      sectionLabel: 'Mode pembelajaran',
      searchPlaceholder: 'Cari romaji, kana, atau arti bahasa Indonesia...',
      searchHelp: 'Tips: kombinasikan pencarian dengan kategori untuk fokus ke tema tertentu.',
      reset: 'Reset',
      noResultsTitle: 'Tidak ada hasil yang cocok.',
      noResultsBody: 'Gunakan kata kunci lain atau kosongkan pencarian untuk melihat semua kategori.',
      countLabel: 'Jumlah kartu: {{count}}',
      stats: [
        { label: 'Kategori', detail: 'Tema belajar yang paling sering muncul di TKA.' },
        { label: 'Kartu kosakata', detail: 'Ketuk kartu untuk membuka arti dan latihan kilat.' },
        { label: 'Mode kuis', detail: 'Pilihan ganda, matching game, lengkapi kalimat, flashcard, dan latihan ketik.' },
      ],
      tabs: {
        grammar: {
          badge: 'G',
          label: 'Grammar',
          heading: 'Tata Bahasa Inti untuk Ujian',
          description: 'Buka kartu interaktif untuk memahami fungsi partikel, pola kalimat, dan contoh penerapan langsung.',
        },
        vocabulary: {
          badge: 'V',
          label: 'Vocabulary',
          heading: 'Kelola Kosakata Tematik',
          description: 'Filter berdasarkan kategori, cari lewat romaji maupun arti, lalu hafalkan dengan kartu beranimasi.',
        },
        quiz: {
          badge: 'Q',
          label: 'Quiz',
          heading: 'Latihan Interaktif dan Gamified',
          description: 'Uji pemahaman lewat berbagai mode kuis supaya memori makin lengket.',
        },
      },
    },
    vocabularyCard: {
      flipHint: 'Ketuk untuk arti',
      backLabel: 'Arti',
    },
    grammarCard: {
      functionLabel: 'Fungsi',
      examplesLabel: 'Contoh kalimat',
    },
    quizMenu: {
      heading: 'Pilih mode latihan kamu',
      description:
        'Setiap mode memuat 10 soal acak. Mulai dari pemanasan ringan sampai latihan fokus partikel - sesuaikan dengan kebutuhan sesi belajarmu.',
      footnote:
        'Ambil jeda 5 menit setelah selesai supaya memori jangka panjang lebih menempel.',
      ctaLabel: 'Mulai sekarang',
      modes: [
        {
          id: 'multiple-choice',
          title: 'Pilihan Ganda',
          description: 'Jawab arti kosakata secara cepat. Cocok untuk review santai.',
          gradient: 'from-sky-500/80 to-cyan-400/80',
        },
        {
          id: 'matching-game',
          title: 'Mencocokkan Kata',
          description: 'Temukan pasangan romaji dengan artinya. Latih memori visual dan kecepatan.',
          gradient: 'from-violet-500/75 to-sky-500/80',
        },
        {
          id: 'fill-in-the-blank',
          title: 'Lengkapi Kalimat',
          description: 'Pilih partikel yang tepat untuk kalimat rumpang.',
          gradient: 'from-emerald-500/80 to-teal-400/80',
        },
        {
          id: 'flashcards',
          title: 'Flashcards',
          description: 'Pelajari kosakata satu per satu dan tandai mana yang sudah diingat.',
          gradient: 'from-rose-500/75 to-amber-400/80',
        },
        {
          id: 'typing-drill',
          title: 'Latihan Ketik',
          description: 'Ketik arti kosakata untuk menguji ingatan aktif.',
          gradient: 'from-indigo-500/75 to-sky-400/80',
        },
      ],
    },
    quizCommon: {
      loading: {
        multipleChoice: 'Membuat soal pilihan ganda...',
        matching: 'Menyiapkan papan cocok kata...',
        fillBlank: 'Mengumpulkan kalimat untuk latihan...',
        flashcards: 'Menyiapkan set flashcard...',
        typing: 'Menyiapkan soal ketik...',
      },
      backToMenu: 'Kembali ke menu kuis',
      restart: 'Mainkan lagi',
      scorePrefix: 'Skor sementara',
      progressPrefix: 'Pertanyaan {{current}} dari {{total}}',
    },
    multipleChoice: {
      badge: 'Pilihan Ganda',
      finishedTitle: 'Bagus! Sesi selesai!',
      finishedSummary: 'Skor kamu {{score}} dari {{total}} pertanyaan. Ulangi dengan kosakata berbeda atau coba mode lain.',
      prompt: 'Apa arti kata berikut?',
      instruction: 'Jawab arti kosakata berikut.',
    },
    matchingGame: {
      title: 'Mencocokkan Kata',
      subtitle: 'Cocokkan pasangan hingga selesai',
      finishedTitle: 'Hebat! Semua pasangan berhasil ditemukan!',
      finishedSummary: 'Kamu menyelesaikan permainan dalam {{moves}} langkah. Ulangi atau coba mode lain.',
      stepsLabel: 'Langkah',
      matchesLabel: 'Cocok',
    },
    fillBlank: {
      title: 'Lengkapi Kalimat',
      instruction: 'Pilih partikel yang tepat untuk melengkapi kalimat.',
      loading: 'Mengumpulkan kalimat untuk latihan...',
      finishedTitle: 'Sesi selesai!',
      finishedSummary: 'Skor kamu {{score}} dari {{total}} kalimat. Ulangi untuk kombinasi kalimat berbeda.',
      prompt: 'Pilih partikel yang tepat',
    },
    flashcards: {
      title: 'Flashcards',
      instruction: 'Ketuk kartu untuk melihat arti. Tandai apakah kamu sudah mengingatnya.',
      reveal: 'Lihat arti',
      next: 'Berikutnya',
      previous: 'Sebelumnya',
      remembered: 'Sudah ingat',
      retry: 'Perlu ulangi',
      finishedTitle: 'Set flashcard selesai!',
      finishedSummary: '{{remembered}} hafal, {{retry}} perlu diulang lagi.',
    },
    typing: {
      title: 'Latihan Ketik',
      instruction: 'Ketik arti kosakata (bahasa Indonesia) lalu tekan Enter.',
      placeholder: 'Tulis arti kosakata di sini...',
      correct: 'Benar!',
      incorrect: 'Belum tepat, coba lagi.',
      check: 'Periksa jawaban',
      finishedTitle: 'Nice! Semua soal selesai!',
      finishedSummary: '{{score}} dari {{total}} jawaban benar. Ketik ulang untuk memperkuat ingatan.',
    },
  },
  en: {
    app: {
      steps: [
        {
          badge: 'Step 1',
          title: 'Master Core Particles',
          description: 'Open interactive cards to understand each particle, its usage, and ready-to-use sentences.',
        },
        {
          badge: 'Step 2',
          title: 'Build Active Vocabulary',
          description: 'Filter by category, practise pronunciation, and memorise meanings with animated cards.',
        },
        {
          badge: 'Step 3',
          title: 'Test and Repeat',
          description: 'Keep progress exciting with multiple quiz modes from multiple choice to fill in the blank.',
        },
      ],
      footerNote: 'Built to support JLPT prep and school exams. Last updated in 2024.',
      footerMotivation: 'Keep the learning energy up!',
    },
    header: {
      toolkitLabel: 'Bunpou Toolkit',
      title: 'Japanese Grammar and Vocabulary Hub',
      description:
        'A concise collection of international-class materials that often appear in exams. Plan your study, dive into example sentences, then challenge yourself with interactive quizzes.',
      exploreCta: 'Explore the materials',
      quizCta: 'Jump to quiz hub',
      snapshotTitle: 'Study snapshot',
      grammarLabel: 'Grammar',
      vocabularyLabel: 'Vocabulary',
      categoriesLabel: 'Categories',
      tip: 'Tip: refresh the data after each study session so the stats stay relevant.',
    },
    settings: {
      buttonLabel: 'Settings',
      title: 'Study Preferences',
      description: 'Adjust the interface language and theme so every session feels comfortable.',
      languageLabel: 'Interface language',
      themeLabel: 'Theme',
      closeLabel: 'Close',
      languageDescriptions: {
        id: 'Use Bahasa Indonesia for the interface and instructions.',
        en: 'Use English for the interface and instructions.',
      },
      themeDescriptions: {
        twilight: 'A calm dark theme that is gentle on the eyes at night.',
        daylight: 'A bright theme with soft blues for daytime focus.',
        sakura: 'Pastel cherry blossom tones for a relaxed mood.',
      },
    },
    tabs: {
      sectionLabel: 'Learning modes',
      searchPlaceholder: 'Search romaji, kana, or the Indonesian meaning...',
      searchHelp: 'Tip: combine search with categories to focus on a specific topic.',
      reset: 'Reset',
      noResultsTitle: 'No matching results.',
      noResultsBody: 'Try a different keyword or clear the search to view every category.',
      countLabel: 'Cards available: {{count}}',
      stats: [
        { label: 'Categories', detail: 'Themes that most frequently appear in TKA style exams.' },
        { label: 'Vocabulary cards', detail: 'Tap each card to reveal meanings and quick practice.' },
        { label: 'Quiz modes', detail: 'Multiple choice, matching, fill-in-the-blank, flashcards, and typing drills.' },
      ],
      tabs: {
        grammar: {
          badge: 'G',
          label: 'Grammar',
          heading: 'Core Grammar for Exams',
          description: 'Open interactive cards to internalise particle functions, sentence patterns, and examples.',
        },
        vocabulary: {
          badge: 'V',
          label: 'Vocabulary',
          heading: 'Curated Vocabulary Sets',
          description: 'Filter by category, search by romaji or meaning, and practise with animated cards.',
        },
        quiz: {
          badge: 'Q',
          label: 'Quiz',
          heading: 'Interactive Quiz Hub',
          description: 'Challenge yourself with varied quiz modes to reinforce retention.',
        },
      },
    },
    vocabularyCard: {
      flipHint: 'Tap to reveal meaning',
      backLabel: 'Meaning',
    },
    grammarCard: {
      functionLabel: 'Function',
      examplesLabel: 'Example sentences',
    },
    quizMenu: {
      heading: 'Choose your study mode',
      description:
        'Each mode pulls 10 random questions. From warm-up sessions to focused drills - pick what you need today.',
      footnote: 'Take a 5-minute break after finishing to strengthen long-term memory.',
      ctaLabel: 'Start now',
      modes: [
        {
          id: 'multiple-choice',
          title: 'Multiple Choice',
          description: 'Answer the meaning of each word quickly. Perfect for light review.',
          gradient: 'from-sky-500/80 to-cyan-400/80',
        },
        {
          id: 'matching-game',
          title: 'Matching Game',
          description: 'Match romaji to the correct meaning. Great for visual memory and speed.',
          gradient: 'from-violet-500/75 to-sky-500/80',
        },
        {
          id: 'fill-in-the-blank',
          title: 'Fill in the Blank',
          description: 'Select the particle that best completes each sentence.',
          gradient: 'from-emerald-500/80 to-teal-400/80',
        },
        {
          id: 'flashcards',
          title: 'Flashcards',
          description: 'Study one card at a time and mark what needs more practice.',
          gradient: 'from-rose-500/75 to-amber-400/80',
        },
        {
          id: 'typing-drill',
          title: 'Typing Drill',
          description: 'Type the meaning to actively recall vocabulary.',
          gradient: 'from-indigo-500/75 to-sky-400/80',
        },
      ],
    },
    quizCommon: {
      loading: {
        multipleChoice: 'Preparing multiple choice questions...',
        matching: 'Generating the matching board...',
        fillBlank: 'Collecting sentences for the drill...',
        flashcards: 'Curating the flashcard set...',
        typing: 'Preparing typing prompts...',
      },
      backToMenu: 'Back to quiz menu',
      restart: 'Restart',
      scorePrefix: 'Current score',
      progressPrefix: 'Question {{current}} of {{total}}',
    },
    multipleChoice: {
      badge: 'Multiple Choice',
      finishedTitle: 'Great job! Session completed!',
      finishedSummary: 'You scored {{score}} out of {{total}} questions. Repeat with different words or try another mode.',
      prompt: 'What does this word mean?',
      instruction: 'Answer the meaning of the following word.',
    },
    matchingGame: {
      title: 'Matching Game',
      subtitle: 'Match every pair to finish',
      finishedTitle: 'Awesome! Every pair was matched!',
      finishedSummary: 'You cleared the board in {{moves}} moves. Replay or switch modes to keep it fresh.',
      stepsLabel: 'Moves',
      matchesLabel: 'Matches',
    },
    fillBlank: {
      title: 'Fill in the Blank',
      instruction: 'Choose the particle that best completes the sentence.',
      loading: 'Collecting sentences for the drill...',
      finishedTitle: 'Session complete!',
      finishedSummary: 'You scored {{score}} out of {{total}} sentences. Replay for new combinations.',
      prompt: 'Pick the correct particle',
    },
    flashcards: {
      title: 'Flashcards',
      instruction: 'Tap to reveal the meaning. Track what you already remember.',
      reveal: 'Reveal meaning',
      next: 'Next',
      previous: 'Previous',
      remembered: 'Remembered',
      retry: 'Review again',
      finishedTitle: 'Flashcard round complete!',
      finishedSummary: '{{remembered}} remembered, {{retry}} to review again.',
    },
    typing: {
      title: 'Typing Drill',
      instruction: 'Type the meaning in Indonesian and press Enter.',
      placeholder: 'Type the meaning here...',
      correct: 'Correct!',
      incorrect: 'Not quite, try again.',
      check: 'Check answer',
      finishedTitle: 'Nice! All prompts completed!',
      finishedSummary: '{{score}} out of {{total}} correct answers. Replay to reinforce memory.',
    },
  },
};

function formatTemplate(template: string, replacements?: Record<string, string | number>): string {
  if (!replacements) {
    return template;
  }
  return Object.entries(replacements).reduce((result, [key, value]) => {
    const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return result.replace(pattern, String(value));
  }, template);
}

function getNestedValue<T>(source: TranslationShape, path: string): T | undefined {
  const keys = path.split('.');
  let current: unknown = source;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current as T;
}

export function useTranslation() {
  const { language } = useSettings();
  const active = translations[language];
  const fallback = translations.id;

  return useMemo(() => {
    const getValue = <T,>(path: string): T => {
      const fromActive = getNestedValue<T>(active, path);
      if (typeof fromActive !== 'undefined') {
        return fromActive;
      }
      const fromFallback = getNestedValue<T>(fallback, path);
      if (typeof fromFallback !== 'undefined') {
        return fromFallback;
      }
      throw new Error(`Missing translation for key: ${path}`);
    };

    return {
      t: (path: string, replacements?: Record<string, string | number>) => {
        const raw = getValue<string>(path);
        return formatTemplate(raw, replacements);
      },
      get: getValue,
      language,
    };
  }, [active, fallback, language]);
}











