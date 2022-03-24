import { useState, useCallback } from "react";

export const useKanaBoard = () => {
  //  キーボードの入力モードと入力中のテキスト
  const [isAlternate, setIsAlternate] = useState(false);
  const [inputtedText, setinputtedText] = useState("");
  // キーボード操作の処理
  const onKanaToggle = useCallback(
    (isAlternate) => setIsAlternate(isAlternate),
    []
  );
  const onBackSpaceClick = useCallback(() => {
    setinputtedText(inputtedText.slice(0, -1));
  }, [inputtedText]);
  const onKanaClick = useCallback(
    (kana) => {
      if (inputtedText.length <= 6) {
        setinputtedText(inputtedText + kana);
      }
    },
    [inputtedText]
  );
  // 入力テキストを初期化する
  const resestInputtedText = useCallback(() => {
    setinputtedText("");
  }, []);
  return {
    isAlternate,
    inputtedText,
    resestInputtedText,
    onKanaToggle,
    onBackSpaceClick,
    onKanaClick,
  };
};
