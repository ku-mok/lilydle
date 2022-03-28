import AnswerRow from "./AnswerRow";

const Footer = (props: { allAnswerCandidates: number }) => {
  return (
    <>
      <h2 className="text-3xl pb-4 mt-4">遊び方</h2>
      <div className="text-xl">
        <p className="mb-2">
          アサルトリリィ版のwordleです。現在、
          {props.allAnswerCandidates}
          のリリィ・CHARM・レギオン名が登録されています。
        </p>
        <p className="mb-2">
          六文字のリリィ名、CHARM名、レギオン名のいずれかが答えになっており、入力すると、それが答えになるかどうかを判定し、文字も位置もあっている場合は緑、文字は合っているが位置が違う場合は黄色、正解に含まれない文字だった場合は、グレーになります。
        </p>
        <p className="mb-2">
          作っといてなんですが、Twitter上でしか存在しないリリィもいるため、かなり難しい気がします。
        </p>
        <h2 className="text-xl pb-4 mt-4 underline">例</h2>
        <p className="mb-2">正解が尾竹廉 (おたけすなお) の場合</p>
        <p>鈴木因 (すずきちなみ) を入力すると</p>
        <div className="w-6/12">
          <AnswerRow
            input="すずきちなみ"
            judge={["candidate", "wrong", "wrong", "wrong", "correct", "wrong"]}
          />
        </div>
        <p className="mb-2">
          のように表示されます。これは、「す」は正解のリリィに含まれている文字であるが一文字目ではない、「な」は五文字目、「ず、き、ち、み」は正解のリリィに含まれていない文字であることを示しています。
        </p>
        <h2 className="text-3xl pb-4 mt-4">謝辞</h2>
        <p className="mb-2">
          正解の候補は
          <a href="https://github.com/fvh-P/assaultlily-rdf">
            アサルトリリィRDF
          </a>
          を元に作成されています。正解した時および６回で正解できなかった場合は、
          <a href="https://lemonade.lily.garden/">Lemonade</a>
          のページで詳細を確認できます。両プロダクトメンテナの
          <a href="https://twitter.com/fvhP_">ふぁぼ原さん</a>および
          <a href="https://twitter.com/miyacorata">宮野さん</a>
          に感謝。
        </p>
        <h2 className="text-3xl pb-4 mt-4">問い合わせなど</h2>
        <p className="mb-2">
          <a href="https://twitter.com/mksyn21">もく(@mksyn21)</a>
          が作成しました。要望・バグ報告はTwitterでリプライをください
        </p>
        <p className="mb-2">
          Github repository:{" "}
          <a href="https://github.com/ku-mok/lilydle">ku-mok/lilydle</a>
        </p>
      </div>
    </>
  );
};
export default Footer;
