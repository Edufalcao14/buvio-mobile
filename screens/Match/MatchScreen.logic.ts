import { useState } from "react";

export const useMatchScreenLogic = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleSaveMatch = () => {};
  const handleModalOpen = () => setModalVisible(true);
  const handleModalClose = () => setModalVisible(false);

  return {
    modalVisible,
    handleModalClose,
    handleModalOpen,
    handleSaveMatch
  };
}; 