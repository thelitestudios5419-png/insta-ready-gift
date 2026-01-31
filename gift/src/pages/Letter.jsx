// src/pages/Letter.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = {
  "Open when you miss me": `\nIt’s okay to miss someone.\nIt doesn’t mean you’re weak — it just means the connection mattered.\nMissing isn’t always about distance.\nSometimes it’s that quiet pause where something feels incomplete.\n\nTake a slow breath.\nYou don’t need to explain or fix anything.\n\nWhatever you’re feeling is valid.\nEven if we’re not sharing the same space right now, the connection hasn’t gone anywhere.\n\nYou’re not alone in this.\n\nJust breathe.\nI’m still here — in the way that matters.`,
  "Open When You’re Feeling Low": `\nIf today feels heavier than usual, that’s okay.\nSome days don’t come with energy or answers.\n\nYou don’t need to be strong right now.\nFeeling low doesn’t mean you’re failing — it just means you’re human.\n\nPause here.\nBreathe slowly.\nLet yourself exist without pressure.\n\nThis moment will pass, gently.\nBe kind to yourself today.\nThat’s enough.`,
  "Open When You Need a Smile": `\nYou don’t need a big reason to be here.\nSometimes a smile isn’t about fixing the day — it’s just about making it a little lighter.\n\nMaybe things feel busy.\nMaybe they feel dull.\nOr maybe you just wanted a small pause that feels warm.\n\nIf you smiled even a little while opening this, that’s enough.\nAnd if you didn’t — that’s okay too.\n\nNot every smile has to be loud or full of laughter.\nSome are quiet.\nSome are just a gentle easing of the moment.\n\nLet this be one of those moments.\nNothing to solve. Nothing to rush.\nJust a small reminder that softness still exists in your day.\n\nWhatever comes next, take it slowly.\nYou’re doing just fine.\n\nAnd if you need another smile later —\nthis will still be here.`,
  "Open When You’re Overthinking": `\nIf your mind feels louder than everything else right now, pause for a second.\nYou don’t need to follow every thought that shows up.\n\nOverthinking usually means you care.\nAbout people. About outcomes. About getting things right.\nThat’s not a flaw — it’s just your mind trying a little too hard to protect you.\n\nBut not every thought needs an answer tonight.\nNot every question needs solving right now.\n\nTake a slow breath.\nNotice where you are.\nNotice that this moment is safe, even if your thoughts are restless.\n\nYou’re allowed to step back from the noise.\nYou’re allowed to leave some thoughts unfinished.\nThey’ll still be there later — and they won’t lose their meaning if you rest.\n\nRight now, choose the simplest thing:\nbeing here, exactly as you are.\n\nYou’re doing better than your mind is letting you believe.\n\nLet this moment be quieter.`,
  "Open when your heart feels heavy": `\nIf your heart feels heavy right now, you don’t need to explain why.\nSome feelings don’t arrive with clear reasons or easy words.\n\nCarrying weight inside you can be exhausting.\nEspecially when you’re trying to keep going like everything is normal.\n\nYou don’t have to be strong here.\nYou don’t have to hold it together for anyone else.\nThis moment is allowed to be quiet and honest.\n\nWhatever you’re feeling — sadness, tiredness, confusion, or something unnamed — it belongs.\nYou’re not wrong for feeling it, and you don’t have to push it away.\n\nTake a slow breath.\nLet your shoulders drop.\nYou’re allowed to rest for a moment without fixing anything.\n\nHeaviness doesn’t mean you’re broken.\nIt means you’ve been carrying something that mattered.\n\nYou don’t have to carry it all at once.\nAnd you don’t have to carry it alone.\n\nBe gentle with yourself right now.\nThat’s enough for this moment.`,
  "Open on a special occasion": `\nToday matters.\nNot because it has to be perfect — but because it marks a moment worth noticing.\n\nSpecial occasions aren’t only about celebration.\nThey’re about pausing long enough to recognize how far you’ve come, in your own way.\n\nWhatever this day represents for you — a milestone, a memory, a fresh start, or a quiet win — it deserves space.\nYou don’t have to compare it to anyone else’s journey.\n\nIf you’re celebrating loudly, enjoy it fully.\nIf you’re celebrating quietly, that’s just as meaningful.\n\nMoments like this remind us that life isn’t only made of routines.\nIt’s made of these small markers that say: this mattered.\n\nTake a breath and let yourself feel it.\nPride, gratitude, relief, hope — whatever shows up is welcome.\n\nHere’s to this moment, exactly as it is.\nAnd to you, for reaching it.`,
  };

// Robust TypingText   uses setTimeout and checks each character before appending.
function TypingText({ text = '', speed = 30 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed(''); // reset when `text` changes

    // keep only a real string (avoid String(undefined) -> "undefined")
    const safeText = typeof text === 'string' ? text : '';
    if (safeText.length === 0) return;

    const chars = safeText.split('');
    let i = 0;
    let cancelled = false;
    let timerId = null;

    const tick = () => {
      if (cancelled) return;
      // guard against out-of-bounds or undefined char
      const ch = chars[i];
      if (typeof ch === 'undefined') {
        return; // stop silently
      }
      setDisplayed((prev) => prev + ch);
      i += 1;
      if (i < chars.length) {
        timerId = setTimeout(tick, speed);
      }
    };

    // start typing after a tiny delay (or 0)
    timerId = setTimeout(tick, speed);

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [text, speed]);

  return <pre className="whitespace-pre-wrap text-left">{displayed}</pre>;
}

export default function Letter() {
  const { scenario } = useParams();

  // sanitize scenario: avoid literal "undefined" and non-strings
  let decodedScenario = '';
  if (typeof scenario === 'string' && scenario.length > 0 && scenario !== 'undefined') {
    try {
      decodedScenario = decodeURIComponent(scenario);
      if (decodedScenario === 'undefined') decodedScenario = '';
    } catch (e) {
      // if decode fails, fall back to raw scenario if safe
      decodedScenario = scenario === 'undefined' ? '' : scenario;
    }
  }

  // matching by normalized keys
  const normalizedScenario = decodedScenario.trim().toLowerCase();
  const matchingKey = Object.keys(LETTERS).find(
    (key) => key.trim().toLowerCase() === normalizedScenario
  );

  // ensure letterText is a string (avoid converting undefined -> "undefined")
  const letterText = matchingKey && typeof LETTERS[matchingKey] === 'string'
    ? LETTERS[matchingKey]
    : `\nsomething happened to letter 😢😰\n`;

  // framer-motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.15 },
    },
  };

  const headingVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-crimson-400 to-crimson-500 px-4 py-12">
      <AnimatePresence>
        <motion.div
          className="flex flex-col items-center w-full max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.h1
            variants={headingVariants}
            className="text-2xl sm:text-3xl font-bold tracking-wide text-ivory mb-4 text-center"
          >
            {decodedScenario || 'Letter'}
          </motion.h1>

          <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{
              layout: {
                type: "spring",
                stiffness: 90,
                damping: 26,
                mass: 0.8
              },
            }}
            className="bg-white rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] pt-3 px-6 pb-6 w-full text-crimson-500 text-[13px] leading-5 font-mono"
          >
            <TypingText text={letterText} speed={20} />
          </motion.div>


          <motion.div variants={headingVariants} className="mt-6">
            <Link to="/open-when" className="text-charcoal underline hover:text-deep-rose-300 text-base">
              ← Back to Letters
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
