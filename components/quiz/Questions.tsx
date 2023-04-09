import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LinearProgress } from '@mui/material';

interface QuestionsProps {
  delay: number;
  question: string;
  keyValue: number;
  gameOver: boolean;
  msg: string;
  start: boolean;
}
const Questions: React.FC<QuestionsProps> = ({ keyValue, delay, question, gameOver, msg, start }) => {
  if (start) {
    // const codeSnippetRegex: RegExp = /<snip>(.*?)<\/snip>/gs;
    // const formattedQuestion: JSX.Element = (
    //   <div
    //     dangerouslySetInnerHTML={{
    //       __html: question.replace(codeSnippetRegex, (match: string, code: string) => {
    //         const formattedCode: string = code
    //           .replace(/</g, '&lt;')
    //           .replace(/>/g, '&gt;')
    //           .replace(/\n/g, '<br/>')
    //           .replace(/^\s+/gm, (match: string) => {
    //             return ' '.repeat(match.length);
    //           });
    //         return `<pre class="bg-zinc-700 text-white text-left rounded-md text-xs p-4"><code class="language-jsx">${formattedCode}</code></pre>`;
    //       }),
    //     }}
    //   ></div>
    // );

    return (
      <AnimatePresence mode='wait'>
        <motion.div
          key={'Q' + keyValue}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: -50,
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: 'easeInOut',
              type: 'spring',
              stiffness: 260,
              damping: 20,
            },
          }}
          transition={{
            delay: delay,
            duration: 0.5,
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className='self-center text-lg flex flex-row items-center gap-6'
        >
          <div key={'Q' + keyValue + 1}>{question}</div>
          {gameOver && (
            <motion.div
              key={'Q' + keyValue}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{
                delay: 0,
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              className='self-center text-2xl flex flex-col items-center justify-center gap-6'
            >
              {msg}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  } else return null;
};

export default Questions;
