const Footer = (props: { allAnswerCandidates: number }) => {
  return (
    <>
      <h2 className="text-3xl mb-4">遊び方</h2>
      <div className="text-xl">
        <p className="mb-2">
          アサルトリリィ版のwordleです。
          六文字のリリィ名、CHARM名、レギオン名のいずれかが答えになっており、入力すると、それが答えになるかどうかを判定し、文字も位置もあっている場合は緑、文字は合っているが位置が違う場合は黄色、正解に含まれない文字だった場合は、グレーになります。
        </p>
        <p className="mb-2">
          作っといてなんですが、Twitter上でしか存在しないリリィもいるため、かなり難しい気がします。現在、
          {props.allAnswerCandidates}
          のリリィ・CHARM・レギオン名が登録されています。
        </p>
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
        <p>
          作成: <a href="https://twitter.com/mksyn_21">Mok</a>
        </p>
      </div>
    </>
  );
};
export default Footer;
