export type GameEndModalProps = {
  modalClose: () => void;
};
import ModalLayout from "./ModalLayout";

const NonCandidateModal: React.FC<GameEndModalProps> = (props) => {
  return (
    <ModalLayout modalClose={props.modalClose}>
      <div className="text-3xl font-bold text-center mb-4">
        リリィ、CHARM、レギオンの名前ではありません
      </div>
    </ModalLayout>
  );
};
export default NonCandidateModal;
