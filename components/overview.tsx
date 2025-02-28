import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/hooks/use-language';

export const Overview = () => {
  const { t, language } = useLanguage();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto pt-4 px-4 max-h-[calc(100vh-140px)]"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="rounded-2xl p-6 bg-gradient-to-br from-white/95 via-zinc-50/95 to-zinc-100/95 dark:from-zinc-900/70 dark:via-zinc-800/50 dark:to-zinc-900/80 backdrop-blur-lg border border-zinc-200 dark:border-zinc-700/40 shadow-xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Oyuna Logo/Title */}
        <motion.div variants={item} className="mb-5 flex flex-col items-center">
          <h2 className="text-4xl">
            <span className="oyuna-text">OYUNA</span>
          </h2>
          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300 mt-2 mb-1">
            {t('Advanced AI assistant for Mongolian & English')}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center max-w-lg">
            {t('Experience intuitive conversations with cutting-edge language technology')}
          </p>
        </motion.div>

        {/* Feature grid - 2x2 with concise descriptions */}
        <motion.div variants={container} className="grid grid-cols-2 gap-4 mb-5">
          <motion.div variants={item} className="rounded-xl bg-white/70 dark:bg-zinc-800/50 p-4 border border-zinc-200 dark:border-zinc-700/40 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-blue-100 dark:bg-blue-500/20 p-1.5 mr-3">
                <svg className="size-4 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{t('Multilingual')}</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{t('Seamless communication in Mongolian and English')}</p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl bg-white/70 dark:bg-zinc-800/50 p-4 border border-zinc-200 dark:border-zinc-700/40 hover:border-indigo-500/30 transition-colors">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-500/20 p-1.5 mr-3">
                <svg className="size-4 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{t('Voice Enabled')}</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{t('Advanced speech recognition and natural voice synthesis')}</p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl bg-white/70 dark:bg-zinc-800/50 p-4 border border-zinc-200 dark:border-zinc-700/40 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-purple-100 dark:bg-purple-500/20 p-1.5 mr-3">
                <svg className="size-4 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{t('Free Access')}</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{t('All premium features without limits or hidden costs')}</p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl bg-white/70 dark:bg-zinc-800/50 p-4 border border-zinc-200 dark:border-zinc-700/40 hover:border-teal-500/30 transition-colors">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-teal-100 dark:bg-teal-500/20 p-1.5 mr-3">
                <svg className="size-4 text-teal-600 dark:text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{t('Private & Secure')}</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{t('Your conversations remain protected and confidential')}</p>
          </motion.div>
        </motion.div>

        {/* Feature Spotlight */}
        <motion.div variants={item} className="rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 p-3 border border-blue-200/50 dark:border-indigo-700/20 mb-4 overflow-hidden relative">
          {/* Animated accent elements */}
          <div className="absolute -top-12 -right-12 size-24 bg-blue-300/10 dark:bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 size-16 bg-purple-300/10 dark:bg-purple-500/10 rounded-full blur-lg"></div>
          
          <h4 className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-3 flex items-center">
            <svg className="size-4 mr-2 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {t('Feature Spotlight')}
          </h4>
          
          <div className="flex flex-row gap-1 items-center">
            <div className="rounded-full bg-indigo-100/80 dark:bg-indigo-900/40 p-3 shrink-0">
              <svg className="size-5 text-indigo-600 dark:text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            
            <div className="ml-3">
              <h5 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{t('Real-time Translation')}</h5>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{t('Oyuna can translate between Mongolian and English instantly while preserving context and cultural nuances')}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="px-2 py-0.5 bg-blue-100/70 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/20 rounded-md text-xs text-blue-700 dark:text-blue-300 font-mono">EN</span>
                <svg className="size-3 text-zinc-400 dark:text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="px-2 py-0.5 bg-purple-100/70 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/20 rounded-md text-xs text-purple-700 dark:text-purple-300 font-mono">MN</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer/Call to action */}
        <motion.div variants={item} className="text-center text-zinc-600 dark:text-zinc-400 text-xs flex flex-col items-center">
          <p>{t('Start your conversation with Oyuna below')}</p>
          <span className="inline-block animate-bounce rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-500 p-1 opacity-70 mt-2">
            <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
