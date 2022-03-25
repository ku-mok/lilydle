import { useState, useCallback } from "react";

export const useKanaBoard = (maxTextLength: number, isActive: boolean) => {
  //  入力中のテキスト
  const [inputtedText, setinputtedText] = useState("");
  // キーボード操作の処理
  const onBackSpaceClick = useCallback(() => {
    setinputtedText(inputtedText.slice(0, -1));
  }, [inputtedText]);
  const onKanaClick = useCallback(
    (kana) => {
      if (inputtedText.length < maxTextLength && isActive) {
        setinputtedText(inputtedText + kana);
      }
    },
    [inputtedText, isActive, maxTextLength]
  );
  // 入力テキストを初期化する
  const resestInputtedText = useCallback(() => {
    setinputtedText("");
  }, []);
  return {
    inputtedText,
    resestInputtedText,
    onBackSpaceClick,
    onKanaClick,
  };
};
