import { useState } from "react";

export const useMatchViewModel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalOpen = () => setModalVisible(true);
  const handleModalClose = () => setModalVisible(false);

  return {
    modalVisible,
    handleModalClose,
    handleModalOpen,
  };
};
