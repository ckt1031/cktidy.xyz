import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import { pageList, PageListProp } from '../data/pages';
import { trim } from '../utils/tools';

export default function Spotlight() {
  const { push } = useRouter();

  const [display, setDisplay] = useState(false);
  const [searchList, setSearchList] = useState<PageListProp[]>([]);

  // sort by alphabetical order.
  const sortedList = searchList.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    document.body.style.overflow = display ? 'hidden' : 'auto';
  }, [display]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (display && e.key === 'Escape') {
        setDisplay(false);
      }
    };

    setSearchList(pageList);

    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('keydown', onEsc);
    };
  }, [display]);

  const toggleSpotlightDisplay = useCallback(() => {
    setDisplay(state => !state);
  }, []);

  const onType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) setSearchList(pageList);
    else {
      setSearchList(list =>
        list.filter(page =>
          page.name.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
  }, []);

  return (
    <>
      <button
        type="button"
        className="rounded-lg p-2 ring-gray-300 hover:bg-gray-200 hover:dark:bg-gray-800"
        onClick={toggleSpotlightDisplay}>
        <FiSearch />
      </button>
      <AnimatePresence>
        {display && (
          <motion.div
            className="fixed inset-0 z-50 h-screen w-screen bg-gray-500/80 backdrop-blur-sm dark:bg-gray-900/80"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeIn' }}>
            <div className="flex h-screen w-screen items-center justify-center">
              <div className="p-5">
                <div className="rounded-lg bg-gray-200 p-3 shadow-2xl dark:bg-gray-600 md:w-[650px]">
                  <div className="border-b border-gray-500">
                    <div className="flex flex-row items-center justify-start space-x-4 px-3 py-1">
                      <FiSearch />
                      <input
                        onChange={onType}
                        placeholder="Search Here"
                        className="w-full bg-transparent p-1 placeholder:items-center"
                      />
                      <button type="button" onClick={toggleSpotlightDisplay}>
                        <IoMdClose />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 block max-h-80 overflow-auto">
                    {sortedList.length > 0 ? (
                      sortedList.map(value => {
                        return (
                          <div
                            key={`SEARCHITEM-${trim(value.name)}`}
                            className="rounded-lg py-2 px-3 hover:bg-gray-300 hover:dark:bg-gray-700">
                            <button
                              type="button"
                              className="w-full text-left"
                              onClick={() => {
                                push({
                                  pathname: value.href as never,
                                });
                                toggleSpotlightDisplay();
                              }}>
                              {value.name}
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="w-full">
                        <p className="mt-3 p-2 text-center text-xl">
                          No record
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
